import { Ionicons } from '@expo/vector-icons'
import { Drawer } from 'expo-router/drawer'
import { FC, useEffect, useRef, useState } from 'react'
import { Dimensions, View, Pressable, Platform, Text } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { useRouter } from 'expo-router'
import { usePusherWebSocket } from '../../hooks/usePusherWebSocket.hook'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import Constants from 'expo-constants'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addIsDelivered, initial } from '../../redux/order/order.slice'
import { useDataFetch } from '../../hooks/useDataFetch.hook'
import { Card } from '../../type'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
})

const schedulePushNotification = async (): Promise<void> => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🍽️ Your order is ready!',
      body: 'Your order is ready for pickup. Enjoy your meal!',
      data: { screen: '/timer' },
      sound: 'default'
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2
    }
  })
}

type Props = string | undefined

const registerForPushNotificationsAsync = async (): Promise<Props> => {
  let token

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('myNotificationChannel', {
      name: 'A channel is needed for the permissions prompt to appear',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    })
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId
      if (projectId !== undefined) {
        throw new Error('Project ID not found')
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId
        })
      ).data
      console.log(token)
    } catch (e) {
      if (e instanceof Error) {
        token = `${e.message}`
      }
    }
  } else {
    alert('Must use physical device for Push Notifications')
  }

  return token
}

const DrawerLayout: FC = () => {
  const router = useRouter()
  const [data, loading] = useDataFetch<Card[]>(
    '/cart/completed/user',
    false,
    0,
    0,
    true,
    '',
    []
  )
  const dispatchApp = useAppDispatch()
  const isDelivered = useAppSelector((state) => state.order.isDelivered)
  usePusherWebSocket({
    channelName: 'isDeliveredCart',
    eventName: 'delivered-cart',
    onMessage: (data) => {
      dispatchApp(addIsDelivered(data))
      void schedulePushNotification()
    }
  })

  const [, setExpoPushToken] = useState('')
  const [, setChannels] = useState<Notifications.NotificationChannel[]>([])
  const [, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  )
  const notificationListener = useRef<Notifications.EventSubscription>()
  const responseListener = useRef<Notifications.EventSubscription>()

  useEffect(() => {
    if (!loading) {
      dispatchApp(initial(data))
    }
    return () => {}
  }, [loading, dispatchApp, data])

  useEffect(() => {
    void registerForPushNotificationsAsync().then((token) => {
      if (token != null && token !== '') {
        setExpoPushToken(token)
      }
    })

    if (Platform.OS === 'android') {
      void Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      )
    }
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        router.push('/timer')
      })

    return () => {
      notificationListener.current != null &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        )
      responseListener.current != null &&
        Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

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
            <View className='relative'>
              <Ionicons
                name='time-sharp'
                size={30}
                color='#f97316'
                onPress={() => router.push('/timer')}
              />
              {isDelivered.length > 0 && (
                <View className='absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center'>
                  <Text className='text-white text-xs font-bold'>
                    {isDelivered.length}
                  </Text>
                </View>
              )}
            </View>
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
