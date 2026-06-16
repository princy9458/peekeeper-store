import { combineReducers } from '@reduxjs/toolkit';
import { blueprintReducer } from '../slices/blueprint';
import pagesReducer from '../slices/pages/pagesSlice';
import cartReducer from '../slices/ecommerce/cartSlice';
import wishlistReducer from '../slices/ecommerce/wishlistSlice';
import authReducer from '../slices/ecommerce/authSlice';

const rootReducer = combineReducers({
  blueprint: blueprintReducer,
  pages: pagesReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  auth: authReducer,
});

export default rootReducer;
