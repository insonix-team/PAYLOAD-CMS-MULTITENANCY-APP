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
    const tenant = searchParams.get('tenant') || undefined;

    let data;

    switch (endpoint) {
      case 'total-users':
        data = await analyticsService.getTotalUsers(startDate, endDate, tenant);
        break;

      case 'total-visits':
        data = await analyticsService.getTotalVisits(startDate, endDate, tenant);
        break;

      case 'countries':
        data = await analyticsService.getCountries(startDate, endDate, tenant);
        break;

      case 'country':
        if (!country) {
          return NextResponse.json({ error: 'Country is required' }, { status: 400 });
        }
        data = await analyticsService.getCountryAnalytics(country, startDate, endDate, tenant);
        break;

      case 'traffic-sources':
        data = await analyticsService.getTrafficSources(startDate, endDate, tenant);
        break;

      case 'users-by-city':
        if (!country) {
          return NextResponse.json({ error: 'Country is required' }, { status: 400 });
        }
        data = await analyticsService.getUsersByCity(country, startDate, endDate, tenant);
        break;

      case 'users-by-platform':
        data = await analyticsService.getUsersByPlatform(startDate, endDate, tenant);
        break;

      case 'users-trend':
        data = await analyticsService.getUsersTrend(startDate, endDate, tenant);
        break;

      case 'top-pages':
        data = await analyticsService.getTopPages(startDate, endDate, tenant);
        break;

      case 'users-by-device':
        data = await analyticsService.getUsersByDevice(startDate, endDate, tenant);
        break;

      case 'users-by-browser':
        data = await analyticsService.getUsersByBrowser(startDate, endDate, tenant);
        break;

      case 'user-type':
        data = await analyticsService.getUserType(startDate, endDate, tenant);
        break;

      case 'realtime-users':
        data = await analyticsService.getRealtimeUsers(tenant);
        break;

      case 'dashboard-summary':
        data = await analyticsService.getDashboardSummary(startDate, endDate, tenant);
        break;

      case 'geo':
        data = await analyticsService.getGeoAnalytics(startDate, endDate, tenant);
        break;

      case 'engagement':
        data = await analyticsService.getEngagementMetrics(startDate, endDate, tenant);
        break;

      case 'button-clicks':
        data = await analyticsService.getButtonClicks(startDate, endDate, tenant);
        break;

      default:
        data = await analyticsService.getDashboardSummary(startDate, endDate, tenant);
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
