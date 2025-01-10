
// Local storage area
let localTasks = [];

// Edit content Alert buttons and div
let alertEdit = document.getElementById("confirmEdit");
let confirmOpreationButtonEdit = document.getElementById("confirmOpreationButtonEdit");
let cancelOpreationButtonEdit = document.getElementById("cancelOpreationButtonEdit");
let inputEdit = document.getElementById("alertEditContentInput");
let inputEditNote = document.getElementById("inputEditNote");

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


const storeLocal = (localTasks)=>{

    const temp = JSON.stringify(localTasks);
    localStorage.setItem("tasks", temp);

    console.log("This is inside storeLocal and this is the localTasks array :");
    console.log(localTasks);
    displayTasks();
}

const saveTask = (text)=>{
    let task = {
        taskId : localTasks.length + 'f',
        paragraphStatus: "",
        paragraphContent: text
    };

    console.log("This is inside saveTask and this is the object :");
    console.log(task);

    localTasks.push(task);
    
    storeLocal(localTasks);
   
};

const unloadTask = ()=>{

    const tasks = localStorage.getItem("tasks");
    const unloadedTasks = tasks ? JSON.parse(tasks) : [];  
    return unloadedTasks;
}


const checkInpt = (text)=>{
    const check = /^[0-5]/;
    
    if(text.length > 0){
        if(!check.test(text)){
            return true;
        }

    }
    return false;
};





const checkTaskCount = ()=>{
    
    if(taskArr.length <= 0)
    {
        noTasksHeader.style.display = "block";
        
    }
}

const confirmOpreationEdit = ()=>{
    let flag = [];
    flag[0] = "0";
    inputEdit.value= "";
    alertEdit.style.display = "flex";

    return new Promise((resolve, reject) =>{

        confirmOpreationButtonEdit.addEventListener("click", ()=>{
            if(checkInpt(inputEdit.value)){
                flag[0] = "1";
                flag[1] = inputEdit.value;
                alertEdit.style.display = "none";
                resolve(flag);
            }
            else{
                inputEditNote.style.display = "block";
                setTimeout(()=>{
                    inputEditNote.style.display = "none";
        
                }, 3000);
            }
                
        })

        cancelOpreationButtonEdit.addEventListener("click", ()=>{
            alertEdit.style.display = "none";
            resolve(flag);
        })


        
    })



};



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
        
        /* 
        setTimeout(()=>{
            alert.style.display = "none";
            reject(flag);
    
        }, 5000)
        */
        
    });

    



    

};

const addNewTask = ()=>
{
    let text = mainInput.value;
    mainInput.value = "";

    console.log("This is inside add new task and this is the text from button:");
    console.log(text);

    saveTask(text);
    
}



//               NOT FINISHED
window.onload = ()=>{
    displayTasks();
}

const displayTasks = ()=>{
    //creating the new div
    const unloadedTasks = unloadTask();

    console.log("This is inside display tasks, UnloadedTasks:")
    console.log(unloadedTasks);
    
    if(unloadedTasks.length > 0){
        unloadedTasks.forEach(task =>{

            let newTask = document.createElement("div");

            newTask.classList  = "task";
            newTask.id = task.taskId;

            //Creating the paragraph to containt the text content
            let tempParagraph = document.createElement("p");
            tempParagraph.textContent = task.paragraphContent;
            tempParagraph.classList = task.paragraphStatus[0];

            //Creating Icondiv and content for the icon div
            let iconDiv = document.createElement("div");
            iconDiv.classList = "icons";

            let tempCheckbox = document.createElement("input");
            tempCheckbox.type = "checkbox";
            if(task.taskId[1] === 't')
                tempCheckbox.checked = true;

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

        })
    }
    else
    {
        noTasksHeader.style.display = "block";
    }
       


    //To make sure the no task note isnt shown
    
}


