/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { enablePageScroll } from 'scroll-lock'
import style from './modalProduct.module.scss'
import { Comments } from './Comments/Comments'
import { addToCart, removeFromCart } from '../../../redux/slices/cartSlice'

export function ModalProduct({
  active, setActive, product,
}) {
  if (product === null) {
    return <> </>
  }
  const dispatch = useDispatch()
  const [showedComments, setShowedComments] = useState(false)
  console.log(product)
  const cart = useSelector((store) => store.cart.value)
  const id = product._id
  const idsFromCArt = cart.map((e) => e.id)
  const inCart = idsFromCArt.includes(id)
  console.log(idsFromCArt, id)
  const activeModalClass = `${style.modal} ${style.active}`

  const commentsHandler = () => {
    setShowedComments(!showedComments)
  }

  const closeHandler = () => {
    setActive({ active: false, id: 0 })
    setShowedComments(false)
    enablePageScroll()
  }
  const addHandler = () => {
    if (!inCart) {
      dispatch(addToCart(id))
    } else {
      dispatch(removeFromCart(id))
    }
  }

  return (
    <div className={active ? activeModalClass : style.modal} onClick={closeHandler}>
      <div className={style.modal__content} onClick={(e) => e.stopPropagation()}>
        {product != null ? (
          <div className="d-flex flex-column align-items-center">
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
            <div className="d-flex justify-content-between w-100 mt-3">
              <button type="button" className={style.like}>
                <i className="fa-solid fa-thumbs-up me-2" />
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

            </div>
            {showedComments ? <Comments productId={id} /> : ''}
          </div>
        ) : 0}
      </div>
    </div>
  )
}
