import ShopsList from "./features/shops/ShopsList";
import { MainPage } from "./features/mainPage/MainPage";
import Layout from "./components/Layout";
import { Routes, Route } from 'react-router-dom';
import ShopsListExtended from "./features/shops/ShopsListExtended";
import { ShopPage } from "./features/shops/ShopPage";
import { FinalPage } from "./features/finalPage/FinalPage";
import { History } from "./features/history/History";
import {CouponsList} from "./features/coupons/CouponsList";

function App() {

  return (

    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<MainPage />} />

        <Route path="cart">
          <Route index element={<FinalPage />} />
        </Route>

        <Route path="shops" >
          <Route index element={<ShopsListExtended/>}/>
          <Route path=":shopId" element={<ShopPage />} />
        </Route>

        <Route path="history">
          <Route index element={<History />} />
        </Route>

        <Route path="coupons">
          <Route index element={<CouponsList />} />
        </Route>

      </Route>
    </Routes>

  );
}

export default App;
