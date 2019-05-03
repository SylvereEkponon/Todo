class UI {
  constructor(){
    this.todoInput = document.getElementById('todo-input');
    this.todoFeedback = document.querySelector('.todo-feedback');
    this.todoList = document.getElementById('todo-list');
    this.listTodoItem = [];
    this.todoID = 0;
  }
  //submit todo method
  submitTodoForm(){
    const value = this.todoInput.value;
    if (value === '' ) {
      this.todoFeedback.classList.add('showItem');
      this.todoFeedback.innerHTML = `<p>value cannot be empty</p>`;
      const self = this;
      setTimeout(() => self.todoFeedback.classList.remove('showItem'), 1500);
    } else {
      this.todoInput.value = '';
      
      let todo = {
        id: this.todoID,
        task: value
      }
      this.todoID++;
      this.listTodoItem.push(todo);
      this.addTodo(todo);
    }
  }
  //add todo
  addTodo(todo){
    const li = document.createElement('li');
    li.classList.add('ml-2');
    li.innerHTML = `${todo.task}
    <a href="#" class="edit-icon mx-2" data-id="${todo.id}">
    <i class="fas fa-edit"></i>
   </a>
   <a href="#" class="delete-icon" data-id="${todo.id}">
    <i class="fas fa-trash"></i>
   </a>`
   this.todoList.appendChild(li);
  }
  //edit todo
  editTodo(element){
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement;

    //remove from dom
    this.todoList.removeChild(parent);

    let todo = this.listTodoItem.filter( x => x.id === id);
    this.todoInput.value = todo[0].task;
    
    //remove from the list
    let tempList = this.listTodoItem.filter( x => x.id !== id);
    this.listTodoItem = tempList;

  }
  //delete todo
  deleteTodo(element){
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement;

    //remove from dom
    this.todoList.removeChild(parent);
   
    //remove from the list
    let tempList = this.listTodoItem.filter( x => x.id !== id);
    this.listTodoItem = tempList;
  }

}

function evenListeners(){
  const todoForm = document.getElementById('todo-form');
  const todoList = document.getElementById('todo-list');

  //new instance of UI
  const ui = new UI();

  //todo form submit
  todoForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    ui.submitTodoForm();
  });

  //todo click
  todoList.addEventListener('click', (event) =>{
    
     if (event.target.parentElement.classList.contains('edit-icon')) {
       ui.editTodo(event.target.parentElement);
     }
    else if (event.target.parentElement.classList.contains('delete-icon')) {
       ui.deleteTodo(event.target.parentElement);
     }
  });
}

document.addEventListener('DOMContentLoaded', () => evenListeners());