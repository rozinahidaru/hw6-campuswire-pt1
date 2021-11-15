const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()
const Question = require('../models/question')

router.get('/', (req, res, next) => {
  Question.find({}, (err, qs) => {
    if (err) {
      next(err)
    } else if (qs) {
      res.send(qs)
    }
  })
})

router.post('/add', isAuthenticated, async (req, res, next) => {
  const { questionText } = req.body
  const user = req.session.username

  try {
    const question = await Question.create({ questionText, author: user })
    res.send(`question add success: ${question}`)
  } catch (err) {
    next(err)
  }
})

router.post('/answer', isAuthenticated, async (req, res) => {
  const { _id, answer } = req.body

  try {
    const qUpdated = await Question.findOneAndUpdate({ _id }, { answer }, { useFindAndModify: true })
    res.send(`answer added success to question ${_id}`)
  } catch (err) {
    res.send(`answer add error with question ${_id}: `, err)
  }
})

module.exports = router
