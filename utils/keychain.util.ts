import { SECURE_STORE_KEY } from '../enum'
import { Login } from '../type'
import * as SecureStore from 'expo-secure-store'

export const setKeychain = async (
  key: SECURE_STORE_KEY,
  data: Login
): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(data))
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      throw new Error(error.message)
    }
  }
}

export const getKeychain = async (
  key: SECURE_STORE_KEY
): Promise<Login | null> => {
  try {
    const credentials = await SecureStore.getItemAsync(key)
    if (credentials !== null) {
      return JSON.parse(credentials)
    }
    return null
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      throw new Error(error.message)
    }
    return null
  }
}
