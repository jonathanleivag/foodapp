import { FC } from 'react'
import { Text, View } from 'react-native'

const EmptyCart: FC = () => (
  <View className='flex-1 items-center justify-center'>
    <Text className='text-secondary-600 text-lg'>Tu carrito está vacío</Text>
  </View>
)

export default EmptyCart
