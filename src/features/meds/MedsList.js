import { useGetMedsShopsQuery, selectDtSById, selectAllDtS} from '../api/medsToShopsSlice'
import { useGetMedsQuery, useGetMedsByPriceQuery, selectAllMeds, selectAllMedsByPrice} from '../api/medsSlice'
import Med from "../meds/Med"
import { useMemo, useState, useEffect } from'react'
import { useSelector } from "react-redux"

export const MedsList = ({shop}) => {
  const [sortedList, setSortedList] = useState(false)
  const [selectedShop, setSelectedShop] = useState(shop)
  function comparePrices(a, b) {return a.price - b.price}
  let medsList;

  const meds = useSelector(selectAllMeds)
  const medsFav = meds.filter(med => med.favorite === true)
  const medsNonFav = meds.filter(med => med.favorite === false)
  const medsFavSorted = medsFav.sort(comparePrices)
  const medsNonFavSorted = medsNonFav.sort(comparePrices)

  const medsShops = useSelector(selectAllDtS)
  const medsChosen = useMemo(() => {
    let medsChosenList = []
    for(let i =0; i < meds.length; i++){
      if(meds[i].shop_id === shop){
        medsChosenList.push(meds[i])
      }
    }
    return medsChosenList
  }, [meds, medsShops, selectedShop])

  const medsChosenFav = medsChosen?.filter(med => med.favorite === true)
  const medsChosenNonFav = medsChosen?.filter(med => med.favorite === false)
  const medsChosenFavSorted = medsChosenFav.sort(comparePrices)
  const medsChosenNonFavSorted = medsChosenNonFav.sort(comparePrices)
  const sortedAllMeds = useMemo(() => {
    const copiedFavSortedMeds = medsFavSorted.slice()
    const copiedNonFavSortedMeds = medsNonFavSorted.slice()
    const sortedAllMeds = copiedFavSortedMeds.concat(copiedNonFavSortedMeds);
    return sortedAllMeds
  }, [meds])
  const sortedMedsChosen = useMemo(() => {
    const copiedChosenFavSortedMeds = medsChosenFavSorted.slice()
    const copiedChosenNonFavSortedMeds = medsChosenNonFavSorted.slice()
    const sortedMedsChosen = copiedChosenFavSortedMeds.concat(copiedChosenNonFavSortedMeds);
    return sortedMedsChosen
  }, [meds, medsShops, selectedShop])

  if(selectedShop === 'default'&&sortedList){
    medsList = sortedAllMeds.map(medId => <Med medId={medId} key={medId.id} />);
  }
  else if (selectedShop !== 'default'&&!sortedList) {
    medsList = medsChosen?.map(medId => <Med medId={medId} key={medId.id} />);
  } else if(selectedShop === 'default'&&!sortedList){
    medsList = meds?.map(medId => <Med medId={medId} key={medId.id} />);
  } else if (selectedShop !== 'default'&&sortedList) {
    medsList = sortedMedsChosen?.map(medId => <Med medId={medId} key={medId.id} />);
  }

  const sortByPrice = () => {setSortedList(true)}
  const resetSorting = () => {setSortedList(false)}
  // const selectAllShops = () => {setSelectedShop('default')}
  useEffect(()=>{ setSelectedShop(shop) }, [shop])

  return (
    <div className='relative'>
      <button className='md:fixed text-zinc-800 md:top-30 md:right-20 rounded bg-orange-300 dark:bg-red-900 text-xs dark:text-neutral-200 md:text-lg p-1 md:p-4 m-4 md:m-0' onClick={sortByPrice}>Sort by Price</button>
      <button className='md:fixed text-zinc-800 md:top-48 md:right-20 rounded bg-orange-300 dark:bg-red-900 text-xs dark:text-neutral-200 md:text-lg p-1 md:p-4 m-1 md:m-0' onClick={resetSorting}>Reset Sorting</button>
      <div className='fixed h-full w-full max-w-screen-xl overflow-y-scroll shrink grow pl-2 md:pl-56 grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-5 justify-around'>{medsList}</div>
      {/* <button className='' onClick={selectAllShops}>Select All Shops</button> */}
    </div>
    ) 
}  