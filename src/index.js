import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import App from './App'
import { Authorization } from './components/Authorization/Authorization'
import { Registration } from './components/Registration/Registration'
import { Catalog } from './components/Catalog/Catalog'
import { Profile } from './components/Profile/Profile'

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
      },
      {
        path: 'my_profile',
        element: <Profile />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>

  </React.StrictMode>,
)
