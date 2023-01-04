import { useDispatch } from 'react-redux'
import { decrementInCart, incrementInCart, removeFromCartAC } from '../../../redux/actionCreators/cartAC'
import deleteIcon from './delete.png'

export function CartItem({
  name, price, id, picture, refetch, count,
}) {
  const dispatch = useDispatch()
  const deleteHandler = () => {
    dispatch(removeFromCartAC(id))
    setTimeout(refetch)
  }
  const incrementInCartHandler = () => {
    dispatch(incrementInCart(id))
    setTimeout(refetch)
  }

  const decrementInCartHandler = () => {
    dispatch(decrementInCart(id))
    setTimeout(refetch)
  }

  return (
    <div className="bg-white rounded-4 p-3 m-3 d-flex justify-content-between align-items-end gap-3">
      <div className="d-flex gap-3">

        <img src={picture} alt="" style={{ height: '100px', width: '100px' }} />
        <div className="d-flex flex-column">
          <h5>{name}</h5>
          <p>
            {price}
            {' '}
            р.
          </p>
          <div className="input-group">
            <button type="button" onClick={decrementInCartHandler} className="btn btn-outline-secondary"> - </button>
            <div className="d-flex justify-content-center align-items-center p-2 border border-secondary">
              {count}
              шт.
            </div>
            <button type="button" onClick={incrementInCartHandler} className="btn btn-outline-secondary"> + </button>
          </div>
        </div>
      </div>

      <button onClick={deleteHandler} type="button" className="btn btn-danger d-flex align-items-center justify-content-center px-1 py-1">
        <img src={deleteIcon} alt="" srcSet="" className="h-100" style={{ height: '20px', width: '20px' }} />
      </button>
    </div>
  )
}
