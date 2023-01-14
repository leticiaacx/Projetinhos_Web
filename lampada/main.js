const turnOn = document.getElementById ('TurnOn');
const turnOff = document.getElementById ('TurnOff');
const lamp = document.getElementById ('lamp');

function isLampBrooken(){
    return lamp.src.indexOf('quebrada') > -1;
}

function lampOn(){
    if(!isLampBrooken()){0
        lamp.src = './img/ligada.jpg';
    }
}

function lampOff(){
    if(!isLampBrooken()){
        lamp.src = './img/lamp.jpg';
    }
}

function lampBrooken(){
    lamp.src = './img/lamp_quebrada.jpg';
}

turnOn.addEventListener ('click', lampOn);
turnOff.addEventListener('click', lampOff);
lamp.addEventListener('mouseover', lampOn);
lamp.addEventListener('mouseout', lampOff);
lamp.addEventListener('dblclick', lampBrooken);


 
