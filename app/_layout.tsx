import { FC, useEffect, useState } from 'react'
import '../styles/global.css'
import { Stack, useRouter } from 'expo-router'
import { getKeychain } from '../utils/keychain.util'
import { SECURE_STORE_KEY } from '../enum'
import { ActivityIndicator, View } from 'react-native'

const Layout: FC = () => {
  const router = useRouter()

  const [checkingAuth, setCheckingAuth] = useState<boolean>(true)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const fetchToken = async (): Promise<void> => {
      try {
        const storedToken = await getKeychain(SECURE_STORE_KEY.AUTH)
        if (storedToken !== null) {
          if (storedToken.token !== undefined) {
            setToken(storedToken.token)
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
    if (checkingAuth) return

    if (token === null) {
      router.replace('/login')
    } else {
      router.replace('/')
    }
  }, [checkingAuth, token])

  if (checkingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='login'
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='register'
        options={{
          headerShown: false
        }}
      />
    </Stack>
  )
}

export default Layout
