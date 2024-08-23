import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import {apiSlice} from './api'

const cartAdapter = createEntityAdapter()
const initialState = cartAdapter.getInitialState()

export const cartApiSlice = apiSlice.injectEndpoints({
       endpoints: builder => ({
        getCart: builder.query({
            query: () => '/cart',
            transformResponse: responseData => {
                return cartAdapter.setAll(initialState, responseData.cart)
            },
            providesTags: (responseData) => responseData?.cart ? 
            [...responseData.cart.map(cartItem => ({type: 'Cart', id: cartItem.id})), { type: 'Cart', id: "LIST" }, { type: 'Cart', id: 'PARTIAL-CART'}] : 
            [{ type: 'Cart', id: "LIST" }, { type: 'Cart', id: 'PARTIAL-CART'}],
        }),
        addToCart: builder.mutation({
            query: itemToAdd => ({
                url: '/cart',
                method: 'POST',
                body: itemToAdd
            }),
            invalidatesTags: [
                { type: 'Cart', id: "LIST" }
            ]
        }),
        increaseQty: builder.mutation({
            query: initialItem => ({
                url: `/cart`,
                method: 'PUT',
                body: {
                    ...initialItem,
                    quantity: Number(initialItem.quantity) + 1
                }
            }),
            invalidatesTags: (result, error, body) => [
                { type: 'Cart', id: body.id }
            ]
        }),
        decreaseQty: builder.mutation({
            query: initialItem => ({
                url: `/cart`,
                method: 'PUT',
                body: {
                    ...initialItem,
                    quantity: Number(initialItem.quantity) - 1
                }
            }),
            invalidatesTags: (result, error, body) => [
                { type: 'Cart', id: body.id }
            ]
        }),
        deleteFromCart: builder.mutation({
            query: ({ id }) => ({
                url: `/cart`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags:  [
                { type: 'Cart', id: 'PARTIAL-CART'}
            ]
        }),
        addCustomer: builder.mutation({
            query: customerData => ({
                url: '/customer',
                method: 'POST',
                body: customerData
            }),
            // invalidatesTags: [
            //     { type: 'Customer', id: "LIST" }
            // ]
        }),
    })
})
export const {
    useGetCartQuery,
    useAddToCartMutation,
    useDeleteFromCartMutation,
    useIncreaseQtyMutation,
    useDecreaseQtyMutation, 
    useAddCustomerMutation
} = cartApiSlice

export const selectCartResult = cartApiSlice.endpoints.getCart.select()

const selectCartData = createSelector(
    selectCartResult,
    cartResult => cartResult.data 
)

export const {
    selectAll: selectAllCart,
    selectById: selectCartById,
    selectIds: selectCartIds
} = cartAdapter.getSelectors(state => selectCartData(state) ?? initialState)