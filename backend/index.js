const express = require('express')
const cors = require('cors')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { title } = require('process')
const { error } = require('console')
const port = 3000

dotenv.config()
const app = express()

const corsoptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://full-stack-todo-sigma.vercel.app'],  
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}

app.use(cors(corsoptions))
app.use(express.json())
const jwt_secret = process.env.jwt_secret 

let dataBase = []

try {
    dataBase = JSON.parse(fs.readFileSync('todo.json'))
} catch (error) {
    console.log(`error while reading file`);
    
}

// console.log(dataBase);




app.post('/signUp', (req, res) => {
    const { username, password } = req.body

    const user = dataBase.find(user => user.username === username)

    if(!user){
        dataBase.push({
            username,
            password,
            todos : []
        })

        fs.writeFile("todo.json", JSON.stringify(dataBase), (err) => {
            if(err) throw err
        })
        const token = jwt.sign({
            username
        }, jwt_secret, {expiresIn: "1hr"})

        res.status(200).json({
            message : "user created successfully !!",
            token: token
        })
    } else {
        res.status(403).json({
            message: "user already exits !!"
        })
    }
})

app.post('/logIn', (req, res) => {
    const { username, password } = req.body

    const user = dataBase.find(user => user.username === username && user.password === password)

    if(user) {
        const token = jwt.sign({
            username
        }, jwt_secret, {expiresIn : "3hr"})

        res.status(200).json({
            message : "user logged in successfully !!",
            token : token
        })
    } else {
        res.status(404).json({
            message : "user not found, kindly sign up "
        })
    }
})


const auth = (req, res, next) => {
    const token = req.headers.authorization

    if(!token){
        res.status(404).json({
            message : "unauthorized !! "
        })
    } else {
        jwt.verify(token, jwt_secret, (err, decode) => {
            if(err) throw err

            req.user = decode
            next()
        })
    }
}

app.get('/home', auth, (req, res) => {
    const username = req.user.username

    const user = dataBase.find(user => user.username === username)

    res.json({
        todos : user.todos
    })
})

app.post('/addTodo', auth, (req, res) => {
    const {todoname} = req.body
    const username = req.user.username

    const user = dataBase.find(user => user.username === username)
    // const index = dataBase.findIndex(user)
    // console.log(index);
    

    if(!user){
        res.status(404).json({message : "no user bro "})
    }

    user.todos.push({
        id: user.todos.length + 1,
        title : todoname,
    })

    fs.writeFile("todo.json", JSON.stringify(dataBase), (err) => {
        if(err) throw err
    })

    res.status(200).json({
        message : "todo created ",
        user
    })
})


app.delete('/delete/:id',auth, (req, res) => {
    const id = parseInt(req.params.id)
    const username = req.user.username

    const user = dataBase.find(user => user.username === username)

    if(user) {
        const index = user.todos.findIndex(t => t.id === id)
        if(index === -1){
            res.status(404).json({message : "todo not found !!"})
        } else {
            user.todos.splice(index, 1)

            fs.writeFile('todo.json', JSON.stringify(dataBase), (err) => {
                if(err) throw `the error in delete ${err}`

                res.status(200).json({
                    message : "todo deleted successfully !!"
                })
            })
        }
    } else {
        res.status(403).json({
            message : "todo not found !! "
        })
    }



})


app.put('/edit/:id', auth, (req, res) => {
    const id = parseInt(req.params.id)
    const username = req.user.username
    const {todoname} = req.body

    const user = dataBase.find(user => user.username === username)

    if(user){
        const index = user.todos.findIndex(t => t.id === id)
        if(index === -1) {
            res.status(404).json({
                message : "no todo found "
            })
        } else {
            user.todos[index].title = todoname || user.todos[index].title

            fs.writeFile('todo.json', JSON.stringify(dataBase), (err) => {
                if(err) throw `error in deleting ${err}`

                res.status(200).json({
                    message : "todo updated successfully"
                })
            })
        }
    } 
})


app.listen(port, () => console.log(`the app is running at port http://localhost:${port}`))
