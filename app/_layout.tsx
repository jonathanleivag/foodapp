import { Stack } from 'expo-router'
import { FC } from 'react'
import '../styles/global.css'

const Layout: FC = () => {
  return (
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
  )
}

export default Layout
