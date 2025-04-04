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
