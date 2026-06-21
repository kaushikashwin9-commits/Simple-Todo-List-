 // Select DOM elements

const input = document.getElementById('todo-input');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('Todo-list');


// Try to load saved todos from localStorage

const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];


// Save todos array to localStorage

function saveTodos() {

    // Save current todos array to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));

}


// Create a DOM node for a todo object

function createTodoNode(todo, index) {

    const li = document.createElement('li');


    // Checkbox for toggle completion

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;

    checkbox.addEventListener('change', () => {

        // Update completion status
        todo.completed = checkbox.checked;

        // Visual feedback
        textSpan.style.textDecoration = todo.completed
            ? 'line-through'
            : 'none';

        saveTodos();
    });


    // Todo text

    const textSpan = document.createElement('span');
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';

    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }


    // Double click to edit todo

    textSpan.addEventListener('dblclick', () => {

        const newText = prompt('Edit todo', todo.text);

        if (newText !== null && newText.trim() !== '') {

            todo.text = newText.trim();
            textSpan.textContent = todo.text;

            saveTodos();
        }
    });


    // Delete button

    const delbtn = document.createElement('button');
    delbtn.textContent = 'Delete';

    delbtn.addEventListener('click', () => {

        todos.splice(index, 1);

        render();
        saveTodos();
    });


    // Append elements

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delbtn);

    return li;
}


// Render the whole todo list

function render() {

    list.innerHTML = '';

    todos.forEach((todo, index) => {

        const node = createTodoNode(todo, index);
        list.appendChild(node);

    });
}


// Add new todo

function addtodo() {

    const text = input.value.trim();

    if (!text) {
        return;
    }


    // Push new todo object

    todos.push({
        text: text,
        completed: false
    });

    input.value = '';

    render();
    saveTodos();
}


// Add todo on button click

addBtn.addEventListener('click', addtodo);


// Add todo on Enter key

input.addEventListener('keypress', (e) => {

    if (e.key === 'Enter') {
        addtodo();
    }
});


// Initial render

render();