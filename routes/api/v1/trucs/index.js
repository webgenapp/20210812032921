const express = require('express')
const router = express.Router()
const { Truc } = require('../../../../models')
const { auth } = require('../../../../middlewares/auth')

router.get('/', auth, async function (req, res, next) {
  const trucs = await Truc.findAll()

  res.send(trucs)
})

router.get('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const truc = await Truc.findOne({ where: { id } })

  res.send(truc)
})

router.post('/', auth, async function (req, res, next) {
  const truc = await Truc.build({
    ...req.body,
  }).save()

  res.status(201)
  res.send(truc)
})

router.delete('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  await Truc.destroy({ where: { id } })

  res.status(204)
  res.send()
})

router.put('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const truc = await Truc.findOne({ where: { id } })

  truc.name = req.body.name

  truc.save()

  res.send(truc)
})

module.exports = router
