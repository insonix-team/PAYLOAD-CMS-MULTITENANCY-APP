'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Eye, Users, Globe, MousePointerClick, BarChart3, CalendarDays } from 'lucide-react';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const AnalyticsCards = ({ data }: { data: { avgSessionDuration: number; engagementRate: number; engagedSessions: number } }) => {
  const formatDuration = (seconds: number) => {
    if (!seconds) return '0s';
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return mins ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      <div style={cardStyle}>
        <p style={labelStyle}>Avg Session Duration</p>
        <h2 style={valueStyle}>{formatDuration(data.avgSessionDuration || 0)}</h2>
      </div>
      <div style={cardStyle}>
        <p style={labelStyle}>Engagement Rate</p>
        <h2 style={valueStyle}>{formatPercentage(data.engagementRate || 0)}</h2>
      </div>
      <div style={cardStyle}>
        <p style={labelStyle}>Engaged Sessions</p>
        <h2 style={valueStyle}>{data.engagedSessions || 0}</h2>
      </div>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  flex: '1 1 200px',
  background: '#fff',
  padding: 16,
  borderRadius: 10,
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  color: '#777',
  marginBottom: 6,
};

const valueStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 22,
  fontWeight: 700,
  color: '#333',
};

const ColumnChart = ({ title, data }: { title: string; data: { key: string; value: number }[] }) => {
  const categories = data.map((item) => item?.key);
  const seriesData = data.map((item) => item.value);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      fontFamily: 'inherit',
    },
    plotOptions: {
      bar: {
        columnWidth: '40%',
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
      labels: {
        style: {
          fontSize: '12px',
          colors: '#333', // Added explicit color
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          colors: '#333', // Added explicit color
        },
      },
    },
    grid: {
      strokeDashArray: 4,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} users`,
      },
    },
    colors: ['#4945ff'],
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '60%',
            },
          },
        },
      },
    ],
  };

  const series = [
    {
      name: 'Users',
      data: seriesData,
    },
  ];

  return (
    <div
      style={{
        background: '#fff',
        padding: 16,
        borderRadius: 10,
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
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
        <BarChart3 size={16} style={{ marginRight: 8 }} />
        {title}
      </h3>

      <Chart options={options} series={series} type="bar" height={220} />
    </div>
  );
};

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

  const handleFilter = () => {
    if (localStart && localEnd) {
      setStartDate(localStart);
      setEndDate(localEnd);
      onClick({ start: localStart, end: localEnd });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: '20px',
        background: '#fff',
        padding: '5px',
        borderRadius: '8px',
      }}
    >
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <CalendarDays
          size={18}
          color="#777"
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
        <input
          type="date"
          value={localStart}
          onChange={(e) => setLocalStart(e.target.value)}
          style={{
            padding: '8px 12px 8px 34px',
            borderRadius: '6px',
            border: '1px solid #ddd',
            color: '#333',
            background: '#fff',
            width: '150px',
          }}
        />
      </div>

      <span style={{ color: '#333' }}>to</span>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        <CalendarDays
          size={18}
          color="#777"
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
        <input
          type="date"
          value={localEnd}
          onChange={(e) => setLocalEnd(e.target.value)}
          style={{
            padding: '8px 12px 8px 34px',
            borderRadius: '6px',
            border: '1px solid #ddd',
            color: '#333',
            background: '#fff',
            width: '150px',
          }}
        />
      </div>

      <button
        onClick={handleFilter}
        style={{
          padding: '8px 16px',
          background: '#4945ff',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        Apply
      </button>
    </div>
  );
};

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
    <div
      style={{
        padding: 10,
        width: '100%',
        height: '100%',
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
        <Globe size={16} style={{ marginRight: 8 }} />
        User Demographics
      </h3>
      <div
        style={{
          display: 'flex',
          height: 'calc(100% - 40px)',
          border: '1px solid #e5e7eb',
          borderRadius: 10,
          overflow: 'hidden',
          background: '#fff',
        }}
      >
        {/* LEFT — Countries */}
        <div
          style={{
            width: '30%',
            borderRight: '1px solid #eee',
            padding: 10,
            overflowY: 'auto',
            background: '#fafafa',
          }}
        >
          <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Countries</h4>
          {sortedCountries.map(([country, count]) => (
            <div
              key={country}
              style={{
                padding: '8px 10px',
                marginBottom: 6,
                borderRadius: 6,
                cursor: 'pointer',
                background: '#7e7ce6',
                fontWeight: 'bold',
                color: '#fff',
              }}
            >
              <p style={{ display: 'flex', justifyContent: 'space-between', margin: 0 }}>
                <span>{country}</span>
                <span>{count}</span>
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT — Cities */}
        <div
          style={{
            width: '70%',
            padding: 10,
            overflowY: 'auto',
          }}
        >
          <h4 style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#333' }}>Cities</h4>
          {sortedCountries.map(([country, count]) => (
            <div
              key={country}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 10px',
                fontWeight: 'bold',
                borderBottom: '1px solid #f1f1f1',
              }}
            >
              <p style={{ margin: 0, color: '#333' }}>{country}</p>
              <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>{count}</p>
            </div>
          ))}
          {sortedCountries.length === 0 && <div style={{ color: '#999' }}>No Data</div>}
        </div>
      </div>
    </div>
  );
};

const PieChart = ({ title, data }: { title: string; data: { key: string; value: string | number }[] }) => {
  const labels = data.map((item) => item?.key);
  const series = data.map((item) => Number(item?.value || 0));

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'inherit',
    },
    labels,
    legend: {
      position: 'bottom',
      fontSize: '13px',
      labels: {
        colors: '#333', // Added explicit color
      },
    },
    dataLabels: {
      formatter: (val: number) => `${val.toFixed(0)}%`,
      style: {
        colors: ['#333'], // Added explicit color
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} users`,
      },
    },
    stroke: {
      width: 1,
    },
    colors: ['#4945ff', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6'],
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 260,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div
      style={{
        background: '#fff',
        padding: 16,
        borderRadius: 10,
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
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
        <Users size={16} style={{ marginRight: 8 }} />
        {title}
      </h3>

      <Chart options={options} series={series} type="donut" height={250} />
    </div>
  );
};

const TopPagesTable = ({
  data,
}: {
  data: {
    page: string;
    views: number;
    avgEngagementTime: number;
  }[];
}) => {
  const formatTime = (seconds: number) => {
    if (!seconds) return '0s';
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return mins ? `${mins}m ${secs}s` : `${secs}s`;
  };

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 10,
        padding: 16,
        width: '100%',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      <div
        style={{
          marginBottom: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 'bold',
            color: '#555',
          }}
        >
          <Eye size={16} style={{ marginRight: 8 }} />
          Top Pages
        </h3>
        <div style={{ fontSize: 12, color: '#888' }}>Records: {data.length}</div>
      </div>

      <div
        style={{
          border: '1px solid #eee',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontWeight: 600,
            fontSize: 13,
            background: '#fafafa',
            borderBottom: '1px solid #eee',
            padding: '10px 12px',
          }}
        >
          <div style={{ flex: 1, color: '#000' }}>Page</div>
          <div style={{ width: 100, textAlign: 'right', color: '#000' }}>Visits</div>
          <div style={{ width: 160, textAlign: 'right', color: '#000' }}>Avg Engagement Time</div>
        </div>

        <div
          style={{
            maxHeight: 300,
            overflowY: 'auto',
          }}
        >
          {data.length ? (
            data.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  padding: '8px 12px',
                  borderBottom: index < data.length - 1 ? '1px solid #f5f5f5' : 'none',
                  fontSize: 13,
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  title={item.page}
                >
                  <span style={{ color: '#4945ff', fontWeight: 500 }}>{item.page || '/'}</span>
                </div>
                <div
                  style={{
                    width: 100,
                    textAlign: 'right',
                    fontWeight: 600,
                    color: '#333',
                  }}
                >
                  {item.views}
                </div>
                <div
                  style={{
                    width: 160,
                    textAlign: 'right',
                    fontWeight: 600,
                    color: '#333',
                  }}
                >
                  {formatTime(item.avgEngagementTime)}
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                padding: 20,
                textAlign: 'center',
                color: '#999',
              }}
            >
              No Data
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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

const BigNumber = ({ children }: { children: React.ReactNode }) => <p style={{ fontWeight: 'bold', fontSize: 22, margin: 0, color: '#333' }}>{children}</p>;

const ChipWrap = ({ children }: { children: React.ReactNode }) => <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>{children}</div>;

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
            <h1 style={{ fontSize: 26, marginBottom: 6, color: '#333' }}>
              <BarChart3 size={24} style={{ marginRight: 10 }} />
              Analytics
            </h1>
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
              height: 280,
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
              padding: 16,
              borderRadius: 12,
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              height: 350,
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
              padding: 16,
              borderRadius: 12,
              height: 280,
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
