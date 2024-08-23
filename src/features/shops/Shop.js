import { useGetShopsQuery, selectShopById} from '../api/shopsSlice'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"


const Shop = ({shopId, setShop}) => {

const shop = useSelector((state) => selectShopById(state, Number(shopId.id)))

const onShopChanged = () => {setShop(shopId.id)}

  return (
    <Link to="/" className="focus:font-bold list-none px-2 md:px-5 my-1 md:my-3 hover:cursor-pointer inline-block rounded md:block bg-orange-50 dark:bg-red-400 md:bg-orange-100" onClick={onShopChanged}><li>{shop.title}</li></Link>
  )
}

export default Shop