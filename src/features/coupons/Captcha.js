import React from 'react'
import { useEffect, useState } from'react'

export const Captcha = ({setButtonStatus}) => {

let [keyText, setKeyText] = useState('');
let [captcha, setCaptcha] = useState('');
let [captchaCode, setCaptchaCode] = useState('');

useEffect(() => { Generate()}, [])
function Generate() {
    setCaptchaCode("")
    let uniquechar = "";
    const randomchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 1; i < 5; i++) {
        uniquechar += randomchar.charAt(Math.random() * randomchar.length)
    }
    setCaptcha(uniquechar)
}
const captchaChange = (e) => {
    setCaptchaCode(e.target.value)
}
function Printmsg() {
    const usr_input = captchaCode;
    if (usr_input == captcha) {
        setKeyText("Matched");
        setButtonStatus(false)
        Generate();
    }
    else {
        setKeyText("Not matched");
        Generate();
    }
}
  return (
    <div className="gap-1 md:gap-4 flex flex-row justify-end items-center">
        <div className="border-2 rounded p-2 font-semibold italic text-lg line-through select-none text-center" selectable="False">{captcha}</div>
        <input type="text" placeholder="Captcha code" value={captchaCode} onChange={captchaChange}className='rounded p-2 w-20 md:w-36 outline-orange-200 focus:bg-orange-100 text-center dark:outline-lime-200 dark:focus:bg-lime-100'/>
        <input type="submit" className='rounded p-2 hover:cursor-pointer bg-orange-300 dark:bg-lime-700/75  text-orange-50 text-sm' onClick={Printmsg}/>
        <p className="block p-2 text-center text-xs">{keyText}</p>
        {/* conditional color ???*/}
    </div>
  )
}
