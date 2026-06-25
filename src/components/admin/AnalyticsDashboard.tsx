'use client';

import { ROLES } from '@/constants/AppOptions';
import { useAuth } from '@payloadcms/ui';
import { BarChart3, MousePointerClick } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AnalyticsCards } from './analytics/AnalyticsCards';
import { ColumnChart, PieChart } from './analytics/AnalyticsCharts';
import { AnalyticsDateRange } from './analytics/AnalyticsDateRange';
import { DemographicCustomCard } from './analytics/AnalyticsDemographicsCard';
import { TopPagesTable } from './analytics/AnalyticsTopPagesTable';

const Card = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      background: '#fff',
      padding: 16,
      borderRadius: 10,
      flex: '1 1 300px',
      minWidth: 260,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    }}
  >
    {children}
  </div>
);

const Title = ({ children }: { children: React.ReactNode }) => (
  <h2
    style={{
      margin: 0,
      marginBottom: 12,
      fontWeight: 'bold',
      fontSize: 14,
      color: '#555',
    }}
  >
    {children}
  </h2>
);

const BigNumber = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontWeight: 'bold', fontSize: 22, margin: 0, color: '#333' }}>{children}</p>
);

const ChipWrap = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>{children}</div>
);

const Chip = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      background: '#bcbcd3',
      padding: '6px 10px',
      borderRadius: 6,
      fontSize: 13,
      fontWeight: 600,
      color: '#333',
    }}
  >
    {children}
  </div>
);

type AnalyticsRange = { start: string; end: string };
type TrafficSource = { source: string; sessions: number };
type VisitorType = { type?: string; users: number };
type TrendPoint = { date: string; users: number };
type CountryData = { country: string; users: number };
type PageView = { page: string; views: number; avgEngagementTime: number };
type CityData = { city: string; users: number };
type ButtonClick = { button: string; clicks: number };
type TenantOption = { id: string; name: string; slug?: string };
type TenantApiItem = { id?: string; _id?: string; name?: string; title?: string; slug?: string };

type AuthUser = {
  role?: string;
  tenant?: string | { slug?: string; id?: string };
};

const AnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [totalVisits, setTotalVisits] = useState<number>(0);
  const [trafficSources, setTrafficSources] = useState<TrafficSource[]>([]);
  const [usersTypes, setUsersTypes] = useState<VisitorType[]>([]);
  const [usersTrends, setUsersTrends] = useState<TrendPoint[]>([]);
  const [userWithCountries, setUserWithCountries] = useState<CountryData[]>([]);
  const [viewsByPages, setViewsByPages] = useState<PageView[]>([]);
  const [sessionDuration, setSessionDuration] = useState<number>(0);
  const [engagementRate, setEngagementRate] = useState<number>(0);
  const [engagedSessions, setEngagedSessions] = useState<number>(0);
  const [buttonClicks, setButtonClicks] = useState<ButtonClick[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [cities, setCities] = useState<CityData[]>([]);
  const [countriesList, setCountriesList] = useState<CountryData[]>([]);

  useEffect(() => {
    if (!startDate && !endDate) {
      const pad = (n: number) => n.toString().padStart(2, '0');
      const today = new Date();
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 6);
      const formattedToday = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
      const formattedLastWeek = `${lastWeek.getFullYear()}-${pad(lastWeek.getMonth() + 1)}-${pad(lastWeek.getDate())}`;
      setStartDate(formattedLastWeek);
      setEndDate(formattedToday);
    }
  }, []);

  const getTotalVisits = async (range?: AnalyticsRange) => {
    try {
      let url = '/api/analytics?endpoint=total-visits';
      if (selectedTenant) url += `&tenant=${selectedTenant}`;
      if (range?.start && range?.end) {
        url += `&startDate=${range.start}&endDate=${range.end}`;
      }
      const res = await fetch(url);
      const result = await res.json();
      setTotalVisits(result?.data?.totalVisits || 0);
    } catch (err) {
      console.log(err);
    }
  };

  const getTrafficSources = async (range?: AnalyticsRange) => {
    try {
      let url = '/api/analytics?endpoint=traffic-sources';
      if (selectedTenant) url += `&tenant=${selectedTenant}`;
      if (range?.start && range?.end) {
        url += `&startDate=${range.start}&endDate=${range.end}`;
      }
      const res = await fetch(url);
      const result = await res.json();
      setTrafficSources(result?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const getUsersTypes = async (range?: AnalyticsRange) => {
    try {
      let url = '/api/analytics?endpoint=user-type';
      if (selectedTenant) url += `&tenant=${selectedTenant}`;
      if (range?.start && range?.end) {
        url += `&startDate=${range.start}&endDate=${range.end}`;
      }
      const res = await fetch(url);
      const result = await res.json();
      setUsersTypes(result?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const getUsersTrends = async (range?: AnalyticsRange) => {
    try {
      let url = '/api/analytics?endpoint=users-trend';
      if (selectedTenant) url += `&tenant=${selectedTenant}`;
      if (range?.start && range?.end) {
        url += `&startDate=${range.start}&endDate=${range.end}`;
      }
      const res = await fetch(url);
      const result = await res.json();
      setUsersTrends(result?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const getUsersWithCountries = async (range?: AnalyticsRange) => {
    try {
      let url = '/api/analytics?endpoint=countries';
      if (selectedTenant) url += `&tenant=${selectedTenant}`;
      if (range?.start && range?.end) {
        url += `&startDate=${range.start}&endDate=${range.end}`;
      }
      const res = await fetch(url);
      const result = await res.json();
      const data = (result?.data || []) as CountryData[];
      setUserWithCountries(data);

      const countriesData = data
        .filter((e) => e.country && e.country !== '')
        .map((e) => ({ country: e.country, users: Number(e.users || 0) }));
      setCountriesList(countriesData);

      if (countriesData.length > 0 && !selectedCountry) {
        setSelectedCountry(countriesData[0].country);
        getDemographicDetails(range, countriesData[0].country);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getDemographicDetails = async (range?: AnalyticsRange, country?: string) => {
    if (!country) return;

    try {
      let url = `/api/analytics?endpoint=users-by-city&country=${encodeURIComponent(country)}`;
      if (selectedTenant) url += `&tenant=${selectedTenant}`;
      if (range?.start && range?.end) {
        url += `&startDate=${range.start}&endDate=${range.end}`;
      }
      const res = await fetch(url);
      const result = await res.json();

      const cityData = (result?.data || []) as CityData[];
      setCities(cityData);
    } catch (err) {
      console.error('Failed to fetch city details:', err);
      setCities([]);
    }
  };

  const getViewsByPages = async (range?: AnalyticsRange) => {
    try {
      let url = '/api/analytics?endpoint=top-pages';
      if (selectedTenant) url += `&tenant=${selectedTenant}`;
      if (range?.start && range?.end) {
        url += `&startDate=${range.start}&endDate=${range.end}`;
      }
      const res = await fetch(url);
      const result = await res.json();
      setViewsByPages((result?.data || []) as PageView[]);
    } catch (err) {
      console.log(err);
    }
  };

  const getButtonsClicks = async (range?: AnalyticsRange) => {
    try {
      let url = '/api/analytics?endpoint=button-clicks';
      if (selectedTenant) url += `&tenant=${selectedTenant}`;
      if (range?.start && range?.end) {
        url += `&startDate=${range.start}&endDate=${range.end}`;
      }
      const res = await fetch(url);
      const result = await res.json();
      setButtonClicks(
        (result?.data?.filter((e: ButtonClick) => e.button !== '/') || []) as ButtonClick[]
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getEngagments = async (range?: AnalyticsRange) => {
    try {
      let url = '/api/analytics?endpoint=engagement';
      if (selectedTenant) url += `&tenant=${selectedTenant}`;
      if (range?.start && range?.end) {
        url += `&startDate=${range.start}&endDate=${range.end}`;
      }
      const res = await fetch(url);
      const result = await res.json();
      const data = (result?.data || {}) as {
        avgSessionDuration?: number;
        engagementRate?: number;
        engagedSessions?: number;
      };
      setSessionDuration(data?.avgSessionDuration || 0);
      setEngagementRate(data?.engagementRate || 0);
      setEngagedSessions(data?.engagedSessions || 0);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAnalytics = async (range?: AnalyticsRange) => {
    await Promise.all([
      getTotalVisits(range),
      getTrafficSources(range),
      getUsersTypes(range),
      getUsersTrends(range),
      getUsersWithCountries(range),
      getViewsByPages(range),
      getButtonsClicks(range),
      getEngagments(range),
    ]);
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    void getDemographicDetails({ start: startDate, end: endDate }, country);
  };

  // Role-aware tenant selection
  const { user } = useAuth() as { user?: AuthUser };
  const [tenants, setTenants] = useState<TenantOption[]>([]);
  const [selectedTenant, setSelectedTenant] = useState<string | undefined>(undefined);

  const getTenantSlug = (tenant: AuthUser['tenant']) => {
    if (!tenant) return undefined;
    return typeof tenant === 'string' ? tenant : tenant.slug || tenant.id;
  };

  useEffect(() => {
    if (user?.role === ROLES.TENANT && user?.tenant) {
      const tenantSlug = getTenantSlug(user.tenant);
      if (tenantSlug) {
        setSelectedTenant(tenantSlug);
      }
    }
  }, [user]);

  useEffect(() => {
    const fetchTenants = async () => {
      if (user?.role !== ROLES.SUPERADMIN) return;

      try {
        const res = await fetch('/api/tenants?limit=200');
        const json = await res.json();
        const items =
          json?.docs || json?.entries || json?.rows || json?.data || json?.tenants || json;
        const mapped = (items || []).map(
          (t: TenantApiItem): TenantOption => ({
            id: t.id || t._id || t.slug || 'tenant',
            name: t.name || t.title || t.slug || 'Tenant',
            slug: t.slug || t.id || t._id,
          })
        );
        setTenants(mapped);
        setSelectedTenant((current) => current || mapped[0]?.slug || mapped[0]?.id);
      } catch (err) {
        console.error('Failed to load tenants', err);
      }
    };

    fetchTenants();
  }, [user]);

  useEffect(() => {
    if (!startDate || !endDate) return;
    setLoading(true);
    fetchAnalytics({ start: startDate, end: endDate }).finally(() => setLoading(false));
  }, [selectedTenant, startDate, endDate]);

  const handleFetchAnalytics = (range: AnalyticsRange) => {
    setLoading(true);
    fetchAnalytics(range).finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div style={{ padding: 20, textAlign: 'center', color: '#666' }}>Loading Analytics...</div>
    );
  }

  const formatDate = (d: string) => {
    if (!d) return '';
    const month = d.substring(4, 6);
    const day = d.substring(6, 8);
    return `${day}/${month}`;
  };

  return (
    <div style={{ padding: 16, background: '#f6f6f9', minHeight: '100vh' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: '#f6f6f9',
          paddingBottom: 10,
          marginBottom: 16,
        }}
      >
        <div
          style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}
        >
          <div>
            <h1 style={{ fontSize: 26, marginBottom: 6, color: '#333' }}>
              <BarChart3 size={24} style={{ marginRight: 10 }} />
              Analytics
            </h1>
            <p style={{ color: '#666', margin: 0 }}>Overview of site analytics</p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center' }}>
            <AnalyticsDateRange
              onClick={handleFetchAnalytics}
              setStartDate={setStartDate}
              startDate={startDate}
              setEndDate={setEndDate}
              endDate={endDate}
            />

            {/* Tenant selector for super-admins; tenant users see their tenant label */}
            {user?.role === ROLES.SUPERADMIN && (
              <select
                value={selectedTenant}
                onChange={(e) => setSelectedTenant(e.target.value)}
                style={{
                  padding: '10px 10px',
                  borderRadius: 6,
                  border: '1px solid #ddd',
                  marginBottom: 15,
                }}
              >
                {tenants.map((t) => (
                  <option key={t.id} value={t.slug || t.id}>
                    {t.name || t.slug || t.id}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
        <Card>
          <Title>Total Visits</Title>
          <BigNumber>{totalVisits}</BigNumber>
        </Card>
        <Card>
          <Title>Traffic Sources</Title>
          <ChipWrap>
            {trafficSources?.map((e) => (
              <Chip key={e.source}>
                {String(e.source).toUpperCase()}: {e.sessions}
              </Chip>
            ))}
          </ChipWrap>
        </Card>
        <Card>
          <Title>Visits Types</Title>
          <ChipWrap>
            {usersTypes?.map((e) => (
              <Chip key={e.type}>
                {String(e.type || 'Unknown').toUpperCase()}: {e.users}
              </Chip>
            ))}
          </ChipWrap>
        </Card>
      </div>

      <div style={{ marginTop: 2, marginBottom: 10 }}>
        {sessionDuration && sessionDuration && engagedSessions && (
          <AnalyticsCards
            data={{
              avgSessionDuration: sessionDuration,
              engagementRate: engagementRate,
              engagedSessions: engagedSessions,
            }}
          />
        )}
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '20px',
        }}
      >
        {/* LEFT COLUMN */}
        <div
          style={{
            flex: '1 1 400px',
            minWidth: '320px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div
            style={{
              padding: 16,
              borderRadius: 12,
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              height: 280,
            }}
          >
            <ColumnChart
              title="Users Trends"
              data={usersTrends.map((e) => ({
                key: formatDate(e.date),
                value: e.users,
              }))}
            />
          </div>

          <div
            style={{
              padding: 16,
              borderRadius: 12,
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              height: 350,
            }}
          >
            <PieChart
              title="Users by Countries"
              data={userWithCountries.map((e) => ({
                key: e.country,
                value: e.users,
              }))}
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div
          style={{
            flex: '1 1 400px',
            minWidth: '320px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div
            style={{
              padding: 16,
              borderRadius: 12,
              height: 280,
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <DemographicCustomCard
              countries={countriesList}
              onCountrySelect={handleCountrySelect}
              selectedCountry={selectedCountry}
              cities={cities}
            />
          </div>

          <div
            style={{
              padding: 16,
              borderRadius: 12,
              height: 350,
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: 12,
                fontSize: 14,
                fontWeight: 'bold',
                color: '#555',
              }}
            >
              <MousePointerClick size={16} style={{ marginRight: 8 }} />
              Button Clicks
            </h3>

            <div style={{ overflowY: 'auto', flex: 1 }}>
              {buttonClicks.map((item, index) => {
                const maxClicks = Math.max(...buttonClicks.map((b) => b.clicks));
                const percentage = (item.clicks / maxClicks) * 100;

                return (
                  <div key={index} style={{ marginBottom: 14 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 4,
                        fontSize: 14,
                      }}
                    >
                      <p style={{ margin: 0, color: '#333' }}>{item.button || 'Unknown'}</p>
                      <p style={{ margin: 0, color: '#333' }}>{item.clicks}</p>
                    </div>

                    <div
                      style={{
                        height: 6,
                        background: '#eee',
                        borderRadius: 6,
                      }}
                    >
                      <div
                        style={{
                          width: `${percentage}%`,
                          height: '100%',
                          borderRadius: 6,
                          background: '#4945ff',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div>
        <TopPagesTable data={viewsByPages} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
