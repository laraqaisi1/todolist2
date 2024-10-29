
let tasks = [
  {
    "title": "play tennis",
    "date": "2/4/2002",
    "isDone": true,
  },
  {
    "title": "play tennis",
    "date": "2/4/2002",
    "isDone": false,
  }
]

function getTasksFromStorage() {
  tasks = retrivedTasks = JSON.parse(localStorage.getItem("tasks"));

  tasks = retrivedTasks ?? [];
}

getTasksFromStorage();
InsertTasks();


function InsertTasks() {
  document.querySelector(".todolist-box").innerHTML = "";
  let index = 0;

  for (let task of tasks) {
    let content = `
  <div class="task ${task.isDone ? '' : 'done'}">

        <div class="time">
          <p>
            ${task.title}
          </p>
          <div class="calendar">
            <i class="fa-solid fa-calendar-days"></i>
            <div class="date">
              ${task.date}
            </div>
          </div>

        </div>
        <div class="icons">
          <div class="delete" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></div>

          ${task.isDone ? `
            <div class="check" onclick= "toggleCompleteTask(${index})"><i class="fa-solid fa-check"></i></div>

            `: `<div class="check" onclick="toggleCompleteTask(${index})"><i class="fa-solid fa-xmark"></i></div>`}
          
          <div class="edit" onclick="editTask(${index})"><i class="fa-solid fa-pen"></i></div>
        </div>
      </div>
    `;




    document.querySelector(".todolist-box").innerHTML += content;
    index++;
  }

}


document.querySelector(".add-task").addEventListener("click", function () {

  let titleTask = prompt("Enter you task please");

  let dates = new Date();
  let time = dates.getDate() + "/" + (dates.getMonth() + 1) + "/" + dates.getFullYear() + "/" + dates.getHours() + ":" + dates.getMinutes();

  let task = {
    "title": titleTask,
    "date": time,
    "isDone": true,
  }

  tasks.push(task);
  storeTasks()
  InsertTasks();
})

function deleteTask(index) {
  let task = tasks[index]
  let isOk = confirm(`Are you sure you want to delete the task (${task.title}?)`)


  if (isOk) {
    tasks.splice(index, 1);
    storeTasks()
    InsertTasks();
  }

}

function editTask(index) {
  let task = tasks[index];
  let newTask = prompt("Please enetr the new task", task.title);


  let dates = new Date();
  let time = dates.getDate() + "/" + (dates.getMonth() + 1) + "/" + dates.getFullYear() + "/" + dates.getHours() + ":" + dates.getMinutes();

  if (typeof newTask == "string") {

    task.title = newTask;
    task.date = time;
    storeTasks()
    InsertTasks();

  }



  InsertTasks();
}


function toggleCompleteTask(index) {
  let task = tasks[index];
  task.isDone = !task.isDone;
  storeTasks()
  InsertTasks();


}

function storeTasks() {
  let tasksString = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksString);
}

