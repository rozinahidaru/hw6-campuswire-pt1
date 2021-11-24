/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Question = props => {
  const [data, setData] = useState([])
  const [answer, setAnswer] = useState('')
  const { loggedIn, question } = props

  useEffect(async () => {
    const { data: questions } = await axios.get('/questions/')
    setData(questions)
  }, [])

  const addAnswer = async () => {
    try {
      const qUpdated = await axios.post('questions/answer', { _id: question._id, answer })
      question.answer = answer
      setAnswer('')
    } catch (err) {
      alert('Error when adding answer')
    }
  }

  return (
    <>
      <>
        <h3><i>{question.questionText}</i></h3>
        <div style={{ marginLeft: 8 }}>
          <h4>
            Author:
            {' '}
            <span style={{ fontWeight: 'normal' }}>
              {question.author}
            </span>
          </h4>
          <h4>
            Answer:
            <span style={{ fontWeight: 'normal' }}>
              {' '}
              {question.answer}
            </span>
          </h4>
          {(loggedIn)
            ? (
              <>
                <p>Answer this question</p>
                <textarea rows="5" cols="50" onChange={e => setAnswer(e.target.value)} value={answer} />
                <br />
                <button type="button" onClick={addAnswer}>Answer</button>
              </>
            )
            : <p />}
        </div>
      </>

    </>
  )
}

export default Question
