// seleção de elementos
const multiplicationForm = document.querySelector('#multiplication-form');
const numberInput = document.querySelector('#number');
const multiplicationInput = document.querySelector('#multiplication');

const multiplicationTable = document.querySelector(
    '#multiplication-operations'
);


// funções
const createTable = (number, multiplicatorNumber) => {
    console.log(number, multiplicatorNumber);

    multiplicationTable.innerHTML = '';

    for (let i = 1; i <= multiplicatorNumber; i++) {
        const operationResult = number * i;

        const template = `<div class=row>
        <div class="operation">${number} x ${i} = </div>
        <div class="result">${operationResult}</div>
        </div>`;
    }
};

//eventos
multiplicationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const multiplicationNumber = +numberInput.value;
    const multiplicatorNumber = +multiplicationInput.value;

        if(!multiplicationNumber || multiplicatorNumber) return; 


    createTable(multiplicationNumber, multiplicatorNumber);

});