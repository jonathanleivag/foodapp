import { router } from 'expo-router'
import { FC, useState, useEffect, useRef } from 'react'
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  Animated,
  Easing,
  Pressable,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { Formik } from 'formik'
import { Login, LoginFormik } from '../../type'
import { Ionicons } from '@expo/vector-icons'
import { loginValidation } from '../../validation.schema'
import { fetchData } from '../../utils/fetchData.util'
import { setKeychain } from '../../utils/keychain.util'
import { SECURE_STORE_KEY } from '../../enum'

const LoginScreen: FC = () => {
  const [initialValues] = useState<LoginFormik>({
    email: '',
    password: ''
  })

  const [error, setError] = useState<string | string[]>('')
  const [showPassword, setShowPassword] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
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

  const handleLogin = async (event: LoginFormik): Promise<void> => {
    try {
      const { email, password } = event
      const data = await fetchData<Login>(
        '/auth/login',
        {
          email,
          password
        },
        'POST'
      )

      if (data.message !== undefined) {
        setError(data.message)
      } else {
        setError('')
        data.token !== undefined &&
          (await setKeychain(SECURE_STORE_KEY.AUTH, {
            token: data.token,
            user: data.user
          }))
      }
    } catch (error) {
      setError('Error al iniciar sesión')
    }
  }

  const handleRegister = (): void => {
    router.push('/register')
  }

  return (
    <SafeAreaView className='flex-1 bg-background-cream'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleLogin}
          validationSchema={loginValidation}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched
          }) => (
            <>
              {error !== '' && (
                <Animated.View
                  className='mx-8 mt-4 p-4 bg-accent-error/10 rounded-xl border border-accent-error'
                  style={{ opacity: fadeAnim }}
                >
                  <Text className='text-accent-error'>
                    {Array.isArray(error) ? error.join(', ') : error}
                  </Text>
                </Animated.View>
              )}
              <View className='flex-1 px-8 justify-center bg-background-cream/95'>
                <Animated.View
                  className='items-center mb-10'
                  style={{
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                  }}
                >
                  <Text className='text-3xl font-bold text-primary-700'>
                    FoodApp
                  </Text>
                  <Text className='text-secondary-500 mt-2'>
                    Iniciar sesión para continuar
                  </Text>
                </Animated.View>
                <Animated.View
                  className='space-y-4'
                  style={{
                    opacity: fadeAnim,
                    transform: [{ translateY: formAnim }]
                  }}
                >
                  <View className='my-3'>
                    <TextInput
                      className={`bg-background-light p-4 rounded-xl border ${
                        touched.password !== undefined &&
                        errors.password !== undefined
                          ? 'border-accent-error'
                          : 'border-secondary-200'
                      }`}
                      placeholder='Correo electrónico'
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      keyboardType='email-address'
                      autoCapitalize='none'
                      placeholderTextColor='#9e9e9e'
                    />
                    {touched.email !== undefined &&
                      errors.email !== undefined && (
                        <Text className='text-accent-error text-sm px-1'>
                          {errors.email}
                        </Text>
                        // eslint-disable-next-line @typescript-eslint/indent
                      )}
                  </View>
                  <View className='my-3'>
                    <View className='relative'>
                      <TextInput
                        className={`bg-background-light p-4 rounded-xl border ${
                          touched.password !== undefined &&
                          errors.password !== undefined
                            ? 'border-accent-error'
                            : 'border-secondary-200'
                        }`}
                        placeholder='Contraseña'
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={!showPassword}
                        placeholderTextColor='#9e9e9e'
                      />
                      <Pressable
                        className='absolute right-4 top-4'
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Ionicons
                          name={showPassword ? 'eye-off' : 'eye'}
                          size={24}
                          color='#9e9e9e'
                        />
                      </Pressable>
                    </View>
                    {touched.password !== undefined &&
                      errors.password !== undefined && (
                        <Text className='text-accent-error text-sm px-1'>
                          {errors.password}
                        </Text>
                        // eslint-disable-next-line @typescript-eslint/indent
                      )}
                  </View>
                  <Pressable
                    className='bg-primary-500 p-4 rounded-xl active:bg-primary-600 my-3'
                    onPress={() => {
                      handleSubmit()
                    }}
                  >
                    <Text className='text-white text-center font-semibold text-lg'>
                      Iniciar sesión
                    </Text>
                  </Pressable>
                </Animated.View>
                <Animated.View
                  className='flex-row justify-center mt-8'
                  style={{ opacity: fadeAnim }}
                >
                  <Text className='text-secondary-700'>
                    ¿No tienes una cuenta?{' '}
                  </Text>
                  <Pressable onPress={handleRegister}>
                    <Text className='text-primary-600 font-semibold'>
                      Inscribirse
                    </Text>
                  </Pressable>
                </Animated.View>
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen
