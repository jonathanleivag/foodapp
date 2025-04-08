import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart/cart.slice'
import paymentReducer from './payment/payment.slice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    payment: paymentReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
