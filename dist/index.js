//dark mode toggle
const darkModeButton = document.getElementById("toggle-dark");
const root = document.documentElement;
let isDark = JSON.parse(localStorage.getItem("isDark")) || false;

if (isDark) {
  root.classList.add("dark");
  darkModeButton.textContent = "Light";
}

darkModeButton.addEventListener("click", () => {
  root.classList.toggle("dark");

  if (root.classList.contains("dark")) {
    darkModeButton.textContent = "Light";
    isDark = true;
  } else {
    darkModeButton.textContent = "Dark";
    isDark = false;
  }

  localStorage.setItem("isDark", isDark);
});

//creating a task item(object)
class Task {
  constructor(label) {
    this.id = Math.floor(Math.random() * 900) + 100;
    this.label = label;
    this.isCompleted = false;
  }
}

//storing data in local storage
class Storage {
  static getItems() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      try {
        tasks = JSON.parse(localStorage.getItem("tasks"));
      } catch (error) {
        console.log(error);
        tasks = [];
      }
    }
    return tasks;
  }

  static setItems(task) {
    try {
      const tasks = Storage.getItems();
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.log(error);
    }
  }

  static removeItems(id) {
    const tasks = Storage.getItems();

    tasks.forEach((task, index) => {
      if (task.id === id) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

class UI {
  static displayTasks() {
    const tasks = Storage.getItems();
    tasks.forEach((task) => {
      UI.addTaskToList(task);
    });
  }

  static addTaskToList(task) {
    const { id, label, isCompleted } = task;
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="bg-bgSecondary rounded-md flex p-2 justify-between items-center">
        <div class="flex items-center">
          <input type="checkbox" id="${id}" class="hidden task-completed" data-completed=${isCompleted}>
          <label for="${id}" class="flex items-center cursor-pointer">
            <div class="border-2 border-txtPrimary rounded-full w-6 h-6 check-icon">
              <svg xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 0 512 512" class="check-icon fill-white p-1 rounded-full bg-accent ${
                isCompleted == false ? "hidden" : ""
              }">
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path>
              </svg>
            </div>
            <p class="text-lg relative text-txtPrimary ml-4">
             ${label}
              <span class="absolute h-0.5 bg-txtPrimary/90 top-[50%] left-0 ${
                isCompleted == false ? "" : "w-full"
              }"></span>
            </p>
          </label>
        </div>
        <button class="bg-red-500 p-2 rounded-sm del">X</button>
      </div>
    `;

    const taskList = document.getElementById("task-list");
    taskList.appendChild(li);

    const listItem = document.getElementById(id);
    listItem.addEventListener("change", isComplete);

    function isComplete(e) {
      let input = e.target;
      let lable = input.nextElementSibling;
      let tasks = Storage.getItems();
      let checkIcon = lable.children[0].children[0];
      let taskName = lable.children[1].children[0];

      checkIcon.classList.toggle("hidden");
      taskName.classList.toggle("w-full");

      tasks.forEach((task) => {
        if (task.id == input.id) {
          task.isCompleted = !task.isCompleted;
        }
      });

      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    const deleteButtons = document.querySelectorAll(".del");

    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener("click", (e) => {
        let li = e.target.parentElement.parentElement;
        let input = e.target.previousElementSibling.children[0].id;
        let tasks = Storage.getItems();
        tasks.forEach((task, index) => {
          if (task.id == input) {
            tasks.splice(index, 1);
          }
        });
        taskList.removeChild(li);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      });
    });
  }
}

//render list in display
document.addEventListener("DOMContentLoaded", UI.displayTasks());

//add item
document.getElementById("addTask").addEventListener("submit", (e) => {
  e.preventDefault();
  const taskName = document.getElementById("taskName").value;

  let task = new Task(taskName);

  Storage.setItems(task);
  UI.addTaskToList(task);

  //clear fields
  document.getElementById("taskName").value = "";
});

//greetings
let greetings = document.getElementById("greeting");
let date = new Date();
let currentTime = date.getHours();

if (currentTime < 12) {
  greetings.textContent = "Good Morning,";
} else if (currentTime > 12 && currentTime < 18) {
  greetings.textContent = "Good Afternoon,";
} else {
  greetings.textContent = "Good Evening,";
}

//display username

let isFirstVisit = localStorage.getItem("firstVisit") !== null ? localStorage.getItem("firstVisit") : true;
let username = localStorage.getItem("username") || "enter your name";
let displayUserName = document.querySelector("#d-username");

displayUserName.textContent = username;

displayUserName.addEventListener("input", function () {
  const content = this.textContent;
  localStorage.setItem("username", content);
});
