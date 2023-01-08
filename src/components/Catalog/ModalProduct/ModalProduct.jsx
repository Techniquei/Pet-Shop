/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react'
import { useSelector } from 'react-redux'
import style from './modalProduct.module.scss'
import like from './like.svg'
import comment from './comment.svg'
import { Comments } from './Comments/Comments'

export function ModalProduct({
  active, setActive, product,
}) {
  const [showedComments, setShowedComments] = useState(false)
  console.log(product)
  const activeModalClass = `${style.modal} ${style.active}`

  const commentsHandler = () => {
    setShowedComments(!showedComments)
  }

  const closeHandler = () => {
    setActive({ active: false, id: 0 })
    setShowedComments(false)
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
                  $
                </b>
              ) : (
                <>
                  <div className="text-decoration-line-through">
                    {product.price}
                    {' '}
                    $
                  </div>
                  {' '}
                  <b>
                    {product.price - product.discount}
                    {' '}
                    $
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
              <button type="button" onClick={commentsHandler} className={style.comment}>
                <i className="fa-solid fa-comment me-2" />
                {product.reviews.length}
              </button>

            </div>
            {showedComments ? <Comments comments={product.reviews} /> : ''}
          </div>
        ) : 0}
      </div>
    </div>
  )
}
