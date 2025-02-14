// src/router/index.tsx
import { RouteObject, useRoutes } from 'react-router-dom';
import HomePage from '@/pages/home';

const routes: RouteObject[] = [
  {
    path: '/',
    // Layout
    // element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
    ]
  },
  // {
  //   path: '*',
  //   element: <NotFound />
  // }
];

export default function Router() {
  return useRoutes(routes);
}
