import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../getToken'
import { Loader } from '../Loader/Loader'
import { CartItem } from './CartItem/CartItem'

function getProductsByIds(products) {
  return Promise.all(products.map((product) => fetch(`https://api.react-learning.ru/products/${product.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((res) => (res.json())).then((json) => ({ ...json, count: product.count, checked: product.checked }))))
}

export function Cart() {
  const cart = useSelector((store) => store.cart.value)
  const navigate = useNavigate()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const i = await getProductsByIds(cart)
      return i
    }
    ,
  })

  if (isLoading) return <Loader />
  console.log(data)
  const dat = cart.map((product) => {
    const { id } = product
    const productFromQuery = data.find((e) => e._id === id)
    return { ...productFromQuery, count: product.count, checked: product.checked }
  })
  console.log(dat, data, cart)
  const totalSumDiscountCount = dat.reduce(
    // (acc, e) => [acc[0] + (e.count * e.price), acc[1] + e.count * e.discount, acc[2] + e.count],
    (acc, e) => {
      if (e.checked) {
        // setTimeout(refetch)
        return [acc[0] + (e.count * e.price), acc[1] + e.count * e.discount, acc[2] + e.count]
      } return [acc[0], acc[1], acc[2]]
    },

    [0, 0, 0],
  )
  const itemToken = getToken()
  const isSignIn = (itemToken !== null && itemToken !== undefined)

  const goToProfile = () => {
    if (isSignIn) {
      navigate('/my_profile')
    } else {
      navigate('/')
    }
  }
  const goToCatalog = () => {
    if (isSignIn) {
      navigate('/catalog')
    } else {
      navigate('/')
    }
  }
  const logout = () => {
    if (isSignIn) {
      localStorage.removeItem('token')
    }
    navigate('/')
  }

  if (dat.length === 0) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1 className="mt-3">Корзина  пуста</h1>
        <button type="button" className="btn btn-link fs-4" onClick={goToCatalog}>Каталог</button>
        <button type="button" className="btn btn-link fs-4" onClick={goToProfile}>Профиль</button>
        <button type="button" className="btn btn-link fs-4" onClick={logout}>Выйти</button>
      </div>
    )
  }
  return (
    <div className="d-flex justify-content-center">
      <div className="h-100 col-7">
        {dat.map((e) => <CartItem key={e._id} id={e._id} name={e.name} price={e.price} refetch={refetch} picture={e.pictures} count={e.count} discount={e.discount} stock={e.stock} checked={e.checked} />)}
      </div>
      <div className="col-3">
        <div className="bg-white rounded-4 p-3 m-3 d-flex flex-column justify-content-between align-items-end gap-3">
          <div className="fs-5 d-flex justify-content-between w-100">
            Всего товаров:
            {' '}
            <b>
              {totalSumDiscountCount[2]}
              {' '}
              шт.
            </b>
          </div>
          <div className="fs-5 d-flex justify-content-between w-100">
            Сумма без скидки:
            {' '}
            <b className="text-decoration-line-through">
              {totalSumDiscountCount[0]}
              {' '}
              р.
            </b>
          </div>
          <div className="fs-5 d-flex justify-content-between w-100">
            Скидка:
            {' '}
            <b>
              {totalSumDiscountCount[1]}
              {' '}
              р.
            </b>
          </div>
          <div className="fs-3 d-flex justify-content-between w-100">
            Итого:
            {' '}
            <b>
              {totalSumDiscountCount[0] - totalSumDiscountCount[1]}
              {' '}
              р.
            </b>
          </div>
          <div className="d-grid w-100"><button type="button" className="btn btn-success btn-lg">Оформить</button></div>

        </div>
      </div>
    </div>
  )
}
