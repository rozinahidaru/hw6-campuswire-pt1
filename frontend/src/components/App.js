/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from 'react-router-dom'

import Question from './Question'

const App = () => {
  const [data, setData] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(async () => {
    const { data: questions } = await axios.get('/questions/')
    setData(questions)
  }, [])

  const isLoggedIn = async () => {
    const { data } = await axios.post('/account/')
    if (data === 'no user logged in') {
      setLoggedIn(false)
    } else {
      setLoggedIn(true)
    }
    return loggedIn
  }

  const logoutUser = async () => {
    const { data } = await axios.post('/account/logout')
    if (data === 'user is logged out') {
      setLoggedIn(false)
    }
  }

  return (
    <>
      <h1>Campuswire Lite</h1>

      <Question isLoggedIn={isLoggedIn} />

      {/* <Router>
        <Link to="/login">Login</Link>
      </Router> */}
      <nav>
        <Link to="login">Login</Link>
        <br />
        <Link to="signup">Signup</Link>
      </nav>
      <br />
      <button type="button" onClick={logoutUser}>Logout</button>

      <p>
        user logged in:
        {` ${loggedIn}`}
      </p>
    </>
  )
}

export default App
