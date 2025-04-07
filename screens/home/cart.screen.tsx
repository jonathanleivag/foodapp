import { FC } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import RenderItem from '../../components/screen/cart/components/card.screen.component'
import { useDataFetch } from '../../hooks/useDataFetch.hook'
import { CartItem } from '../../type'
import { useAppSelector } from '../../redux/hooks'
import EmptyCart from '../../components/screen/cart/components/emptyCart.screen.component'

const CartScreen: FC = () => {
  const cartItemsCount = useAppSelector((state) => state.cart.value)

  const [data, loading] = useDataFetch<CartItem>(
    '/cart/active',
    false,
    0,
    0,
    true,
    cartItemsCount
  )

  return (
    <View className='flex-1 bg-background-light'>
      <View className='bg-white p-4 shadow-sm'>
        <Text className='text-secondary-800 text-2xl font-bold text-center'>
          Mi Carrito
        </Text>
      </View>
      {!loading && (
        <FlatList
          data={cartItemsCount > 0 ? data.items : []}
          renderItem={({ item }) => <RenderItem item={item} cartId={data.id} />}
          keyExtractor={(item, index) => `${index}-${item._id}`}
          ListEmptyComponent={EmptyCart}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}

      {!loading && cartItemsCount > 0 && data.total !== undefined && (
        <View className='bg-white p-4 shadow-lg'>
          <View className='flex-row justify-between items-center mb-4'>
            <Text className='text-secondary-600 text-lg'>Total:</Text>
            <Text className='text-primary-700 text-xl font-bold'>
              ${data.total}
            </Text>
          </View>
          <TouchableOpacity className='bg-primary-700 p-4 rounded-xl'>
            <Text className='text-white text-center text-lg font-semibold'>
              Proceder al pago
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default CartScreen
