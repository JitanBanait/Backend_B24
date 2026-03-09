let express = require("express");
let app = express();
let fs = require("fs")
const port = 8000;

app.use(express.static('public'))
app.get("/products/:item",(req,res)=>{
            console.log(req.params.item);
            let item = req.params.item;
           res.send(item)
    })
    

app.get("/contact",(req,res)=>{
    console.log(req.url)
    res.send("Contact Page");
})

app.listen(port , ()=>{
    console.log("Server is runing");
})