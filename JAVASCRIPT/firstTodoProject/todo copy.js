// html elements
const todoInput = document.querySelector('#todo');
const todoForm = document.querySelector('#todo-form');
const todoList = document.querySelector('.list-group');
const firstCardBody = document.querySelectorAll('.card-body')[0];
const cardHeader = document.querySelector('.card-header');
const clearButton = document.querySelector("#clear-todos");
const filter = document.querySelector('#filter');
const date= document.querySelector('#datepicker-input');
let data;
console.log("Data Variable Result=>",data); // console result before push item to array
EventListeners();

function addToArray(todo){ // todos in Array
    if(data === null || data ===undefined){
        data=[];
        console.log('array initialized');
        data.push(todo);
    }else{
        data.push(todo);
    }
    console.log(data); // console result after push item to array
}


function CreateElement(tagName) {
    return document.createElement(tagName);
}

function EventListeners() {
    todoInput.addEventListener('keyup', function (event) {
        cardHeader.innerHTML = todoInput.value;
    });

    filter.addEventListener('keyup',filterTodos);

    clearButton.addEventListener("click", function x() {
        if (confirm("Are you sure to delete all todos?")) {
            while (todoList.firstElementChild != null) {
                todoList.removeChild(todoList.firstElementChild);
            }

        }
    });
    todoForm.addEventListener('click', addToDo);
    todoList.addEventListener('click', removeElement);

}


function filterTodos(event){
    const filterValue = event.target.value.toLowerCase();
    const listTodos = document.querySelectorAll('.list-group-item');
    listTodos.forEach(function(todo){
        const todoTitle = todo.textContent.toLowerCase();
        console.log(todoTitle.indexOf(filterValue)===-1);
        if(todoTitle.indexOf(filterValue)===-1){
            console.log('1=',todoTitle,'2=',filterValue)
            todo.setAttribute('style','background-color:white');
            // todo.setAttribute('style','display:none !important');
        }else{
            console.log('1=',todoTitle,'2=',filterValue)
            todo.setAttribute('style','background-color:yellow');
        }
    })
}

function spaceRemover(a) {
    return a.split(' ').join('');
}

function removeElement(event) {
    if (event.target.className == 'fa fa-remove') {

        var findParentElement = event.target.parentElement.parentElement;
        console.log(findParentElement);
        findParentElement.remove();


    }
    event.preventDefault();
}

function addToDo(e) {
    if (e.target.className == 'btn btn-danger') {
        var todoValue = todoInput.value;
        var newTodo = spaceRemover(todoValue);
        if (newTodo === "" || newTodo === " " || newTodo === null) {
            displayMessage('danger', 'Please Enter a Todo!');
        } else {
            displayMessage('success', 'Todo has been added!');
            makeTodo(todoValue);
            addToArray(todoValue);
          
        }

        console.log('testing addToDo');
    }

    e.preventDefault();
}

/*
<!--  <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>
                       -->
*/

function makeTodo(newTodo) {
    const listItem = CreateElement('li');
    listItem.className = "list-group-item d-flex justify-content-between"
    const link = CreateElement('a');
    link.href = "#"
    link.className = "delete-item"
    link.innerHTML = "<i class = 'fa fa-remove'></i>"
    listItem.appendChild(document.createTextNode(newTodo.trim()))
    listItem.appendChild(link);

    todoList.appendChild(listItem)

    console.log(listItem);
}



function displayMessage(type, message) {

    /*

<div class="alert alert-success" role="alert">
  This is a success alert—check it out!
</div>

*/

    const div = CreateElement('div');
    div.className = `alert alert-${type}`;
    div.role = "alert";
    div.innerHTML = message;
    firstCardBody.appendChild(div);
    console.log(div);
    setTimeout(function () {
        div.remove();
    }, 2000);

}

var datepicker = new tui.DatePicker('#wrapper', {
    date: new Date(),
    input: {
        element: '#datepicker-input',
        format: 'yyyy-MM-dd'
    }
});