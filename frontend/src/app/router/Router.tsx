import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom'
import { Login } from '../../pages/Login'
import { NotFound } from '../../pages/NotFoundPage'

// import { HomePage } from './pages/HomePage'
// import { LoginPage } from './pages/LoginPage'
// import { VideoPage } from './pages/VideoPage'
// import { BrowsePage } from './pages/BrowsePage'
// import { FavoritesPage } from './pages/FavoritesPage'
// import { ProfilePage } from './pages/ProfilePage'
// import { NotFoundPage } from './pages/NotFoundPage'

function PrivateRoutes() {
  const isAuthenticated = true
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

// Приватные маршруты (только для авторизованных пользователей)
const privateRoutes = [
  // {
  //   path: '/',
  //   element: <HomePage />
  // },
  // {
  //   path: '/browse',
  //   element: <BrowsePage />
  // },
  // {
  //   path: '/video/:id',
  //   element: <VideoPage />
  // },
  // {
  //   path: '/favorites',
  //   element: <FavoritesPage />
  // },
  // {
  //   path: '/profile',
  //   element: <ProfilePage />
  // }
]

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes
  },
  ...publicRoutes
])

export const Routing = () => {
  return <RouterProvider router={router} />
}
