const todoInput = document.getElementById("todo-input");
const addTaskbtn = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");
const deleteAllBtn = document.getElementById('del-all');

let tasks = [];

// LOAD PREVIOUS STATE
function loadPrevtask() {
  const storedTasks = localStorage.getItem("tasks");
  const loadTasks = storedTasks ? JSON.parse(storedTasks) : null;
  if (loadTasks === null) return;
  // update the global array
  tasks = loadTasks;

  tasks.forEach((item) => renderTask(item));

  console.log(loadTasks);
  console.log("in memory array:", tasks);
}
loadPrevtask();

// APP LOGIC
function app() {
  addTaskbtn.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (!taskText) return;

    // Check for existing tasks so as to stop repetion of same tasks
    const storage = localStorage.getItem("tasks");
    const existingTasks = storage ? JSON.parse(storage) : [];
    const duplicateTask = existingTasks.some((item) => item.text === taskText); // true or false val for a condition
    if (duplicateTask) {
      alert("task already added");
      return;
    }

    const newTask = {
      id: Number(
        (Math.random() * (10 - 1 + 1) + 1).toString().replace(".", "")
      ),
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);
    saveTask();
    renderTask(newTask);
    todoInput.value = "";
  });
}
app();

deleteAllBtn.addEventListener("click", (e) => {
  todoList.innerHTML = "";
  tasks = [];
  saveTask("tasks", JSON.stringify(tasks));
})
// UTIL FUNCTIONS
// Saving to the Local storage
function saveTask() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// rendering the list item and delete button
function renderTask(task) {
  const taskItem = document.createElement("li");
  // Setting the data-set ID to the created task.id, will need data set id to keep track of what DOM element is deleted. 
  taskItem.setAttribute("data-id", task.id);
  taskItem.textContent = task.text;

  // remember state on reload when calling loadPrevTask function otherwise ignore
  if (task.completed === true) {
    taskItem.classList.toggle("completed");
  }

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  taskItem.append(delBtn);

  // toggle the strikethrough visual
  taskItem.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') return;
    task.completed = !task.completed;
    taskItem.classList.toggle('completed');
    saveTask();
  });

  todoList.append(taskItem);
  delBtn.addEventListener("click", delTaskHandler);

}

// Deleting DOM element logic
function delTaskHandler(e) {
  e.stopPropagation();
  // get access to the dom element when the child "button" is clicked
    const liItemToDel = e.target.closest("li");
    if (!liItemToDel) return; // safety check

    // get access to the ID related to that list item and convert to a number since dataset is stored as a string.
    const taskIdToDel = +liItemToDel.dataset.id;
    // find the index of the item in the array to delete from array and localStorage (NOT DOM, YET)
    const taskIndexTodDel = tasks.findIndex((el) => {
      return el.id === taskIdToDel;
    });

    if (taskIndexTodDel > -1) {
      // splice mutates the array
      tasks.splice(taskIndexTodDel, 1);
      console.log("tasks removed from array: ", tasks);
      // update the storage
      saveTask();
      // now remove from DOM
      liItemToDel.remove();
    }
    console.log(tasks);
}

// -------------EVENT DELEGATION METHOD--------
// todoList.addEventListener('click', (e) => {
//   const target = e.target;
//   const liItem = target.closest('li'); // Find the closest parent <li>

//   if (!liItem) return; // Not a click inside an li

//   const taskId = +liItem.dataset.id;
//   const task = tasks.find(t => t.id === taskId);

//   if (!task) return; // Should not happen if logic is correct

//   if (target.tagName === 'BUTTON' && target.textContent === 'Delete') {
//     // Handle Delete (logic similar to your delTaskHandler but triggered here)
//     const taskIndexTodDel = tasks.findIndex((el) => el.id === taskId);
//     if (taskIndexTodDel > -1) {
//       tasks.splice(taskIndexTodDel, 1);
//       saveTask();
//       liItem.remove(); // Remove the element
//     }
//   } else {
//     // Handle Toggle Completion (clicked on the li itself or text)
//     task.completed = !task.completed;
//     liItem.classList.toggle('completed');
//     saveTask();
//   }
// });

// // With delegation, you would *not* add listeners inside renderTask
// function renderTask(task) {
//   const taskItem = document.createElement("li");
//   taskItem.setAttribute("data-id", task.id);
//   taskItem.textContent = task.text; // Text node first

//   // Add the delete button
//   const delBtn = document.createElement("button");
//   delBtn.textContent = "Delete";
//   taskItem.append(delBtn); // Button inside the li

//   // Apply initial completed state class
//   if (task.completed) {
//     taskItem.classList.add("completed");
//   }

//   todoList.append(taskItem);
// }