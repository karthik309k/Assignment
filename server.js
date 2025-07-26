const express = require('express')
const app = express()
const loanRoutes = require('./routes/loanRoutes')
const bodyParser = require('body-parser')
// server.js (backend)
const cors = require('cors')
app.use(cors())

app.use(bodyParser.json())
app.use('/api', loanRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
