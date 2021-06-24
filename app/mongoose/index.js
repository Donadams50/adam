const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const dotenv = require('dotenv')
dotenv.config()

const db = {}
db.mongoose = mongoose
db.url = process.env.url

// db.user_managements = require("../models/user")(mongoose);
// db.authentications = require("../models/authentication")(mongoose);
// db.tickets = require("../models/ticket")(mongoose);
// db.terminals = require("../models/terminal")(mongoose);
// db.transactions = require("../models/transaction")(mongoose);
// db.initiate_transactions = require("../models/initiateTransaction")(mongoose);
// db.offenders = require("../models/offender")(mongoose);
// db.roles = require("../models/role")(mongoose);
// db.offences = require("../models/offence")(mongoose);
// db.tokens = require("../models/token")(mongoose);

//console.log(db.url)  
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useFindAndModify: false
  })
  .then(() => {
    console.log('Connected to the database!')
  })
  .catch(err => {
    console.log('Cannot connect to the database!', err)
    process.exit()
  })
module.exports = db