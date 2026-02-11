const express = require("express");
const app = express();

app.use(express.json());

let user = null;

let students=[
 {id:1,name:"Ivan"},
 {id:2,name:"Maria"}
];

app.get("/api/students",(req,res)=>{
 res.json(students);
});

app.get("/api/is-logged",(req,res)=>{
 if(user) res.json({name:user});
 else res.status(401).json({});
});

app.post("/api/login",(req,res)=>{
 user=req.body.name;
 res.json({success:true});
});

app.listen(3000,()=>console.log("API running"));
