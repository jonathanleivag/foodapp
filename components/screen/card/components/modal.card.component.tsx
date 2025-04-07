import { FC, useEffect, useState } from 'react'
import { Image, Modal, Pressable, Text, View } from 'react-native'
import { Card, ModalCardComponentProps } from '../../../../type'
import { Ionicons } from '@expo/vector-icons'
import { fetchData } from '../../../../utils/fetchData.util'
import { getKeychain } from '../../../../utils/keychain.util'
import { SECURE_STORE_KEY } from '../../../../enum'
import Toast, { BaseToast } from 'react-native-toast-message'
import { useAppDispatch } from '../../../../redux/hooks'
import { amount, increment } from '../../../../redux/cart/cart.slice'

const ModalCardComponent: FC<ModalCardComponentProps> = ({
  id,
  modalVisible,
  setModalVisible,
  title,
  price,
  image,
  category,
  calories,
  description,
  ingredientsBase,
  ingredientsExtra,
  ingredients
}) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [error, setError] = useState<string | string[]>('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    const active = async (): Promise<void> => {
      try {
        const auth = await getKeychain(SECURE_STORE_KEY.AUTH)
        const data = await fetchData<Card>(
          '/cart/active',
          {},
          'GET',
          auth?.token
        )

        if (data.message === undefined) {
          dispatch(amount(data.items.length))
        }
      } catch (error) {
        dispatch(amount(0))
      }
    }

    void active()
    return () => {}
  }, [])

  const handleIncrement = (): void => setQuantity((prev) => prev + 1)
  const handleDecrement = (): void =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const toggleExtra = (ingredientName: string): void => {
    setSelectedExtras((prev) =>
      prev.includes(ingredientName)
        ? prev.filter((i) => i !== ingredientName)
        : [...prev, ingredientName]
    )
  }

  const calculateTotal = (): number => {
    const extrasTotal = ingredientsExtra
      .filter((ing) => selectedExtras.includes(ing.name))
      .reduce((sum, ing) => sum + ing.price, 0)
    return (price + extrasTotal) * quantity
  }

  const handleAddToCart = async (): Promise<void> => {
    try {
      const auth = await getKeychain(SECURE_STORE_KEY.AUTH)
      const extra =
        ingredientsExtra
          .filter((ing) => selectedExtras.includes(ing.name))
          .reduce((sum, ing) => sum + ing.price, 0) * quantity

      const extraTotal = ingredientsExtra.length > 0 ? extra : 0

      const data = await fetchData<Card>(
        '/cart',
        {
          productId: id,
          quantity,
          extra: extraTotal
        },
        'POST',
        auth?.token
      )

      if (data.message !== undefined) {
        setError(data.message)
      } else {
        setError('')
        Toast.show({
          type: 'success',
          text1: 'Producto agregado al carrito',
          text2: 'El producto se agregó correctamente'
        })
        setModalVisible(false)
        setQuantity(1)
        setSelectedExtras([])
        dispatch(increment())
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error al agregar al carrito:', error.message)
      }
    }
  }

  return (
    <>
      <Toast
        config={{
          success: (props) => (
            <BaseToast
              {...props}
              style={{ borderLeftColor: 'green', backgroundColor: '#d4edda' }}
              text1Style={{ color: 'green' }}
            />
          )
        }}
      />
      <Modal
        animationType='slide'
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          className='flex-1 justify-end'
          onPress={() => setModalVisible(false)}
        >
          <View className='bg-white rounded-t-3xl p-6 border border-gray-300'>
            {error !== '' && (
              <View className='mx-8 mt-4 p-4 bg-accent-error/10 rounded-xl border border-accent-error'>
                <Text className='text-accent-error'>
                  {Array.isArray(error) ? error.join(', ') : error}
                </Text>
              </View>
            )}
            <Pressable
              className='absolute top-0 right-5 p-1 my-3 z-10 bg-red-500 rounded-full'
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name='close' size={25} color='white' />
            </Pressable>
            <Image
              source={{ uri: image }}
              className='w-full h-48 rounded-xl my-4'
              resizeMode='cover'
            />

            <View className='mb-4'>
              <Text className='text-2xl font-bold text-secondary-800 mb-2 flex-shrink'>
                {title}
              </Text>
              <View className='flex-row items-center justify-between'>
                <View>
                  <Text className='text-2xl font-bold text-primary-500'>
                    ${price * quantity}
                  </Text>
                  {selectedExtras.length > 0 && (
                    <Text className='text-sm text-primary-400'>
                      +$
                      {ingredientsExtra
                        .filter((ing) => selectedExtras.includes(ing.name))
                        .reduce((sum, ing) => sum + ing.price, 0) *
                        quantity}{' '}
                      extras
                    </Text>
                  )}
                </View>
                <View className='flex-row items-center bg-secondary-100 rounded-full'>
                  <Pressable
                    onPress={handleDecrement}
                    className='w-8 h-8 items-center justify-center'
                  >
                    <Ionicons name='remove' size={20} color='#666' />
                  </Pressable>
                  <Text className='text-secondary-800 font-semibold min-w-[24px] text-center'>
                    {quantity}
                  </Text>
                  <Pressable
                    onPress={handleIncrement}
                    className='w-8 h-8 items-center justify-center'
                  >
                    <Ionicons name='add' size={20} color='#666' />
                  </Pressable>
                </View>
              </View>
            </View>

            <View className='flex-row items-center mb-4'>
              <View className='bg-black/70 px-3 py-1.5 rounded-full'>
                <Text className='text-white text-xs font-semibold'>
                  {category}
                </Text>
              </View>
              <View className='flex-row items-center ml-4'>
                <Ionicons name='flame' size={16} color='#FF6B6B' />
                <Text className='text-secondary-500 text-sm ml-1'>
                  {calories} cal
                </Text>
              </View>
            </View>

            <Text className='text-secondary-500 text-base mb-4'>
              {description}
            </Text>

            <View className='mb-4'>
              <Text className='text-lg font-semibold text-secondary-800 mb-2'>
                Ingredientes base
              </Text>
              <View className='flex-row flex-wrap gap-2'>
                {ingredientsBase?.map((ingredient, index) => (
                  <View
                    key={index}
                    className='bg-secondary-100 px-3 py-1.5 rounded-full'
                  >
                    <Text className='text-secondary-600 text-sm'>
                      {ingredient}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View className='mb-4'>
              <Text className='text-lg font-semibold text-secondary-800 mb-2'>
                Ingredientes
              </Text>
              <View className='flex-row flex-wrap gap-2'>
                {ingredients?.map((ingredient, index) => (
                  <View
                    key={index}
                    className='bg-secondary-100 px-3 py-1.5 rounded-full'
                  >
                    <Text className='text-secondary-600 text-sm'>
                      {ingredient}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View className='mb-6'>
              <Text className='text-lg font-semibold text-secondary-800 mb-2'>
                Ingredientes adicionales
              </Text>
              <View className='flex-row flex-wrap gap-2'>
                {ingredientsExtra?.map((ingredient, index) => {
                  const isSelected = selectedExtras.includes(ingredient.name)
                  return (
                    <Pressable
                      key={index}
                      onPress={() => toggleExtra(ingredient.name)}
                      className={`bg-primary-100 px-3 py-1.5 rounded-full flex-row items-center ${
                        isSelected ? 'bg-primary-500' : 'bg-primary-100'
                      }`}
                    >
                      <Text
                        className={`text-primary-600 text-sm mr-2 ${
                          isSelected ? 'text-white' : 'text-primary-600'
                        }`}
                      >
                        {ingredient.name}
                      </Text>
                      <Text
                        className={`text-sm ${
                          isSelected ? 'text-white' : 'text-primary-600'
                        }`}
                      >
                        +${ingredient.price}
                      </Text>
                    </Pressable>
                  )
                })}
              </View>
            </View>

            <Pressable
              className='bg-primary-500 p-4 rounded-xl items-center'
              onPress={handleAddToCart}
            >
              <Text className='text-white font-bold text-lg'>
                Agregar {quantity} al carrito - ${calculateTotal()}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  )
}

export default ModalCardComponent
