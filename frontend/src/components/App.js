import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [data, setData] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [succeeded, setSucceeded] = useState(false)

  useEffect(async () => {
    const { data: questions } = await axios.get('/questions/')
    setData(questions)
  }, [])

  const createUser = async () => {
    const { userData } = await axios.post('/user/signup', { username, password })
    if (userData === 'user created') {
      setSucceeded(true)
    }
  }

  return (
    <>
      <h1>Your react app!</h1>
      <>
        {data.map(question => (
          <p>
            {question.questionText}
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
        {`${succeeded}`}
      </p>
    </>
  )
}

export default App
