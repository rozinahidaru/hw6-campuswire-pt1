/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

import isLoggedIn from './App'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginSuccess, setSuccess] = useState(false)

  const navigate = useNavigate()

  const loginUser = async () => {
    const { data } = await axios.post('/account/login', { username, password })
    if (data === 'user login successful') {
      setSuccess(true)
      navigate('../')
    } else {
      alert('incorrect username or password')
    }
  }

  return (
    <>
      <h1>Login Page</h1>
      <br />
      username:
      <input onChange={e => setUsername(e.target.value)} />
      <br />
      password:
      <input onChange={e => setPassword(e.target.value)} />
      <br />
      <button type="button" onClick={loginUser}>login</button>
      <p>
        succeeded:
        {` ${loginSuccess}`}
      </p>
      <nav>
        <p>
          Don&#39;t have an account?
          <Link to="../signup"> Sign up!</Link>
        </p>
        <br />
        <Link to="/">Home</Link>
      </nav>
    </>
  )
}

export default Login
