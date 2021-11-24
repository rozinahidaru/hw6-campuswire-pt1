/* eslint-disable no-alert */
import React, { useState } from 'react'
import axios from 'axios'
import { Modal } from 'react-bootstrap'

const AddQuestion = props => {
  const [questionText, setQText] = useState('')
  const { setShowPopup } = props

  const addQuestion = async () => {
    try {
      const question = await axios.post('/questions/add', { questionText })
      setShowPopup(false)
    } catch (err) {
      alert('error when adding question')
    }
  }

  const handleClose = () => {
    setShowPopup(false)
  }

  return (
    <>
      <>
        <div>
          <h3>Ask a question</h3>
          <textarea rows="8" cols="40" onChange={e => setQText(e.target.value)} />
          <br />
          <button type="button" onClick={addQuestion} style={{ marginRight: 8 }}>Ask</button>
          <button type="button" onClick={handleClose}>Cancel</button>
        </div>
      </>

    </>
  )
}

export default AddQuestion
