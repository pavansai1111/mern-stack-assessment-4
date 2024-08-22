document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const filterButtons = document.querySelectorAll('.filter-btn');

    addBtn.addEventListener('click', addTodo);
    todoList.addEventListener('click', handleTodoClick);
    filterButtons.forEach(btn => btn.addEventListener('click', filterTodos));

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            const todoItem = createTodoItem(todoText);
            todoList.appendChild(todoItem);
            todoInput.value = '';
        } else {
            alert("Please enter a task!");
        }
    }

    function createTodoItem(text) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.status = 'pending';
        
        const span = document.createElement('span');
        span.textContent = text;

        const actions = document.createElement('div');
        actions.className = 'todo-actions';

        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete-btn';
        completeBtn.textContent = 'Complete';

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';

        actions.appendChild(completeBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actions);
        return li;
    }

    function handleTodoClick(event) {
        const target = event.target;
        const todoItem = target.closest('.todo-item');

        if (target.classList.contains('complete-btn')) {
            todoItem.classList.toggle('completed');
            todoItem.dataset.status = todoItem.classList.contains('completed') ? 'completed' : 'pending';
        } else if (target.classList.contains('edit-btn')) {
            const newText = prompt('Edit your task:', todoItem.firstChild.textContent);
            if (newText) {
                todoItem.firstChild.textContent = newText.trim();
            }
        } else if (target.classList.contains('delete-btn')) {
            todoItem.remove();
        }
    }

    function filterTodos(event) {
        const filter = event.target.dataset.filter;
        filterButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        Array.from(todoList.children).forEach(todoItem => {
            switch (filter) {
                case 'all':
                    todoItem.style.display = 'flex';
                    break;
                case 'completed':
                    todoItem.style.display = todoItem.classList.contains('completed') ? 'flex' : 'none';
                    break;
                case 'pending':
                    todoItem.style.display = !todoItem.classList.contains('completed') ? 'flex' : 'none';
                    break;
            }
        });
    }
});
