import { useGetMedsShopsQuery, selectAllDtS} from '../api/medsToShopsSlice'
import { useSelector } from "react-redux"
import Med from './Med'


const MedsShops = ({shopId}) => {

  const medsShops = useSelector(selectAllDtS)
  const medsChosen = medsShops.filter(item =>item.shopId ===shopId);
  const meds = medsChosen?.map(id => <Med key={id.id} medId={id}/>);

  return (

    <div className='grid grid-cols-3 gap-5'>{meds}</div>

  )
}

export default MedsShops