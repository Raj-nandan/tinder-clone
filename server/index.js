const PORT = 8000
const express = require('express')
const { MongoClient } = require('mongodb')
const uri = 'mongodb+srv://nandanr532:nandanr532@cluster0.nex2fmy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'


const app = express()

app.get('/', (req, res) => {
    res.json('hello world')
})

app.post('/signup', (req, res) => {
    res.json('hello world')
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