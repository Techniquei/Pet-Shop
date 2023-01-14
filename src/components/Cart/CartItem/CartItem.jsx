import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  decrementInCart, incrementInCart, removeFromCart, selectInCart,
} from '../../../redux/slices/cartSlice'

export function CartItem({
  name, price, id, picture, count, discount, stock, checked,
}) {
  const dispatch = useDispatch()
  const deleteHandler = () => {
    dispatch(removeFromCart(id))
  }
  const incrementInCartHandler = () => {
    dispatch(incrementInCart(id))
  }

  const decrementInCartHandler = () => {
    dispatch(decrementInCart(id))
  }

  const [check, setChecked] = useState(checked)

  function handleChange() {
    setChecked(!checked)
    dispatch(selectInCart(id))
  }

  return (
    <div className="bg-white rounded-4 p-3 m-3 d-flex justify-content-between gap-3">
      <div className="d-flex gap-3">

        <img src={picture} alt="" style={{ height: '100px', width: '100px' }} />
        <div className="d-flex flex-column">
          <h5>{name}</h5>
          <div>
            {discount === 0 ? (
              <div className="fs-5">
                {price}
                р.
              </div>
            ) : (
              <>
                <div className="text-decoration-line-through">
                  {price}
                  {' '}
                  р.
                </div>
                {' '}
                <div className="fs-5">
                  {price - discount}
                  {' '}
                  р.
                </div>
              </>
            )}

          </div>
          <div className="input-group">
            <button type="button" onClick={decrementInCartHandler} className="btn btn-outline-secondary" disabled={!(count > 1)}>
              <i className="fa-solid fa-minus"> </i>
            </button>
            <div className="d-flex justify-content-center align-items-center p-2 border border-secondary">
              {count}
              {' '}
              шт.
            </div>
            <button type="button" onClick={incrementInCartHandler} className="btn btn-outline-secondary" disabled={!(count < stock)}>
              <i className="fa-solid fa-plus" />
            </button>
          </div>
          <div className="text-secondary">
            В наличии
            {' '}
            {stock}
            {' '}
            шт.
          </div>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-between">
        <input className="form-check-input fs-4" type="checkbox" value="" id="flexCheckDefault" checked={check} onChange={handleChange} />
        <button onClick={deleteHandler} type="button" className="btn-close" aria-label="Close" />
      </div>
    </div>
  )
}
