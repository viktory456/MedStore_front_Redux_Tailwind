import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import { useGetShopsQuery, selectAllShops} from '../api/shopsSlice'
import Shop from './Shop';


const ShopsList = ({setShop}) => {
  // const { data: shops, isLoading, isError } = useGetShopsQuery()
  // const [selectedAll, setSelectedAll] = useState(true)
  const shops = useSelector(selectAllShops)
  const chooseAllShops = () => {setShop('default')}
  let contentShops = shops.map(shopId => <Shop setShop={setShop} key={shopId.id} shopId={shopId}/>)
         
    return(

        <div className='text-center shrink-0 grow-0 md:fixed z-50 text-zinc-800 dark:text-neutral-200'>
          <button className='focus:font-bold hover:cursor-pointer rounded bg-orange-300 dark:bg-red-900 text-xs md:text-lg p-1 md:p-4' onClick={chooseAllShops}>CHOOSE ALL:</button>
          <div>{contentShops}</div>
        </div>

    );
}

export default ShopsList






