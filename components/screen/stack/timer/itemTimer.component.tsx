import { FC } from 'react'
import { Text, View } from 'react-native'
import { ItemTimerProps } from '../../../../type'

const ItemTimer: FC<ItemTimerProps> = ({ item }) => {
  return (
    <View className='mb-2 border-b border-secondary-200 pb-2'>
      <View className='flex-row justify-between'>
        <Text className='text-secondary-700 font-medium'>
          {item.quantity}x {item.product.name}
        </Text>
        <Text className='text-secondary-600'>${item.price}</Text>
      </View>
      {item.ingredients.length > 0 && (
        <Text className='text-secondary-500 text-sm'>
          {item.ingredients.join(', ')}
        </Text>
      )}
      {item.extraIngredients !== undefined &&
        item.extraIngredients.length > 0 && (
          <Text className='text-accent-info text-sm'>
            Extra: {item.extraIngredients.join(', ')}
          </Text>
          // eslint-disable-next-line @typescript-eslint/indent
        )}
    </View>
  )
}

export default ItemTimer
