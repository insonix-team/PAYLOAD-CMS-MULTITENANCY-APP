import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/services/analytics';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint =
      searchParams.get('endpoint') || searchParams.get('type') || 'dashboard-summary';
    const startDate = searchParams.get('startDate') || undefined;
    const endDate = searchParams.get('endDate') || undefined;
    const country = searchParams.get('country') || undefined;

    let data;

    switch (endpoint) {
      case 'total-users':
        data = await analyticsService.getTotalUsers(startDate, endDate);
        break;

      case 'total-visits':
        data = await analyticsService.getTotalVisits(startDate, endDate);
        break;

      case 'countries':
        data = await analyticsService.getCountries(startDate, endDate);
        break;

      case 'country':
        if (!country) {
          return NextResponse.json({ error: 'Country is required' }, { status: 400 });
        }
        data = await analyticsService.getCountryAnalytics(country, startDate, endDate);
        break;

      case 'traffic-sources':
        data = await analyticsService.getTrafficSources(startDate, endDate);
        break;

      case 'users-by-city':
        if (!country) {
          return NextResponse.json({ error: 'Country is required' }, { status: 400 });
        }
        data = await analyticsService.getUsersByCity(country, startDate, endDate);
        break;

      case 'users-by-platform':
        data = await analyticsService.getUsersByPlatform(startDate, endDate);
        break;

      case 'users-trend':
        data = await analyticsService.getUsersTrend(startDate, endDate);
        break;

      case 'top-pages':
        data = await analyticsService.getTopPages(startDate, endDate);
        break;

      case 'users-by-device':
        data = await analyticsService.getUsersByDevice(startDate, endDate);
        break;

      case 'users-by-browser':
        data = await analyticsService.getUsersByBrowser(startDate, endDate);
        break;

      case 'user-type':
        data = await analyticsService.getUserType(startDate, endDate);
        break;

      case 'realtime-users':
        data = await analyticsService.getRealtimeUsers();
        break;

      case 'dashboard-summary':
        data = await analyticsService.getDashboardSummary(startDate, endDate);
        break;

      case 'geo':
        data = await analyticsService.getGeoAnalytics(startDate, endDate);
        break;

      case 'engagement':
        data = await analyticsService.getEngagementMetrics(startDate, endDate);
        break;

      case 'button-clicks':
        data = await analyticsService.getButtonClicks(startDate, endDate);
        break;

      default:
        data = await analyticsService.getDashboardSummary(startDate, endDate);
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Analytics API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}
