import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import style from './catalog.module.scss'
import { ProductItem } from './ProductItem/ProductItem'
import { Loader } from '../Loader/Loader'

export const PRODUCTS_QUERY_KEY = 'PRODUCTS_QUERY_KEY'

export const getToken = () => localStorage.getItem('token')

export function Catalog() {
  const search = useSelector((store) => store.searchLine)
  console.log(`search${search}`)
  const getAllProducts = () => fetch(`https://api.react-learning.ru/products/search?query=${search}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((res) => res.json())

  const token = getToken()

  const cart = useSelector((store) => store.cart)
  const likedList = useSelector((store) => store.liked)
  const idsFromCArt = cart.map((e) => e.id)
  const navigate = useNavigate()
  if (token == null) {
    navigate('/')
  }
  const { data, isLoading } = useQuery({ queryKey: search, queryFn: getAllProducts })

  if (isLoading) return <Loader />

  return (

    <div className={style.products_wrapper}>
      {
      (data)
        ? data.map((product) => (
          <ProductItem
            name={product.name}
            price={product.price}
            id={product._id}
            key={product._id}
            pictures={product.pictures}
            inCart={idsFromCArt.includes(product._id)}
            like={likedList.includes(product._id)}
          />
        )) : console.log(data)

          // data.products.map((product) => (
          //   <ProductItem
          //     name={product.name}
          //     price={product.price}
          //     id={product._id}
          //     key={product._id}
          //     pictures={product.pictures}
          //     inCart={idsFromCArt.includes(product._id)}
          //   />
          // ))
        }
    </div>

  )
}
