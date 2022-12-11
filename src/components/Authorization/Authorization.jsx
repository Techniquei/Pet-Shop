import { Formik, Form, Field } from 'formik'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Authorization() {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) {
      navigate('/catalog')
      console.log('токен имеется')
    }
  })

  return (
    <div className="d-flex flex-column align-items-center mt-4 gap-5">
      <div>Страница авторизации</div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => {
          console.log(values)
          fetch('https://api.react-learning.ru/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          }).then((responce) => responce.json()).then((json) => {
            console.log(json)
            if (json.error || json.err) {
              throw new Error(json.message)
            } else {
              window.localStorage.setItem('token', json.token)
              navigate('/catalog')
            }
          }).catch((error) => {
            alert(error)
          })
        }}
      >

        <Form className="d-flex flex-column w-50 gap-3">
          <Field name="email" type="text" placeholder="email" />
          <Field name="password" type="text" placeholder="password" />
          <button type="submit" className="btn btn-success">Войти</button>
        </Form>

      </Formik>
      <button onClick={() => { navigate('signup') }} type="button" className="btn btn-primary">Регистрация</button>
    </div>

  )
}
