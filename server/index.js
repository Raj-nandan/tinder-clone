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
})

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
// app.post('/signup', async (req, res) => {
//     const client = new MongoClient(uri);
//     const { email, password } = req.body;

//     // Input validation
//     if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
//         return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     const sanitizedEmail = email.toLowerCase().trim();

//     try {
//         await client.connect();
//         const database = client.db('tinder-data');
//         const users = database.collection('users');

//         const existingUser = await users.findOne({ email: sanitizedEmail });

//         if (existingUser) {
//             return res.status(409).json({ error: 'User already exists' });
//         }

//         const generatedUserId = uuidv4();
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = {
//             user_id: generatedUserId,
//             email: sanitizedEmail,
//             hashed_password: hashedPassword,
//             created_at: new Date(),
//         };

//         await users.insertOne(newUser);

//         const token = jwt.sign(
//             { userId: generatedUserId, email: sanitizedEmail },
//             process.env.JWT_SECRET,
//             { expiresIn: '24h' }
//         );

//         res.status(201).json({ token, userId: generatedUserId, email: sanitizedEmail });

//     } catch (err) {
//         console.error('Signup error:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     } finally {
//         await client.close();
//     }
// });



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
