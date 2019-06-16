const path = require('path')

const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

require('dotenv').config()

mongoose.connect(process.DB_URL, { useNewUrlParser: true, })

app.use((req, res, next) => {
  req.io = io
  next()
})

app.use(cors())

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

app.use(require('./routes'))

server.listen(3333)
