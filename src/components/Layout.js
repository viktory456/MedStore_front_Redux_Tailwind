import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
    return (
        <>
            <Header />
            <main className="bg-orange-100 dark:bg-neutral-200 h-screen pt-5 md:pt-20 text-center"><Outlet /></main>
        </>
    )
}

export default Layout