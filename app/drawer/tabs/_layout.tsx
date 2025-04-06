import { Tabs } from 'expo-router'
import { FC } from 'react'
import { Ionicons } from '@expo/vector-icons'

const TabsLayout: FC = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name='home'
        options={{
          title: 'inicio',
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={24}
                color={focused ? '#f57c00' : '#9e9e9e'}
              />
            )
          }
        }}
      />
      <Tabs.Screen
        name='cart'
        options={{
          title: 'Carrito',
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <Ionicons
                name={focused ? 'cart' : 'cart-outline'}
                size={24}
                color={focused ? '#f57c00' : '#9e9e9e'}
              />
            )
          }
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
