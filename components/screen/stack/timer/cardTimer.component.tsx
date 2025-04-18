import { FC } from 'react'
import { Text, View } from 'react-native'
import { Card, CardTimerProps } from '../../../../type'
import ItemTimer from './itemTimer.component'
import CountdownTimer from './countdownTimer.component'

const CardTimer: FC<CardTimerProps> = ({ cart, index }) => {
  const getTimerColor = (remainingTime: number): string => {
    const percentage = (remainingTime / (15 * 60)) * 100 // Assuming 15 minutes default
    if (percentage > 50) return 'text-accent-success'
    if (percentage > 20) return 'text-accent-warning'
    return 'text-accent-error'
  }

  const maxMinute = (cart: Card): number => {
    const arrayMinutes = cart.items.map((item) => item.product.preparationTime)
    return Math.max(...arrayMinutes)
  }

  return (
    <View className='bg-background-cream mb-6 p-4 rounded-lg shadow'>
      <View className='flex-row justify-between items-center mb-3'>
        <View>
          <Text className='text-secondary-800 text-base font-bold'>
            Pedido #{cart.id.slice(0, 7)}
          </Text>
          <Text className='text-secondary-500 text-sm'>
            {new Date(cart.createdAt).toLocaleDateString('es-CL', {
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'America/Santiago',
              hour12: false
            })}
          </Text>
        </View>
        <Text
          className={`text-xl font-bold ${getTimerColor(
            typeof cart.remainingTime === 'number' ? cart.remainingTime : 0
          )}`}
        >
          <CountdownTimer
            currentDate={new Date().toString()}
            minutesToAdd={maxMinute(cart)}
            targetDate={cart.orderDate.toLocaleString('es-CL', {
              timeZone: 'America/Santiago'
            })}
            finished={cart.isDelivered}
          />
        </Text>
      </View>

      {cart.items.map((item) => (
        <ItemTimer key={item._id} item={item} />
      ))}

      {cart.isDelivered && (
        <View className='mt-2 pt-2 w-full border-secondary-200'>
          <Text className='text-primary-900 text-4xl font-bold text-center'>
            {cart.code}
          </Text>
        </View>
      )}

      <View className='mt-2 pt-2 border-t border-secondary-200'>
        <Text className='text-secondary-800 font-bold text-right'>
          Total: ${cart.total}
        </Text>
      </View>
    </View>
  )
}

export default CardTimer
