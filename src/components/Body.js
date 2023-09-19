import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login/>
        },
        {
            path: "/browse",
            element: <Browse/>
        }
    ])

    //we are using this to store the user details after logging in and logging out once from the redux store or app

  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body