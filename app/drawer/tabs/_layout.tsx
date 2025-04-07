import { Tabs } from 'expo-router'
import { FC } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { View, Text } from 'react-native'

const TabsLayout: FC = () => {
  const cartItemsCount = 3

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
              <View>
                <Ionicons
                  name={focused ? 'cart' : 'cart-outline'}
                  size={24}
                  color={focused ? '#f57c00' : '#9e9e9e'}
                />
                {cartItemsCount > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      top: -8,
                      right: -10,
                      backgroundColor: '#f57c00',
                      borderRadius: 10,
                      minWidth: 20,
                      height: 20,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 12 }}>
                      {cartItemsCount}
                    </Text>
                  </View>
                )}
              </View>
            )
          }
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
