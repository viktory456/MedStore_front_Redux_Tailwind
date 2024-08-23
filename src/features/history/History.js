import React, {useState, useEffect} from 'react'
import { selectAllOrders } from '../api/ordersSlice'
import { useSelector } from "react-redux"
import { SingleOrder } from '../history/SingleOrder'

export const History = () => {

  const orders = useSelector(selectAllOrders)
  let ordersList = orders.map(orderId => <SingleOrder orderId={orderId} key={orderId.id}/>)
  const customers = useSelector(selectAllOrders)
  let chosenCustomer = null;
  let [email, setEmail] = useState('')
  let [phone, setPhone] = useState('')
  const onEmailChanged = e => {setEmail(e.target.value)}
  const onPhoneChanged = e => {setPhone(e.target.value)}
  
  for (const customer of customers) {
    if (customer.customerEmail == email || customer.customerPhone == phone) {
      chosenCustomer = customer.id
      break
    }
  }
  
  return (
    <div className=' mx-6 md:mx-20 pt-10 text-zinc-800'>
      <form className='h-1/5 flex flex-col items-center'>
        <p className='p-6'>Type your email & phone number to pick your order </p>
        <label className='w-3/4 lg:w-1/4 mb-2 text-start text-xs' htmlFor="email">Email:</label>
        <input
            className='border-2 border-black-200 rounded w-3/4 lg:w-1/4 mb-2 outline-orange-200 focus:bg-orange-100 dark:outline-lime-200 dark:focus:bg-lime-100'
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={onEmailChanged}
        />
        <label className='w-3/4 lg:w-1/4 mb-2 text-start text-xs' htmlFor="phone">Phone:</label>
        <input
            className='border-2 border-black-200 rounded w-3/4 lg:w-1/4 mb-2 outline-orange-200 focus:bg-orange-100 dark:outline-lime-200 dark:focus:bg-lime-100'
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={onPhoneChanged}
        />
      </form>
      <ul className='rounded h-4/5 w-5/6 md:w-4/5 fixed overflow-y-scroll'>{ordersList[chosenCustomer] || ordersList}</ul>
    </div>

  )

}
