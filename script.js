const tasks = [
    { id: 1, description: 'Alimentar Gatos', completed: false },
    { id: 2, description: 'Estudiar JavaScript', completed: false },
    { id: 3, description: 'Hacer Ejercicio', completed: true }
  ];
  
  const tasksList = document.getElementById('tasks');
  const totalTasksSpan = document.getElementById('total-tasks');
  const completedTasksSpan = document.getElementById('completed-tasks');
  const addTaskButton = document.getElementById('add-task-button');
  const taskInput = document.getElementById('task-input');
  
  function renderTasks() {
    tasksList.innerHTML = ''; // limpiar lista
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = task.completed ? 'completed' : '';
  
      const span = document.createElement('span');
      span.textContent = task.description;
  
      const divButtons = document.createElement('div');
  
      // Botón para marcar completada
      const completeBtn = document.createElement('button');
      completeBtn.textContent = 'Marcar';
      completeBtn.className = 'task-btn complete-btn';
      completeBtn.addEventListener('click', () => {
        task.completed = !task.completed;
        updateSummary();
        renderTasks();
      });
  
      // Botón para eliminar tarea
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.className = 'task-btn delete-btn';
      deleteBtn.addEventListener('click', () => {
        const index = tasks.findIndex(t => t.id === task.id);
        if (index > -1) {
          tasks.splice(index, 1);
          updateSummary();
          renderTasks();
        }
      });
  
      divButtons.appendChild(completeBtn);
      divButtons.appendChild(deleteBtn);
  
      li.appendChild(span);
      li.appendChild(divButtons);
  
      tasksList.appendChild(li);
    });
  }
  
  function updateSummary() {
    totalTasksSpan.textContent = tasks.length;
    completedTasksSpan.textContent = tasks.filter(t => t.completed).length;
  }
  
  addTaskButton.addEventListener('click', () => {
    const description = taskInput.value.trim();
    if (description !== '') {
      const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        description,
        completed: false
      };
      tasks.push(newTask);
      taskInput.value = '';
      updateSummary();
      renderTasks();
    }
  });
  
  renderTasks();
  updateSummary();
  