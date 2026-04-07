let input = document.getElementById("input");
let btn = document.getElementById("btn");
let list = document.getElementById("list")

function getTodos(){
     let xml = new XMLHttpRequest();
    
    xml.open("get" , "http://localhost:8000/getTodo");
    xml.send();
    xml.onload = (resp)=>{
        console.log(resp);
        if(resp.target.status == 400){
            console.log("err")
        }else{
            let data= JSON.parse(resp.target.responseText)
            data.forEach(element => {
                createLi(element)
            });
        }
    }
}
getTodos();

function createLi(task){
    let li = document.createElement("li");
    li.innerText = task.task;
    list.appendChild(li);
}



btn.addEventListener("click",(e)=>{

    let xml = new XMLHttpRequest();
    let task = {
        task : input.value,
        date : Date.now()
    }
    xml.open("post" , "http://localhost:8000/addTodo");
    xml.setRequestHeader('Content-type' , "application/json")
    xml.send(JSON.stringify(task));
    xml.onload = (resp)=>{
        console.log(resp);
        if(resp.target.responseText == "True"){
            createLi(task);
        }
    }
    
})