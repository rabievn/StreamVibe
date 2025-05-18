import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom'
import { Login } from '../../pages/Login/Login'
import { NotFound } from '../../pages/NotFoundPage/NotFoundPage'

function PrivateRoutes() {
  const isAuthenticated = false
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

const publicRoutes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound />
  }
]

const privateRoutes = [
  {
    path: '/',
    element: <div>123</div>
  }
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoutes />,
    children: privateRoutes
  },
  ...publicRoutes
])

export const Routing = () => {
  return <RouterProvider router={router} />
}
