/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom'
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

  const [searchParams, setSearchParams] = useSearchParams({
    sort: 'decrease',
    sortType: 'date',
  })

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

  const sortTypeHandler = (e) => {
    setSearchParams({
      sortType: e.target.value,
      sort: searchParams.get('sort'),
    })
  }

  const sortHandler = (e) => {
    setSearchParams({
      sortType: searchParams.get('sortType'),
      sort: e.target.value,
    })
  }

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

  const sortedData = data.slice().sort((a, b) => {
    const type = searchParams.get('sortType')
    const sort = searchParams.get('sort') === 'decrease'
    const price = a.price - b.price
    const sale = a.discount - b.discount
    const date = Date.parse(a.created_at) - Date.parse(b.created_at)
    switch (type) {
      case 'price':
        return sort ? price : -price
      case 'sale':
        return sort ? sale : -sale
      case 'date':
        return sort ? date : -date
      default:
        return 0
    }
  })

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="input-group m-2" style={({ width: '480px' })}>
        <label className="input-group-text">
          Cортировка
        </label>
        <select className="form-select" onChange={sortTypeHandler}>
          <option value="price">по цене</option>
          <option value="sale">по акции</option>
          <option selected value="date">по дате</option>
        </select>
        <select className={`form-select ${style.width30}`} onChange={sortHandler}>
          <option value="increase">по убыванию</option>
          <option selected value="decrease">по возрастанию</option>
        </select>
      </div>

      <div className={style.products_wrapper}>

        {sortedData
          ? sortedData.map((product) => (
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
          : console.log(sortedData)}
      </div>
      <Outlet />
      <button type="button" className={style.add_product} onClick={() => navigate('/newProduct')}>
        <i className="fa-solid fa-circle-plus" />
      </button>
    </div>
  )
}
