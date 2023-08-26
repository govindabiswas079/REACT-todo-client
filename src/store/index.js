import { configureStore } from '@reduxjs/toolkit'
import appSlice from './Reducers/appSlice'

export const store = configureStore({
    reducer: {
        appSlice: appSlice
    },
})