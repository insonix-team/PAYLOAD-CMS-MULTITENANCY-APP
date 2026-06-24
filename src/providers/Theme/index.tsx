'use client';

import React, { createContext, useCallback, use, useEffect, useState } from 'react';

import type { Theme, ThemeContextType } from './types';

import { defaultTheme, getImplicitPreference, themeLocalStorageKey } from './shared';
import { themeIsValid } from './types';
const canUseDOM = typeof window !== 'undefined' && typeof document !== 'undefined';
export default canUseDOM;
const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: undefined,
};

export interface TenantTheme {
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
}

const ThemeContext = createContext(initialContext);

export const ThemeProvider = ({ children, tenantTheme }: { children: React.ReactNode; tenantTheme?: TenantTheme | null }) => {
  const [theme, setThemeState] = useState<Theme | undefined>(canUseDOM ? (document.documentElement.getAttribute('data-theme') as Theme) : undefined);

  const applyTenantTheme = (tenantTheme?: TenantTheme | null) => {
    if (!canUseDOM) return;

    if (tenantTheme?.primaryColor) {
      document.documentElement.style.setProperty('--primary', tenantTheme.primaryColor);
    } else {
      document.documentElement.style.removeProperty('--primary');
    }

    if (tenantTheme?.secondaryColor) {
      document.documentElement.style.setProperty('--secondary', tenantTheme.secondaryColor);
    } else {
      document.documentElement.style.removeProperty('--secondary');
    }

    if (tenantTheme?.fontFamily) {
      document.documentElement.style.setProperty('--font-family', tenantTheme.fontFamily);
    } else {
      document.documentElement.style.removeProperty('--font-family');
    }
  };

  const setTheme = useCallback((themeToSet: Theme | null) => {
    if (themeToSet === null) {
      window.localStorage.removeItem(themeLocalStorageKey);
      const implicitPreference = getImplicitPreference();
      document.documentElement.setAttribute('data-theme', implicitPreference || '');
      if (implicitPreference) setThemeState(implicitPreference);
    } else {
      setThemeState(themeToSet);
      window.localStorage.setItem(themeLocalStorageKey, themeToSet);
      document.documentElement.setAttribute('data-theme', themeToSet);
    }
  }, []);

  useEffect(() => {
    let themeToSet: Theme = defaultTheme;
    const preference = window.localStorage.getItem(themeLocalStorageKey);

    if (themeIsValid(preference)) {
      themeToSet = preference;
    } else {
      const implicitPreference = getImplicitPreference();

      if (implicitPreference) {
        themeToSet = implicitPreference;
      }
    }

    document.documentElement.setAttribute('data-theme', themeToSet);
    setThemeState(themeToSet);
    applyTenantTheme(tenantTheme);
  }, [tenantTheme]);

  return <ThemeContext value={{ setTheme, theme }}>{children}</ThemeContext>;
};

export const useTheme = (): ThemeContextType => use(ThemeContext);
