import { FC, useEffect, useState } from 'react'
import { View, Text, FlatList, Pressable } from 'react-native'
import RenderItem from '../../components/screen/cart/components/card.screen.component'
import { useDataFetch } from '../../hooks/useDataFetch.hook'
import { CartItem } from '../../type'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import EmptyCart from '../../components/screen/cart/components/emptyCart.screen.component'
import { setTotal } from '../../redux/cart/cart.slice'
import { formatChileanPesos } from '../../utils/price.util'

const CartScreen: FC = () => {
  const cartItemsCount = useAppSelector((state) => state.cart.value)
  const total = useAppSelector((state) => state.cart.total)
  const [disabled, setDisabled] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const [data, loading] = useDataFetch<CartItem>(
    '/cart/active',
    false,
    0,
    0,
    true,
    cartItemsCount
  )

  useEffect(() => {
    if (!loading) {
      dispatch(setTotal(data.total))
    }
    return () => {}
  }, [data, loading])

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
          renderItem={({ item }) => (
            <RenderItem
              item={item}
              cartId={data.id}
              disable={disabled}
              setDisable={setDisabled}
            />
          )}
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
              {formatChileanPesos(total)}
            </Text>
          </View>
          <Pressable
            disabled={disabled}
            className={`p-4 rounded-xl ${
              disabled ? 'bg-secondary-300' : 'bg-primary-700'
            }`}
          >
            <Text
              className={`text-center text-lg font-semibold ${
                disabled ? 'text-secondary-500' : 'text-white'
              }`}
            >
              Proceder al pago
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default CartScreen