addNewTaskButton.onclick = ()=>
{
    let text = mainInput.value;
    
    if(checkInpt(text))
    {
        addNewTask();
        inputNote.style.display = "";
    }
    else
    {
        inputNote.style.display = "block";
        setTimeout(()=>{inputNote.style.display = ""}, 10000)
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
            console.log("Deleting");     
            Array.from(taskArr).forEach(task =>{
                if(task.id[1] === 't' )
                {
                    task.remove();
                }

                checkTaskCount();

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
            console.log("Deleting");
            Array.from(taskArr).forEach(task =>{
                task.remove();
            })

            
        }
           
        
    }
    
        
    
};







///////                Tasks functions 

scrollContainerDiv.addEventListener("click", async (event)=>{

    // Event for deleting task
    if(event.target.alt === "deleteIcon"){
        console.log("Inside delete icon");

        const taskToDelete = event.target.closest(".task");
        console.log("This is the selected task :");
        console.log(taskToDelete);
        console.log("This is the selected task id:");
        console.log(taskToDelete.id);

        if(taskToDelete){
            unloadedTasks = unloadTask();
            console.log("This is the unloadedTasks inside delete:");
            console.log(unloadedTasks);

            if(unloadedTasks.length > 0){
                let foundTask = unloadedTasks.find(task => taskToDelete.id === task.taskId);
                console.log("This is the foundTask in delete:");
                console.log(foundTask);
                if(foundTask){
                    let foundTaskIndex = unloadedTasks.indexOf(foundTask);
                    console.log("This is the foundTaskIndex in delete:");
                    console.log(foundTaskIndex);

                    unloadedTasks.splice(foundTaskIndex, 1);
                    storeLocal(unloadedTasks);
                    taskToDelete.remove();
                }
                    
            }
                
        }

        

    }

    // Event for editing task
    if(event.target.alt === "pencilIcon" ){
        

        let flag = await confirmOpreationEdit();
        if(flag[0] === "1"){

            console.log("Inside Edit icon");
            const taskToEdit = event.target.closest(".task");
            console.log("This is the selected task :");
            console.log(taskToEdit);
            console.log("This is the selected task id:");
            console.log(taskToEdit.id);

            if(taskToEdit){
                unloadedTasks = unloadTask();
                console.log("This is the unloadedTasks inside edit:");
                console.log(unloadedTasks);
    
                if(unloadedTasks.length > 0){
                    let foundTask = unloadedTasks.find(task => taskToEdit.id === task.taskId);
                    console.log("This is the foundTask in edit:");
                    console.log(foundTask);
                    if(foundTask){
                        let foundTaskIndex = unloadedTasks.indexOf(foundTask);
                        console.log("This is the foundTaskIndex in edit:");
                        console.log(foundTaskIndex);
    
                        unloadedTasks[foundTaskIndex].paragraphContent = flag[1];
                        storeLocal(unloadedTasks);
                        
                    }
                        
                }
                    
            }
            taskToEdit.remove();

           

        }
       
    }


    // Event for marking task done
    if(event.target.type ==="checkbox" && (event.target.checked || !event.target.checked) ){
        console.log("Inside checkbox icon");

        const taskToDone = event.target.closest(".task");
        const paragraphToEdit  = taskToDone.querySelector("p");

        console.log("This is the selected task done :");
        console.log(taskToDone);
        console.log("This is the selected task id:");
        console.log(taskToDone.id);


        if(taskToDone){
            unloadedTasks = unloadTask();
            console.log("This is the unloadedTasks inside done :");
            console.log(unloadedTasks);

            if(unloadedTasks.length > 0){
                let foundTask = unloadedTasks.find(task => taskToDone.id === task.taskId);
                console.log("This is the foundTask in done:");
                console.log(foundTask);
                if(foundTask){

                    paragraphToEdit.classList.toggle("taskParagraphCrossed");
                    if(taskToDone.id[1] === 'f'){
            
                        taskToDone.id = taskToDone.id[0] + 't' + taskToDone.id[1].slice(2);
                        console.log("Inside false");
                        console.log(taskToDone.id);
                        console.log(paragraphToEdit);
                    }
                    else if (taskToDone.id[1] === 't') {
                        taskToDone.id = taskToDone.id[0] + 'f' + taskToDone.id[1].slice(2);
                        console.log("Inside true");
                        console.log(taskToDone.id);
                        console.log(paragraphToEdit);
                    }


                    let foundTaskIndex = unloadedTasks.indexOf(foundTask);
                    console.log("This is the foundTaskIndex in done:");
                    console.log(foundTaskIndex);

                    unloadedTasks[foundTaskIndex].taskId = taskToDone.id;
                    unloadedTasks[foundTaskIndex].paragraphStatus = paragraphToEdit.classList;
                    storeLocal(unloadedTasks);
                    taskToDone.remove();
                }
                    
            }
                
        }
         
    }

   


});



















/**
 * 
 *   <div class="task" id="3t">
                    
        <p class="taskParagraphCrossed"  >Task 3</p>

        <div class="icons">
            <input type="checkbox">
            <img src="./sourceImages/icons/pencil-solid.svg" alt="pencilIcon">
            <img src="./sourceImages/icons/trash-solid.svg" alt="deleteIcon">
        </div>
    </div>
 * 
 * 
 * 
 * 
 */


















