import type { ENV } from '../enum'

export const getENV = (env: ENV): string => {
  const key: string | undefined | null = process.env[env]
  if (key === undefined || key === null || key === '') {
    throw new Error(`Environment variable ${env} is not defined`)
  }
  return key
}
