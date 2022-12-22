import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import style from './catalog.module.scss'
import { ProductItem } from './ProductItem/ProductItem'
import { Loader } from '../Loader/Loader'

export const PRODUCTS_QUERY_KEY = 'PRODUCTS_QUERY_KEY'

export const getToken = () => localStorage.getItem('token')
let token
const getAllProducts = () => fetch('https://api.react-learning.ru/products', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}).then((res) => res.json())

export function Catalog() {
  token = getToken()

  const navigate = useNavigate()
  if (token == null) {
    navigate('/')
  }
  const { data: products, isLoading } = useQuery({ queryKey: [PRODUCTS_QUERY_KEY], queryFn: getAllProducts })

  if (isLoading) return <Loader />

  return (

    <div className={style.products_wrapper}>
      {
          products.products.map((product) => (
            <ProductItem
              name={product.name}
              price={product.price}
              id={product.id}
              key={product.id}
              pictures={product.pictures}

            />
          ))
        }
    </div>

  )
}
