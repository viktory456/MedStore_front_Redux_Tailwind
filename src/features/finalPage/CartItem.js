import { useGetDrugsQuery} from '../api/medsSlice'
import {useAddToCartMutation, selectAllCart, selectCartById} from '../api/cartSlice'
import {Buffer} from "buffer" 
import { useState } from 'react'
import { useGetShopsQuery, selectShopById } from '../api/shopsSlice'
import { useGetCartQuery, useDeleteFromCartMutation, useIncreaseQtyMutation, useDecreaseQtyMutation } from '../api/cartSlice'
import { useSelector } from "react-redux"



const CartItem = ({cartItemId}) => {

  const cartItem = useSelector((state) => selectCartById(state, Number(cartItemId.id)))

  const [deleteItem] = useDeleteFromCartMutation()
  const [increaseItemQty] = useIncreaseQtyMutation()
  const [decreaseItemQty] = useDecreaseQtyMutation()

  const deleteItemClicked = async () => {
      try {
          await deleteItem({id: cartItem.id}).unwrap()
      } catch (err) {
          console.error('Failed to delete the item', err)
      }
    }
  const itemQtyChanged = async (e) => {
    try {
      if(e.target.innerText === '>') {
        await increaseItemQty(cartItem).unwrap()
      } else if(e.target.innerText === '<') {
        await decreaseItemQty(cartItem).unwrap()
      }
    } catch (err) {
        console.error('Failed to change qty', err)
    }
  }
  const shop = useSelector((state) => selectShopById(state, Number(cartItem?.shop)))
  const itemTotal = (cartItem?.price * cartItem?.quantity).toFixed(2)

  return (

    <tr key={cartItem.id} className='text-xs w-full leading-8'>
      <td>{cartItem.name}</td>
      <td className='invisible md:visible'>{cartItem.price}</td>
      <td className='flex flex-row justify-center'><div className='w-5 hover:font-black hover:cursor-pointer' onClick={itemQtyChanged}>{'<'}</div><div className='w-5'>{cartItem?.quantity}</div><div className='w-5 hover:font-black hover:cursor-pointer' onClick={itemQtyChanged}>{'>'}</div></td>
      <td>{shop?.title}</td>
      <td>{itemTotal}</td>
      <td><button className='px-2 rounded h-6 w-18 hover:cursor-pointer bg-red text-white text-xs' onClick={deleteItemClicked}>Remove</button></td>
    </tr>

  )
}

export default CartItem