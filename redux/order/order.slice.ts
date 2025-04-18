import { Card } from '../../type'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface OrderState {
  carts: Card[]
  isDelivered: Card[]
}

const initialState: OrderState = {
  carts: [],
  isDelivered: []
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    initial: (state, action: PayloadAction<Card[]>) => {
      state.carts = action.payload
      state.isDelivered = action.payload.filter((item) => item.isDelivered)
    },
    addOrder: (state, action: PayloadAction<Card>) => {
      state.carts.push(action.payload)
    },
    removeOrder: (state, action: PayloadAction<Card>) => {
      state.carts = state.carts.filter((item) => item.id !== action.payload.id)
    },
    addIsDelivered: (state, action: PayloadAction<Card>) => {
      state.isDelivered.push(action.payload)
    },
    removeIsDelivered: (state, action: PayloadAction<Card>) => {
      state.isDelivered = state.isDelivered.filter(
        (item) => item.id !== action.payload.id
      )
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

export const {
  initial,
  addOrder,
  removeOrder,
  isDelivered,
  addIsDelivered,
  removeIsDelivered
} = orderSlice.actions

export default orderSlice.reducer
