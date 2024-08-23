import {createSelector, createEntityAdapter} from "@reduxjs/toolkit"
import {apiSlice} from '../api/api'

const shopsAdapter = createEntityAdapter({sortComparer: (a, b) => a.id.localeCompare(b.id)})

const initialState = shopsAdapter.getInitialState()

export const shopsApiSlice = apiSlice.injectEndpoints({
       endpoints: builder => ({
        getShops: builder.query({
            query: () => '/',

            transformResponse: (responseData, meta, arg) => {
                return shopsAdapter.setAll(initialState, responseData.shops)
            },
            providesTags: { type: 'Shop', id: "LIST" },
        }),
        // getShopsDetailed: builder.query({
        //     query: () => '/shops',
        //     transformResponse: responseData => {
        //         return shopsAdapter.setAll(initialState, responseData)
        //     },
        //     providesTags: { type: 'Shop', id: "LIST" },
        //     // providesTags: (result, error, arg) => [
        //     //     {type: 'Shops', id: "LIST"},
        //     //     ...result.ids.map(({ id }) => ({ type: 'Skills', id }))
        //     // ]
        // }),
        }),
    })

export const {
    useGetShopsQuery,
    // useGetShopsDetailedQuery,
    // useDeleteSkillMutation
} = shopsApiSlice

export const selectShopsResult = shopsApiSlice.endpoints.getShops.select()

const selectShopsData = createSelector(
    selectShopsResult,
    shopsResult => shopsResult.data 
)

export const {
    selectAll: selectAllShops,
    selectById: selectShopById,
    selectIds: selectShopIds
} = shopsAdapter.getSelectors(state => selectShopsData(state) ?? initialState)

