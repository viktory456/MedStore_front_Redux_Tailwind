import { useGetMedsQuery, selectMedById, selectAllMeds} from '../api/medsSlice'
import {useAddToCartMutation, selectAllCart} from '../api/cartSlice'
import {Buffer} from "buffer" 
import { useState, useEffect } from 'react'
import { useGetShopsQuery, selectAllShops, selectShopById } from '../api/shopsSlice'
import { StarEmpty, StarSolid, Cart } from './Icons'
import {useAddFavoriteMutation} from '../api/medsSlice'
import { useSelector } from 'react-redux'

const Med = ({medId}) => {
    const [addFavorite, {isLoading:isLoadingAddFav}] = useAddFavoriteMutation()
    const meds = useSelector(selectAllMeds)
    const med = useSelector((state) => selectMedById(state, Number(medId.id)))
    const cart = useSelector(selectAllCart)
    let startingQty = 1;
    for(let i =0; i < cart.length; i++){
        if(cart[i].shop == med.shop_id && cart[i].name == med.name){
            startingQty = Number(cart[i].quantity)
        }
    }
    const [quantity, setQuantity] = useState(startingQty)
    const qtyDecrease = () => {
        if (quantity === 1) {
            return;
        }
        setQuantity(quantity - 1)
    }
    const qtyIncrease = () => setQuantity(quantity + 1)

    const shops = useSelector(selectAllShops)
    const shop = useSelector((state) => selectShopById(state, Number(med?.shop_id)))
    const [favorite, setFavorite] = useState(med?.favorite)
    const base64 = Buffer.from(med?.img.data, "binary" ).toString("base64");
    const idInCart = `${med?.id}${new Date().getTime()}`
    const [addToCart, { isLoading }] = useAddToCartMutation()

    const onAddItemClicked = async () => {
        if (!isLoading) {
            try {
                await addToCart({ id: idInCart, name: med?.name, shop: med?.shop_id, quantity: quantity, price: med?.price }).unwrap()
            } catch (err) {
                console.error('Failed to add the item', err)
            }
        }
    }
    const toggleFav = () => {
        if(!isLoadingAddFav){
            addFavorite(Number(medId.id)).unwrap()
        }
    }

  return (
    <article className='bg-orange-50 dark:bg-lime-50 rounded p-4 relative text-zinc-800 flex flex-row'>
        <div className='absolute right-4 hover:cursor-pointer' onClick={toggleFav}>{favorite ? <StarSolid /> : <StarEmpty />}</div>
        <img className='h-36 block justify-self-center self-center' src={`data:image/png;base64,${base64}`}/>
        <div className='flex flex-col justify-between w-full'>
            <div className='text-sm text-left pl-4 text-zinc-800'>
                <div className='flex flex-row justify-between w-3/4'><div>Title:</div> <div>{med.name}</div></div>
                <div className='flex flex-row justify-between w-3/4'><div>Price (uah):</div><div>{med.price}</div></div>
                <div className='flex flex-row justify-between w-3/4'><div>Shop:</div><div>{shop?.title}</div></div>
            </div>
            <div className='flex flex-row justify-end gap-6'>
                <div className='flex flex-row justify-between justify-items-center items-center bg-green-100 rounded hover:cursor-pointer grow-0 text-xs'>
                    <button className='px-2 py-1 block hover:font-black hover:cursor-pointer' onClick={qtyDecrease}>{'-'}</button>
                    <div>{quantity}</div>
                    <button className='px-2 py-1 block hover:font-black hover:cursor-pointer' onClick={qtyIncrease}>{'+'}</button>
                </div>
                <button className='text-xs px-2 rounded h-8 w-28 hover:cursor-pointer bg-red dark:bg-lime-700/75 text-white' type="button" onClick={onAddItemClicked}><div className='flex flex-row justify-center items-center gap-1'>{<Cart/>}{'Add to Cart'}</div></button>
            </div>
        </div>
    </article>
  )
}

export default Med