


// Alert buttons and div
let alert = document.getElementById("confirmOpreation");
let confirmOpreationButton = document.getElementById("confirmOpreationButton");
let cancelOpreationButton = document.getElementById("cancelOpreationButton");

//Add new task button and input
let mainInput = document.getElementById("mainInput");
let addNewTaskButton = document.getElementById("inputButton");
let inputNote = document.getElementById("inputNote");



//Blue button Click 
let allButton = document.getElementById("all");
let doneButton = document.getElementById("done");
let todoButton = document.getElementById("todo");


// Scroll container
let scrollContainerDiv = document.getElementById("scrollContainer");

// No tasks edge case header
let noTasksHeader = document.getElementById("noTasksHeader");


//Task HTML COLLECTION like an array
let taskArr = document.getElementsByClassName("task");


//Red button Click 
let deleteDoneButton = document.getElementById("deleteDone")
let deleteAllButton = document.getElementById("deleteAll")







const confirmOpreation = ()=>{

    let flag = false;
    alert.style.display = "flex";

/*
    Here is the promise that forces the compiler to wait for input from a diffrent slower part
    of the code.

    NOTE:
    You should declare the function that will deal with promises as ASYNC function
*/ 

    return new Promise((resolve, reject)=>{
       
        confirmOpreationButton.addEventListener("click", ()=>{
            console.log("Hello this is inside confirm");
            alert.style.display = "none";
            flag = true;
            resolve(flag);
        }),

        cancelOpreationButton.addEventListener("click", ()=>{
            console.log("Hello this is inside cancel");
            alert.style.display = "none";
            resolve(flag =false);
    
        })
        

        setTimeout(()=>{
            alert.style.display = "none";
            reject(flag);
    
        }, 5000)
        
    });

    



    

};

const addNewTask = ()=>
{
    let text = mainInput.value;
    mainInput.value = "";


    //creating the new div
    let newTask = document.createElement("div");

    newTask.className = "task";
    let taskCount = taskArr.length;
    newTask.id = taskCount + 'f';

    //Creating the paragraph to containt the text content
    let tempParagraph = document.createElement("p");
    tempParagraph.textContent = text;

    //Creating Icondiv and content for the icon div
    let iconDiv = document.createElement("div");
    iconDiv.className = "icons";

    let tempCheckbox = document.createElement("input");
    tempCheckbox.type = "checkbox";


    let tempImg1 = document.createElement("img");
    tempImg1.src = "./sourceImages/icons/pencil-solid.svg"
    tempImg1.alt = "pencilIcon";

    let tempImg2 = document.createElement("img")
    tempImg2.src = "./sourceImages/icons/trash-solid.svg";
    tempImg2.alt = "deleteIcon";

    //Appending content to the icondiv
    iconDiv.append(tempCheckbox);
    iconDiv.append(tempImg1)
    iconDiv.append(tempImg2)

    //Appending content to the task div
    newTask.append(tempParagraph);
    newTask.append(iconDiv);
    

    //Appending task to task scroll container
    scrollContainerDiv.append(newTask);



    //To make sure the no task note isnt shown
    noTasksHeader.style.display = "none";
}



addNewTaskButton.onclick = ()=>
{
    if(mainInput.value.length >= 5)
    {
        addNewTask();
        inputNote.style.display = "";
    }
    else
    {
        inputNote.style.display = "block";
    }
        
}



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


/*
    I used here Async to wait for the user to input from the buttons
    as the compiler wont wait for input, either you use timeout callback (Which is hell)
    or you use promise which is the sane easier choice 😎

    NOTE:
    You should declare the function that will deal with promises as ASYNC function
*/ 
deleteDoneButton.onclick = async ()=>
{
    if(taskArr.length >= 1)
    {
        let flag =  await confirmOpreation();     
        console.log(flag);
        if(flag)
        {

            Array.from(taskArr).forEach(task =>{
                if(task.id[1] === 't' )
                {
                    task.remove();
                }

                if(taskArr.length <= 0)
                {
                    noTasksHeader.style.display = "block";
                }

            })
                
            
        }
    }
        
    
};


deleteAllButton.onclick = async ()=>
{
    if(taskArr.length >= 1)
    {
        let flag =await confirmOpreation();

        if(flag){
            Array.from(taskArr).forEach(task =>{
                task.remove();
            })

            noTasksHeader.style.display = "block";
        }
           
        
    }
    
        
    
};


if(taskArr.length > 0)
{
    noTasksHeader.style.display = "none";
}
else
{
    noTasksHeader.style.display = "block"; 
}












///////                Tasks functions 

scrollContainerDiv.addEventListener("click", (event)=>{

    if(event.target.alt == "deleteIcon"){

        const taskToDelete = event.target.closest(".task");

        if(taskToDelete){
            taskToDelete.remove();
        }



    }


});