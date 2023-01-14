
function login(){

    const email = document.querySelector("#email");
    const senha = document.querySelector("#senha");
    console.log(email + " " + email.value)

    if(email.value ==  "teste@gmail.com" && senha.value == "123"){
        alert("Voce logou")
    } else{
        alert("Usuario ou senha incorretos")
    }
}

