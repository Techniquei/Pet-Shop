import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProductsContext } from '../../context/ProductsContextProvider'
import style from './catalog.module.scss'
import { ProductItem } from './ProductItem/ProductItem'

export function Catalog() {
  const { loadAllProducts, products } = useProductsContext()
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      const token = window.localStorage.getItem('token')
      loadAllProducts(token)
    } else {
      navigate('/')
    }
  }, [])

  if (!products.length) return <div>Empty</div>

  return (

    <div className={style.products_wrapper}>
      {
          products.map((product) => (
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
