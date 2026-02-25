const express = require('express')
const session = require('express-session')

const app = express()
const PORT = 3000

app.use(express.json())

app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}))

const students = [
  { id: 1, name: "Ivan Ivanov", age: 18, grade: "11A" },
  { id: 2, name: "Maria Petrova", age: 17, grade: "10B" },
  { id: 3, name: "Georgi Georgiev", age: 19, grade: "12C" }
]

app.get('/api/students', (req,res)=>{
  res.json(students)
})

app.get('/api/students/:id',(req,res)=>{
  const student = students.find(s=>s.id==req.params.id)
  res.json(student)
})

app.post('/api/login',(req,res)=>{
  const {name} = req.body
  req.session.user = {name}
  res.json({name})
})

app.get('/api/is-logged',(req,res)=>{
  if(req.session.user){
    res.json({name:req.session.user.name})
  }else{
    res.status(401).json({error:"Not logged"})
  }
})

app.listen(PORT,()=>console.log("Server running on port",PORT))

app.post('/api/logout',(req,res)=>{
  req.session.destroy(()=>{
    res.json({ok:true})
  })
})
