import { FC, useEffect, useState } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import CardScreenComponent from '../../components/screen/card.screen.component'
import { useDataFetch } from '../../hooks/useDataFetch.hook'
import { PaginateProduct } from '../../type'

const HomeScreen: FC = () => {
  const [page, setPage] = useState<number>(1)
  const [products, setProducts] = useState<any[]>([])
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const [data, loading] = useDataFetch<PaginateProduct>('/product', true, page)

  useEffect(() => {
    if (!loading && data.data?.length > 0) {
      if (page === 1) {
        setProducts(data.data)
      } else {
        setProducts((prev) => [...prev, ...data.data])
      }
      setHasMore(data.data.length === 5)
      setIsLoadingMore(false)
    } else if (!loading && data.data?.length === 0) {
      setHasMore(false)
      setIsLoadingMore(false)
    }
  }, [data, loading])

  const loadMore = (): void => {
    if (!loading && hasMore && !isLoadingMore && products.length >= 5) {
      setIsLoadingMore(true)
      setPage((prev) => prev + 1)
    }
  }

  const renderFooter = (): JSX.Element | null => {
    if (!hasMore || !isLoadingMore) return null
    return <ActivityIndicator style={{ margin: 16 }} size='large' />
  }

  if (loading && page === 1) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <View className='flex-1 p-4 bg-background-light'>
      <View className='mb-6'>
        <Text className='text-xs font-medium text-primary-500 mb-1'>
          BIENVENIDO A
        </Text>
        <View className='flex-row items-center'>
          <Text className='text-3xl font-bold text-secondary-800'>
            Menú del día
          </Text>
          <View className='h-2 w-2 rounded-full bg-primary-500 ml-2' />
        </View>
        <View className='w-20 h-1 bg-primary-500/20 mt-2' />
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <CardScreenComponent
            image={item.imageUrl}
            title={item.name}
            category={item.category}
            description={item.description}
            price={item.price}
            calories={item.calories}
          />
        )}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  )
}

export default HomeScreen
