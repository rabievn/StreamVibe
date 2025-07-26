import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface languageState {
  currentLanguage: 'en' | 'ru';
}

const initialState: languageState = {
  currentLanguage: 'en'
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'en' | 'ru'>) => {
      state.currentLanguage = action.payload
    }
  }
})

export const { setLanguage } = languageSlice.actions
export const languageReducer = languageSlice.reducer

