import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface CartState {
  value: number
}

const initialState: CartState = {
  value: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    amount: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount, amount } =
  cartSlice.actions

export const selectCount = (state: RootState): number => state.cart.value

export default cartSlice.reducer
