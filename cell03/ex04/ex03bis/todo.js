$(document).ready(function () {
  const $ftList = $("#ft_list");
  const $button = $("#button");

  
  loadTodosFromCookies();

  
  $button.click(function () {
    const todoText = prompt("Please enter your new to-do:");
    if (todoText) {
      createTodoElement(todoText);
      saveTodoToCookie(todoText);
    }
  });

  function createTodoElement(todoText) {
    const $todoDiv = $("<div></div>")
      .text(todoText)
      .addClass("todo-item")
      .click(function () {
        if (confirm("Do you want to delete this to-do?")) {
          $todoDiv.remove();
          deleteTodoFromCookie(todoText);
        }
      });

  
    $ftList.prepend($todoDiv);
  }

  function saveTodoToCookie(todoText) {
    const todos = getTodosFromCookies();
    todos.push(todoText);
    document.cookie = `todos=${JSON.stringify(todos)};path=/;SameSite=Strict`;
  }

  function deleteTodoFromCookie(todoText) {
    let todos = getTodosFromCookies();
    todos = todos.filter(todo => todo !== todoText);
    document.cookie = `todos=${JSON.stringify(todos)};path=/;SameSite=Strict`;
  }

  function loadTodosFromCookies() {
    const todos = getTodosFromCookies();
    todos.forEach(todoText => createTodoElement(todoText));
  }

  function getTodosFromCookies() {
    const cookieValue = document.cookie
      .split("; ")
      .find(row => row.startsWith("todos="));
    return cookieValue ? JSON.parse(cookieValue.split("=")[1]) : [];
  }
});
