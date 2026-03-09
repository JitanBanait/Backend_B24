let h1 = document.getElementById("h1");
let btn = document.getElementById("test");

btn.addEventListener("click",(e)=>{
    let xml = new XMLHttpRequest();
    let task = {
        task : "test1",
        date : Date.now()
    }
    xml.open("post" , "http://localhost:8000/addTodo");
    xml.setRequestHeader('Content-type' , "application/json")

    xml.send(JSON.stringify(task));
})