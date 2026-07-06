'use client'

import { ThemeProvider } from '@/shared/lib/theme'

type ProvidersProps = {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return <ThemeProvider>{children}</ThemeProvider>
}
