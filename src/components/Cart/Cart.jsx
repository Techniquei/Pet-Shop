import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { getToken } from '../Catalog/Catalog'
import { Loader } from '../Loader/Loader'
import { CartItem } from './CartItem/CartItem'

function getProductsByIds(products) {
  return Promise.all(products.map((product) => fetch(`https://api.react-learning.ru/products/${product.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((res) => (res.json())).then((json) => ({ ...json, count: product.count }))))
}

export function Cart() {
  const cart = useSelector((store) => store.cart)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getProductsByIds(cart.map((product) => product)),
  })

  console.log(data, cart)
  if (isLoading) return <Loader />

  const totalSumAndCount = data.reduce(
    (acc, e) => [acc[0] + (e.count * e.price), acc[1] + e.count],
    [0, 0],
  )

  return (

    <div className="d-flex justify-content-center">
      <div className="h-100 col-7">
        {data.map((e) => <CartItem key={e._id} id={e._id} name={e.name} price={e.price} refetch={refetch} picture={e.pictures} count={e.count} />)}
      </div>
      <div className="col-3">
        <div className="bg-white rounded-4 p-3 m-3 d-flex flex-column justify-content-between align-items-end gap-3">
          <div className="fs-4 d-flex justify-content-between w-100">
            Всего товаров:
            {' '}
            <b>
              {totalSumAndCount[1]}
              {' '}
              шт.
            </b>
          </div>
          <div className="fs-3 d-flex justify-content-between w-100">
            Итого:
            {' '}
            <b>
              {totalSumAndCount[0]}
              {' '}
              р.
            </b>
          </div>
        </div>
      </div>
    </div>

  )
}
