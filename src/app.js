const express = require('express')
require('./db/mongoose')
const userRoutes = require('./routes/user')
const LeaguesRoutes = require('./routes/leagues')
const NewsRoutes=require('./routes/news')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRoutes)
app.use(LeaguesRoutes)
app.use(NewsRoutes)

app.listen(port, ()=>{
    console.log(`server up on ${port}`)
})