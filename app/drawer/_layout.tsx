import { Ionicons } from '@expo/vector-icons'
import { Drawer } from 'expo-router/drawer'
import { FC } from 'react'
import { Dimensions, View, Pressable } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { useRouter } from 'expo-router'

const DrawerLayout: FC = () => {
  const router = useRouter()

  return (
    <Drawer
      screenOptions={({ navigation }: { navigation: any }) => ({
        headerTitle: 'FoodApp',
        headerLeft: () => (
          <Pressable className='px-4' onPress={() => navigation.openDrawer()}>
            <FontAwesome5 name='hamburger' size={24} color='#f97316' />
          </Pressable>
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row', marginRight: 15 }}>
            <Ionicons
              name='time-sharp'
              size={30}
              color='#f97316'
              onPress={() => router.push('/timer')}
            />
          </View>
        ),
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
      })}
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
