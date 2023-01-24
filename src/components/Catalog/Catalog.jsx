import { Outlet, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import style from './catalog.module.scss'
import { ProductItem } from './ProductItem/ProductItem'
import { Loader } from '../Loader/Loader'
import { getToken } from '../getToken'

export const PRODUCTS_QUERY_KEY = 'PRODUCTS_QUERY_KEY'

export function Catalog() {
  const navigate = useNavigate()
  const token = getToken()

  const search = useSelector((store) => store.searchLine.value)
  const getAllProducts = () => fetch(`https://api.react-learning.ru/products/search?query=${search}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json())

  const cart = useSelector((store) => store.cart.value)
  const likedList = useSelector((store) => store.liked.value)
  const idsFromCArt = cart.map((e) => e.id)
  if (token == null) {
    navigate('/')
  }
  const { data, isLoading } = useQuery({
    queryKey: [search, 'products'],
    queryFn: getAllProducts,
  })

  if (isLoading) return <Loader />

  if (data) {
    if (data.length === 0) {
      return (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h1 className="mt-3">Товаров не найдено</h1>
        </div>
      )
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className={style.products_wrapper}>
        {data
          ? data.map((product) => (
            <ProductItem
              key={product._id}
              inCart={idsFromCArt.includes(product._id)}
              like={likedList.includes(product._id)}
              product={{
                name: product.name,
                price: product.price,
                discount: product.discount,
                id: product._id,
                pictures: product.pictures,
              }}
            />
          ))
          : console.log(data)}
      </div>
      <Outlet />
      <button type="button" className={style.add_product} onClick={() => navigate('/newProduct')}>
        <i className="fa-solid fa-circle-plus" />
      </button>
    </div>
  )
}
