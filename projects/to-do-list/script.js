let todos;

const savedTodos = JSON.parse(localStorage.getItem('todos'));
todos = savedTodos;

function addTodo() {
    let textbox = document.getElementById("todo-title");
    let title = textbox.value;

    let datePicker = document.getElementById("date-picker");
    let dueDate = datePicker.value;
    dueDate = dueDate.replace(/-/g, "/");

    createTodo(title, dueDate);

    render();
}

function createTodo(title, dueDate) {
    const id = '' + new Date().getTime();
    
    todos.push({
        title: title,
        dueDate: dueDate,
        id: id
    });

    saveTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos))
}
render();

function deleteTodo(e) {
    const deleteButton = e.target;
    idToDelete = deleteButton.id;

    removeTodo(idToDelete);
    
    render();
}

function removeTodo(idToDelete) {
    todos = todos.filter(function(todo) {
        if(todo.id === idToDelete){
            return false
        } else {
            return true;
        } 
    });
    saveTodos();
}

function render() {
    let textbox = document.getElementById("todo-title");
    textbox.value = "";
    textbox.focus();

    let datePicker = document.getElementById("date-picker");
    datePicker.value = '';

    let todoList = document.getElementById("todo-list");
    todoList.innerHTML = '';

    todos.forEach(function(todo){
        let element = document.createElement("div");
        element.classList.add("content-div");
        element.innerText = todo.title + ' - ' + todo.dueDate;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn")
        deleteButton.innerText = "Excluir";
        deleteButton.onclick = deleteTodo;
        deleteButton.id = todo.id;
        element.appendChild(deleteButton);
        
        todoList.appendChild(element)
    });
}