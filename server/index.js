const PORT = 8000
const express = require('express')
const { MongoClient } = require('mongodb')
const { v4 : uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const uri = 'mongodb+srv://nandanr532:nandanr532@cluster0.nex2fmy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'


const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json('hello world')
})

app.post('/signup', async(req, res) => {
    const client = new MongoClient(uri)
    const { email, password } = req.body

    const generatedUserId = uuidv4()
    const hashedpassword = await bcrypt.hash(password, 10)

    try{
        client.connect()
        const database = client.db('tinder-data')
        const users = database.collection('users') 

        const existingUser = await users.findOne({ email })

        if(existingUser){
            return res.status(409).send('User already exist')
        }

        const sanitizerEmail = email.toLowerCase()

        const data = {
            user_id : generatedUserId,
            email : sanitizerEmail,
            hashed_password : hashedpassword
        }
        const insertedUser = await users.insertOne(data)

        const token = jwt.sign(insertedUser, sanitizerEmail, {
            expiresIn: 60*24,
        })

        res.status(201).json({ token, userId: generatedUserId, email: sanitizerEmail})

    }catch(err){
        console.log(err)
    }

})


app.get('/users', async(req, res) => {
    const client = new MongoClient(uri)

    try{
        await client.connect()
        const database = client.db('tinder-data')
        const users = database.collection('users')

        const returnedUsers = await users.find().toArray()
        res.send(returnedUsers)
    }finally{
        await client.close()
    }
})


app.listen(PORT, () => console.log("server is running on port " + PORT))