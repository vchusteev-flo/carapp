'use client'

import { createContext, ReactNode, useEffect, useState } from 'react';

// Define window augmentation
declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp
    }
  }
}

export interface TelegramWebApp {
  initDataUnsafe: {
    user?: {
      id: number
      first_name: string
      last_name?: string
      username?: string
    }
  }
  ready: () => void
  expand: () => void
}

export const TelegramContext = createContext<TelegramWebApp | null>(null)

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [telegramApp, setTelegramApp] = useState<TelegramWebApp | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Telegram' in window) {
      const app = window.Telegram.WebApp
      setTelegramApp(app)
      localStorage.setItem('telegramUser', JSON.stringify(app.initDataUnsafe.user))
    }
  }, [])

  return (
    <TelegramContext.Provider value={telegramApp}>
      {children}
    </TelegramContext.Provider>
  )
}
