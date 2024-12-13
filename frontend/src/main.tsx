import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContexts';
import Signin from './components/signIn/SignIn';
import Signup from './components/signUp/SignUp';
import Layout from './layout/Layout';
import FormBuilder from './components/dashboard/FormBuilder';
import { FormsPage } from './components/dashboard/FormsPage';
import FormEditPage from './components/dashboard/FormEditPage';
import FormResponsePage from './components/response/FormResponsePage';
import LandingPage from './components/landingpage/LandingPage';

// Define the routes using nested routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/sign-in',
    element: <Signin />,
  },
  {
    path: '/sign-up',
    element: <Signup />,
  },
  {
    path: 'response/:username/:formId',
    element: <FormResponsePage />,
  },
  {
    path: '/dashboard',
    element: <Layout />,
    children: [
      {
        path: 'home',
        element: <FormsPage />,
      },
      {
        path: 'build',
        element: <FormBuilder />,
      },
      {
        path: 'forms/edit/:formId',
        element: <FormEditPage />,
      },

      // You can add more nested routes here if needed
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
