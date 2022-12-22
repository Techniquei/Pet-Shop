import { useMutation } from '@tanstack/react-query'
import { Formik, Form, Field } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Registration() {
  const [message, setMessage] = useState('Страница регистрации')
  const navigate = useNavigate()

  async function signUpSubmitMutate(values) {
    const res = await fetch('https://api.react-learning.ru/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    const result = await res.json()
    return result
  }

  const { data, mutateAsync } = useMutation({
    mutationFn: signUpSubmitMutate,
    onSuccess: () => {
      let keys
      if (data) {
        keys = Object.keys(data)
        if (keys.includes('name')) {
          navigate('/')
        } else {
          setMessage(data.message)
        }
      }
    },
  })

  const signUpHandler = async (values) => {
    await mutateAsync(values)
  }

  return (
    <div className="d-flex flex-column align-items-center mt-4 gap-5">
      <div>
        {message}
      </div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => {
          signUpHandler(values)
          setTimeout(signUpHandler, 500, values)
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
