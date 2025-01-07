






//Blue button Click 
let allButton = document.getElementById("all");
let doneButton = document.getElementById("done");
let todoButton = document.getElementById("todo");


//Task HTML COLLECTION like an array
let taskArr = document.getElementsByClassName("task");


//Red button Click 
let deleteDoneButton = document.getElementById("deleteDone")
let deleteAllButton = document.getElementById("deleteAll")


allButton.onclick = ()=>
{
    /* Style*/
    allButton.classList.add("hoverEffect");
    doneButton.classList.remove("hoverEffect")
    todoButton.classList.remove("hoverEffect")
   
    if(taskArr.length >=1)
    {
        for(let task of taskArr)
        {
            task.style.display = "";
        }
    }
    
    

};

doneButton.onclick = ()=>
{
    /* Style*/
    doneButton.classList.add("hoverEffect")
    allButton.classList.remove("hoverEffect")
    todoButton.classList.remove("hoverEffect")

    if(taskArr.length >=1)
    {
        for(let task of taskArr)
        {
            if(task.id[1] === 't')
                task.style.display = "";
            else
                task.style.display = "none";
        }
    }

};

todoButton.onclick = ()=>
{
    /* Style*/
    todoButton.classList.add("hoverEffect")
    allButton.classList.remove("hoverEffect")
    doneButton.classList.remove("hoverEffect")

    if(taskArr.length >= 1)
    {
        for(let task of taskArr)
        {
            if(task.id[1] === 'f')
                task.style.display = "";
            else
                task.style.display = "none";
        }
    }
        

};



deleteDoneButton.onclick = ()=>
{
    if(taskArr.length >= 1)
    {
        for(let task of taskArr)
        {
            if(task.id[1] === 't' )
            {
                task.remove();
            }
        }
    }

};

deleteAllButton.onclick = ()=>
{
    if(taskArr.length >= 1)
    {
        Array.from(taskArr).forEach(task =>{
            task.remove();
        })
    }

    taskArr = document.getElementsByClassName("task");
};







