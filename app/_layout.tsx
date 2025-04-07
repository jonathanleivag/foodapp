import { Stack } from 'expo-router'
import { FC } from 'react'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import '../styles/global.css'

const Layout: FC = () => {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
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
    </Provider>
  )
}

export default Layout
