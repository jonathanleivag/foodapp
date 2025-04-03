import { FC } from 'react'
import '../styles/global.css'
import { Stack } from 'expo-router'

const Layout: FC = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
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
