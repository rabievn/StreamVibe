import { createSlice } from '@reduxjs/toolkit'

interface HomeState {
  loading: boolean
}

const initialState: HomeState = {
  loading: false,
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setLoading(state, action: { payload: boolean }) {
      state.loading = action.payload
    },
  },
})

export const { setLoading } = homeSlice.actions
export const homeReducer = homeSlice.reducer

