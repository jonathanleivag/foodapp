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
  Platform,
  Keyboard
} from 'react-native'
import { getENV } from '../../config/env.config'
import { ENV } from '../../enum'
import { Register, RegisterFormik } from '../../type'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Ionicons } from '@expo/vector-icons'

const RegisterScreen: FC = () => {
  const [initialValues] = useState<RegisterFormik>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  // const [error, setError] = useState<string | string[]>('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | string[]>('')

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

  const handleRegister = async (value: RegisterFormik): Promise<void> => {
    Keyboard.dismiss()
    try {
      const { name, email, password } = value

      const response = await fetch(
        `${getENV(ENV.EXPO_PUBLIC_API_URL)}/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      )

      const data = (await response.json()) as Register

      if (data.message !== undefined) {
        setError(data.message)
      } else {
        setError('')
        router.push('/')
      }
    } catch (err) {
      setError('Error al conectar con el servidor. Intente más tarde.')
    }
  }

  const handleLogin = (): void => {
    router.push('/')
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    email: Yup.string()
      .email('Email inválido')
      .required('El email es requerido'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('La contraseña es requerida'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
      .required('Confirmar contraseña es requerido')
  })

  return (
    <SafeAreaView className='flex-1 bg-background-cream'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
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
                  <View className='my-3'>
                    <TextInput
                      className={`bg-background-light p-4 rounded-xl border ${
                        touched.name !== undefined && errors.name !== undefined
                          ? 'border-accent-error'
                          : 'border-secondary-200'
                      }`}
                      placeholder='Nombre completo'
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      autoCapitalize='words'
                      placeholderTextColor='#9e9e9e'
                    />
                    {touched.name !== undefined &&
                      errors.name !== undefined && (
                        <Text className='text-accent-error text-sm px-1'>
                          {errors.name}
                        </Text>
                        // eslint-disable-next-line @typescript-eslint/indent
                      )}
                  </View>
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

                  <View className='my-3'>
                    <View className='relative'>
                      <TextInput
                        className={`bg-background-light p-4 rounded-xl border ${
                          touched.confirmPassword !== undefined &&
                          errors.confirmPassword !== undefined
                            ? 'border-accent-error'
                            : 'border-secondary-200'
                        }`}
                        placeholder='Confirmar contraseña'
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        placeholderTextColor='#9e9e9e'
                      />
                      <Pressable
                        className='absolute right-4 top-4'
                        onPress={
                          () => setShowConfirmPassword(!showConfirmPassword)
                          // eslint-disable-next-line react/jsx-curly-newline
                        }
                      >
                        <Ionicons
                          name={showConfirmPassword ? 'eye-off' : 'eye'}
                          size={24}
                          color='#9e9e9e'
                        />
                      </Pressable>
                    </View>
                    {touched.confirmPassword !== undefined &&
                      errors.confirmPassword !== undefined && (
                        <Text className='text-accent-error text-sm px-1'>
                          {errors.confirmPassword}
                        </Text>
                        // eslint-disable-next-line @typescript-eslint/indent
                      )}
                  </View>
                  <Pressable
                    className='bg-primary-500 p-4 rounded-xl active:bg-primary-600 my-3'
                    onPress={() => handleSubmit()}
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
                  <Text className='text-secondary-700'>
                    ¿Ya tienes una cuenta?{' '}
                  </Text>
                  <Pressable onPress={handleLogin}>
                    <Text className='text-primary-600 font-semibold'>
                      Iniciar sesión
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

export default RegisterScreen
