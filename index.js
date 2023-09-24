require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const UserRoutes = require('./routes/UserRoutes')
const UrlRoutes = require('./routes/UrlRoutes')
const URLperUser = require('./routes/URLperUser')
const {handleRedirect} = require('./controllers/UrlController')
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api/url',UrlRoutes)
app.use('/api/user', UserRoutes);
app.get('/:shortId',handleRedirect)
app.use('/user',URLperUser)



mongoose.connect(process.env.MONGO_CONNECT_URI)
  .then(() => {

    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })