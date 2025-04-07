import { FC } from 'react'
import { View, Text, Pressable, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { SECURE_STORE_KEY } from '../../enum'
import { removeKeychain } from '../../utils/keychain.util'

const ConfigScreen: FC = () => {
  const router = useRouter()

  const logout = async (): Promise<void> => {
    await removeKeychain(SECURE_STORE_KEY.AUTH)
    router.replace('/login')
  }

  const handleLogout = async (): Promise<void> => {
    Alert.alert('Cerrar sesión', '¿Estás seguro que deseas cerrar sesión?', [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'Cerrar sesión',
        style: 'destructive',
        onPress: () => {
          void logout()
        }
      }
    ])
  }

  return (
    <View className='flex-1 bg-white p-6'>
      <Text className='text-xl font-semibold text-secondary-800 mb-6'>
        Configuración
      </Text>

      <Pressable
        onPress={() => {
          void handleLogout()
        }}
        className='flex-row items-center p-4 bg-red-50 rounded-xl'
      >
        <Ionicons name='log-out-outline' size={24} color='#FF5252' />
        <Text className='ml-3 text-red-600 font-medium'>Cerrar sesión</Text>
      </Pressable>
    </View>
  )
}

export default ConfigScreen
