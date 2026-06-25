'use client';

import { CalendarDays } from 'lucide-react';
import { useEffect, useState } from 'react';

type AnalyticsDateRangeProps = {
  onClick: (range: { start: string; end: string }) => void;
  setStartDate: (date: string) => void;
  startDate: string;
  setEndDate: (date: string) => void;
  endDate: string;
};

export const AnalyticsDateRange = ({
  onClick,
  setStartDate,
  startDate,
  setEndDate,
  endDate,
}: AnalyticsDateRangeProps) => {
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
