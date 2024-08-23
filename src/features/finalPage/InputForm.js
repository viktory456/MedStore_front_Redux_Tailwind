import React, { useContext, useState, useEffect } from 'react'

export const InputForm = ({setName, setAdress, setPhone, setEmail, setCurrier}) => {
    let [nameLocal, setNameLocal] = useState('')
    let [emailLocal, setEmailLocal] = useState('')
    let [phoneLocal, setPhoneLocal] = useState('')
    let [adressLocal, setAdressLocal] = useState('')
    let [currierLocal, setCurrierLocal] = useState(false)

    const onNameChanged = e => {setNameLocal(e.target.value)}
    const onEmailChanged = e => {setEmailLocal(e.target.value)}
    const onPhoneChanged = e => {setPhoneLocal(e.target.value)}
    const onAdressChanged = e => {setAdressLocal(e.target.value)}
    const onCurrierChecked = e => {setCurrierLocal(e.target.checked)}
    useEffect(() => {
        setName(nameLocal)
        setEmail(emailLocal)
        setPhone(phoneLocal)
        setAdress(adressLocal)
        setCurrier(currierLocal)
    }, [nameLocal, emailLocal, phoneLocal, adressLocal, currierLocal])

  return (
     <form className=" text-zinc-800 h-3/5 w-full rounded bg-orange-50 dark:bg-lime-50 flex flex-col justify-center text-start text-xs p-4">
        <label htmlFor="name" className='p-3'>Name:</label>
        <input 
            type="text"
            id="name"
            name="name"
            value={nameLocal}
            onChange={onNameChanged}
            className="border-2 border-zinc-200 rounded h-6 m-2 mb-5 mt-0 outline-orange-200 focus:bg-orange-100 dark:outline-lime-200 dark:focus:bg-lime-100"
        />
        <label htmlFor="email" className='p-3'>Email:</label>
        <input
            type="text"
            id="email"
            name="email"
            value={emailLocal}
            onChange={onEmailChanged}
            className="border-2 border-zinc-200 rounded h-6 m-2 mb-5 mt-0 outline-orange-200 focus:bg-orange-100 dark:outline-lime-200 dark:focus:bg-lime-100"
        />
        <label htmlFor="phone" className='p-3'>Phone:</label>
        <input
            type="text"
            id="phone"
            name="phone"
            value={phoneLocal}
            onChange={onPhoneChanged}
            className="border-2 border-zinc-200 rounded h-6 m-2 mb-5 mt-0 outline-orange-200 focus:bg-orange-100 dark:outline-lime-200 dark:focus:bg-lime-100"
        />
        <label htmlFor="adress" className='p-3'>Adress:</label>
        <input
            type="text"
            id="adress"
            name="adress"
            value={adressLocal}
            onChange={onAdressChanged}
            className="border-2 border-zinc-200 rounded h-6 m-2 mb-5 mt-0 outline-orange-200 focus:bg-orange-100 dark:outline-lime-200 dark:focus:bg-lime-100"
        />
        <div className='flex flex-row justify-start align-baseline'>
            <label htmlFor="currier" className='p-3'>Currier delivery:</label>
            <input
                type="checkbox"
                id="currier"
                name="currier"
                checked={currierLocal}
                onChange={onCurrierChecked}
                className="border-2 border-zinc-200 m-2 accent-pink-500"
            />
        </div>
    </form>
  )
}
