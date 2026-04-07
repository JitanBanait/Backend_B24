const express = require("express")
const fs = require("fs")
const app = express();
const port = 8000;
app.use(express.static("public"));
app.use(express.json());


app.get("/getTodo",(req,res)=>{
  
   fs.readFile("./store.txt",(err , data)=>{
    if(err) {res.sendStatus(400)}
    else{
        res.send(data);
    }
   })
       
})

app.post("/addTodo" , (req, res)=>{
    let tasks = [];
    let data = fs.readFileSync("./store.txt");
        if(data == ""){
            tasks = [];
         }else{
            tasks = JSON.parse(data);
         }
   
    

    tasks.push(req.body)
    
    fs.writeFile("./store.txt",JSON.stringify(tasks),(err)=>{
        if(err){
            res.send("err");
        }else{
            res.send("True");
        }
    })
})

app.listen(port , ()=>{
    console.log("Server is running on " , port) ;
})