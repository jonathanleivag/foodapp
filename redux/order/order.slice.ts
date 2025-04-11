import { Card } from '../../type'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface OrderState {
  carts: Card[]
}

const initialState: OrderState = {
  carts: []
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    initial: (state, action: PayloadAction<Card[]>) => {
      state.carts = action.payload
    },
    addOrder: (state, action: PayloadAction<Card>) => {
      state.carts.push(action.payload)
    },
    removeOrder: (state, action: PayloadAction<Card>) => {
      state.carts = state.carts.filter((item) => item.id !== action.payload.id)
    },
    isDelivered: (state, action: PayloadAction<Card>) => {
      state.carts = state.carts.map((item) => {
        if (item.id === action.payload.id) {
          item.isDelivered = true
        }
        return item
      })
    }
  }
})

export const { initial, addOrder, removeOrder, isDelivered } =
  orderSlice.actions

export default orderSlice.reducer
