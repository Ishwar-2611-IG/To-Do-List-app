// Array to store tasks with deadlines and their trigger count
let tasksWithDateandTime = [];

// Function to add a task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDateInput = document.getElementById('taskDate');
    const taskTimeInput = document.getElementById('taskTime');
    const taskText = taskInput.value.trim();
    const taskDate = taskDateInput.value;
    const taskTime = taskTimeInput.value;

    if (taskText !== '' && taskDate !== '' && taskTime !== '') {
        const taskList = document.getElementById('taskList');
        const listItem = document.createElement('li');

        // Create the task text
        const taskSpan = document.createElement('span');
        taskSpan.textContent = `${taskText} - (${taskDate}) - ${taskTime}`;

        // Create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.onclick = function () {
            taskList.removeChild(listItem);
            tasksWithDateandTime = tasksWithDateandTime.filter(task => task.text !== taskText); // Remove task from tasksWithDateandTime array
        };

        // Append text and button to the list item
        listItem.appendChild(taskSpan);
        listItem.appendChild(deleteButton);

        // Add toggle functionality to mark task as complete
        listItem.onclick = function () {
            listItem.classList.toggle('completed');
        };

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Add task to tasksWithDateandTime array with triggerCount initialized to 0
        tasksWithDateandTime.push({ text: taskText, date: taskDate, time: taskTime, triggerCount: 0 });

        // Show an alert that the task has been added
        alert(`Task "${taskText}" has been added for date "${taskDate}" at a time of ${taskTime}.`);

        // Clear the input fields
        taskInput.value = '';
        taskDateInput.value = '';
        taskTimeInput.value = '';
    }
}

// Function to update the clock
function updateClock() {
    const clockElement = document.getElementById("clock");
    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const isAM = hours < 12;
    const amPm = isAM ? "AM" : "PM";

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Pad minutes and seconds with leading zeros
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
    const secondsFormatted = seconds < 10 ? `0${seconds}` : seconds;

    // Display the time
    clockElement.textContent = `${hours}:${minutesFormatted}:${secondsFormatted} ${amPm}`;

    // Check task deadlines
    const currentDate = now.toISOString().split('T')[0]; // Get the date in YYYY-MM-DD format
    const currentTime = `${now.getHours()}:${minutesFormatted}`; // Get the time in HH:MM format
    checkTaskDateandTime(currentDate, currentTime);
}

// Function to check task deadlines
function checkTaskDateandTime(currentDate, currentTime) {
    tasksWithDateandTime.forEach(task => {
        if (task.date === currentDate && task.time === currentTime) {
            if (task.triggerCount < 5) {  // Limit to 5 alerts
                ringBell();
                alert(`Time for task: ${task.text}`);
                task.triggerCount += 1;  // Increment the trigger count
            } else {
                console.log(`Task "${task.text}" reached alert limit.`);
            }
        }
    });
}

// Function to ring the bell
function ringBell() {
    const bellSound = document.getElementById('bellSound');
    bellSound.play();
}

// Update the clock every second
setInterval(updateClock, 1000);
