import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface HomeState {

}

const initialState: HomeState = {}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {}
})

export const { setFeaturedIds, setLoading } = homeSlice.actions
export const homeReducer = homeSlice.reducer

