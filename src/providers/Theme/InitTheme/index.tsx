'use client'

import { useEffect } from 'react'
import { defaultTheme, themeLocalStorageKey } from '../ThemeSelector/types'

export const InitTheme = () => {
  useEffect(() => {
    function getImplicitPreference() {
      const mql = window.matchMedia('(prefers-color-scheme: dark)')
      return mql.matches ? 'dark' : 'light'
    }

    function themeIsValid(theme: string | null) {
      return theme === 'light' || theme === 'dark'
    }

    let themeToSet = defaultTheme
    const preference = window.localStorage.getItem(themeLocalStorageKey)

    if (themeIsValid(preference)) {
      themeToSet = preference!
    } else {
      themeToSet = getImplicitPreference()
    }

    document.documentElement.setAttribute('data-theme', themeToSet)
  }, [])

  return null
}
