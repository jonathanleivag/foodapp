import { Ionicons } from '@expo/vector-icons'
import { FC, useState } from 'react'
import { View, Image, Text, Pressable } from 'react-native'
import { CardScreenComponentProps } from '../../../type'
import ModalCardComponent from './components/modal.card.component'

const CardScreenComponent: FC<CardScreenComponentProps> = (props) => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <View className='bg-white rounded-xl shadow-lg overflow-hidden my-5 border border-gray-200'>
        <Image
          source={{
            uri: props.image
          }}
          className='w-full h-48 rounded-b-xl shadow-lg'
          resizeMode='cover'
        />
        <View className='absolute top-4 left-4 bg-black/70 px-3 py-1.5 rounded-full'>
          <Text className='text-white text-xs font-semibold'>
            {props.category}
          </Text>
        </View>
        <View className='p-4'>
          <Text className='text-lg font-bold text-secondary-800 mb-2'>
            {props.title}
          </Text>
          <Text className='text-secondary-500 text-sm mb-2'>
            {props.description}
          </Text>

          <View className='flex-row items-center mb-4'>
            <Ionicons name='flame' size={16} color='#FF6B6B' />
            <Text className='text-secondary-500 text-sm ml-1'>
              {props.calories} cal
            </Text>
          </View>

          <View className='flex-row justify-between items-center'>
            <Text className='text-xl font-bold text-primary-500'>
              ${props.price}
            </Text>
            <Pressable
              className='bg-primary-500 w-10 h-10 rounded-full items-center justify-center'
              onPress={() => setModalVisible(true)}
            >
              <Ionicons name='add' size={24} color='white' />
            </Pressable>
          </View>
        </View>
        <ModalCardComponent
          title={props.title}
          calories={props.calories}
          category={props.category}
          description={props.description}
          image={props.image}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          price={props.price}
          ingredientsBase={props.ingredientsBase}
          ingredientsExtra={props.ingredientsExtra}
          ingredients={props.ingredients}
        />
      </View>
    </>
  )
}

export default CardScreenComponent
