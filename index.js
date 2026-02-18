let http = require("http");
let fs = require("fs");
let port = 8000;
function readJSONData(request , callback){
    let body = ""
    request.on('data' , (chunk)=>{
     //   console.log(chunk);
        body += chunk.toString();
    })
    request.on('end',()=>{
        let data = JSON.parse(body);
        callback(data);
    })


}


let server=http.createServer((req , res)=>{
    console.log(req.url , "  " , req.method);
    if(req.url == "/home" && req.method == "GET"){
        // fs.readFile("./home.html",(err , data)=>{
        //     if(err){
        //         res.end("Error in html path or file")
        //     }else{  
        //             res.writeHead(200 , {'Content-type':'text/html'})
        //             res.write(data)
        //             res.end()
        //     }
        // })

        const stream = fs.createReadStream("./home.html");
        stream.pipe(res);
        
    }else if(req.url == "/script.js" && req.method == "GET"){
        fs.readFile("./script.js",(err , data)=>{
            if(err){
                res.end("Error in script path or file")
            }else{  
                    res.writeHead(200 , {'Content-type':'application/javascript'})
                    res.write(data)
                    res.end()
            }
        })
        
    }else if(req.url == "/addTodo"){
         readJSONData(req , (data)=>{
            let tasks = [];
            tasks.push(data);
            fs.writeFile("./store.txt",JSON.stringify(tasks),(err)=>{
                    if(err){
                        res.write("Error in storing Data");
                        res.end()
                    }else{
                    
                        res.write("Sucessfully data Stored");
                        res.end()
                    }
            })
         })
    }else{
        res.write("<h1>Error Page</h1>")
         res.end()

    }
});

server.listen(port , ()=>{
    console.log("Servergggg is running");
})
