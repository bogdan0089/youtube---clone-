import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import AppLayout from './components/layout/AppLayout'
import RequireAuth from './components/RequireAuth'
import ChannelPage from './pages/ChannelPage'
import CreateChannelPage from './pages/CreateChannelPage'
import EditChannelPage from './pages/EditChannelPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import RegisterPage from './pages/RegisterPage'

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ':atHandle', element: <ChannelPage /> },
      { path: 'channel/new', element: <RequireAuth><CreateChannelPage /></RequireAuth> },
      { path: 'channel/edit', element: <RequireAuth><EditChannelPage /></RequireAuth> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
