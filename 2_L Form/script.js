document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTask();
    func();
  }
});

last_edited_block = -1;


func = function(){
    const taskList = [].slice.call(document.getElementById('taskList').children);
    tasks = taskList.map(task => {return task.textContent});
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

func2 = function(e){
    tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(task => {
      taskInput.value = task;
      addTask();
    });
}

window.onbeforeunload = func;
window.onload = func2;


function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }
  const taskList = document.getElementById('taskList');
  
  if (last_edited_block != -1 && taskList.childElementCount > last_edited_block){
    taskList.children[last_edited_block].childNodes[0].nodeValue  = taskText;
    taskInput.value = '';
    last_edited_block = -1;
    return;
  }
  
  const li = document.createElement('li');
  li.textContent = taskText;
	
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  
  // Add a delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', function () {
    taskList.removeChild(li);
  });

  // Add a complete button
  const completeBtn = document.createElement('button');
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';
  completeBtn.classList.add('complete-btn');
  completeBtn.addEventListener('click', function () {
    li.classList.toggle('completed');
  });
  
  // Add a change button
  const changeBtn = document.createElement('button');
  changeBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
  changeBtn.classList.add('change-btn');
  changeBtn.addEventListener('click', function () {
    last_edited_block = Array.prototype.indexOf.call(taskList.children, li);
    taskInput.value = li.textContent;
  });
  buttonContainer.appendChild(completeBtn);
  buttonContainer.appendChild(deleteBtn);
  buttonContainer.appendChild(changeBtn);
  
  li.appendChild(buttonContainer);
  taskList.appendChild(li);

  taskInput.value = '';
}