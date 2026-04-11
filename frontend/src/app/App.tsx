import {Routing} from './router/Router'
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux'

import {persistor, store} from './store/store'

import {ThemeProvider} from "./providers/ThemeProvider";

import './App.scss'

function App() {
    return (
        <div className="App">
            <ThemeProvider>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Routing/>
                    </PersistGate>
                </Provider>
            </ThemeProvider>
        </div>
    )
}

export default App
