import { combineReducers, configureStore } from '@reduxjs/toolkit';
import UserAPI from 'Services/UserAPI';
import AdvertisementAPI from 'Services/AdvertisementAPI';
import CategoriesAPI from 'Services/CategoriesAPI';
import BrandsAPI from 'Services/BrandsAPI';
import userReducer from './reducers/UserSlice';
import messagesReducer from './reducers/messagesSlice';
import inputsReducer from './reducers/inputsSlice';

const rootReducer = combineReducers({
  user: userReducer,
  messages: messagesReducer,
  inputs: inputsReducer,
  [UserAPI.reducerPath]: UserAPI.reducer,
  [AdvertisementAPI.reducerPath]: AdvertisementAPI.reducer,
  [CategoriesAPI.reducerPath]: CategoriesAPI.reducer,
  [BrandsAPI.reducerPath]: BrandsAPI.reducer,
});

const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    UserAPI.middleware,
    AdvertisementAPI.middleware,
    CategoriesAPI.middleware,
    BrandsAPI.middleware,
  ]),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default setupStore;
