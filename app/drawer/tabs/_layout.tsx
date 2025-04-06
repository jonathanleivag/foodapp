import { Tabs } from 'expo-router'
import { FC } from 'react'

const TabsLayout: FC = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name='home'
        options={{
          title: 'inicio',
          headerShown: false
        }}
      />
      <Tabs.Screen
        name='cart'
        options={{
          title: 'Carrito',
          headerShown: false
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
