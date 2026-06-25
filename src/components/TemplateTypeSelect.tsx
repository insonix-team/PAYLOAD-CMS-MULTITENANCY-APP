'use client';

import { ChangeEvent } from 'react';
import { useField } from '@payloadcms/ui';

const TEMPLATE_TYPE_OPTIONS = [
  { label: 'Home', value: 'home' },
  { label: 'About', value: 'about' },
  { label: 'Contact', value: 'contact' },
  { label: 'Services', value: 'services' },
];

export const TemplateTypeSelect: React.FC = () => {
  const { value = '', setValue } = useField<string>({ path: 'templateType' });

  const homeTemplate = useField<string>({ path: 'homeTemplate' });
  const aboutTemplate = useField<string>({ path: 'aboutTemplate' });
  const contactTemplate = useField<string>({ path: 'contactTemplate' });
  const servicesTemplate = useField<string>({ path: 'servicesTemplate' });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;

    // Clear all template fields using their own setValue
    homeTemplate.setValue(null);
    aboutTemplate.setValue(null);
    contactTemplate.setValue(null);
    servicesTemplate.setValue(null);

    // Update templateType
    setValue(newValue);
  };

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
        Template Type
      </label>
      <select
        value={value as string}
        onChange={handleChange}
        required
        style={{
          width: '100%',
          padding: '0.75rem',
          borderRadius: '4px',
          border: '1px solid var(--theme-elevation-200)',
          backgroundColor: 'var(--theme-input-bg)',
          color: 'var(--theme-elevation-800)',
          fontSize: '1rem',
        }}
      >
        <option value="">Select Template Type</option>
        {TEMPLATE_TYPE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TemplateTypeSelect;
