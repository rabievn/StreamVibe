// src/app/store/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { languageReducer } from '../../shared/model/languageSlice'
import { persistReducer, persistStore } from 'redux-persist'

const rootReducer = combineReducers({
  language: languageReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['language'] // какие редьюсеры сохранять
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // иначе persist может вызывать warning
    })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
