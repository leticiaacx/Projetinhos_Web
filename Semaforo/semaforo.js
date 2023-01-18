const img = document.getElementById('img');
const buttons = document.getElementById('buttons');
let colorIndex = 0;
let intervalID = null; // varial global

const trafficLight = (event) =>{//armazendo um objeto usando ele de forma dinâmica
    stop();
    turnOn[event.target.id]();//vai de acordo com a cor    
}

const nextIndex = () =>{
    //colorIndex = colorIndex < 2 ? ++colorIndex : 0;
    if(colorIndex < 2){
        colorIndex++
    } else {
        colorIndex = 0;
    }
}

const changerColor = () => {
    const colors = ['red', 'yellow', 'green']
    const color = colors[colorIndex]; //chamando função de forma dinâmica
    turnOn[color]();
    nextIndex();
}

const stop = () =>{
    clearInterval(intervalID);
}
 
const turnOn = {
    'red': () => img.src = './img/vermelho.png',
    'yellow': () => img.src = './img/amarelo.png',
    'green': () => img.src = './img/verde.png',
    'automatic': () => intervalID = setInterval(changerColor, 1000) // o setInverval executa um codigo a cada intervalo de tempo que vc determinar
}

buttons.addEventListener('click', trafficLight);
