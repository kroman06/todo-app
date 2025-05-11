let todos = JSON.parse(localStorage.getItem('todos')) || [];

function newTodo() {
    const task = prompt('Enter new task:');
    if (!task.trim()) {
        alert("Task name can't be empty!");
        return;
    }

    todos.push({ id: Date.now(), text: task, completed: false });
    localStorage.setItem('todos', JSON.stringify(todos));
    render();
    updateCounter();
}

function renderTodo(todo) {
    return `
        <li data-id="${todo.id}" onclick="checkTodo(${todo.id}, event)">
        <input type="checkbox" ${todo.completed ? 'checked' : ''}>
        <label style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">${todo.text}</label>
        <button onclick="deleteTodo(${todo.id}, event)">Delete</button>
        </li>
    `;
}

function render() {
    const todoList = document.querySelector('#todo-list');
    const html = todos.map(renderTodo).join('');
    todoList.innerHTML = html;
}

function updateCounter() {
    const total = todos.length;
    const uncompleted = todos.filter(todo => todo.completed).length;

    document.querySelector('#completed-p').textContent = `Completed: ${uncompleted}/${total}`;
}

function deleteTodo(id, event) {
    event.stopPropagation();
    todos = todos.filter(todo => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));
    render();
    updateCounter();
}

function checkTodo(id, event) {
    event.stopPropagation();
    const todoElement = document.querySelector(`#todo-list li[data-id="${id}"]`);
    const checkbox = todoElement.querySelector('input[type="checkbox"]');
    const label = todoElement.querySelector('label');

    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    localStorage.setItem('todos', JSON.stringify(todos));

    checkbox.checked = !checkbox.checked;
    label.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    updateCounter();
}

document.querySelector('#new-todo').addEventListener('click', newTodo);

render();
updateCounter();