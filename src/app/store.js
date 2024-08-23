import { configureStore } from "@reduxjs/toolkit"
import {apiSlice} from '../features/api/api'
import { setupListeners } from '@reduxjs/toolkit/query/react'


export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,

    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware),
        devTools: true
})

setupListeners(store.dispatch)