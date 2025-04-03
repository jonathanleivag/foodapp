import { router } from 'expo-router'
import { FC, useState, useEffect } from 'react'
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  Animated,
  Easing,
  Pressable
} from 'react-native'

const RegisterScreen: FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const fadeAnim = new Animated.Value(0)
  const slideAnim = new Animated.Value(-50)
  const formAnim = new Animated.Value(-30)

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true
      }),
      Animated.timing(formAnim, {
        toValue: 0,
        duration: 800,
        delay: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true
      })
    ]).start()
  }, [])

  const handleRegister = (): void => {
    console.log('Register attempt:', { name, email, password, confirmPassword })
  }

  const handleLogin = (): void => {
    router.push('/')
  }

  return (
    <SafeAreaView className='flex-1 bg-background-cream'>
      <View className='flex-1 px-8 justify-center bg-background-cream/95'>
        <Animated.View
          className='items-center mb-10'
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }}
        >
          <Text className='text-3xl font-bold text-primary-700'>FoodApp</Text>
          <Text className='text-secondary-500 mt-2'>
            Crea tu cuenta para continuar
          </Text>
        </Animated.View>

        <Animated.View
          className='space-y-4'
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: formAnim }]
          }}
        >
          <TextInput
            className='bg-background-light p-4 rounded-xl border border-secondary-200 my-3'
            placeholder='Nombre completo'
            value={name}
            onChangeText={setName}
            autoCapitalize='words'
            placeholderTextColor='#9e9e9e'
          />
          <TextInput
            className='bg-background-light p-4 rounded-xl border border-secondary-200 my-3'
            placeholder='Correo electrónico'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
            placeholderTextColor='#9e9e9e'
          />
          <TextInput
            className='bg-background-light p-4 rounded-xl border border-secondary-200 my-3'
            placeholder='Contraseña'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor='#9e9e9e'
          />
          <TextInput
            className='bg-background-light p-4 rounded-xl border border-secondary-200 my-3'
            placeholder='Confirmar contraseña'
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor='#9e9e9e'
          />
          <Pressable
            className='bg-primary-500 p-4 rounded-xl active:bg-primary-600 my-3'
            onPress={handleRegister}
          >
            <Text className='text-white text-center font-semibold text-lg'>
              Registrarse
            </Text>
          </Pressable>
        </Animated.View>

        <Animated.View
          className='flex-row justify-center mt-8'
          style={{ opacity: fadeAnim }}
        >
          <Text className='text-secondary-700'>¿Ya tienes una cuenta? </Text>
          <Pressable onPress={handleLogin}>
            <Text className='text-primary-600 font-semibold'>
              Iniciar sesión
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  )
}

export default RegisterScreen
