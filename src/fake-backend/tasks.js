import { v4 as uuidv4 } from 'uuid';

const TASKS_KEY = 'TASKS';

// A mock function to mimic making an async request for fetching tasks
export function fetchTasks() {
    const tasks = JSON.parse(localStorage.getItem(TASKS_KEY) ?? '[]');
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, tasks }), 1000));
}

// A mock function to mimic making an async request for deleting a task
export function deleteTask(taskId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const tasks = JSON.parse(localStorage.getItem(TASKS_KEY) ?? '[]');

            if (Array.isArray(tasks)) {
                const newTasksArray = tasks.filter((task) => task?.id !== taskId);
                localStorage.setItem(TASKS_KEY, JSON.stringify(newTasksArray))

                return resolve({ success: true, taskId })
            }

            return reject({ success: false, error: 'Cannot read tasks from DB' })
        }, 500)
    });
}

// A mock function to mimic making an async request for adding a new task
export function addTask(newTask) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const tasks = JSON.parse(localStorage.getItem(TASKS_KEY) ?? '[]');

            if (Array.isArray(tasks)) {
                const task = {
                    ...newTask,
                    id: uuidv4()
                };

                tasks?.push(task);
                localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
                return resolve({ success: true, task })
            }

            return reject({ success: false, error: 'Cannot read tasks from DB' })
        }, 500)
    });
}
