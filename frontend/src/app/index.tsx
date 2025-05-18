import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App'
import './config/i18n'

const app = <App />
createRoot(document.getElementById('root')!).render(app)

