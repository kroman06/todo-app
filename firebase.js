const BASE_URL = "https://todo-app-6cb39-default-rtdb.firebaseio.com/todos";

async function loadTODOsFromDB() {
    const res = await fetch(`${BASE_URL}.json`);
    if (!res.ok) throw new Error(`GET failed: ${res.status}`);
    const data = await res.json();
    todos = data
        ? Object.entries(data).map(([id, todo]) => ({ id, ...todo }))
        : [];
}

async function addTODOtoDB(text) {
    const todo = { text, completed: false };
    const res = await fetch(`${BASE_URL}.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
    });
    if (!res.ok) throw new Error(`POST failed: ${res.status}`);
    const { name } = await res.json();
    return { id: name, ...todo };
}

async function deleteTODOinDB(id) {
    const res = await fetch(`${BASE_URL}/${id}.json`, { method: "DELETE" });
    if (!res.ok) throw new Error(`DELETE failed: ${res.status}`);
}

async function updateTODOinDB(id, fields) {
    const res = await fetch(`${BASE_URL}/${id}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
    });
    if (!res.ok) throw new Error(`PATCH failed: ${res.status}`);
}
