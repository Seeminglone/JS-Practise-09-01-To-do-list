const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");
const addBtn = document.querySelector('.add-btn');
let todoalltask = document.querySelector('#to-do-all-task');
let SelectTaskDoneOrDeleted = document.querySelector('.select-task-done-or-delete')
let doneBtn = document.querySelector('.completed-tasks-btn');
let deletedBtn = document.querySelector('.deleted-tasks-btn');
let allTaskBtn = document.querySelector('.all-tasks-btn');
let inputOurTask = document.getElementById('new-tasks');
let icon = document.querySelector('.nav-toggle')
let arrayWithCompletedTask = [];
let arrayWithDeletedTask = []; 
let arrayWithAllTask = [];
let deleteAllBtn;
let paragraphFromDeletedTask;
let myNodeListArray; 
let deleteBtnsForever;
let completedBtns;
let editBtns;
let removeBtns;
let deleteBtns;


if (localStorage.getItem('arrayWithAllTask')){
arrayWithAllTask = JSON.parse(localStorage.getItem('arrayWithAllTask'));
}
else{
    localStorage.setItem('arrayWithAllTask', JSON.stringify(arrayWithAllTask));
}

if (localStorage.getItem('arrayWithCompletedTask')){
    arrayWithCompletedTask = JSON.parse(localStorage.getItem('arrayWithCompletedTask'));
    }
    else{
        localStorage.setItem('arrayWithCompletedTask', JSON.stringify(arrayWithCompletedTask));
    }
    
    if (localStorage.getItem('arrayWithDeletedTask')){
        arrayWithDeletedTask = JSON.parse(localStorage.getItem('arrayWithDeletedTask'));
        }
        else{
            localStorage.setItem('arrayWithDeletedTask', JSON.stringify(arrayWithDeletedTask));
        }

navToggle.addEventListener("click", function () {
  links.classList.toggle("show-links");
    
});

inputOurTask.addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
        SelectTaskDoneOrDeleted.innerHTML = `All task`
        
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
                
                localStorage.setItem('arrayWithAllTask', JSON.stringify(arrayWithAllTask));
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
                           
                    });
        
                deleteButtons(deleteBtns, paragraphFromDeletedTask, arrayWithDeletedTask, arrayWithAllTask);
        
                comletedButtons(completedBtns, paragraphFromDeletedTask, arrayWithCompletedTask, arrayWithAllTask);
                
                editButtons(editBtns, myNodeListArray, arrayWithAllTask);
                inputOurTask.value = '';
                
            }
            else {
                return;
            }
    } 
});

   
addBtn.addEventListener('click', function(){
    SelectTaskDoneOrDeleted.innerHTML = `All task`
    
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

        deleteButtons(deleteBtns, paragraphFromDeletedTask, arrayWithDeletedTask, arrayWithAllTask);

        comletedButtons(completedBtns, paragraphFromDeletedTask, arrayWithCompletedTask, arrayWithAllTask);
        
        editButtons(editBtns, myNodeListArray, arrayWithAllTask);

        inputOurTask.value = '';
    }
    else {
        return;
    }


});

        
allTaskBtn.addEventListener('click', function(){
    arrayWithCompletedTask = sortTasks(arrayWithAllTask, arrayWithCompletedTask, false, 2);
    arrayWithDeletedTask = sortTasks(arrayWithAllTask, arrayWithDeletedTask, false, 2);
    SelectTaskDoneOrDeleted.innerHTML = `All task`
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
                
        deleteButtons(deleteBtns, paragraphFromDeletedTask, arrayWithDeletedTask, arrayWithAllTask);

        comletedButtons(completedBtns, paragraphFromDeletedTask, arrayWithCompletedTask, arrayWithAllTask);
                
        editButtons(editBtns, myNodeListArray, arrayWithAllTask);
               
    });
            
});

// Completed button, we check what we done

doneBtn.addEventListener('click', function(){
    
    arrayWithCompletedTask = sortTasks(arrayWithAllTask, arrayWithCompletedTask, false, 2);
    SelectTaskDoneOrDeleted.innerHTML = `Completed`    
    todoalltask.innerHTML = '';
    console.log(arrayWithCompletedTask);
    arrayWithCompletedTask.forEach(element=>{
        todoalltask.innerHTML += `<div class="task">
        <b><p class="paragraph">${element}</p></b>
        <button class="remove-btn">
            <i class="fas fa-undo-alt"></i>
        </button>
        <button class="deleted-btn-forever">
            <i class="fas fa-trash-alt"></i>
         </button>
        </div>`;
        
        
        deleteButtonsForeverFromCompleted(deleteBtnsForever, myNodeListArray, arrayWithCompletedTask);

        removeButtonsFromCopmleted(removeBtns, paragraphFromDeletedTask, arrayWithAllTask, arrayWithCompletedTask);

        editButtons(editBtns, myNodeListArray, arrayWithAllTask);
    });
});

// Deleted button, we check what we delete

deletedBtn.addEventListener('click', function(){
    arrayWithDeletedTask = sortTasks(arrayWithAllTask, arrayWithDeletedTask, false, 2);
    SelectTaskDoneOrDeleted.innerHTML = `Deleted`
    todoalltask.innerHTML = '';
    arrayWithDeletedTask.forEach(element=>{
        todoalltask.innerHTML += `<div class="task">
        <b><p class="paragraph">${element}</p></b>
        <button class="remove-btn">
            <i class="fas fa-undo-alt"></i>
        </button>
        <button class="deleted-btn-forever">
            <i class="fas fa-trash-alt"></i>
         </button>
        </div>`;

        deleteButtonsForeverFromDeleted(deleteBtnsForever, myNodeListArray, arrayWithDeletedTask);
        
        removeButtonsFromDeleted(removeBtns, paragraphFromDeletedTask, arrayWithAllTask, arrayWithDeletedTask);

        editButtons(editBtns, myNodeListArray, arrayWithAllTask);
    });
});
// removeButtons(removeBtns, paragraphFromDeletedTask, arrayWithAllTask, arrayWithDeletedTask);

