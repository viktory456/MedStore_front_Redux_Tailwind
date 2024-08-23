import React from 'react'
import { selectAllCoupons, useGetCouponsQuery, selectCouponById } from '../api/couponsSlice'
import { useSelector } from "react-redux"
import { Coupon } from './Coupon'

export const CouponsList = () => {
  
  const coupons = useSelector(selectAllCoupons)
  let couponsList = coupons.map(id => <Coupon key={id.id} couponId={id.id}/>)

  return (
  
      <ul className='container mx-auto pt-10 text-zinc-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-around'>{couponsList}</ul>

  )
}
