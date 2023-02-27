//Selecting the elements of the HTML
const form = document.querySelector('#form');
const inputText = document.querySelector('#list');
const result = document.querySelector('#result');
let title = document.title;
let lists = [];


//AddEventListener
logEventListener();
function logEventListener() {
    //Add function at button of list class
    form.addEventListener('submit', addList);

    window.addEventListener('blur', () => {
        title = document.title;
        document.title = 'Pending To List🤗'
    });
    window.addEventListener('focus', () => {
        document.title = title;
    });

    document.addEventListener('DOMContentLoaded', () =>{
        lists = JSON.parse(localStorage.getItem('List')) || [];
        showHTML();
    })
}

//Function
function addList(e) {
    e.preventDefault();
    const list = inputText.value;

    if (list === '') {
        showAlert('!🚫Error! Empty list is not has typing')
        return;
    }

    //Create an object
    const obLists = {
        id: Date.now(),
        list: list
    }

    lists = [...lists, obLists];

    showHTML();

    form.reset();
}

function showHTML() {

    //Remove previous elements
    cleanHTML();

    if (lists.length > 0) {
        //Touring the Array

        //Sort para ordenar en orden que se agregue 
        lists.sort( (a, b) => b.id - a.id ).forEach(list => {

            //Create list element
            const ul = document.createElement('ul');
            ul.classList.add('list-ul');
            const li = document.createElement('li');
            li.textContent = list.list;

            ul.appendChild(li);

            //create button list for delete
            const buttonDelet = document.createElement('button');
            buttonDelet.innerHTML = `<i class='bx bxs-trash'></i>`;
            buttonDelet.classList.add('borrar-list')

            buttonDelet.onclick = () =>{
                removeLists(list.id);
            }

            li.appendChild(buttonDelet);


            result.appendChild(ul);
        });
    }

    sync();

}

function sync(){
    localStorage.setItem('List', JSON.stringify(lists));
}

function showAlert(mensaje) {

    const removeAlertDuplicate = document.querySelector('.alert-error');
    if (removeAlertDuplicate) {
        return null;
    }

    //Create element at HTML
    const alertError = document.createElement('p');
    alertError.textContent = mensaje;
    alertError.classList.add('alert-error');

    //Insert at HTML
    const errorAlert = document.querySelector('#alert-error');
    errorAlert.appendChild(alertError);

    //Revome alert
    removeAlert(alertError);
}

function removeLists(id){
    lists = lists.filter(list => list.id !== id);
    showHTML();
}

function removeAlert(error) {
    setTimeout(() => {
        error.remove();
    }, 3000);
}

function cleanHTML(){
    while(result.firstChild){
        result.removeChild(result.firstChild);
    }
}