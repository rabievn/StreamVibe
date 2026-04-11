import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'

import storage from 'redux-persist/lib/storage'

import { languageReducer } from '../../shared/model/languageSlice'

const rootReducer = combineReducers({
  language: languageReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['language']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
