import { Drawer } from 'expo-router/drawer'
import { FC } from 'react'
import { Dimensions } from 'react-native'

const DrawerLayout: FC = () => {
  return (
    <Drawer
      screenOptions={{
        headerTitle: 'FoodApp',
        headerStyle: {
          backgroundColor: '#fff3e0',
          height: 130,
          borderBottomWidth: 0
        },
        headerTintColor: '#f57c00',
        headerTitleStyle: {
          fontWeight: '900',
          fontSize: 24,
          letterSpacing: 1,
          textTransform: 'uppercase',
          color: '#f57c00'
        },
        drawerStyle: {
          width: 300,
          backgroundColor: '#fff3e0'
        },
        drawerActiveBackgroundColor: '#f57c00',
        drawerActiveTintColor: '#fff3e0',
        drawerInactiveTintColor: '#f57c00',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '600',
          marginLeft: -10
        }
      }}
    >
      <Drawer.Screen
        name='tabs'
        options={{
          drawerLabel: 'Inicio',
          title: ''
        }}
      />
      <Drawer.Screen
        name='about'
        options={{
          drawerLabel: 'Acerca de',
          title: ''
        }}
      />
      <Drawer.Screen
        name='config'
        options={{
          drawerLabel: 'Configuración',
          title: 'Cerrar sesión',
          drawerItemStyle: {
            marginTop: Dimensions.get('window').height - 260,
            borderTopWidth: 1,
            borderTopColor: '#ffcc80'
          }
        }}
      />
    </Drawer>
  )
}

export default DrawerLayout
