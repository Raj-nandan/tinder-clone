const PORT = 8000

const express = require('express')
const { MongoClient } = require('mongodb')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config();
const uri = process.env.MONGODB_URI;

const multer = require('multer')
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
})


const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json('hello world')
})

// ----------login user in-------------

app.post('/login', async (req, res) => {
    const client = new MongoClient(uri)
    const { email, password } = req.body

    try {
        await client.connect()
        const database = client.db('tinder-data')
        const users = database.collection('users')

        const user = await users.findOne({ email })

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const passwordMatch = await bcrypt.compare(password, user.hashed_password)

        if (passwordMatch) {
            const token = jwt.sign({ userId: user.user_id }, email, { expiresIn: '24h' })
            res.status(201).json({ token, userId: user.user_id, email: user.email })
        } else {
            res.status(400).json({ error: 'Invalid credentials' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' })
    } finally {
        await client.close()
    }
})


// ----------signingup user -------------

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
            return res.status(409).json({ error: 'User with this email already exists' })
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

// ----------get all users-------------

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
})


// ----------update user detail and onboarding-------------

app.put('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const formData = req.body.formData
    const userId = req.body.userId // Add this line

    // console.log(formData)

    try { 
        await client.connect()
        const database = client.db('tinder-data')
        const users = database.collection('users')

        const query = { user_id: userId }
        const updateDocument = {
            $set:{
                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                show_gender: formData.show_gender,
                gender_identity: formData.gender_identity,
                gender_interest: formData.gender_interest,
                url: req.file ? `/uploads/${req.file.filename}` : formData.url,
                about: formData.about,
                matches: formData.matches
            },
        }

        const insertedUser = await users.updateOne(query, updateDocument)
        
        res.send(insertedUser)

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' })
    } finally {
        await client.close()
    }
})

















app.listen(PORT, () => console.log("server is running on port " + PORT))
