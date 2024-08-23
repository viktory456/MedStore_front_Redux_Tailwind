import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import {apiSlice} from './api'

const medsAdapter = createEntityAdapter({sortComparer: (a, b) => a.id.localeCompare(b.id)})
const priceSortedAdapter = createEntityAdapter({sortComparer: (a, b) => b.price.localeCompare(a.price)})
const initialState = medsAdapter.getInitialState()

export const medsApiSlice = apiSlice.injectEndpoints({
       endpoints: builder => ({
        getMeds: builder.query({
            query: () => '/',
            transformResponse: responseData => {
                return medsAdapter.setAll(initialState, responseData.meds)
            },
            // providesTags: (result) =>
            //     result
            //       ? [
            //           ...result.ids.map(({ id }) => ({ type: 'Med', id })),
            //           { type: 'Med', id: 'LIST' },
            //         ]
            //       : [{ type: 'Med', id: 'LIST' }],
        }),
        getMedsByPrice: builder.query({
            query: () => '/',
            transformResponse: responseData => {
                return priceSortedAdapter.setAll(priceSortedAdapter.getInitialState(), responseData.meds)
            },
            // providesTags: (result) =>
            //     result
            //       ? [
            //           ...result.ids.map(({ id }) => ({ type: 'Med', id })),
            //           { type: 'Med', id: 'LIST' },
            //         ]
            //       : [{ type: 'Med', id: 'LIST' }],
        }),
        //почитати про transformResponse, createEntityAdapter
        addFavorite: builder.mutation({
            query: (id , newFav) => ({
                url: `/favorite`,
                method: 'PUT',
                body: {id, newFav}
            }),
            // invalidatesTags: (result, error, id) => [
            //     { type: 'Med', id }
            // ]
            //how to make rerender after qty change??
        }),

    })
})
export const {
    useGetMedsQuery,
    useGetMedsByPriceQuery,
    useAddFavoriteMutation
} = medsApiSlice

export const selectMedsResult = medsApiSlice.endpoints.getMeds.select()

const selectMedsData = createSelector(
    selectMedsResult,
    medsResult => medsResult.data 
)

export const {
    selectAll: selectAllMeds,
    selectById: selectMedById,
    selectIds: selectMedIds
} = medsAdapter.getSelectors(state => selectMedsData(state) ?? initialState)


