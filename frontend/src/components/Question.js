/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Question = props => {
  const [data, setData] = useState([])
  // const { isLoggedIn } = props
  // const { questionText, author, answer } = question
  const [answer, setAnswer] = useState('')
  const { loggedIn } = props

  useEffect(async () => {
    const { data: questions } = await axios.get('/questions/')
    setData(questions)
  }, [])

  const addAnswer = async q => {
    try {
      const qUpdated = await axios.post('questions/answer', { _id: q._id, answer })
      console.log(q)
      console.log(qUpdated)
      q.answer = answer
      // console.log(q.answer)
    } catch (err) {
      alert('Error when adding answer')
    }
  }

  return (
    <>
      <h2>Questions</h2>
      <>
        {data.map(q => (
          <>
            <h3><i>{q.questionText}</i></h3>
            <div style={{ marginLeft: 8 }}>
              <h4>
                Author:
                {' '}
                <span style={{ fontWeight: 'normal' }}>
                  {q.author}
                </span>
              </h4>
              <h4>
                Answer:
                <span style={{ fontWeight: 'normal' }}>
                  {' '}
                  {q.answer}
                </span>
              </h4>
              {(loggedIn)
                ? (
                  <>
                    <p>Answer this question</p>
                    <textarea rows="5" cols="50" onChange={e => setAnswer(e.target.value)} />
                    <br />
                    <button type="button" onClick={addAnswer}>Answer</button>
                  </>
                )
                : <p />}
            </div>
          </>
        ))}
      </>

    </>
  )
}

export default Question
