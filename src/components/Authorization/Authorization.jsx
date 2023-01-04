import { useMutation } from '@tanstack/react-query'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'

export function Authorization() {
  const navigate = useNavigate()

  async function signInSubmitMutate(values) {
    const res = await fetch('https://api.react-learning.ru/signin', {
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
    mutationFn: signInSubmitMutate,
    onSuccess: () => {
      let keys
      if (data) {
        keys = Object.keys(data)
        if (keys.includes('token')) {
          localStorage.setItem('token', data.token)
          navigate('/catalog')
        }
      }
    },
  })

  const signInHandler = async (values) => {
    await mutateAsync(values)
  }

  return (
    <div className="d-flex flex-column align-items-center mt-4 gap-3">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => {
          signInHandler(values)
          setTimeout(signInHandler, 500, values)
        }}
      >

        <Form className="d-flex flex-column w-50 gap-3">
          <Field name="email" type="text" placeholder="email" className="rounded-3 p-1" />
          <Field name="password" type="password" placeholder="password" className="rounded-3 p-1" />
          <button type="submit" className="btn btn-success">Войти</button>
          <button onClick={() => { navigate('signup') }} type="button" className="btn btn-primary">Регистрация</button>
        </Form>

      </Formik>

    </div>

  )
}
