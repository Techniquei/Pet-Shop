/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from '@tanstack/react-query'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import ru from 'yup-locale-ru'
import setLocale from 'yup/lib/setLocale'
import { getToken } from '../getToken'

import s from './newProduct.module.scss'

async function addProductMutate(values) {
  const res = await fetch('https://api.react-learning.ru/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(values),
  })
  const result = await res.json()
  return result
}

export function NewProduct() {
  const yupSchema = Yup.object().shape({
    available: Yup.boolean().default(true),
    pictures: Yup.string().url(),
    name: Yup.string().required('обязательно напишите название'),
    price: Yup.number().required('обязательно напишите цену'),
    discount: Yup.number().min(1, 'минимум 1'),
    stock: Yup.number().min(1, 'минимум 1'),
    wight: Yup.string(),
    description: Yup.string().required('обязательно напишите описание'),
  })
  Yup.setLocale(ru)

  const { data, mutateAsync, isSuccess } = useMutation({
    mutationKey: ['products'],
    mutationFn: addProductMutate,
    onSuccess: () => {
      console.log(data)
    },
  })

  return (
    <div className={s.container}>
      <div className={s.content}>
        <Formik
          initialValues={{ available: true }}
          validationSchema={yupSchema}
          onSubmit={mutateAsync}
        >
          {({
            errors, touched, isValid, dirty,
          }) => (
            <Form className="w-100">
              <div className={s.form_column}>
                {errors.available && touched.available ? (
                  <div>{errors.available}</div>
                ) : null}

                <div className="form-check">

                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Доступен для заказа
                  </label>
                  <Field type="checkbox" name="available" class="form-check-input mt-0" />
                </div>
                {errors.pictures && touched.pictures ? (
                  <div>{errors.pictures}</div>
                ) : null}
                <div className="input-group mb-3">
                  <label className="input-group-text">
                    URL картинки
                  </label>
                  <Field
                    name="pictures"
                    className="form-control"
                  />
                </div>

                {errors.name && touched.name ? (<div>{errors.name}</div>) : null}
                <div className="input-group mb-3">
                  <label className="input-group-text">
                    Название
                  </label>
                  <Field
                    name="name"
                    className="form-control"
                  />
                </div>
                {errors.price && touched.price ? (<div>{errors.price}</div>) : null}
                <div className="input-group mb-3">
                  <label className="input-group-text">
                    Цена
                  </label>
                  <Field
                    type="number"
                    name="price"
                    className="form-control"
                  />
                  <label className="input-group-text">
                    р.
                  </label>
                </div>
                {errors.discount && touched.discount ? (<div>{errors.discount}</div>) : null}
                <div className="input-group mb-3">
                  <label className="input-group-text">
                    Скидка
                  </label>
                  <Field type="number" name="discount" className="form-control" />
                  <label className="input-group-text">
                    р.
                  </label>
                </div>

                {errors.stock && touched.stock ? (<div>{errors.stock}</div>) : null}
                <div className="input-group mb-3">
                  <label className="input-group-text">
                    В наличии
                  </label>
                  <Field type="number" name="stock" className="form-control" />
                  <label className="input-group-text">
                    шт.
                  </label>
                </div>

                {errors.wight && touched.wight ? (<div>{errors.wight}</div>) : null}
                <div className="input-group mb-3">
                  <label className="input-group-text">
                    Вес
                  </label>
                  <Field name="wight" className="form-control" />
                </div>

                {errors.description && touched.description ? (<div>{errors.description}</div>) : null}
                <div className="input-group mb-3">
                  <label className="input-group-text">
                    Описание
                  </label>
                  <Field name="description" className="form-control" />
                  <label className="input-group-text">
                    г.
                  </label>
                </div>
                <button className="btn btn-success btn-lg" type="submit" disabled={!(dirty && isValid)}>Добавить товар</button>
                {isSuccess ? <h2 className="text-success">Успешно</h2> : ''}
              </div>

            </Form>
          )}

        </Formik>
      </div>
    </div>
  )
}
