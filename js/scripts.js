const themeSwitcherBtn = document.getElementById("themeSwitcher");
const body = document.querySelector("body");
const addBtn = document.getElementById("addBtn");
const todoInput = document.getElementById("addTodo");
const ul = document.querySelector(".todos");
const filter = document.querySelector(".filter");
const btnFilter = document.querySelector("#clearCompleted");

/** 
 * 0- Adding an event listener to the main function of the whole application
 */
document.addEventListener("DOMContentLoaded", main);

function main() {

  /** 
  * 1- themeSwitcher
  */
  themeSwitcherBtn.addEventListener("click", () => {
    body.classList.toggle("light");
    const themeImg = themeSwitcherBtn.children[0];
    themeImg.setAttribute(
      "src",
      themeImg.getAttribute("src") === "./assets/images/icon-sun.png" ?
        "./assets/images/icon-moon.png" :
        "./assets/images/icon-sun.png"
    );
  });

  /**
  * 2- gets all todos array from local storage to show on the html page
  */
  makeTodoElement(JSON.parse(localStorage.getItem("todos")));

  /**
  * 3- Add a todo to "todos" array list saved in LocalStorage
  */
  addBtn.addEventListener("click", () => {
    const item = todoInput.value.trim();
    if (item) {
      const todos = !localStorage.getItem("todos") ? [] :
        JSON.parse(localStorage.getItem("todos"));

      const currentTodo = {
        item: item,
        isCompleted: false,
      };

      todos.push(currentTodo);
      localStorage.setItem("todos", JSON.stringify(todos));
      makeTodoElement([currentTodo]);

      todoInput.value = "";
    }
  });

  /**
  * 4- delete one or more todos
  */
  btnFilter.addEventListener('click', () => {
    var deleteIndexes = [];

    document.querySelectorAll(".card.checked").forEach((card) => {
      deleteIndexes.push(
        [...document.querySelectorAll(".todos .card")].indexOf(card)
      );

      card.classList.add("fall");
      card.addEventListener('animationend', () => {
        card.remove();
      });

    });
    removeMultipleTodos(deleteIndexes);
  })

  /**
  * 5- Moving a todo card down or up
  */
  ul.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (e.target.classList.contains("card") &&
      !e.target.classList.contains("dragging")) {
      const draggingCard = document.querySelector(".dragging");
      const cards = [...ul.querySelectorAll(".card")];
      const draggingPos = cards.indexOf(draggingCard);
      const newPos = cards.indexOf(e.target);
      if (draggingPos > newPos) {
        ul.insertBefore(draggingCard, e.target);
      } else {
        ul.insertBefore(draggingCard, e.target.nextSibling)
      }
      const todos = JSON.parse(localStorage.getItem("todos"));
      const moved = todos.splice(draggingPos, 1);
      todos.splice(newPos, 0, moved[0]);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });

  /**
  * 6- Showing the active list 
  */
  filter.addEventListener('click', (e) => {
    const id = e.target.id;
    if (id) {
      document.querySelector(".on").classList.remove("on");
      document.getElementById(id).classList.add("on");
      document.querySelector(".todos").className = `todos ${id}`;
    }
  });

  /**
  * 7- Activating the Enter key in the input field
  */
  todoInput.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
      addBtn.click();
    }
  })
}
