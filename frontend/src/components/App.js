/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  useNavigate,
} from 'react-router-dom'

import '../../App.css'

import Question from './Question'
import AddQuestion from './AddQuestion'

const App = () => {
  const [data, setData] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const navigate = useNavigate()

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

  const renderPopup = () => {
    setShowPopup(true)
    // showPopup = true
    console.log(showPopup)
    return (
      <AddQuestion show={showPopup} />
    )
  }

  return (
    <>
      <h1>Campuswire Lite</h1>

      {/* <AddQuestion showPopup={false} /> */}
      <button type="button" onClick={renderPopup}>Ask a question</button>
      <button type="button" onClick={() => navigate('/login')}>Log in to ask a question</button>
      <br />
      <br />
      <Question isLoggedIn={isLoggedIn} />

      {/* <nav>
        <Link to="login">Login</Link>
        <br />
        <Link to="signup">Signup</Link>
      </nav> */}
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
