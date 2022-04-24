//Importera npm-paket och moduler
import express from 'express'
import cors from 'cors'

// import path from 'path'
const app = express()
const PORT = process.env.PORT || 433
import router from './routes/routes.js'
//const staticFolder = path.join(__dirname, 'public')

//Ordning är viktigaste!!

//Middleware
//CORS öppnar vårt projekt så det kan användas från andra domäner
app.use(cors())

//Parse request body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Logger - skriv ut infrmation om inkomnande requset
app.use((req, res, next) => {
    console.log(`Logger: ${req.method} ${req.url}`)
    next()
})

// Serve static files in this folder
app.use(express.static('public'))


//Routes
app.use('/hamsters', router)

//Starta server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
