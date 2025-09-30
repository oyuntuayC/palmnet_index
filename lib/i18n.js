"use client"
import React, { createContext, useContext } from 'react'

const I18nContext = createContext({ locale: 'zh', messages: {} })

export function I18nProvider({ locale = 'zh', messages = {}, children }) {
  return (
    <I18nContext.Provider value={{ locale, messages }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const { locale, messages } = useContext(I18nContext)
  const t = (key, fallback = '') => {
    const parts = key.split('.')
    let cur = messages
    for (const p of parts) {
      if (cur && typeof cur === 'object' && p in cur) cur = cur[p]
      else return fallback || key
    }
    return cur
  }
  return { t, locale, messages }
}
