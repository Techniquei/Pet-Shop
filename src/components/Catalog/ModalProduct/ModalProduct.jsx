/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { enablePageScroll } from 'scroll-lock'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import style from './modalProduct.module.scss'
import { Comments } from './Comments/Comments'
import { addToCart, removeFromCart } from '../../../redux/slices/cartSlice'
import liked from './liked.png'
import unliked from './unliked.png'
import { setLike } from '../../../redux/slices/likesSlice'
import { getToken } from '../../getToken'
import { Loader } from '../../Loader/Loader'
import { getProfile, PROFILE_QUERY_KEY } from '../../Profile/Profile'

async function sendLike(id, status) {
  const res = await fetch(`https://api.react-learning.ru/products/likes/${id}`, {
    method: status ? 'DELETE' : 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  })
  const result = await res.json()
  return result
}

export function ModalProduct() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const { id } = useParams()

  const { data: product, isFetching } = useQuery({
    queryKey: ['liked'],
    queryFn: () => fetch(`https://api.react-learning.ru/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    }).then((res) => res.json()),
  })

  const { data: profile } = useQuery({
    queryKey: [PROFILE_QUERY_KEY],
    queryFn: getProfile,
  })

  const { mutateAsync: mutateLike } = useMutation({
    mutationKey: ['liked'],
    mutationFn: () => sendLike(id, product.likes.includes(profile._id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['liked'] })
    },
  })

  const [showedComments, setShowedComments] = useState(false)
  const cart = useSelector((store) => store.cart.value)
  const likes = useSelector((store) => store.liked.value)

  const idsFromCArt = cart.map((e) => e.id)
  const inCart = idsFromCArt.includes(id)
  const inLikes = likes.includes(id)
  const activeModalClass = `${style.modal} ${style.active}`

  const commentsHandler = () => {
    setShowedComments(!showedComments)
  }

  const closeHandler = () => {
    navigate(-1)
    enablePageScroll()
  }
  const addHandler = () => {
    if (!inCart) {
      dispatch(addToCart(id))
    } else {
      dispatch(removeFromCart(id))
    }
  }

  const favoriteHandler = (e) => {
    e.stopPropagation()
    dispatch(setLike(id))
  }

  const editProductHandler = () => {
    navigate(`/editProduct?productId=${product._id}`)
  }

  return (
    <div
      className={activeModalClass}
      onClick={closeHandler}
    >
      <div className={style.modal__content} onClick={(e) => e.stopPropagation()}>
        {(!!product && !!profile) ? (
          <div className="d-flex flex-column align-items-center position-relative">
            <div className="w-75 ">
              <img className="w-100 h-100" src={product.pictures} alt="" />
            </div>
            <h3>{product.name}</h3>
            <div className="fs-4">
              {product.discount === 0 ? (
                <b>
                  {product.price}
                  р.
                </b>
              ) : (
                <>
                  <div className="text-decoration-line-through">
                    {product.price}
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
            <p>
              Вес:
              {' '}
              {product.wight}
            </p>
            <div className="fs-5" dangerouslySetInnerHTML={{ __html: product.description }} />
            {product.author._id === profile._id ? <button type="button" className="btn btn-primary" onClick={editProductHandler}>Редактировать</button> : ''}
            <div className="d-flex justify-content-between w-100 mt-3">
              <button type="button" className={style.like} onClick={mutateLike}>
                <i className={`${product.likes.includes(profile._id) ? 'fa-solid' : 'fa-regular'} fa-thumbs-up me-2`} />
                {product.likes.length}
              </button>
              <button
                type="button"
                onClick={addHandler}
                className={`btn m-1 w-50 ${inCart ? 'btn-danger' : 'btn-success'}`}
              >
                {!inCart ? 'Добавить' : 'Убрать из корзины'}
              </button>
              <button type="button" onClick={commentsHandler} className={style.comment}>
                <i className="fa-solid fa-comment me-2" />
                {product.reviews.length}
              </button>
              <button type="button" onClick={favoriteHandler} className={style.like_button}>
                <img src={inLikes ? liked : unliked} alt="" className={style.like_img} />
              </button>
            </div>
            {showedComments ? <Comments productId={id} /> : ''}

          </div>
        ) : <Loader />}
      </div>
    </div>
  )
}
