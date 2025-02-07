document.addEventListener("DOMContentLoaded", function () {
    const ftList = document.getElementById("ft_list");
    const button = document.getElementById("button");
  
    
    loadTodosFromCookies();
  
    
    button.addEventListener("click", function () {
      const todoText = prompt("Please enter your new to-do:");
      if (todoText) {
        createTodoElement(todoText);
        saveTodoToCookie(todoText);
      }
    });
  
    
    function createTodoElement(todoText) {
      const todoDiv = document.createElement("div");
      todoDiv.textContent = todoText;
      todoDiv.classList.add("todo-item");
  
      
      todoDiv.addEventListener("click", function () {
        if (confirm("Do you want to delete this to-do?")) {
          todoDiv.remove();
          deleteTodoFromCookie(todoText);
        }
      });
  
      ftList.prepend(todoDiv); 
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
  