import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import modalSlice from '../features/common/modalSlice'
import { apiSlice } from './apiSlice'
import { setupListeners } from '@reduxjs/toolkit/query'

const combinedReducer = { 
  header : headerSlice,
  modal : modalSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
}

const store = configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware,
      
      ),
})
setupListeners(store.dispatch);
export default store;