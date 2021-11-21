import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Question = () => {
  const [data, setData] = useState([])

  useEffect(async () => {
    const { data: questions } = await axios.get('/questions/')
    setData(questions)
  }, [])

  return (
    <>
      <h3>Questions</h3>
      <>
        {data.map(q => (
          <>
            <h5>{q.questionText}</h5>
            <h7>
              Author:
              {' '}
              {q.author}
            </h7>
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
