import './App.scss'
import { Routing } from './router/Router'
import { persistor, store } from './store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routing />
        </PersistGate>
      </Provider>
    </div>
  )
}

export default App
