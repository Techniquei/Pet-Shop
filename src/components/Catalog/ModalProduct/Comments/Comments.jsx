import {
  useMutation, useQuery, useQueryClient,
} from '@tanstack/react-query'
import { useState } from 'react'
import { getToken } from '../../../getToken'
import { Loader } from '../../../Loader/Loader'
import s from './comments.module.scss'

async function getReviewsById(id, token) {
  const reviewsFetch = await fetch(`https://api.react-learning.ru/products/review/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  const reviews = await reviewsFetch.json()
  return reviews
}

async function sendReviewMutate(text, rating, token, productId) {
  const res = await fetch(`https://api.react-learning.ru/products/review/${productId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      rating,
      text,
    }),
  })
  const result = await res.json()
  return result
}

async function deleteReviewMutate(token, productId, reviewId) {
  const res = await fetch(`https://api.react-learning.ru/products/review/${productId}/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  const result = await res.json()
  return result
}

export function Comments({ productId, myId }) {
  const [inputState, setInputState] = useState('')
  const [ratingState, setRatingState] = useState(5)
  const inputHandler = (event) => {
    setInputState(event.target.value)
  }

  const token = getToken()

  const queryClient = useQueryClient()

  const { data, isFetching } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => getReviewsById(productId, token),
  })

  const mutationAdd = useMutation({
    mutationFn: () => sendReviewMutate(inputState, ratingState, token, productId),
    mutationKey: ['reviews'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
    },
  })

  const mutationDelete = useMutation({
    mutationFn: (reviewId) => deleteReviewMutate(token, productId, reviewId),
    mutationKey: ['reviews'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
    },
  })

  if (isFetching || mutationAdd.isLoading || mutationDelete.isLoading) {
    return <Loader />
  }

  return (
    <>
      <div className="w-100 my-2 d-flex flex-column">
        <textarea className="form-control" placeholder="Оставьте свой отзыв" id="floatingTextarea" value={inputState} onChange={inputHandler} />
        {inputState.length > 0
          ? (

            <div className="form-outline d-flex justify-content-between align-items-center my-2">
              <div className="input-group input-group-sm w-50">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">Ваша оценка</span>
                </div>
                <input min="1" max="5" type="number" className="form-control" value={ratingState} onChange={async (e) => { setRatingState(e.target.value) }} style={({ fontWeight: 700, fontSize: '1rem', width: '10px' })} />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fa-solid fa-star text-warning" style={({ lineHeight: 1, fontSize: '1.5rem' })} />

                  </span>
                </div>
              </div>

              <button className="btn btn-primary" type="button" onClick={mutationAdd.mutateAsync}>Оставить отзыв</button>
            </div>
          )

          : null}
      </div>
      {data.length === 0 ? (
        <div className="d-flex justify-content-center fs-4">
          Отзывов нет
        </div>
      ) : (
        <ul className="list-group w-100">
          {
            data.map((review) => (
              <li className="list-group-item">
                <div className="d-flex gap-3 w-100">
                  <img className={`${s.avatar} flex-shrink-0`} src={review.author.avatar} alt="" srcSet="" />
                  <div className="w-100">
                    <div className="d-flex justify-content-between w-100">
                      <div className="fs-5">{review.author.name}</div>
                      <div className="d-flex  align-items-center text-warning gap-1">
                        <div className="fs-5 lh-1 fw-bold">{review.rating}</div>
                        <i className="fa-solid fa-star  fs-5" />
                      </div>
                    </div>
                    <div>{review.text}</div>
                    <div className="d-flex justify-content-end fw-lighter fs-6 fst-italic">
                      {review.author._id === myId ? <button type="button" className="btn btn-danger btn-sm me-3" onClick={() => mutationDelete.mutateAsync(review._id)}>удалить</button> : ''}
                      {(new Date(Date.parse(review.created_at))).toLocaleDateString('en-US')}
                    </div>

                  </div>

                </div>
              </li>
            ))
        }
        </ul>
      )}

    </>

  )
}
