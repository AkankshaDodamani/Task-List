// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListners();

function loadEventListners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear tasks
    clearBtn.addEventListener('click', clearTask);
    // filter tasks event
    filter.addEventListener('keyup', filtertasks);
}

function getTasks(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
    tasks = [];
} else {
    tasks = JSON.parse(localStorage.getItem('tasks')); 
}
tasks.forEach(function(task){
    //  Create element
    const li = document.createElement('li');
    // create class
    li.className = 'collection-item';
    // create textnode
    li.appendChild(document.createTextNode(task));
    // create new link
    const link = document.createElement('a');
    // add className
    link.className = 'delete-item secondary-content';
    // add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
});
}

// Add task
function addTask(e) {
    if(taskInput.value === ''){
        alert('Add a task');
    }else{
    // Create element
    const li = document.createElement('li');
    // create class
    li.className = 'collection-item';
    // create textnode
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link
    const link = document.createElement('a');
    // add className
    link.className = 'delete-item secondary-content';
    // add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);

    // store in local storage
    storeTaskInLocalStorage(taskInput.value);

    // clear input after adding text
    taskInput.value = '';

    e.preventDefault();
   }
}
// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
    tasks = [];
} else {
    tasks = JSON.parse(localStorage.getItem('tasks')); 
}
   tasks.push(task);
   localStorage.setItem('tasks', JSON.stringify(tasks));
}

//  Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains
    ('delete-item')) {
        if(confirm('Are You Sure??')){
        e.target.parentElement.parentElement.remove();

        // Remove task from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
    tasks = [];
} else {
    tasks = JSON.parse(localStorage.getItem('tasks')); 
}
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
          tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Clear Task
function clearTask() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear tasks from LS
    clearTasksFromLocalStorage();
}
function clearTasksFromLocalStorage(){
    localStorage.clear();
}
 
// Filter Tasks
function filtertasks(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(text) != -1){
        task.style.display = 'block';  // Will display the matching task 
        }else{
            task.style.display = 'none';
        }
    });
}




