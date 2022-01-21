const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");
const addBtn = document.querySelector('.add-btn');
let deleteBtns;
let todoalltask = document.querySelector('#to-do-all-task');
doneBtn = document.querySelector('.completed-tasks-btn');
deletedBtn = document.querySelector('.deleted-tasks-btn');
allTaskBtn = document.querySelector('.all-tasks-btn');
let arrayWithCompletedTask = [];
let arrayWithDeletedTask = []; 
let arrayWithAllTask = [];
let inputOurTask = document.getElementById('new-tasks'); 

navToggle.addEventListener("click", function () {
  links.classList.toggle("show-links");
});

addBtn.addEventListener('click', function(){
    
//Move from input to paragraph    
           
    if (inputOurTask.value){
        todoalltask.innerHTML += `<div class="task">
            <b><p class="paragraph">${inputOurTask.value}</p></b>
            <button class="completed-btn">
            <i class="fas fa-check"></i>
            </button>
            <button class="deleted-btn">
            <i class="fas fa-trash-alt"></i>
            </button>
            <button class="edit-btn">
            <i class="fas fa-edit"></i>
            </button>
            </div>`;
                arrayWithAllTask.push(inputOurTask.value);
                todoalltask.innerHTML = '';
                arrayWithAllTask = arrayWithAllTask.filter( function( el ) {
                    return arrayWithCompletedTask.indexOf( el ) < 0;
                });
                arrayWithAllTask = arrayWithAllTask.filter( function( el ) {
                    return arrayWithDeletedTask.indexOf( el ) < 0;
                });
                arrayWithAllTask.forEach(element=>{
                    todoalltask.innerHTML += `<div class="task">
                        <b><p class="paragraph">${element}</p></b>
                        <button class="completed-btn">
                        <i class="fas fa-check"></i>
                        </button>
                        <button class="deleted-btn">
                        <i class="fas fa-trash-alt"></i>
                        </button>
                        <button class="edit-btn">
                        <i class="fas fa-edit"></i>
                        </button>
                        </div>`;
                   
            });
            
//Delete our tasks

        deleteBtns = document.querySelectorAll('.deleted-btn').forEach(btn => {
            btn.addEventListener('click', (event) => {
                let paragraphFromDeletedTask = event.currentTarget.parentElement.firstElementChild;
                arrayWithDeletedTask.push(paragraphFromDeletedTask.children[0].innerHTML);
            event.currentTarget.parentElement.remove();
            });
        });

// Acepted that we completed our task

        completedBtns = document.querySelectorAll('.completed-btn').forEach(btn => {
            btn.addEventListener('click', (event) => {
            let paragraphFromComletedTask = event.currentTarget.parentElement.firstElementChild;
                arrayWithCompletedTask.push(paragraphFromComletedTask.children[0].innerHTML);
                event.currentTarget.parentElement.remove();
            });
        });
        
        allTaskBtn.addEventListener('click', function(){
            todoalltask.innerHTML = '';
            arrayWithAllTask.forEach(element=>{
                todoalltask.innerHTML += `<div class="task">
                    <b><p class="paragraph">${element}</p></b>
                    <button class="completed-btn">
                    <i class="fas fa-check"></i>
                    </button>
                    <button class="deleted-btn">
                    <i class="fas fa-trash-alt"></i>
                    </button>
                    <button class="edit-btn">
                    <i class="fas fa-edit"></i>
                    </button>
                    </div>`;
                    arrayWithAllTask = arrayWithAllTask.filter( function( el ) {
                        return arrayWithCompletedTask.indexOf( el ) < 0;
                    });
                    arrayWithAllTask = arrayWithAllTask.filter( function( el ) {
                        return arrayWithDeletedTask.indexOf( el ) < 0;
                    });
                    //Delete our tasks
                   

                deleteBtns = document.querySelectorAll('.deleted-btn').forEach(btn => {
                    btn.addEventListener('click', (event) => {
                        let paragraphFromDeletedTask = event.currentTarget.parentElement.firstElementChild;
                        arrayWithDeletedTask.push(paragraphFromDeletedTask.children[0].innerHTML);
                    event.currentTarget.parentElement.remove();
                    });
                });

// Acepted that we completed our task

                completedBtns = document.querySelectorAll('.completed-btn').forEach(btn => {
                    btn.addEventListener('click', (event) => {
                    let paragraphFromComletedTask = event.currentTarget.parentElement.firstElementChild;
                        arrayWithCompletedTask.push(paragraphFromComletedTask.children[0].innerHTML);
                        event.currentTarget.parentElement.remove();
                    });
                    
                });
               
            });
            
        });

    inputOurTask.value = '';    
    }
    else {
        return;
    }
   
});

// Completed button, we check what we done

doneBtn.addEventListener('click', function(){
    todoalltask.innerHTML = '';
    arrayWithCompletedTask.forEach(element=>{
        todoalltask.innerHTML += `<div class="task">
        <b><p class="paragraph">${element}</p></b>
        </div>`;
    });
});

// Deleted button, we check what we delete

deletedBtn.addEventListener('click', function(){
    todoalltask.innerHTML = '';
    arrayWithDeletedTask.forEach(element=>{
        todoalltask.innerHTML += `<div class="task">
        <b><p class="paragraph">${element}</p></b>
        </div>`;
    });
});

