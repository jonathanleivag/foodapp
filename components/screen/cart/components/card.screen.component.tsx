import { Ionicons } from '@expo/vector-icons'
import { FC, useEffect, useState } from 'react'
import { Image, Text, View, Pressable, Alert } from 'react-native'
import { Card, RenderItemProps, Res } from '../../../../type'
import { fetchData } from '../../../../utils/fetchData.util'
import { getKeychain } from '../../../../utils/keychain.util'
import { SECURE_STORE_KEY } from '../../../../enum'
import { decrement, setTotal } from '../../../../redux/cart/cart.slice'
import { useAppDispatch } from '../../../../redux/hooks'
import { formatChileanPesos } from '../../../../utils/price.util'

const RenderItem: FC<RenderItemProps> = ({
  item,
  cartId,
  disable,
  setDisable
}) => {
  const [subTotal, setSubTotal] = useState<number>(
    item.price * item.quantity + item.extra
  )
  const [quantity, setQuantity] = useState<number>(0)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setQuantity(item.quantity)
    return () => {}
  }, [])

  const handlerAddAndRemove = async (add: boolean = true): Promise<void> => {
    try {
      setDisable(true)
      setQuantity((item) => (add ? item + 1 : item - 1))
      const data = await fetchData<Card>(
        `/cart/${cartId}`,
        {
          id: item._id,
          productId: item.product.id,
          quantity: add ? quantity + 1 : quantity - 1,
          ingredients: item.ingredients,
          extraIngredients: item.extraIngredients,
          extra: item.extra
        },
        'PATCH'
      )
      if (data.message === undefined) {
        setDisable(false)
        const itemData = data.items.find(
          (itemFind) => item._id === itemFind._id
        )
        if (itemData !== undefined) {
          setSubTotal(
            itemData.price * (add ? quantity + 1 : quantity - 1) +
              itemData.extra
          )
        }
        dispatch(setTotal(data.total))
      } else {
        setDisable(false)
        setQuantity((item) => (add ? item - 1 : item + 1))
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
        setDisable(false)
        setQuantity((item) => item - 1)
      }
    }
  }

  const handlerRemove = async (): Promise<void> => {
    try {
      const auth = await getKeychain(SECURE_STORE_KEY.AUTH)

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
          {formatChileanPesos(item.price)}
        </Text>
        {item.extra > 0 && (
          <Text className='text-sm text-primary-400'>
            +{formatChileanPesos(item.extra)} extras
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
          Subtotal: {formatChileanPesos(subTotal)}
        </Text>
        <View className='flex-row items-center mt-2'>
          <Pressable
            onPress={() => {
              void handlerAddAndRemove(false)
            }}
            disabled={disable || quantity <= 1}
            className={`w-8 h-8 rounded-lg items-center justify-center ${
              disable || quantity <= 1 ? 'bg-secondary-200' : 'bg-primary-50'
            }`}
          >
            <Ionicons
              name='remove'
              size={20}
              color={disable ? '#9e9e9e' : '#f57c00'}
            />
          </Pressable>
          <Text className='mx-4 text-secondary-700 font-semibold'>
            {quantity}
          </Text>
          <Pressable
            disabled={disable || quantity >= 10}
            onPress={() => {
              void handlerAddAndRemove()
            }}
            className={`w-8 h-8 rounded-lg items-center justify-center ${
              disable || quantity >= 10 ? 'bg-secondary-200' : 'bg-primary-50'
            }`}
          >
            <Ionicons
              name='add'
              size={20}
              color={disable || quantity >= 10 ? '#9e9e9e' : '#f57c00'}
            />
          </Pressable>
        </View>
      </View>
      <Pressable
        className='p-2'
        disabled={disable}
        onPress={() => {
          Alert.alert(
            'Eliminar producto',
            `¿Estás seguro que deseas eliminar ${item.product.name} del carrito?`,
            [
              {
                text: 'Cancelar',
                style: 'cancel'
              },
              {
                text: 'Eliminar',
                onPress: () => {
                  void handlerRemove()
                },
                style: 'destructive'
              }
            ]
          )
        }}
      >
        <Ionicons
          name='trash-outline'
          size={24}
          color={disable ? '#9e9e9e' : '#FF5252'}
        />
      </Pressable>
    </View>
  )
}

export default RenderItem
