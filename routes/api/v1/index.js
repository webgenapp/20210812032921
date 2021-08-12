const express = require('express')
const router = express.Router()

const trucsRouter = require('./trucs')
router.use('/trucs', trucsRouter)

const usersRouter = require('./users')
router.use('/users', usersRouter)

module.exports = router
