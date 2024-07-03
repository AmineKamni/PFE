require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose =require('mongoose')
const offersRoutes = require('./routes/offers.js')
const authRoutes = require('./routes/auth.js')
const reportRoutes = require('./routes/report.js')
const userRoutes = require('./routes/user.js')
const applyRoutes = require('./routes/apply.js')
const pfeRoutes = require('./routes/pfe.js')
const notificationRoutes =require('./routes/notifications.js')
const pdfRoutes =require('./routes/pdf.js')
const dashRoutes =require('./routes/dash.js')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json())

app.use('/api/offers',offersRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/report',reportRoutes)
app.use('/api/user', userRoutes)
app.use('/api/apply',applyRoutes )
app.use('/api/pfe', pfeRoutes)
app.use('/api/notifications',notificationRoutes)
app.use('/api/pdf', pdfRoutes)
app.use('/api/dash', dashRoutes)
mongoose.connect(process.env.MONGO_URI).then(() =>{
    app.listen(process.env.PORT, () => console.log("Connected to DB and running on: ", process.env.PORT))
}).catch(error => {
    console.log(error)
})

