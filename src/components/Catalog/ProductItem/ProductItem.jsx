/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useDispatch } from 'react-redux'
import { disablePageScroll, enablePageScroll } from 'scroll-lock'
import { useNavigate } from 'react-router-dom'
import liked from './liked.png'
import unliked from './unliked.png'
import styles from './productItem.module.scss'
import { addToCart } from '../../../redux/slices/cartSlice'
import { setLike } from '../../../redux/slices/likesSlice'

export function ProductItem({
  inCart, like, product,
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const addHandler = (e) => {
    e.stopPropagation()
    dispatch(addToCart(product.id))
  }
  const likeHandler = (e) => {
    e.stopPropagation()
    dispatch(setLike(product.id))
  }

  return (
    <div
      className={styles.card}
      onClick={() => {
        disablePageScroll()
        navigate(product.id)
      }}
    >
      <div className="d-flex flex-column align-items-center">
        <div className={styles.box}>
          <img className={styles.img} src={product.pictures} alt="" />
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
                {' '}
                р.
              </b>
            </>
          )}

        </div>
        <button
          type="button"
          onClick={addHandler}
          className="btn btn-success m-1"
          {...(inCart && { disabled: true })}
        >
          {!inCart ? 'Добавить' : 'В корзине'}
        </button>
      </div>

      <button type="button" onClick={likeHandler} className={styles.like_button}>
        <img src={like ? liked : unliked} alt="" className={styles.like_img} />
      </button>
    </div>

  )
}
