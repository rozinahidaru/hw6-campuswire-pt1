import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Question = isLoggedIn => {
  const [data, setData] = useState([])

  useEffect(async () => {
    const { data: questions } = await axios.get('/questions/')
    setData(questions)
  }, [])

  return (
    <>
      <h3>Questions</h3>
      <>
        {isLoggedIn
          ? <button type="button">Ask a question</button>
          : <button type="button" onClick={<Link to="login">Login</Link>}>Log in to ask a question</button>}
      </>
      <>
        {data.map(q => (
          <>
            <h4>
              {q.questionText}
              {' '}
              asked by
              {' '}
              {q.author}
            </h4>
            <p>
              Answer:
              {' '}
              {q.answer}
            </p>
          </>
        ))}
      </>

    </>
  )
}

export default Question
