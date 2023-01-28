import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Provider } from 'react-redux'
import App from './App'
import { Authorization } from './components/Authorization/Authorization'
import { Registration } from './components/Registration/Registration'
import { Catalog } from './components/Catalog/Catalog'
import { Profile } from './components/Profile/Profile'
import { Cart } from './components/Cart/Cart'
import { store } from './redux/store'
import { Liked } from './components/Liked/Liked'
import { NewProduct } from './components/NewProduct/NewProduct'
import { ModalProduct } from './components/Catalog/ModalProduct/ModalProduct'
import { ChangeProduct } from './components/ChangeProduct/ChangeProduct'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Authorization />,
      },
      {
        path: 'signUp',
        element: <Registration />,
      },
      {
        path: 'catalog',
        element: <Catalog />,
        children: [
          {
            path: ':id',
            element: <ModalProduct />,
          },
        ],
      },
      {
        path: 'my_profile',
        element: <Profile />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'liked',
        element: <Liked />,
      },
      {
        path: 'newProduct',
        element: <NewProduct />,
      },
      {
        path: 'editProduct',
        element: <ChangeProduct />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>

  </React.StrictMode>,
)
