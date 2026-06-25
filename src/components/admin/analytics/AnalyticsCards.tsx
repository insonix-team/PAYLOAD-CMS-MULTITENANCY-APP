'use client';

type AnalyticsCardsProps = {
  data: { avgSessionDuration: number; engagementRate: number; engagedSessions: number };
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

export const AnalyticsCards = ({ data }: AnalyticsCardsProps) => {
  const formatDuration = (seconds: number) => {
    if (!seconds) return '0s';
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return mins ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;

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
