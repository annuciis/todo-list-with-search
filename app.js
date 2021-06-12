const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');


const generateTemplate = todo => {

    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;

    list.innerHTML += html;
}

addForm.addEventListener('submit', e => {

    e.preventDefault();
    const todo = addForm.addField.value.trim();

    if(todo != ""){
    generateTemplate(todo);
    addForm.addField.value = "";

    
    storeTodos()
    
    }
    
})


//delete todos
list.addEventListener('click', e => {

    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove(); //parent of icon is li item

        storeTodos();
    }
})

//search todos

const filterTodos = term => {

    Array.from(list.children)
    .filter(todo => !todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.add('notInSearchList'));

    Array.from(list.children)
    .filter(todo => todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.remove('notInSearchList'));

}

search.addEventListener('keyup', () => {

    let term = search.value.trim();
    term = term.toLowerCase();
    filterTodos(term);


})



const storeTodos = () => window.localStorage.todoItems = list.innerHTML;



window.onload = () => {

       if(window.localStorage.todoItems){
           list.innerHTML += window.localStorage.todoItems;
       }
}

