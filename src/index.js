import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { shopsApiSlice } from './features/api/shopsSlice';
import { medsApiSlice } from './features/api/medsSlice';
import { cartApiSlice } from './features/api/cartSlice';
import {medsShopsApiSlice} from './features/api/medsToShopsSlice';
import { ordersApiSlice } from './features/api/ordersSlice';
import { couponsApiSlice } from './features/api/couponsSlice';
// import { ApiProvider } from '@reduxjs/toolkit/query/react';
// import { apiSlice } from './features/api/api';


store.dispatch(shopsApiSlice.endpoints.getShops.initiate())
store.dispatch(medsApiSlice.endpoints.getMeds.initiate())
store.dispatch(cartApiSlice.endpoints.getCart.initiate())
store.dispatch(medsShopsApiSlice.endpoints.getMedsShops.initiate())
store.dispatch(ordersApiSlice.endpoints.getOrders.initiate())
store.dispatch(couponsApiSlice.endpoints.getCoupons.initiate())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
{/* <ApiProvider api={apiSlice}> */}
      <Router>
        <Routes>
          <Route path="/*" element={<App/>} />
        </Routes>
      </Router>
      {/* </ApiProvider> */}
</Provider>
);


