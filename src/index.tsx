import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from "react-query";
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './error-page';
import DisplayUsers from './users/service/DisplayUsers';
import DisplayUserDetails from './users/service/DisplayUserDetails';
import UpdateUser from './users/service/UpdateUser';
import CreateUser from './users/service/CreateUser';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "users",
        element: <DisplayUsers/>,
      }/* ,
      {
        path: "users/:id",
        element: <DisplayUserDetails/>,
      } *//* ,
      {
        path: "users/edit/:id",
        element: <UpdateUser/>,
      },
      {
        path: "users/create",
        element: <CreateUser/>,
      } */
    ],
  },
]);
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
/* root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <App />
    </QueryClientProvider>
  </React.StrictMode>
); */
root.render(
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <App />
    </QueryClientProvider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
