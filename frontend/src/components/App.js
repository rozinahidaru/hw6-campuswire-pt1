/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
      if (response.data === 'no user logged in') {
        setLoggedIn(false)
      } else {
        setLoggedIn(true)
        const user = response.data.split(' ')[0]
        setUsername(user)
      }
    })

    return loggedIn
  }

  useEffect(async () => {
    const intervalID = setInterval(async () => {
      try {
        const { data: questions } = await axios.get('/questions/')
        setData(questions)
        isLoggedIn()
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  const logoutUser = async () => {
    // eslint-disable-next-line no-shadow
    const { data } = await axios.post('/account/logout')
    if (data === 'user is logged out') {
      setLoggedIn(false)
    } else {
      alert('error when logging user out')
    }
  }

  return (
    <>
      <h1>Campuswire Lite</h1>
      <div className="topright">
        <p>{loggedIn ? `Hi ${username}` : ''}</p>
        {loggedIn ? <button type="button" onClick={logoutUser}>Logout</button> : <p />}
      </div>

      {loggedIn
        ? <button type="button" onClick={() => setShowPopup(true)}>Ask a question</button>
        : <button type="button" onClick={() => navigate('/login')}>Log in to ask a question</button>}

      {
        showPopup ? (
          <>
            <AddQuestion setShowPopup={setShowPopup} />
          </>
        )
          : <p>{showPopup}</p>
      }

      <h2>Questions</h2>

      {data.map(q => (
        <Question loggedIn={loggedIn} question={q} key={q._id} />
      ))}

    </>
  )
}

export default App
