// Task array to store all tasks
let tasks = [];

// Get DOM elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const navbarDisplay = document.querySelector('.navbardisplay');
const filterButtons = document.querySelectorAll('.tasklist button');
const totalCount = document.querySelector('.navbar div:nth-child(1) p:first-child');
const activeCount = document.querySelector('.navbar div:nth-child(2) p:first-child');
const completedCount = document.querySelector('.navbar div:nth-child(3) p:first-child');

let currentFilter = 'all';

// Add task event listener
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
});

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') return;
    
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    tasks.push(task);
    taskInput.value = '';
    
    updateDisplay();
    updateCounters();
}

// Delete task function
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    updateDisplay();
    updateCounters();
}

// Toggle task completion
function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        updateDisplay();
        updateCounters();
    }
}

// Update display based on filter
function updateDisplay() {
    let filteredTasks = tasks;
    
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    
    if (filteredTasks.length === 0) {
        navbarDisplay.innerHTML = '<p>No tasks yet. Add one to get started!</p>';
    } else {
        navbarDisplay.innerHTML = filteredTasks.map(task => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px; margin: 5px 0; background: #f5f5f5; border-radius: 25px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})" style="cursor: pointer;">
                    <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}; color: ${task.completed ? '#888' : '#000'};">${task.text}</span>
                </div>
                <button onclick="deleteTask(${task.id})" style="background: #ff4444; color: white; border: none; padding: 5px 10px; border-radius: 25px; cursor: pointer;">Delete</button>
            </div>
        `).join('');
    }
}

// Update counters
function updateCounters() {
    const total = tasks.length;
    const active = tasks.filter(task => !task.completed).length;
    const completed = tasks.filter(task => task.completed).length;
    
    totalCount.textContent = total;
    activeCount.textContent = active;
    completedCount.textContent = completed;
}

// Filter button event listeners
filterButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (index === 0) currentFilter = 'all';
        if (index === 1) currentFilter = 'active';
        if (index === 2) currentFilter = 'completed';
        
        updateDisplay();
    });
});