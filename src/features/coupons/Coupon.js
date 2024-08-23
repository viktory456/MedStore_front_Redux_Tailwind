import React, { useState } from 'react'
import { useCopyCouponMutation, selectCouponById } from '../api/couponsSlice'
import { useSelector } from "react-redux"

export const Coupon = (couponId) => {

    const [buttonText, setButtonText] = useState('Copy')
    const couponSelected = useSelector((state) => selectCouponById(state, Number(couponId.couponId)))
    const [copy, { isLoading:isLoadingCopy }] = useCopyCouponMutation()

    const copyCoupon = (e) => {
        setButtonText(!buttonText)
        if(!isLoadingCopy){
            try {copy(couponSelected.id).unwrap()} 
            catch (err) {console.error('Failed to copy the coupon', err)}
        }
  }

  return (
    <li className='rounded bg-orange-50 dark:bg-lime-50 text-sm flex flex-col justify-center items-center p-4'>
        <div className='p-2 font-black text-orange-800'>{couponSelected.name}</div>
        <div className='p-2'>{couponSelected.code}</div>
        <button className='px-2 py-1 text-xs rounded hover:cursor-pointer bg-red-400 text-white' onClick={copyCoupon}>{couponSelected.copied ? 'Remove' : 'Copy'}</button>
    </li>
  )
}
