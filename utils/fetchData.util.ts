import { getENV } from '../config/env.config'
import { ENV } from '../enum'
import { METHOD } from '../type'

export const fetchData = async <T>(
  router: string,
  body: object = {},
  method: METHOD = 'GET',
  token: string | undefined = undefined
): Promise<T> => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token !== undefined && { Authorization: `Bearer ${token}` })
      },
      ...(method !== 'GET' && { body: JSON.stringify(body) })
    }

    const response = await fetch(
      `${getENV(ENV.EXPO_PUBLIC_API_URL)}${router}`,
      options
    )

    return (await response.json()) as T
  } catch (err) {
    throw new Error('Error en la petición')
  }
}
