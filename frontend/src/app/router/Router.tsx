import {createBrowserRouter, RouterProvider, Navigate, Outlet} from 'react-router-dom'
import {SignIn} from '../../pages/Auth/SignIn/SignIn'
import {NotFound} from '../../pages/NotFoundPage/NotFoundPage'
import {SignUp} from '../../pages/Auth/SignUp/SignUp'
import {Home} from '../../pages/Home/ui/Home'

function PrivateRoutes() {
    const isAuthenticated = true
    return isAuthenticated ? <Outlet/> : <Navigate to="/signIn"/>
}

const publicRoutes = [
    {
        path: '/signIn',
        element: <SignIn/>
    },
    {
        path: '/signUp',
        element: <SignUp/>
    },
    {
        path: '*',
        element: <NotFound/>
    }
]

const privateRoutes = [
    {
        path: '/',
        element: <Home/>
    }
]

const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoutes/>,
        children: privateRoutes
    },
    ...publicRoutes
])

export const Routing = () => {
    return <RouterProvider router={router}/>
}
