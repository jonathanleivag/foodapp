import { FC } from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const AboutScreen: FC = () => {
  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='p-6'>
        <View className='items-center mb-8'>
          <Image
            source={require('../../assets/icon.png')}
            className='w-32 h-32 rounded-2xl mb-4'
          />
          <Text className='text-2xl font-bold text-secondary-800'>
            Food App
          </Text>
          <Text className='text-secondary-500 text-center mt-2'>
            Versión 1.0.0
          </Text>
        </View>

        <View className='mb-8'>
          <Text className='text-xl font-semibold text-secondary-800 mb-4'>
            Acerca de nosotros
          </Text>
          <Text className='text-secondary-600 leading-6'>
            Food App es tu compañero perfecto para ordenar comida deliciosa.
            Nuestra aplicación te permite explorar una amplia variedad de
            restaurantes y platos, personalizar tus pedidos y recibirlos en la
            comodidad de tu hogar.
          </Text>
        </View>

        <View className='mb-8'>
          <Text className='text-xl font-semibold text-secondary-800 mb-4'>
            Características
          </Text>
          <View className='space-y-4'>
            <View className='flex-row items-center'>
              <Ionicons name='restaurant-outline' size={24} color='#f57c00' />
              <Text className='text-secondary-600 ml-3'>
                Amplia variedad de restaurantes
              </Text>
            </View>
            <View className='flex-row items-center'>
              <Ionicons name='timer-outline' size={24} color='#f57c00' />
              <Text className='text-secondary-600 ml-3'>
                Entrega rápida y eficiente
              </Text>
            </View>
            <View className='flex-row items-center'>
              <Ionicons name='star-outline' size={24} color='#f57c00' />
              <Text className='text-secondary-600 ml-3'>
                Sistema de calificación y reseñas
              </Text>
            </View>
            <View className='flex-row items-center'>
              <Ionicons name='cart-outline' size={24} color='#f57c00' />
              <Text className='text-secondary-600 ml-3'>
                Pedidos personalizados
              </Text>
            </View>
          </View>
        </View>

        <View>
          <Text className='text-xl font-semibold text-secondary-800 mb-4'>
            Contacto
          </Text>
          <View className='space-y-4'>
            <View className='flex-row items-center'>
              <Ionicons name='mail-outline' size={24} color='#f57c00' />
              <Text className='text-secondary-600 ml-3'>
                soporte@foodapp.com
              </Text>
            </View>
            <View className='flex-row items-center'>
              <Ionicons name='call-outline' size={24} color='#f57c00' />
              <Text className='text-secondary-600 ml-3'>+1 234 567 890</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default AboutScreen
