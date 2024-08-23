import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import {apiSlice} from './api'
import { useParams } from 'react-router-dom'

const medsShopsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.id.localeCompare(b.id)
})

const initialState = medsShopsAdapter.getInitialState()

export const medsShopsApiSlice = apiSlice.injectEndpoints({
       endpoints: builder => ({
        getMedsShops: builder.query({
            query: () => `/`, //to use SelectId???
            transformResponse: (responseData, meta, arg) => {
                // const medsToShop = responseData.medsShops.filter(item => Number(item.shopId == Number(arg)))
                // return medsShopsAdapter.setAll(initialState, medsToShop)
                return medsShopsAdapter.setAll(initialState, responseData.medsShops)
            },
            providesTags: { type: 'MedsShops', id: "LIST" },
            // providesTags: (result, error, arg) => [
            //     ...result.ids.map(id => ({ type: 'MedsToShops', id }))
            // ]
    }),
})
})
export const {
    useGetMedsShopsQuery
} = medsShopsApiSlice

export const selectDtSResult = medsShopsApiSlice.endpoints.getMedsShops.select()

const selectDtSData = createSelector(
    selectDtSResult,
    DtSResult => DtSResult.data 
)

export const {
    selectAll: selectAllDtS,
    selectById: selectDtSById,
    selectIds: selectDtSIds
} = medsShopsAdapter.getSelectors(state => selectDtSData(state) ?? initialState)