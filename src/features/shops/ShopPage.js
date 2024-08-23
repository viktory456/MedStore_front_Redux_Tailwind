import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGetShopsQuery, selectShopById } from '../api/shopsSlice'
import MedsShops from '../meds/MedsShops'
import { useSelector } from 'react-redux'

export const ShopPage = () => {

    const { shopId } = useParams()
    const shop = useSelector((state) => selectShopById(state, Number(shopId)))

    return (
      <div className='pt-10 text-zinc-800 text-left'>
        <div className='px-36'>{shop.title}</div>
        <div className='px-36'>{shop.adress}</div>
        <div className='pt-12 px-36'>
           <MedsShops shopId={shopId}/>
         </div>
      </div>
  )
}
