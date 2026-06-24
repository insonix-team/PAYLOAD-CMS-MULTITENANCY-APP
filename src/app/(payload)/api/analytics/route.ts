import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/services/analytics';
import { getTenant } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    // Check tenant GA config
    const tenant = await getTenant();
    if (!tenant?.googleAnalyticsId) {
      return NextResponse.json({ error: 'GA not configured for this tenant' }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint') || searchParams.get('type') || 'dashboard-summary';
    const startDate = searchParams.get('startDate') || undefined;
    const endDate = searchParams.get('endDate') || undefined;
    const country = searchParams.get('country') || undefined;

    let data;

    // ============================================
    // MATCH EXACT STRAPI ENDPOINTS
    // ============================================

    switch (endpoint) {
      // --- Total Users ---
      case 'total-users':
        data = await analyticsService.getTotalUsers(startDate, endDate);
        break;

      // --- Total Visits ---
      case 'total-visits':
        data = await analyticsService.getTotalVisits(startDate, endDate);
        break;

      // --- Countries ---
      case 'countries':
        data = await analyticsService.getCountries(startDate, endDate);
        break;

      // --- Country Analytics ---
      case 'country':
        if (!country) {
          return NextResponse.json({ error: 'Country is required' }, { status: 400 });
        }
        data = await analyticsService.getCountryAnalytics(country, startDate, endDate);
        break;

      // --- Traffic Sources ---
      case 'traffic-sources':
        data = await analyticsService.getTrafficSources(startDate, endDate);
        break;

      // --- Users by City ---
      case 'users-by-city':
        if (!country) {
          return NextResponse.json({ error: 'Country is required' }, { status: 400 });
        }
        data = await analyticsService.getUsersByCity(country, startDate, endDate);
        break;

      // --- Users by Platform ---
      case 'users-by-platform':
        data = await analyticsService.getUsersByPlatform(startDate, endDate);
        break;

      // --- Users Trend ---
      case 'users-trend':
        data = await analyticsService.getUsersTrend(startDate, endDate);
        break;

      // --- Top Pages ---
      case 'top-pages':
        data = await analyticsService.getTopPages(startDate, endDate);
        break;

      // --- Users by Device ---
      case 'users-by-device':
        data = await analyticsService.getUsersByDevice(startDate, endDate);
        break;

      // --- Users by Browser ---
      case 'users-by-browser':
        data = await analyticsService.getUsersByBrowser(startDate, endDate);
        break;

      // --- User Type ---
      case 'user-type':
        data = await analyticsService.getUserType(startDate, endDate);
        break;

      // --- Realtime Users ---
      case 'realtime-users':
        data = await analyticsService.getRealtimeUsers();
        break;

      // --- Dashboard Summary ---
      case 'dashboard-summary':
        data = await analyticsService.getDashboardSummary(startDate, endDate);
        break;

      // --- Geo Analytics ---
      case 'geo':
        data = await analyticsService.getGeoAnalytics(startDate, endDate);
        break;

      // --- Engagement Metrics ---
      case 'engagement':
        data = await analyticsService.getEngagementMetrics(startDate, endDate);
        break;

      // --- Button Clicks ---
      case 'button-clicks':
        data = await analyticsService.getButtonClicks(startDate, endDate);
        break;

      // --- Default ---
      default:
        data = await analyticsService.getDashboardSummary(startDate, endDate);
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Analytics API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch analytics data' }, { status: 500 });
  }
}
