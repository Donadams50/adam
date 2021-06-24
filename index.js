const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const bodyparser = require('body-parser')
const express = require('express')
dotenv.config()
const app = express()
const port = process.env.PORT || 8000
app.use(bodyparser.json())
app.use(cors())

require('./app/mongoose')
require('./app/routes/user.route')(app)
require('./app/routes/authentication.route')(app)
require('./app/routes/role.route')(app)

app.use(express.static(path.join(__dirname, 'public')))
 

const server = app.listen(port, function () {
  console.log(`listening on port ${port}`)
})

module.exports = server
  