import { useRouter, useRootNavigationState } from 'expo-router'
import { FC, useEffect, useState } from 'react'
import { getKeychain } from '../utils/keychain.util'
import { SECURE_STORE_KEY } from '../enum'
import { ActivityIndicator, View } from 'react-native'
import { fetchData } from '../utils/fetchData.util'
import { Res } from '../type'

const Index: FC = () => {
  const router = useRouter()
  const rootNavigationState = useRootNavigationState()

  const [checkingAuth, setCheckingAuth] = useState(true)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const fetchToken = async (): Promise<void> => {
      try {
        const storedToken = await getKeychain(SECURE_STORE_KEY.AUTH)
        if (storedToken !== null) {
          if (storedToken.token !== undefined) {
            const data = await fetchData<Res>(
              `/auth/revalidate?token=${storedToken.token}`
            )
            if (data.message === undefined) {
              setToken(storedToken.token)
            } else {
              setToken(null)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching token:', error)
      } finally {
        setCheckingAuth(false)
      }
    }

    void fetchToken()
  }, [])

  useEffect(() => {
    if (
      checkingAuth ||
      rootNavigationState === null ||
      rootNavigationState === undefined
    ) {
      return
    }

    if (token === null) {
      router.replace('/login')
    } else {
      router.replace('/drawer/tabs/home')
    }
  }, [checkingAuth, token, rootNavigationState])

  if (
    checkingAuth ||
    rootNavigationState === null ||
    rootNavigationState === undefined
  ) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return null
}

export default Index
