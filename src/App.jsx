import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Router from "./Router"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import AboutUs from "./pages/About"
import ContactUs from "./pages/Contact"

function App() {
  let router = createBrowserRouter([
    {
      path: '/',
      element: <Router />,
      children: [
        {
          path: '',
          element: <Landing />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'signup',
          element: <SignUp />
        },
        {
          path: 'dashboard',
          element: <Dashboard />
        },
        {
          path: 'about',
          element: <AboutUs />
        },
        {
          path: 'contact',
          element: <ContactUs />
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
