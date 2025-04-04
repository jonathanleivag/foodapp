import { getENV } from '../config/env.config'
import { ENV } from '../enum'
import { METHOD } from '../type'

export const fetchData = async <T>(
  router: string,
  body: object,
  method: METHOD = 'GET'
): Promise<T> => {
  try {
    const response = await fetch(
      `${getENV(ENV.EXPO_PUBLIC_API_URL)}${router}`,
      {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    )

    return (await response.json()) as T
  } catch (err) {
    throw new Error('Error en la petición')
  }
}
