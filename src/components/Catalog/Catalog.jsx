import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import scrollLock from 'scroll-lock'
import style from './catalog.module.scss'
import { ProductItem } from './ProductItem/ProductItem'
import { Loader } from '../Loader/Loader'
import { ModalProduct } from './ModalProduct/ModalProduct'

export const PRODUCTS_QUERY_KEY = 'PRODUCTS_QUERY_KEY'

export const getToken = () => localStorage.getItem('token')

export function Catalog() {
  const [modalState, setModalState] = useState({ active: false, id: 0 })
  const openModal = (id) => {
    setModalState({ active: true, id })
    console.log(modalState.id)
  }
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
  const { data, isLoading } = useQuery({
    queryKey: search,
    queryFn: getAllProducts,
  })

  let modalProduct

  if (data) {
    [modalProduct] = data.filter((product) => product._id === modalState.id)
  }

  if (isLoading) return <Loader />

  if (modalState.active) {
    scrollLock.disablePageScroll()
  } else {
    scrollLock.enablePageScroll()
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
              openModal={openModal}
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
      <ModalProduct
        active={modalState.active}
        setActive={setModalState}
        product={modalProduct || null}
      />
    </div>
  )
}
