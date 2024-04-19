import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import NotFoundPage from './pages/error-page.tsx'
import RootPage from './pages/root-page.tsx'
import FormPage from './pages/form-page.tsx'
import TablePage from './pages/table-page.tsx'
import ChartPage from './pages/chart-page.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <NotFoundPage />,
    children:[
      {
        path :'/',
        element: <FormPage />
      },
      {
        path :'users',
        element: <TablePage />
      },
      {
        path :'users/:userId',
        element: <ChartPage />
      },

    ],
  }
]);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