function removeButtonsFromCopmleted(button, paragraph, array1, array2){
    button = document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            paragraph = event.currentTarget.parentElement.firstElementChild;
            array1.push(paragraph.children[0].innerHTML);
            array2 = sortTasks(array1, array2, false, 2);
            event.currentTarget.parentElement.remove();
            localStorage.setItem('arrayWithCompletedTask', JSON.stringify(array2));
            localStorage.setItem('arrayWithAllTask', JSON.stringify(array1));
        });
    });
}

function removeButtonsFromDeleted(button, paragraph, array1, array2){
    button = document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            paragraph = event.currentTarget.parentElement.firstElementChild;
            array1.push(paragraph.children[0].innerHTML);
            array2 = sortTasks(array1, array2, false, 2);
            event.currentTarget.parentElement.remove();
            localStorage.setItem('arrayWithDeletedTask', JSON.stringify(array2));
            localStorage.setItem('arrayWithAllTask', JSON.stringify(array1));
        });
    });
}


function deleteButtons(button, paragraph, array1, array2){
    button = document.querySelectorAll('.deleted-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            paragraph = event.currentTarget.parentElement.firstElementChild;
            array1.push(paragraph.children[0].innerHTML);
            array2 = sortTasks(array2, array1, true, 1);
            event.currentTarget.parentElement.remove();
            localStorage.setItem('arrayWithDeletedTask', JSON.stringify(array1));
            localStorage.setItem('arrayWithAllTask', JSON.stringify(array2));
        });
    });
}

function comletedButtons(button, paragraph, array1, array2){
    button = document.querySelectorAll('.completed-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            paragraph = event.currentTarget.parentElement.firstElementChild;
            array1.push(paragraph.children[0].innerHTML);
            array2 = sortTasks(array2, array1, true, 1);
            event.currentTarget.parentElement.remove();
            localStorage.setItem('arrayWithCompletedTask', JSON.stringify(array1));
            localStorage.setItem('arrayWithAllTask', JSON.stringify(array2));
        });
    });
}

function deleteButtonsForeverFromCompleted(button, myNodelist, array){
    button = document.querySelectorAll('.deleted-btn-forever').forEach(btn => {
        btn.addEventListener('click', (event) => {
            button = document.querySelectorAll('.deleted-btn-forever');
            button = event.currentTarget.parentElement.firstElementChild;
            myNodelist = Array.from(button);
            myNodelist.push(button.children[0].innerHTML)
            array = sortTasks(array, myNodelist, true, 1);
            event.currentTarget.parentElement.remove();
            localStorage.setItem('arrayWithCompletedTask', JSON.stringify(array));
        });
    });
}

function deleteButtonsForeverFromDeleted(button, myNodelist, array){
    button = document.querySelectorAll('.deleted-btn-forever').forEach(btn => {
        btn.addEventListener('click', (event) => {
            button = document.querySelectorAll('.deleted-btn-forever');
            button = event.currentTarget.parentElement.firstElementChild;
            myNodelist = Array.from(button);
            myNodelist.push(button.children[0].innerHTML)
            array = sortTasks(array, myNodelist, true, 1);
            event.currentTarget.parentElement.remove();
            localStorage.setItem('arrayWithDeletedTask', JSON.stringify(array));
        });
    });
}



function editButtons(button, myNodelist, array){
    button = document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            button = document.querySelectorAll('.edit-btn');
            button = event.currentTarget.parentElement.firstElementChild;
            myNodelist = Array.from(button);
            myNodelist.push(button.children[0].innerHTML)
            myNodelist.forEach(element=>{
                inputOurTask.value = element;
                sortTasks(myNodelist,array, false, 2);
            });
            event.currentTarget.parentElement.remove();
        });
    });
}

function sortTasks(arr1, arr2, itiyOrJitiy, returnProperArr) {
    for(let i = 0; i < arr1.length; i++){
        for(let j = 0; j < arr2.length; j++){
            if(arr2[j] === arr1[i]){
                if (returnProperArr === 1) {
                    itiyOrJitiy ?  arr1.splice(i, 1) : arr1.splice(j, 1);

                } else {
                    itiyOrJitiy ?  arr2.splice(i, 1) :  arr2.splice(j, 1);
                }
            }
        }
    }
    return returnProperArr === 1 ? arr1 : arr2;
}


window.onload = function(){ 
    
    arrayWithAllTask = JSON.parse(localStorage.getItem('arrayWithAllTask'));
    if (arrayWithAllTask){
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
        deleteButtons(deleteBtns, paragraphFromDeletedTask, arrayWithDeletedTask, arrayWithAllTask);
        
        comletedButtons(completedBtns, paragraphFromDeletedTask, arrayWithCompletedTask, arrayWithAllTask);
                
        editButtons(editBtns, myNodeListArray, arrayWithAllTask);
    })
}
    arrayWithCompletedTask = JSON.parse(localStorage.getItem('arrayWithCompletedTask'));
    arrayWithDeletedTask = JSON.parse(localStorage.getItem('arrayWithDeletedTask'));
    

}