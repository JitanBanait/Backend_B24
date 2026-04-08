let input = document.getElementById("input");
let fileData = document.getElementById("fileData");
let btn = document.getElementById("btn");
let list = document.getElementById("list")

function getTodos(){
     let xml = new XMLHttpRequest();
    
    xml.open("get" , "http://localhost:8000/getTodo");
    xml.send();
    xml.onload = (resp)=>{
        if(resp.target.status == 400){
            console.log("err")
        }else{
            let data= JSON.parse(resp.target.responseText)
            data.forEach(element => {
                console.log(element)
                createLi(element)
            });
        }
    }
}
getTodos();

function createLi(task){
    console.log("task = " , task)
    let li = document.createElement("li");
    let textSpan = document.createElement("span");
    let imgSpan = document.createElement("img")
imgSpan.setAttribute("src",  task.file);  
  textSpan.innerText = task.task;
    li.appendChild(textSpan)
    li.appendChild(imgSpan)
    list.appendChild(li);
}



btn.addEventListener("click",(e)=>{

    let xml = new XMLHttpRequest();
    let task = {
        task : input.value,
        date : Date.now(),
        file : fileData.files[0].name
    }
    let formData = new FormData();
    formData.append("todoPic" ,  fileData.files[0]);
    formData.append("task", task.task);
    formData.append("date", task.date);
    
    xml.open("post" , "http://localhost:8000/addTodo");
   // xml.setRequestHeader('Content-type' , "application/json")
   // xml.send(JSON.stringify(task));
   xml.send(formData);
    xml.onload = (resp)=>{
        if(resp.target.responseText == "True"){
           createLi(task);
        }
    }
    
})