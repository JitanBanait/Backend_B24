const express = require("express")
let multer = require("multer")
const fs = require("fs")
const app = express();
const port = 8000;
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.json());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads"); // folder name
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
        }
   
});

const upload = multer({ storage: storage });

app.get("/getTodo",(req,res)=>{
  
   fs.readFile("./store.txt",(err , data)=>{
    if(err) {res.sendStatus(400)}
    else{
        res.send(data);
    }
   })
       
})

app.post("/addTodo" ,upload.single("todoPic"), (req, res)=>{
    let tasks = [];
    let data = fs.readFileSync("./store.txt");
        if(data == ""){
            tasks = [];
         }else{
            tasks = JSON.parse(data);
         }
   
        let newTask = {
        task: req.body.task,
        date: req.body.date,
        file: req.file ? req.file.filename : null
    };
    console.log(req.file)
    tasks.push(newTask)
    
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



app.get("/home" ,one , two , three)

function one(req , res , next){
    next()
}
function two(req , res , next){
    
}
function three(req , res , next){
  
}

