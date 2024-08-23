import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import { useGetShopsQuery, selectAllShops} from '../api/shopsSlice'
import { useGetMedsQuery, selectAllMeds} from '../api/medsSlice'
import ShopExtended from './ShopExtended';


const ShopsListExtended = () => {

    const shops = useSelector(selectAllShops)
    let contentShops;
    contentShops = shops.map(shopId => <ShopExtended key={shopId.id} shopId={shopId.id}/>)
    // const meds = useSelector(selectAllMeds)
         
    return(

        <ul className='pt-10 container mx-auto text-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-5 justify-around'> {contentShops} </ul>

    );
}

export default ShopsListExtended