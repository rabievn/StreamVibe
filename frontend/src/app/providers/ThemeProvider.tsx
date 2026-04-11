import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
    mode: ThemeMode
    toggleMode: () => void
    setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_STORAGE_KEY = 'themeMode'

const getSavedTheme = (): ThemeMode | null => {
    const savedMode = localStorage.getItem(THEME_STORAGE_KEY)

    return savedMode === 'light' || savedMode === 'dark' ? savedMode : null
}

const getSystemTheme = (): ThemeMode => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const getInitialTheme = (): ThemeMode => {
    const savedTheme = getSavedTheme()
    return savedTheme ?? getSystemTheme()
}

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }

    return context
}

type ThemeProviderProps = {
    children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const [mode, setModeState] = useState<ThemeMode>(getInitialTheme)

    useEffect(() => {
        const html = document.documentElement

        html.classList.remove('light', 'dark')
        html.classList.add(mode)
    }, [mode])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleChange = (event: MediaQueryListEvent) => {
            const savedTheme = getSavedTheme()

            if (savedTheme) {
                return
            }

            setModeState(event.matches ? 'dark' : 'light')
        }

        mediaQuery.addEventListener('change', handleChange)

        return () => {
            mediaQuery.removeEventListener('change', handleChange)
        }
    }, [])

    const setMode = (newMode: ThemeMode) => {
        localStorage.setItem(THEME_STORAGE_KEY, newMode)
        setModeState(newMode)
    }

    const toggleMode = () => {
        setMode(mode === 'dark' ? 'light' : 'dark')
    }

    const value = useMemo(
        () => ({
            mode,
            toggleMode,
            setMode,
        }),
        [mode, toggleMode],
    )

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}