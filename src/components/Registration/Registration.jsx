import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'

export function Registration() {
  const navigate = useNavigate()
  return (
    <div className="d-flex flex-column align-items-center mt-4 gap-5">
      <div>
        Страница регистрации
      </div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => {
          console.log(values)
          fetch('https://api.react-learning.ru/signup', {
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
              navigate('/')
            }
          }).catch((error) => {
            alert(error)
          })
        }}
      >

        <Form className="d-flex flex-column w-50 gap-3">
          <Field name="email" type="text" placeholder="Почта" />
          <Field name="group" type="text" placeholder="Группа" />
          <Field name="password" type="text" placeholder="Пароль" />
          <button type="submit" className="btn btn-success">Создать аккаунт</button>
        </Form>

      </Formik>

    </div>
  )
}
