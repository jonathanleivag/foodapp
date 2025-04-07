import { Ionicons } from '@expo/vector-icons'
import { FC } from 'react'
import { Image, Text, View, Pressable } from 'react-native'
import { RenderItemProps, Res } from '../../../../type'
import { fetchData } from '../../../../utils/fetchData.util'
import { getKeychain } from '../../../../utils/keychain.util'
import { SECURE_STORE_KEY } from '../../../../enum'
import { useDispatch } from 'react-redux'
import { decrement } from '../../../../redux/cart/cart.slice'

const RenderItem: FC<RenderItemProps> = ({ item, cartId }) => {
  const dispatch = useDispatch()

  const handlerRemove = async (): Promise<void> => {
    try {
      const auth = await getKeychain(SECURE_STORE_KEY.AUTH)
      console.log(`/cart/${cartId.toString()}/items/${item._id.toString()}`)

      const data = await fetchData<Res>(
        `/cart/${cartId.toString()}/items/${item._id.toString()}`,
        {},
        'DELETE',
        auth?.token
      )
      if (data.message === undefined) {
        dispatch(decrement())
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }
  return (
    <View className='flex-row p-4 bg-white mb-2 mx-4 mt-2 rounded-xl shadow'>
      <Image
        source={{ uri: item.product.imageUrl }}
        className='w-24 h-24 rounded-xl'
      />
      <View className='flex-1 ml-4'>
        <Text className='text-secondary-800 text-lg font-semibold'>
          {item.product.name}
        </Text>
        <Text className='text-primary-700 font-bold text-base'>
          ${item.price}
        </Text>
        {item.extra > 0 && (
          <Text className='text-sm text-primary-400'>
            +${item.extra} extras
          </Text>
        )}
        {item.ingredients !== undefined && item.ingredients.length > 0 && (
          <Text className='text-secondary-500 text-sm mt-1'>
            Ingredientes: {item.ingredients.join(', ')}
          </Text>
        )}
        {item.extraIngredients !== undefined &&
          item.extraIngredients.length > 0 && (
            <Text className='text-secondary-500 text-sm mt-1'>
              Extras: {item.extraIngredients.join(', ')}
            </Text>
            // eslint-disable-next-line @typescript-eslint/indent
          )}
        <Text className='text-secondary-600 text-sm mt-1'>
          Subtotal: ${item.price * item.quantity + item.extra}
        </Text>
        <View className='flex-row items-center mt-2'>
          <Pressable className='bg-primary-50 w-8 h-8 rounded-lg items-center justify-center'>
            <Ionicons name='remove' size={20} color='#f57c00' />
          </Pressable>
          <Text className='mx-4 text-secondary-700 font-semibold'>
            {item.quantity}
          </Text>
          <Pressable className='bg-primary-50 w-8 h-8 rounded-lg items-center justify-center'>
            <Ionicons name='add' size={20} color='#f57c00' />
          </Pressable>
        </View>
      </View>
      <Pressable
        className='p-2'
        onPress={() => {
          void handlerRemove()
        }}
      >
        <Ionicons name='trash-outline' size={24} color='#FF5252' />
      </Pressable>
    </View>
  )
}

export default RenderItem
