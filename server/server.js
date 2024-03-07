const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { firebaseApp } = require('./lib/firebase')
const { getAuth } = require('firebase-admin/auth')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 8080

const corsOptions = {
	origin: process.env.CLIENT_URL,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.get('/authorized', function (req, res) {
	getAuth(firebaseApp)
		.verifyIdToken(req.headers.authorization)
		.then(() => {
			res.json({ message: 'Authorized!' })
		})
		.catch(err => {
			if (err.code === 'app/invalid-credential') {
				res.status(401).json(err)
			}
		})
})

app.listen(port)

console.log('Running on port ', port)
