import { useDispatch, useSelector } from 'react-redux'
import liked from './liked.png'
import unliked from './unliked.png'
import { addToCartAC } from '../../../redux/actionCreators/cartAC'
import styles from './productItem.module.scss'
import { likeAC } from '../../../redux/actionCreators/likesAC'

export function ProductItem({
  name, price, id, pictures, inCart, like,
}) {
  const dispatch = useDispatch()
  const addHandler = () => {
    dispatch(addToCartAC(id))
  }
  const likeHandler = () => {
    dispatch(likeAC(id))
    console.log(id)
  }

  return (
    <div className={styles.card}>
      <div className="d-flex flex-column align-items-center">
        <div className="box">
          <img src={pictures} alt="" />
        </div>

        <h5>{name}</h5>
        <b>
          {price}
          {' '}
          $
        </b>
      </div>
      <button
        type="button"
        onClick={addHandler}
        className="btn btn-success m-1"
        {...(inCart && { disabled: true })}
      >
        {!inCart ? 'Добавить' : 'В корзине'}
      </button>
      <button type="button" onClick={likeHandler} className={styles.like_button}>
        <img src={like ? liked : unliked} alt="" className={styles.like_img} />
      </button>
    </div>

  )
}
