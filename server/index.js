const PORT = 8000
const express = require('express')
const { MongoClient } = require('mongodb')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config();
const uri = process.env.MONGODB_URI;


const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json('hello world')
});
app.post('/signup', async (req, res) => {
    const client = new MongoClient(uri)
    const { email, password } = req.body

    const generatedUserId = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await client.connect();
        const database = client.db('tinder-data')
        const users = database.collection('users')

        const existingUser = await users.findOne({ email })

        if (existingUser) {
            return res.status(409).send('User already exists')
        }

        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword,
        }

        const insertedUser = await users.insertOne(data)

        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60*24,
        })

        res.status(201).json({ token, userId: generatedUserId, email: sanitizedEmail })

    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    } finally {
        await client.close()
    }
})

app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)

    try {
        await client.connect()
        const database = client.db('tinder-data')
        const users = database.collection('users')

        const returnedUsers = await users.find().toArray()
        res.send(returnedUsers)
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    } finally {
        await client.close()
    }
});

app.listen(PORT, () => console.log("server is running on port " + PORT))
