import React from 'react'
import {Route, redirect as Redirect} from 'react-router-dom'


export default function PrivateRoute(props) {

  const user = null
  if(!user) return <Redirect to="/login"/>

  return (
    <Route {...props}/>
  )
}
