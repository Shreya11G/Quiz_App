import { useState } from 'react'
import Navbar from './components/Navbar'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Register from './components/Register'
import AddQuestion from './components/AddQuestion'
import Dashboard from './components/Dashboard'
import Quiz from './components/Quiz'
import UserDashboard from './components/UserDashboard'
import PrivateRoute from './components/PrivateRoute'
import Login from './components/Login'
import './App.css'

const App =() => {
  const router= createBrowserRouter([
    {
      path:'/',
      element:<><Register/></>
    },
    {
      path:'/add-question',
      element:<><AddQuestion/></>
    },
    {
      path:'/dashboard',
      element:<><Navbar/><PrivateRoute element={Dashboard} /></>
    },
    {
      path:'/quiz/:category',
      element:<><Navbar/><Quiz/></>
    },
    {
      path:'/user-dashboard',
      element:<><Navbar/><PrivateRoute element={UserDashboard }/></>
    },
    {
      path:'/login',
      element:<><Login/></>
    }
  ])

  return (
    <div>
      
      <RouterProvider router  ={router}/>
    </div>
  )
}

export default App
