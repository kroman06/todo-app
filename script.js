async function newTodo() {
    const task = prompt('Enter new task:');
    if (!task.trim()) {
        alert("Task name can't be empty!");
        return;
    }

    const item = await addTODOtoDB(task);
    todos.push(item);
    render();
    updateCounter();
}

function renderTodo(todo) {
    return `
        <li data-id="${todo.id}" onclick="checkTodo('${todo.id}', event)">
        <input type="checkbox" ${todo.completed ? 'checked' : ''}>
        <label style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">${todo.text}</label>
        <button onclick="removeTodo('${todo.id}', event)">Delete</button>
        </li>
    `;
}

function render() {
    document.querySelector('#todo-list').innerHTML =
        todos.map(renderTodo).join('');
}

function updateCounter() {
    const total = todos.length;
    const uncompleted = todos.filter(todo => todo.completed).length;

    document.querySelector('#completed-p').textContent = `Completed: ${uncompleted}/${total}`;
}

function removeTodo(id, event) {
    event.stopPropagation();
    todos = todos.filter(todo => todo.id !== id);
    render();
    updateCounter();
    deleteTODOinDB(id);
}

function checkTodo(id, event) {
    event.stopPropagation();
    console.log();
    const todoElement = document.querySelector(`#todo-list li[data-id="${id}"]`);
    const checkbox = todoElement.querySelector('input[type="checkbox"]');
    const label = todoElement.querySelector('label');

    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    checkbox.checked = !checkbox.checked;
    label.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    updateCounter();
    updateTODOinDB(id, { checked: checkbox.checked });
}

let todos = [];
window.addEventListener("DOMContentLoaded", async () => {
    document.querySelector('#new-todo').addEventListener("click", newTodo);

    try {
        await loadTODOsFromDB();
        render();
        updateCounter();
    } catch (e) {
        console.error(e);
        alert("Error loading tasks");
    }
});