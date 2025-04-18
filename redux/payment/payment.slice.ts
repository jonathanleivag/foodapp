import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface PaymentState {
  uri: string
}

const initialState: PaymentState = {
  uri: ''
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentUri: (state, action: PayloadAction<string>) => {
      state.uri = action.payload
    }
  }
})

export const { setPaymentUri } = paymentSlice.actions

export default paymentSlice.reducer
