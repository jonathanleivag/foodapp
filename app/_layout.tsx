import { FC } from 'react'
import { View, Text } from 'react-native'
import '../styles/global.css'

const Layout: FC = () => {
  return (
    <View className='h-screen w-full bg-green-500'>
      <Text className='text-red-400'>Hello World</Text>
    </View>
  )
}

export default Layout
