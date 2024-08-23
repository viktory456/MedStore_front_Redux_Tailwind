import React from 'react'
import { selectOrderById } from '../api/ordersSlice'
import { useSelector } from "react-redux"

export const SingleOrder = ({orderId}) => {

    const order = useSelector((state) => selectOrderById(state, Number(orderId.id)))
    const orderArray = JSON.parse(order.order)
    let totalOrder = 0;
    for (let i = 0; i < orderArray.length; i++) {
        totalOrder += orderArray[i].price*orderArray[i].quantity
    }

const orderList = orderArray.map(item => {
    return (
        <div key={item.id} className='w-full flex flex-row justify-between p-2'>
            <div>{item.name}</div>
            <div>{item.quantity} pcs</div>
            <div>{item.price} uah</div>
        </div>
    )
})

    return (
        <li key={Number(orderId.id)} className='flex flex-row justify-between items-center bg-orange-50 dark:bg-lime-50 w-full border my-4 text-xs md:text-base'>
            <div className='border rounded w-10/12 divide-y divide-dashed'>{orderList}</div>
            <div className='w-2/12'>Total price: {totalOrder}</div>
        </li>
    )
}
