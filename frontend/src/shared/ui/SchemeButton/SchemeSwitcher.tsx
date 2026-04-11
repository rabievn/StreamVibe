import {useTheme} from "../../../app/providers/ThemeProvider"

import {MoonIcon, SunIcon} from '../../../assets/icons'

import styles from './SchemeSwitcher.module.scss'

export const SchemeSwitcher = () => {
    const {setMode} = useTheme()

    return (
        <div className={`${styles.schemeButton}`}>
            <button onClick={() => setMode('light')}><SunIcon/></button>
            <button onClick={() => setMode('dark')}><MoonIcon/></button>
        </div>
    )
}

