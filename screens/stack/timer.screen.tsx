import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { FC } from 'react'
import { View, Text, Pressable, FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Card } from '../../type'
import CardTimer from '../../components/screen/stack/timer/cardTimer.component'
import { useDataFetch } from '../../hooks/useDataFetch.hook'
import RenderItem from '../../components/screen/cart/components/card.screen.component'

const TimerScreen: FC = () => {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const [carts, loading] = useDataFetch<Card[]>(
    '/cart/completed/user',
    false,
    0,
    0,
    true,
    '',
    []
  )

  const handlerCart = (): void => {
    router.back()
  }

  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className='flex-1 bg-background-light'
    >
      <View
        style={{ height: insets.top + 90, backgroundColor: '#fff3e0' }}
        className='absolute w-full p-4 flex flex-row justify-start items-end gap-3'
      >
        <Pressable
          onPress={handlerCart}
          className='flex flex-row justify-end items-center'
        >
          <Ionicons name='arrow-back' size={40} color='#f57c00' />
        </Pressable>
        <Text
          style={{
            color: '#f57c00',
            fontWeight: '900',
            fontSize: 24,
            letterSpacing: 1,
            textTransform: 'uppercase'
          }}
          className='text-xl font-bold my-2'
        >
          Pedidos Activos
        </Text>
      </View>
      <View className='bg-white p-4 shadow-sm mt-28'>
        <Text className='text-secondary-800 text-2xl font-bold text-center'>
          Total de Pedidos: {carts.length}
        </Text>
      </View>
      <FlatList
        data={!loading ? carts.reverse() : []}
        renderItem={({ item, index }) => (
          <CardTimer cart={item} index={index + 1} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        className='flex-1 mt-10'
      />
    </View>
  )
}

export default TimerScreen
