const express = require('express')
const app = express()
const employeeRoutes = require('./routes/employeeRoutes')
const userRoutes = require('./routes/userRoutes')
require('dotenv').config()
require('./db/connection')
const cors = require('cors')

app.use(cors())
app.use('/employees',employeeRoutes)
app.use('/users',userRoutes)
app.use(express.json());
app.listen(process.env.PORT, () =>{
    console.log('Employee management app listening on port 3000!')
})