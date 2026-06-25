'use client';

import { Globe } from 'lucide-react';

type DemographicCustomCardProps = {
  countries: { country: string; users?: number }[];
  onCountrySelect: (country: string) => void;
  selectedCountry: string | null;
  cities: { city: string; users: number }[];
};

export const DemographicCustomCard = ({
  countries,
  onCountrySelect,
  selectedCountry,
  cities,
}: DemographicCustomCardProps) => {
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
          {countries.map((item) => (
            <div
              key={item.country}
              onClick={() => onCountrySelect(item.country)}
              style={{
                padding: '8px 10px',
                marginBottom: 6,
                borderRadius: 6,
                cursor: 'pointer',
                background: selectedCountry === item.country ? '#7e7ce6' : 'transparent',
                fontWeight: 'bold',
                color: selectedCountry === item.country ? '#fff' : '#333',
                transition: 'all 0.2s ease',
              }}
            >
              <p style={{ display: 'flex', justifyContent: 'space-between', margin: 0 }}>
                <span>{item.country}</span>
                <span style={{ fontWeight: 'normal' }}>{item.users || 0}</span>
              </p>
            </div>
          ))}
          {countries.length === 0 && <div style={{ color: '#999' }}>No Data</div>}
        </div>

        <div
          style={{
            width: '70%',
            padding: 10,
            overflowY: 'auto',
          }}
        >
          <h4 style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#333' }}>
            Cities {selectedCountry && `— ${selectedCountry}`}
          </h4>
          {cities.length > 0 ? (
            cities
              .filter((city) => city.city && city.city !== '')
              .map((city) => (
                <div
                  key={city.city}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    fontWeight: 'bold',
                    borderBottom: '1px solid #f1f1f1',
                  }}
                >
                  <p style={{ margin: 0, color: '#333' }}>{city.city}</p>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>{city.users}</p>
                </div>
              ))
          ) : (
            <div style={{ color: '#999', textAlign: 'center', marginTop: 20 }}>
              {selectedCountry ? 'No cities data available' : 'Select a country to view cities'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
