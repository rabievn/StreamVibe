import {useTheme} from "../../../app/providers/ThemeProvider"

import {MoonIcon, SunIcon} from '../../../assets/icons'

import styles from './SchemeSwitcher.module.scss'

export const SchemeSwitcher = () => {
    const {setMode, mode} = useTheme()

    return (
        <div className={styles.schemeButton}>
            <button
                className={`${mode === 'light' ? styles.active : ''}`}
                onClick={() => setMode('light')}
            >
                <SunIcon/>
            </button>

            <button
                className={`${mode === 'dark' ? styles.active : ''}`}
                onClick={() => setMode('dark')}
            >
                <MoonIcon/>
            </button>
        </div>
    )
}