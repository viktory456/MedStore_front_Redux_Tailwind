import { Link } from "react-router-dom"
import { Day, Night} from '../features/meds/Icons'
import { useEffect } from'react'



const Header = () => {

  useEffect(() => {
    var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      themeToggleLightIcon.classList.remove('hidden');
    } else {
      themeToggleDarkIcon.classList.remove('hidden');
    }

    var themeToggleBtn = document.getElementById('theme-toggle');

    themeToggleBtn.addEventListener('click', function() {

    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    } else {
     if (document.documentElement.classList.contains('dark')) {
         document.documentElement.classList.remove('dark');
         localStorage.setItem('color-theme', 'light');
     } else {
         document.documentElement.classList.add('dark');
         localStorage.setItem('color-theme', 'dark');
     }
    }
    });
  },[]);


  return (
     <header className=" bg-yellow-700 dark:bg-neutral-800 w-full p-1 md:p-5 lg:px-36 fixed top-0 left-0 text-xs md:text-xl"> 
       <ul className='flex justify-evenly sm:flex-wrap items-center container'>
        <Link to="/" className="focus:font-bold"><li>Home</li></Link>
        <div className="border-l-[1px] h-8"/>
        <Link to="/shops" className="focus:font-bold"><li>Shops</li></Link>
        <div className="border-l-[1px] h-8"/>
        <Link to="cart" className="focus:font-bold"><li>Shopping Cart</li></Link>
        <div className="border-l-[1px] h-8"/>
        <Link to="history" className="focus:font-bold"><li>History</li></Link>
        <div className="border-l-[1px] h-8"/>
        <Link to="coupons" className="focus:font-bold "><li>Coupons</li></Link>
        <button id="theme-toggle" type="button" className="text-orange-50 focus:outline-none text-sm p-2.5">
          <Night/>
          <Day/>
        </button>
      </ul>

    </header> 
  )
}



export default Header
