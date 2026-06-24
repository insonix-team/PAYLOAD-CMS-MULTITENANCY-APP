'use client';

import { useEffect, useState } from 'react';

// ============================================
// ANALYTICS CARDS COMPONENT
// ============================================
const AnalyticsCards = ({ data }: { data: { avgSessionDuration: number; engagementRate: number; engagedSessions: number } }) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      <Card>
        <Title>Avg. Session Duration</Title>
        <BigNumber>{formatDuration(data.avgSessionDuration)}</BigNumber>
      </Card>
      <Card>
        <Title>Engagement Rate</Title>
        <BigNumber>{(data.engagementRate * 100).toFixed(1)}%</BigNumber>
      </Card>
      <Card>
        <Title>Engaged Sessions</Title>
        <BigNumber>{data.engagedSessions}</BigNumber>
      </Card>
    </div>
  );
};

// ============================================
// COLUMN CHART COMPONENT
// ============================================
const ColumnChart = ({ title, data }: { title: string; data: { key: string; value: number }[] }) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div>
      <h3 style={{ margin: '0 0 16px 0', fontSize: 14, fontWeight: 'bold', color: '#555' }}>{title}</h3>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 150 }}>
        {data.map((item, index) => {
          const height = (item.value / maxValue) * 130;
          return (
            <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: '100%',
                  height: Math.max(height, 4),
                  background: '#3b82f6',
                  borderRadius: 4,
                  transition: 'height 0.3s ease',
                  minHeight: 4,
                }}
              />
              <span style={{ fontSize: 10, marginTop: 6, color: '#666' }}>{item.key}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================
// DATE RANGE COMPONENT
// ============================================
const DateRange = ({
  onClick,
  setStartDate,
  startDate,
  setEndDate,
  endDate,
}: {
  onClick: (range: { start: string; end: string }) => void;
  setStartDate: (date: string) => void;
  startDate: string;
  setEndDate: (date: string) => void;
  endDate: string;
}) => {
  const [localStart, setLocalStart] = useState(startDate);
  const [localEnd, setLocalEnd] = useState(endDate);

  useEffect(() => {
    setLocalStart(startDate);
  }, [startDate]);

  useEffect(() => {
    setLocalEnd(endDate);
  }, [endDate]);

  const handleApply = () => {
    if (localStart && localEnd) {
      setStartDate(localStart);
      setEndDate(localEnd);
      onClick({ start: localStart, end: localEnd });
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <label style={{ fontSize: 14, color: '#555' }}>From:</label>
        <input
          type="date"
          value={localStart}
          onChange={(e) => setLocalStart(e.target.value)}
          style={{
            padding: '6px 10px',
            borderRadius: 6,
            border: '1px solid #ddd',
            fontSize: 14,
            background: '#fff',
          }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <label style={{ fontSize: 14, color: '#555' }}>To:</label>
        <input
          type="date"
          value={localEnd}
          onChange={(e) => setLocalEnd(e.target.value)}
          style={{
            padding: '6px 10px',
            borderRadius: 6,
            border: '1px solid #ddd',
            fontSize: 14,
            background: '#fff',
          }}
        />
      </div>
      <button
        onClick={handleApply}
        style={{
          padding: '6px 16px',
          borderRadius: 6,
          background: '#3b82f6',
          color: '#fff',
          border: 'none',
          fontSize: 14,
          cursor: 'pointer',
        }}
      >
        Apply
      </button>
    </div>
  );
};

// ============================================
// DEMOGRAPHIC CUSTOM CARD COMPONENT
// ============================================
const DemographicCustomCard = ({ countries }: { countries: { country: string }[] }) => {
  const countryCounts: Record<string, number> = {};
  countries.forEach((item) => {
    const country = item.country || 'Unknown';
    countryCounts[country] = (countryCounts[country] || 0) + 1;
  });

  const sortedCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const maxCount = Math.max(...sortedCountries.map(([, count]) => count), 1);

  return (
    <div>
      <h3 style={{ margin: '0 0 16px 0', fontSize: 14, fontWeight: 'bold', color: '#555' }}>Top Countries</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {sortedCountries.map(([country, count], index) => {
          const percentage = (count / maxCount) * 100;
          return (
            <div key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span>{country}</span>
                <span style={{ color: '#666' }}>{count}</span>
              </div>
              <div style={{ height: 4, background: '#eee', borderRadius: 4, marginTop: 2 }}>
                <div
                  style={{
                    width: `${percentage}%`,
                    height: '100%',
                    borderRadius: 4,
                    background: '#3b82f6',
                  }}
                />
              </div>
            </div>
          );
        })}
        {sortedCountries.length === 0 && <p style={{ color: '#999', fontSize: 14, textAlign: 'center' }}>No data available</p>}
      </div>
    </div>
  );
};

// ============================================
// PIE CHART COMPONENT
// ============================================
const PieChart = ({ title, data }: { title: string; data: { key: string; value: number }[] }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const colors = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6'];

  const filteredData = data.filter((item) => item.value > 0);

  if (filteredData.length === 0) {
    return (
      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: 14, fontWeight: 'bold', color: '#555' }}>{title}</h3>
        <p style={{ color: '#999', textAlign: 'center' }}>No data available</p>
      </div>
    );
  }

  const generatePieSegments = () => {
    let currentAngle = 0;
    const segments: { path: string; color: string; label: string; percentage: number }[] = [];
    const radius = 80;
    const center = 100;

    filteredData.forEach((item, index) => {
      const percentage = item.value / total;
      const angle = percentage * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      const startRad = (startAngle - 90) * (Math.PI / 180);
      const endRad = (endAngle - 90) * (Math.PI / 180);

      const x1 = center + radius * Math.cos(startRad);
      const y1 = center + radius * Math.sin(startRad);
      const x2 = center + radius * Math.cos(endRad);
      const y2 = center + radius * Math.sin(endRad);

      const largeArc = angle > 180 ? 1 : 0;

      const pathData = `
        M ${center} ${center}
        L ${x1} ${y1}
        A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
        Z
      `;

      segments.push({
        path: pathData,
        color: colors[index % colors.length],
        label: item.key,
        percentage: percentage,
      });
    });

    return segments;
  };

  const segments = generatePieSegments();

  return (
    <div>
      <h3 style={{ margin: '0 0 16px 0', fontSize: 14, fontWeight: 'bold', color: '#555' }}>{title}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ width: 200, height: 200 }}>
          <svg viewBox="0 0 200 200">
            {segments.map((seg, index) => (
              <path key={index} d={seg.path} fill={seg.color} stroke="#fff" strokeWidth="1" />
            ))}
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {segments.map((seg, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
              <div style={{ width: 12, height: 12, borderRadius: 2, background: seg.color }} />
              <span>{seg.label}</span>
              <span style={{ color: '#666', marginLeft: 'auto' }}>{(seg.percentage * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// TOP PAGES TABLE COMPONENT
// ============================================
const TopPagesTable = ({
  data,
}: {
  data: {
    page: string;
    views: number;
    avgEngagementTime: number;
    avgEngagementTimeFormatted: string;
  }[];
}) => {
  const totalViews = data.reduce((sum, item) => sum + item.views, 0);

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 12,
        padding: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <h3 style={{ margin: '0 0 16px 0', fontSize: 14, fontWeight: 'bold', color: '#555' }}>Top Pages</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <th style={{ textAlign: 'left', padding: '10px 8px', color: '#666', fontWeight: 600 }}>Page</th>
              <th style={{ textAlign: 'right', padding: '10px 8px', color: '#666', fontWeight: 600 }}>Views</th>
              <th style={{ textAlign: 'right', padding: '10px 8px', color: '#666', fontWeight: 600 }}>% of Total</th>
              <th style={{ textAlign: 'right', padding: '10px 8px', color: '#666', fontWeight: 600 }}>Avg. Engagement</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const percentage = totalViews > 0 ? (item.views / totalViews) * 100 : 0;
              return (
                <tr key={index} style={{ borderBottom: index < data.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                  <td style={{ padding: '10px 8px' }}>{item.page}</td>
                  <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 600 }}>{item.views}</td>
                  <td style={{ padding: '10px 8px', textAlign: 'right', color: '#666' }}>{percentage.toFixed(1)}%</td>
                  <td style={{ padding: '10px 8px', textAlign: 'right', color: '#666' }}>{item.avgEngagementTimeFormatted || '0:00'}</td>
                </tr>
              );
            })}
            {data.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                  No page data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================
// STYLED COMPONENTS
// ============================================
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

const BigNumber = ({ children }: { children: React.ReactNode }) => <p style={{ fontWeight: 'bold', fontSize: 22, margin: 0 }}>{children}</p>;

const ChipWrap = ({ children }: { children: React.ReactNode }) => <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>{children}</div>;

const Chip = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      background: '#bcbcd3',
      padding: '6px 10px',
      borderRadius: 6,
      fontSize: 13,
      fontWeight: 600,
    }}
  >
    {children}
  </div>
);

// ============================================
// MAIN ANALYTICS PAGE
// ============================================
const AnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [totalVisits, setTotalVisits] = useState<number>(0);
  const [trafficSources, setTrafficSources] = useState<any>(null);
  const [usersTypes, setUsersTypes] = useState<any>(null);
  const [usersTrends, setUsersTrends] = useState<any>(null);
  const [userWithCountries, setUserWithCountries] = useState<any>(null);
  const [viewsByPages, setViewsByPages] = useState<any>(null);
  const [sessionDuration, setSessionDuration] = useState<number>(0);
  const [engagementRate, setEngagementRate] = useState<number>(0);
  const [engagedSessions, setEngagedSessions] = useState<number>(0);
  const [buttonClicks, setButtonClicks] = useState<{ button: string; clicks: number }[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

  // ============================================
  // FETCH FUNCTIONS - UPDATED FOR PAYLOAD
  // ============================================

  const getTotalVisits = async (range?: any) => {
    try {
      let url = '/api/analytics?endpoint=total-visits';
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

  const getTrafficSources = async (range?: any) => {
    try {
      let url = '/api/analytics?endpoint=traffic-sources';
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

  const getUsersTypes = async (range?: any) => {
    try {
      let url = '/api/analytics?endpoint=user-type';
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

  const getUsersTrends = async (range?: any) => {
    try {
      let url = '/api/analytics?endpoint=users-trend';
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

  const getUsersWithCountries = async (range?: any) => {
    try {
      let url = '/api/analytics?endpoint=countries';
      if (range?.start && range?.end) {
        url += `&startDate=${range.start}&endDate=${range.end}`;
      }
      const res = await fetch(url);
      const result = await res.json();
      setUserWithCountries(result?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const getViewsByPages = async (range?: any) => {
    try {
      let url = '/api/analytics?endpoint=top-pages';
      if (range?.start && range?.end) {
        url += `&startDate=${range.start}&endDate=${range.end}`;
      }
      const res = await fetch(url);
      const result = await res.json();
      setViewsByPages(result?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const getButtonsClicks = async (range?: any) => {
    try {
      let url = '/api/analytics?endpoint=button-clicks';
      if (range?.start && range?.end) {
        url += `&startDate=${range.start}&endDate=${range.end}`;
      }
      const res = await fetch(url);
      const result = await res.json();
      setButtonClicks(result?.data?.filter((e: { button: string }) => e.button !== '/') || []);
    } catch (err) {
      console.log(err);
    }
  };

  const getEngagments = async (range?: any) => {
    try {
      let url = '/api/analytics?endpoint=engagement';
      if (range?.start && range?.end) {
        url += `&startDate=${range.start}&endDate=${range.end}`;
      }
      const res = await fetch(url);
      const result = await res.json();
      const data = result?.data || {};
      setSessionDuration(data?.avgSessionDuration || 0);
      setEngagementRate(data?.engagementRate || 0);
      setEngagedSessions(data?.engagedSessions || 0);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAnalytics = async (range?: any) => {
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

  useEffect(() => {
    fetchAnalytics().finally(() => setLoading(false));
  }, []);

  const handleFetchAnalytics = (range: any) => {
    setLoading(true);
    fetchAnalytics(range).finally(() => setLoading(false));
  };

  if (loading) {
    return <div style={{ padding: 20, textAlign: 'center', color: '#666' }}>Loading Analytics...</div>;
  }

  const formatDate = (d: string) => {
    if (!d) return '';
    const year = d.substring(0, 4);
    const month = d.substring(4, 6);
    const day = d.substring(6, 8);
    return `${day}/${month}`;
  };

  // ============================================
  // UI - EXACTLY THE SAME AS STRAPI VERSION
  // ============================================

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
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 26, marginBottom: 6 }}>Analytics</h1>
            <p style={{ color: '#666', margin: 0 }}>Overview of site analytics</p>
          </div>
          <DateRange onClick={handleFetchAnalytics} setStartDate={setStartDate} startDate={startDate} setEndDate={setEndDate} endDate={endDate} />
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
            {trafficSources?.map((e: any) => (
              <Chip key={e.source}>
                {String(e.source).toUpperCase()}: {e.sessions}
              </Chip>
            ))}
          </ChipWrap>
        </Card>
        <Card>
          <Title>Visits Types</Title>
          <ChipWrap>
            {usersTypes?.map((e: any) => (
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
            }}
          >
            <ColumnChart
              title="Users Trends"
              data={usersTrends.map((e: any) => ({
                key: formatDate(e.date),
                value: e.users,
              }))}
            />
          </div>

          <div
            style={{
              padding: 6,
              borderRadius: 12,
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <PieChart
              title="Users by Countries"
              data={userWithCountries.map((e: any) => ({
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
              padding: 10,
              borderRadius: 12,
              height: 410,
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <DemographicCustomCard countries={userWithCountries?.filter((e: any) => e.country !== '').map((e: any) => ({ country: e.country }))} />
          </div>

          <div
            style={{
              padding: 16,
              borderRadius: 12,
              height: 390,
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
              Button Clicks
            </h3>

            <div style={{ overflowY: 'auto' }}>
              {buttonClicks.map((item: any, index: number) => {
                const maxClicks = Math.max(...buttonClicks.map((b: any) => b.clicks));
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
                      <p style={{ margin: 0 }}>{item.button || 'Unknown'}</p>
                      <p style={{ margin: 0 }}>{item.clicks}</p>
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
                          background: '#3b82f6',
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
