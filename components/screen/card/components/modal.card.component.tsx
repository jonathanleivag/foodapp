import { FC, useState } from 'react'
import { Image, Modal, Pressable, Text, View } from 'react-native'
import { ModalCardComponentProps } from '../../../../type'
import { Ionicons } from '@expo/vector-icons'

const ModalCardComponent: FC<ModalCardComponentProps> = ({
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

  return (
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
        <Pressable className='bg-white rounded-t-3xl p-6 border border-gray-300'>
          <View className='items-center mb-6'>
            <View className='w-20 h-1 bg-gray-300 rounded-full' />
          </View>

          <Image
            source={{ uri: image }}
            className='w-full h-48 rounded-xl mb-4'
            resizeMode='cover'
          />

          <View className='mb-4'>
            <Text className='text-2xl font-bold text-secondary-800 mb-2 flex-shrink'>
              {title}
            </Text>
            <View className='flex-row items-center justify-between'>
              <View>
                <Text className='text-2xl font-bold text-primary-500'>
                  ${(price * quantity).toFixed(2)}
                </Text>
                {selectedExtras.length > 0 && (
                  <Text className='text-sm text-primary-400'>
                    +$
                    {(
                      ingredientsExtra
                        .filter((ing) => selectedExtras.includes(ing.name))
                        .reduce((sum, ing) => sum + ing.price, 0) * quantity
                    ).toFixed(2)}{' '}
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
                  className='bg-primary-100 px-3 py-1.5 rounded-full'
                >
                  <Text className='text-primary-600 text-sm'>{ingredient}</Text>
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
            onPress={() => setModalVisible(false)}
          >
            <Text className='text-white font-bold text-lg'>
              Agregar {quantity} al carrito - ${calculateTotal().toFixed(2)}
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default ModalCardComponent
