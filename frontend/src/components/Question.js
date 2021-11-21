/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Question = () => {
  const [data, setData] = useState([])
  // const { isLoggedIn } = props
  // const { questionText, author, answer } = question
  const [answer, setAnswer] = useState('')

  useEffect(async () => {
    const { data: questions } = await axios.get('/questions/')
    setData(questions)
  }, [])

  const addAnswer = async q => {
    try {
      await axios.post('api/questions/answer', { _id: q._id, answer })
      q.answer = answer
    } catch (err) {
      alert('Error when adding answer')
    }
  }

  return (
    <>
      <h2>Questions</h2>
      <>
        {/* {isLoggedIn()
          ? (<button type="button">Ask a question</button>)
          : (<button type="button"><Link to="login">Log in to ask a question</Link></button>)} */}

        <button type="button">Ask a question</button>
        <button type="button"><Link to="login">Log in to ask a question</Link></button>
      </>
      <>
        {/* <h4>
          {questionText}
          {' '}
          asked by
          {' '}
          {author}
        </h4>
        <p>
          Answer:
          {' '}
          {answer}
        </p> */}
        {data.map(q => (
          <>
            <h3>{q.questionText}</h3>
            <h4>
              Author:
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
