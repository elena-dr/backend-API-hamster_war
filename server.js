import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 6474

// const staticFolder = path.join(__dirname, 'public')


//Middlware
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log(`Logger: ${req.method} ${req.url} ${req.body}`)
    next()
})

// Serve static files in this folder
// app.use( express.static(staticFolder) )


//Routes
app.use('',)


//Starta server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`)
})