'use client';

import { Eye } from 'lucide-react';

type TopPagesTableProps = {
  data: {
    page: string;
    views: number;
    avgEngagementTime: number;
  }[];
};

export const TopPagesTable = ({ data }: TopPagesTableProps) => {
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
