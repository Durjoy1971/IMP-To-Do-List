window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  console.log("Load ", todos);
  const nameInput = document.querySelector("#name");
  const newTodoForm = document.querySelector("#new-todo-form");

  const username = localStorage.getItem("username") || "";
  nameInput.value = username;

  nameInput.addEventListener("change", (e) => {
    console.log(e);
    localStorage.setItem("username", e.target.value);
  });

  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = {
      content: e.target.content.value,
      done: false,
      status: "To-Do",
      createdAt: new Date().getTime(),
    };

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

    e.target.reset();

    DisplayTodos();
  });

  DisplayTodos();
});

function DisplayTodos() {
  const todoList = document.querySelector("#todo-list");

  todoList.innerHTML = ""; // Delete Previous All Things

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement("button");
    const statusBtn = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");

    content.classList.add("todo-content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteButton.classList.add("delete");
    statusBtn.classList.add("status");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    edit.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";
    statusBtn.innerHTML = `${todo.status}`;

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(statusBtn);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);

    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("click", (e) => {
      todo.done = e.target.checked;

      if (todo.done) {
        todo.status = "Done";
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
        todo.status = "To-Do";
      }
    
      localStorage.setItem("todos", JSON.stringify(todos));

      DisplayTodos();
    });

    edit.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayTodos();
      });
    });

    deleteButton.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      DisplayTodos();
    });

    statusBtn.addEventListener("click", (e) => {
      let temp_status = todo.status;
      if(temp_status === "To-Do"){
        todo.status = "Doing";
        todo.done = false;
      } else if(temp_status === "Doing"){
        todo.status = "Done";
        todo.done = true;
      } else {
        todo.status = "To-Do";
        todo.done = false;
      }
      localStorage.setItem("todos", JSON.stringify(todos));
      DisplayTodos();
    });
  });
}
