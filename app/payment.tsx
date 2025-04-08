import { FC } from 'react'
import { useAppSelector } from '../redux/hooks'
import WebView from 'react-native-webview'
import { View, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const Payment: FC = () => {
  const uri = useAppSelector((state) => state.payment.uri)
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const handlerCart = (): void => {
    router.replace('/')
  }

  return (
    <>
      <Pressable
        onPress={handlerCart}
        className='flex flex-row justify-end items-center'
        style={{ paddingTop: insets.top }}
      >
        <Ionicons name='close-circle' size={40} color='red' />
      </Pressable>
      <WebView
        source={{ uri }}
        userAgent='Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.94 Mobile Safari/537.36'
      />
    </>
  )
}

export default Payment
