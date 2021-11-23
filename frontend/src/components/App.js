/* eslint-disable no-alert */
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
  const [username, setUsername] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const navigate = useNavigate()

  const isLoggedIn = async () => {
    await axios.post('/account/').then(response => {
      // console.log(response.data)
      // console.log(response.data.split(' ')[0])
      // const user = response.data.split(' ')[0]
      // setUsername(user)
      // console.log(typeof (response.data.split(' ')[0]))
      // console.log(username)
      if (response.data === 'no user logged in') {
        setLoggedIn(false)
      } else {
        setLoggedIn(true)
        const user = response.data.split(' ')[0]
        setUsername(user)
        console.log(username)
      }
    })

    return loggedIn
  }

  useEffect(async () => {
    const { data: questions } = await axios.get('/questions/')
    setData(questions)
    isLoggedIn()
  }, [])

  const logoutUser = async () => {
    const { data } = await axios.post('/account/logout')
    if (data === 'user is logged out') {
      setLoggedIn(false)
    } else {
      alert('error when logging user out')
    }
  }

  const renderPopup = () => {
    setShowPopup(true)
    console.log(showPopup)
    return (
      <AddQuestion show={showPopup} />
    )
  }

  return (
    <>
      <h1>Campuswire Lite</h1>
      <p>{loggedIn ? `Hi ${username}` : ''}</p>

      {/* <AddQuestion showPopup={false} /> */}
      {loggedIn
        ? <button type="button" onClick={renderPopup}>Ask a question</button>
        : <button type="button" onClick={() => navigate('/login')}>Log in to ask a question</button>}

      <br />
      <br />
      <Question isLoggedIn={isLoggedIn} />

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
