const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config();

const userRoute = require('./api/routes/UserRoutes')

const app = express()

mongoose.connect(process.env.dbUrl, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
)
    .then(r => console.log("Connection ok"))
    .catch(err => console.log(err));


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api/users', userRoute)


app.get('/', (req, res) => {
    res.json('Hello World')
})

const PORT = process.env.PORT || 4200
app.listen(PORT, () => {
    console.log('The app is running on ' + PORT)
})

