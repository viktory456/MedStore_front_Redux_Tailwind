import React, {useEffect, useState} from 'react'
import { useGetCartQuery, selectAllCart } from '../api/cartSlice'
import { useCopyCouponMutation, selectCouponById, selectAllCoupons } from '../api/couponsSlice'
import CartItem from './CartItem'
import { useSelector } from "react-redux"
import { useAddOrderMutation } from '../api/ordersSlice'
import { Captcha } from '../coupons/Captcha'

export const ShoppingCart = ({setCartTotal, setCart, name, email, phone, adress, deliveryType, totalCost, order}) => {
  const [buttonStatus, setButtonStatus] = useState(true)
  const [addOrder, { isLoading:isLoadingAddOrder, isSuccess:isSuccessAddOrder }] = useAddOrderMutation()
  const coupons = useSelector(selectAllCoupons)
  let couponsSelected = [{name:'Coupons applied: (uah)'}];
  let couponsSum = 0;
  for (let i = 0; i < coupons.length; i++) {
    if(coupons[i].copied === true){
      couponsSum+=coupons[i].name;
      couponsSelected.push(coupons[i])
    }
  }
  const couponsSelectedDiv = couponsSelected.map(coupon => {
    return <div key={coupon.id}>{coupon.name}</div>
  })
  const cart = useSelector(selectAllCart)
  const contentCart = cart.map(cartItemId=> <CartItem key={cartItemId.id} cartItemId={cartItemId}/>)
  function total(){
    let temp = cart.map(function(item){
      return item.price*item.quantity
    })
    let sum = temp.reduce(function(prev, next){
      return prev+next
    }, 0)
    return sum
  }
  let totalCart = total(); 
  let totalCartWithCoupons = totalCart - Number(couponsSum);
  localStorage.setItem('cart', JSON.stringify(cart));

  useEffect(() => {
    setCartTotal(totalCart.toFixed(2));
    const cartToSave = JSON.stringify(cart)
    setCart(cartToSave)
  }, [totalCart, cart])

  const onSubmitClicked = async () => {
    if(!isLoadingAddOrder) {
      try {
        await addOrder({ name, email, phone, adress, deliveryType, totalCost, order}).unwrap()

      } catch (err) {
          console.error('Failed to summbit the purchase', err)
      }
    } else {
      console.log('not loading add order');
    }
  }

  return (
    <div className='rounded bg-orange-50 dark:bg-lime-50 w-full md:w-4/5 text-zinc-800 p-2 md:p-4'>

      <table className="table-auto w-full">
        <thead className='leading-10'>
          <tr>
            <th>Medicine</th>
            <th className='invisible md:visible'>Price</th>
            <th>Quantity</th>
            <th>Shop</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-dashed'>
        {contentCart}
        </tbody>
      </table>
      <div className='text-md text-end p-4'>{'Total: '}{totalCartWithCoupons.toFixed(2)}</div>
      <Captcha setButtonStatus={setButtonStatus}/>
      <div className='text-start text-sm p-4'>{couponsSelected.length > 0 ? couponsSelectedDiv : 'Selected Coupons: none'}</div>
      <button className="px-2 rounded h-10 w-22 hover:cursor-pointer bg-orange-900 disabled:bg-zinc-500 text-white float-end" onClick={onSubmitClicked} disabled={buttonStatus}>Confirm order</button>

    </div>
  )
}
