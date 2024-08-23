import { useGetShopsQuery, selectShopById} from '../api/shopsSlice'
import { NavLink } from "react-router-dom"
import { useSelector } from 'react-redux'


const ShopExtended = ({shopId}) => {
const shop = useSelector((state) => selectShopById(state, Number(shopId)))

  return (
    <div className='rounded bg-orange-50 dark:bg-lime-50 text-sm'>
            <div className='font-black p-2'>{shop.title}</div>
            <div className='p-2'> {shop.adress} </div>
            <div className='p-2'>{'+38 555-55-55'}</div>
            <div className='p-2'><NavLink to={`${shopId}`}>{'See list of medicines  >>>'}</NavLink> </div>
    </div>
  )
}

export default ShopExtended