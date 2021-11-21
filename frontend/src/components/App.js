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

const App = () => {
  const [data, setData] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [succeeded, setSucceeded] = useState(false)

  useEffect(async () => {
    const { data: users } = await axios.get('/account/all')
    setData(users)
  }, [])

  const createUser = async () => {
    const { data } = await axios.post('/account/signup', { username, password })
    if (data === 'user signup success') {
      setSucceeded(true)
    }
  }

  return (
    <>
      <h1>Campuswire Lite</h1>
      <>
        {data.map(user => (
          <p>
            {user.username}
          </p>
        ))}
      </>
      username:
      <input onChange={e => setUsername(e.target.value)} />
      <br />
      password:
      <input onChange={e => setPassword(e.target.value)} />
      {/* <button
        type="button"
        onClick={() => {
          axios.post('/user/signup', { username, password })
        }}
      >
        create user
      </button> */}
      <button type="button" onClick={createUser}>create user</button>
      <p>
        succeeded:
        {` ${succeeded}`}
      </p>

      {/* <Router>
        <Link to="/login">Login</Link>
      </Router> */}
      <nav>
        <Link to="login">Login</Link>
        <br />
        <Link to="signup">Signup</Link>
      </nav>
    </>
  )
}

export default App
