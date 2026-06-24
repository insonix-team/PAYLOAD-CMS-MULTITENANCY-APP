import { BetaAnalyticsDataClient } from '@google-analytics/data';

// ============================================
// GA4 CLIENT INITIALIZATION
// ============================================

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  projectId: process.env.GA_PROJECT_ID,
});

const propertyId = process.env.GA_PROPERTY_ID!;

// ============================================
// HELPER FUNCTIONS
// ============================================

const buildDateRange = (startDate?: string, endDate?: string) => [
  {
    startDate: startDate || '7daysAgo',
    endDate: endDate || 'today',
  },
];

function formatSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ============================================
// ANALYTICS SERVICE
// ============================================

export const analyticsService = {
  async getTotalUsers(startDate?: string, endDate?: string) {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: buildDateRange(startDate, endDate),
      metrics: [{ name: 'totalUsers' }],
    });

    return {
      totalUsers: response.rows?.[0]?.metricValues?.[0]?.value || 0,
    };
  },

  async getTotalVisits(startDate?: string, endDate?: string) {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: buildDateRange(startDate, endDate),
      metrics: [{ name: 'sessions' }],
    });

    return {
      totalVisits: response.rows?.[0]?.metricValues?.[0]?.value || 0,
    };
  },

  async getCountries(startDate?: string, endDate?: string) {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: buildDateRange(startDate, endDate),
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'totalUsers' }],
    });

    return (
      response.rows?.map((row) => ({
        country: row.dimensionValues?.[0]?.value,
        users: row.metricValues?.[0]?.value,
      })) || []
    );
  },

  async getCountryAnalytics(country: string, startDate?: string, endDate?: string) {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: buildDateRange(startDate, endDate),
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'totalUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }],
      dimensionFilter: {
        filter: {
          fieldName: 'country',
          stringFilter: {
            matchType: 'EXACT',
            value: country,
          },
        },
      },
    });

    const row = response.rows?.[0];

    return {
      country,
      totalUsers: row?.metricValues?.[0]?.value || 0,
      sessions: row?.metricValues?.[1]?.value || 0,
      pageViews: row?.metricValues?.[2]?.value || 0,
    };
  },

  async getTrafficSources(startDate?: string, endDate?: string) {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: buildDateRange(startDate, endDate),
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'sessions' }],
    });

    return (
      response.rows?.map((row) => ({
        source: row.dimensionValues?.[0]?.value,
        sessions: row.metricValues?.[0]?.value,
      })) || []
    );
  },

  async getUsersByCity(country: string, startDate?: string, endDate?: string) {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: buildDateRange(startDate, endDate),
      dimensions: [{ name: 'city' }],
      metrics: [{ name: 'totalUsers' }],
      dimensionFilter: {
        filter: {
          fieldName: 'country',
          stringFilter: {
            matchType: 'EXACT',
            value: country,
          },
        },
      },
      orderBys: [
        {
          metric: { metricName: 'totalUsers' },
          desc: true,
        },
      ],
    });

    return (
      response.rows?.map((row) => ({
        city: row.dimensionValues?.[0]?.value,
        users: Number(row.metricValues?.[0]?.value || 0),
      })) || []
    );
  },

  async getUsersByPlatform(startDate?: string, endDate?: string) {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: buildDateRange(startDate, endDate),
      dimensions: [{ name: 'platform' }],
      metrics: [{ name: 'totalUsers' }],
      orderBys: [
        {
          metric: { metricName: 'totalUsers' },
          desc: true,
        },
      ],
    });

    return (
      response.rows?.map((row) => ({
        platform: row.dimensionValues?.[0]?.value,
        users: Number(row.metricValues?.[0]?.value || 0),
      })) || []
    );
  },

  async getUsersTrend(startDate?: string, endDate?: string) {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: buildDateRange(startDate, endDate),
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'totalUsers' }],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    });

    return (
      response.rows?.map((row) => ({
        date: row.dimensionValues?.[0]?.value,
        users: Number(row.metricValues?.[0]?.value || 0),
      })) || []
    );
  },

  async getTopPages(startDate?: string, endDate?: string) {
    try {
      const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: buildDateRange(startDate, endDate),
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'userEngagementDuration' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 100000,
      });

      return (
        response.rows?.map((row) => {
          const page = row.dimensionValues?.[0]?.value || '';
          const views = Number(row.metricValues?.[0]?.value || 0);
          const totalEngagement = Number(row.metricValues?.[1]?.value || 0);

          return {
            page,
            views,
            avgEngagementTime: views ? totalEngagement / views : 0,
            avgEngagementTimeFormatted: formatSeconds(views ? totalEngagement / views : 0),
          };
        }) || []
      );
    } catch (error) {
      console.error('GA4 getTopPages Error:', error);
      throw new Error('Failed to fetch top pages');
    }
  },

  async getUserType(startDate?: string, endDate?: string) {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: buildDateRange(startDate, endDate),
      dimensions: [{ name: 'newVsReturning' }],
      metrics: [{ name: 'totalUsers' }],
    });

    return (
      response.rows?.map((row) => ({
        type: row.dimensionValues?.[0]?.value,
        users: Number(row.metricValues?.[0]?.value || 0),
      })) || []
    );
  },

  async getDashboardSummary(startDate?: string, endDate?: string) {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: buildDateRange(startDate, endDate),
      metrics: [{ name: 'totalUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }, { name: 'bounceRate' }],
    });

    const row = response.rows?.[0];

    return {
      totalUsers: row?.metricValues?.[0]?.value || 0,
      sessions: row?.metricValues?.[1]?.value || 0,
      pageViews: row?.metricValues?.[2]?.value || 0,
      bounceRate: row?.metricValues?.[3]?.value || 0,
    };
  },

  async getUsersByDevice(startDate?: string, endDate?: string) {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: buildDateRange(startDate, endDate),
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'totalUsers' }],
      orderBys: [
        {
          metric: { metricName: 'totalUsers' },
          desc: true,
        },
      ],
    });

    return (
      response.rows?.map((row) => ({
        device: row.dimensionValues?.[0]?.value,
        users: Number(row.metricValues?.[0]?.value || 0),
      })) || []
    );
  },

  async getUsersByBrowser(startDate?: string, endDate?: string) {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: buildDateRange(startDate, endDate),
      dimensions: [{ name: 'browser' }],
      metrics: [{ name: 'totalUsers' }],
      orderBys: [
        {
          metric: { metricName: 'totalUsers' },
          desc: true,
        },
      ],
    });

    return (
      response.rows?.map((row) => ({
        browser: row.dimensionValues?.[0]?.value,
        users: Number(row.metricValues?.[0]?.value || 0),
      })) || []
    );
  },

  async getRealtimeUsers() {
    const [response] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${propertyId}`,
      metrics: [{ name: 'activeUsers' }],
    });

    return {
      activeUsers: response.rows?.[0]?.metricValues?.[0]?.value || 0,
    };
  },

  async getGeoAnalytics(startDate?: string, endDate?: string) {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: buildDateRange(startDate, endDate),
      dimensions: [{ name: 'country' }, { name: 'city' }],
      metrics: [{ name: 'totalUsers' }],
    });

    return (
      response.rows?.map((row) => ({
        country: row.dimensionValues?.[0]?.value,
        city: row.dimensionValues?.[1]?.value,
        users: Number(row.metricValues?.[0]?.value || 0),
      })) || []
    );
  },

  async getEngagementMetrics(startDate?: string, endDate?: string) {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: buildDateRange(startDate, endDate),
      metrics: [{ name: 'averageSessionDuration' }, { name: 'engagementRate' }, { name: 'engagedSessions' }],
    });

    const row = response.rows?.[0];

    return {
      avgSessionDuration: row?.metricValues?.[0]?.value || 0,
      engagementRate: row?.metricValues?.[1]?.value || 0,
      engagedSessions: row?.metricValues?.[2]?.value || 0,
    };
  },

  async getButtonClicks(startDate?: string, endDate?: string) {
    try {
      const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: buildDateRange(startDate, endDate),
        dimensions: [{ name: 'customEvent:button_name' }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          filter: {
            fieldName: 'eventName',
            stringFilter: {
              matchType: 'EXACT',
              value: 'button_click',
            },
          },
        },
      });

      return (
        response.rows?.map((row) => ({
          button: row.dimensionValues?.[0]?.value,
          clicks: Number(row.metricValues?.[0]?.value || 0),
        })) || []
      );
    } catch (error) {
      console.error('getButtonClicks failed:', error);
      return [];
    }
  },
};
