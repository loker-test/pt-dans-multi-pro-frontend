import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import AuthLogin from "./pages/auth/login";
import {QueryClient, QueryClientProvider} from "react-query";
import {AuthMiddleware} from "./pages/auth-middleware.jsx";
import JobList from "./pages/job-list.jsx";
import JobDetail from "./pages/job-detail.jsx";

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: (<AuthMiddleware><JobList /></AuthMiddleware>)
  },
  {
    path: '/job/:id',
    element: (<AuthMiddleware><JobDetail /></AuthMiddleware>)
  },
  {
    path: '/auth/login',
    element: <AuthLogin />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
