import { FC } from 'react'
import { View, Text } from 'react-native'
import '../styles/global.css'
import LoginScreen from '../screens/auth/login.screen'

const Layout: FC = () => {
  return (
    <View className='h-screen'>
      <LoginScreen />
    </View>
  )
}

export default Layout
