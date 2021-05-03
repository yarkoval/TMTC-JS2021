const form = document.querySelector('form')
const ul = document.querySelector('ul')
const button = document.querySelector('button')
const add = document.querySelector('#add-btn');
const del = document.querySelector('#del-btn');
const input = document.getElementById('input')
const clear = document.getElementById('clr-btn')
let queueArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
localStorage.setItem('items', JSON.stringify(queueArray))
const data = JSON.parse(localStorage.getItem('items'))

// додає новий li зі значенням text в ul 
const liMaker = val => {
    const li = document.createElement('li')
    li.textContent = val
    ul.appendChild(li)
}

// видаляє значення та зберігає новий стан черги в localStorage
function delValue() {
    if (document.getElementById("queue").innerHTML == "") {
        alert("Queue is already empty")
    }

    let elem = ul.firstChild;
    elem.parentNode.removeChild(elem);
    queueArray.shift();
    localStorage.setItem('items', JSON.stringify(queueArray))
}

//  додає нове значення (через клік кнопки add) (+ перевірка на введення пустого значення та на заповненість черги)  та зберігає в localStorage
function addValue() {
    if (ul.children.length > 29) {
        alert("Queue is already full. Delete oldest element to set new one");
        input.value = '';
        return
    }
    if (input.value == '') {
        alert('Value not set');
        return
    }
    queueArray.push(input.value)
    localStorage.setItem('items', JSON.stringify(queueArray))
    liMaker(input.value);
    document.getElementsByTagName("input")[0].value = "";
}

// початкове заповнення черги  значеннями, вже збереженими в localStorage
data.forEach(item => {
    liMaker(item)
})

// додає нове значення якщо в input натиснуто enter та зберігає в localStorage
form.addEventListener('submit', function(e) {
    e.preventDefault(); // відміна  дефолтної відправки форми якщо в input натиснуто enter
    if (input.value == '') {
        alert('Value not set');
        return
    }

    if (ul.children.length > 29) {
        alert("Queue is already full. Delete oldest element to set new one");
        input.value = '';
        return
    }
    queueArray.push(input.value)
    localStorage.setItem('items', JSON.stringify(queueArray))
    liMaker(input.value);
    input.value = '';

})

//   Очистка черги та localStorage  при кліку на кнопку "clear"
clear.addEventListener('click', function() {
    localStorage.clear()
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }
})