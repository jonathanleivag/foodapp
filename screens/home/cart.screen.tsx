import { FC } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  extras?: string[]
  ingredients?: string[]
}

const CartScreen: FC = () => {
  const cartItems: CartItem[] = [
    {
      id: '1',
      name: 'Hamburguesa Clásica',
      price: 12.99,
      quantity: 2,
      image: 'https://example.com/burger.jpg',
      ingredients: ['Carne', 'Lechuga', 'Tomate', 'Cebolla'],
      extras: ['Queso extra', 'Bacon', 'Salsa BBQ']
    },
    {
      id: '2',
      name: 'Pizza Margherita',
      price: 15.99,
      quantity: 1,
      image: 'https://example.com/pizza.jpg',
      ingredients: ['Masa', 'Salsa de tomate', 'Mozzarella', 'Albahaca'],
      extras: ['Borde de queso', 'Pepperoni extra']
    }
  ]

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const RenderItem: FC<{ item: CartItem }> = ({ item }) => (
    <View className='flex-row p-4 bg-white mb-2 mx-4 mt-2 rounded-xl shadow'>
      <Image source={{ uri: item.image }} className='w-24 h-24 rounded-xl' />
      <View className='flex-1 ml-4'>
        <Text className='text-secondary-800 text-lg font-semibold'>
          {item.name}
        </Text>
        <Text className='text-primary-700 font-bold text-base'>
          ${item.price}
        </Text>
        {item.ingredients !== undefined && item.ingredients.length > 0 && (
          <Text className='text-secondary-500 text-sm mt-1'>
            Ingredientes: {item.ingredients.join(', ')}
          </Text>
        )}
        {item.extras !== undefined && item.extras.length > 0 && (
          <Text className='text-secondary-500 text-sm mt-1'>
            Extras: {item.extras.join(', ')}
          </Text>
        )}
        <Text className='text-secondary-600 text-sm mt-1'>
          Subtotal: ${(item.price * item.quantity).toFixed(2)}
        </Text>
        <View className='flex-row items-center mt-2'>
          <TouchableOpacity className='bg-primary-50 w-8 h-8 rounded-lg items-center justify-center'>
            <Ionicons name='remove' size={20} color='#f57c00' />
          </TouchableOpacity>
          <Text className='mx-4 text-secondary-700 font-semibold'>
            {item.quantity}
          </Text>
          <TouchableOpacity className='bg-primary-50 w-8 h-8 rounded-lg items-center justify-center'>
            <Ionicons name='add' size={20} color='#f57c00' />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity className='p-2'>
        <Ionicons name='trash-outline' size={24} color='#FF5252' />
      </TouchableOpacity>
    </View>
  )

  const EmptyCart: FC = () => (
    <View className='flex-1 items-center justify-center'>
      <Text className='text-secondary-600 text-lg'>Tu carrito está vacío</Text>
    </View>
  )

  return (
    <View className='flex-1 bg-background-light'>
      <View className='bg-white p-4 shadow-sm'>
        <Text className='text-secondary-800 text-2xl font-bold text-center'>
          Mi Carrito
        </Text>
      </View>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyCart}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      {cartItems.length > 0 && (
        <View className='bg-white p-4 shadow-lg'>
          <View className='flex-row justify-between items-center mb-4'>
            <Text className='text-secondary-600 text-lg'>Total:</Text>
            <Text className='text-primary-700 text-xl font-bold'>
              ${total.toFixed(2)}
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
