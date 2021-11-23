/* eslint-disable no-alert */
import React, { useState } from 'react'
import axios from 'axios'
import { Modal } from 'react-bootstrap'

const AddQuestion = props => {
  const [qText, setQText] = useState('')
  const [show, setShow] = useState(false)
  setShow(props)

  const addQuestion = async () => {
    try {
      const question = await axios.post('/api/questions/add', { qText })
    } catch (err) {
      alert('error when adding question')
    }
  }

  const handleClose = e => {
    setShow(false)
  }

  return (
    // <>
    //   <Modal show={setShow}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>Ask a question</Modal.Title>
    //     </Modal.Header>
    //     <input onChange={e => setQText(e.target.value)} />
    //     <br />
    //     <button type="button" onClick={addQuestion}>Ask</button>
    //   </Modal>
    //   <p>Ask a question:</p>
    //   <br />
    //   <input onChange={e => setQText(e.target.value)} />
    //   <br />
    //   <button type="button" onClick={addQuestion}>Ask</button>
    //   <br />
    //   <button type="button">Cancel</button>
    // </>
    <div style={{ visibility: show ? 'visible' : 'hidden' }}>
      <h2>Ask a question</h2>
    </div>
  )
}

export default AddQuestion
