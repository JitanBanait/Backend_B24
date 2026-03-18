let express = require("express");
let app = express();
let fs = require("fs")
const port = 8000;

app.use(express.static('public'))
app.use("/contact",(req, res , next)=>{
            console.log(req.url)
            req.abc = "hello"
            console.log("Middleware");
            next();
})

app.use("/contact",(req, res , next)=>{
            console.log(req.url)
            req.abc = "hello"
            console.log("Middleware2");
            next();
})

app.get("/products/:var",(req,res)=>{
            console.log(req.params.var);
            let item = req.params.var;
           res.send(req.abc)
    }) 
    


app.get("/contact",(req,res)=>{
    console.log(req.url)
    res.send("Contact Page");
})

app.listen(port , ()=>{
    console.log("Server is runing");
})