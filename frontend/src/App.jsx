import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
