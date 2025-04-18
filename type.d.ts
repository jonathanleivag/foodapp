import { Dispatch, SetStateAction } from 'react'
export interface Res {
  statusCode?: number
  message?: string | string[]
  error?: string
}
export interface Register extends Res {
  name?: string
  email?: string
  role?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface RegisterFormik {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface Login extends Res {
  user?: User
  token?: string
}

export interface User {
  name?: string
  email?: string
  role?: string
  createdAt?: Date
  updatedAt?: Date
  id?: string
}

export interface LoginFormik {
  email: string
  password: string
}

export interface CardScreenComponentProps {
  id: string
  image: string
  category: string
  title: string
  description: string
  price: number
  calories: number
  ingredientsBase: string[]
  ingredientsExtra: ingredientsExtra[]
  ingredients: string[]
  orderDate: Date | null
}

export interface Product {
  name: string
  price: number
  description: string
  category: string
  imageUrl: string
  isAvailable: boolean
  ingredients: string[]
  baseIngredients: string[]
  extraIngredients: string[]
  preparationTime: number
  calories: number
  createdBy: CreatedBy
  createdAt: Date
  updatedAt: Date
  id: string
}

export interface CreatedBy {
  name: string
  email: string
  role: string
  id: string
}

export type useDataFetchResponse<T> = [T, boolean, string | null]

export interface Meta {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface Paginate {
  meta: Meta
}

export interface PaginateProduct extends Paginate {
  data: Product[]
}

export interface ingredientsExtra {
  name: string
  price: number
  _id: string
}

export interface ModalCardComponentProps {
  id: string
  modalVisible: boolean
  setModalVisible: Dispatch<SetStateAction<boolean>>
  image: string
  title: string
  price: number
  category: string
  calories: number
  description: string
  ingredientsBase: string[]
  ingredientsExtra: ingredientsExtra[]
  ingredients: string[]
}

export interface Card extends Res {
  user: string
  items: Item[]
  total: number
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date
  id: string
  remainingTime?: number
  orderDate: Date
  code: string
  retired: boolean
  isDelivered: boolean
}

export interface Item {
  product: Product
  quantity: number
  extra: number
  ingredients: string[]
  extraIngredients?: string[]
  price: number
  _id: string
}

export interface CartItem {
  user: string
  items: Item[]
  total: number
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date
  id: string
}

export interface RenderItemProps {
  item: Item
  cartId: string
  disable: boolean
  setDisable: Dispatch<SetStateAction<boolean>>
}

export interface Payment extends Res {
  init_point: string
}

export interface JSONWebTokenRevalidate extends Res {
  token: string
  user: User
}

export interface CardTimerProps {
  cart: Card
  index: number
}

export interface ItemTimerProps {
  item: Item
}

export interface CountdownTimerProps {
  targetDate: string
  minutesToAdd: number
  currentDate: string
  finished: boolean
}

export interface Timer {
  hours: string
  minutes: string
  seconds: string
  isFinished: boolean
}

export interface usePusherWebSocketProps {
  channelName: string
  eventName: string
  onMessage: (data: any) => void
}
