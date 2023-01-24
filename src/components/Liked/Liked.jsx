import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { setLike } from '../../redux/slices/likesSlice'
import { getToken } from '../getToken'
import { Loader } from '../Loader/Loader'
import s from './liked.module.scss'

function getProductsByIdsLiked(ids) {
  return Promise.all(ids.map((id) => fetch(`https://api.react-learning.ru/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((res) => (res.json()))))
}

export function Liked() {
  const liked = useSelector((store) => store.liked.value)
  const dispatch = useDispatch()
  const { data, isLoading } = useQuery({
    queryKey: [liked],
    queryFn: async () => {
      const i = await getProductsByIdsLiked(liked)
      return i
    }
    ,
  })
  if (liked.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <h1 className="mt-3">Избранные товары отсутствуют</h1>
      </div>
    )
  }
  if (isLoading) return <Loader />
  console.log(data)
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className={s.liked_wrapper}>
        {data.map((product) => (
          <div className={s.card}>
            <div className="d-flex flex-column align-items-center">
              <div className={s.box}>
                <img className={s.img} src={product.pictures} alt="" />
              </div>

              <h5>{product.name}</h5>

            </div>
            <div className="d-flex flex-column align-items-center">
              <div>
                {product.discount === 0 ? (
                  <b>
                    {product.price}
                    {' '}
                    р.
                  </b>
                ) : (
                  <>
                    <div className="text-decoration-line-through">
                      {product.price}
                      {' '}
                      {' '}
                      р.
                    </div>
                    {' '}
                    <b>
                      {product.price - product.discount}
                      {' '}
                      р.
                    </b>
                  </>
                )}

              </div>

            </div>
            <button type="button" className="btn-close position-absolute top-0 end-0" aria-label="Close" onClick={() => { dispatch(setLike(product._id)) }} />
          </div>
        ))}
      </div>
    </div>
  )
}
