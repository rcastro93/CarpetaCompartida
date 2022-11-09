//VARIABLES
const listaTweets = document.querySelector(`#lista-tweets`);
const formulario = document.querySelector(`#formulario`);
let tweetsGuardados = [];
//EVENTLISTENERS
eventListener();
function eventListener() {
    //USUARIO AGREGA TWEET
    formulario.addEventListener(`submit`, agregarTweets);
    //CARGAR DESDE EL STORAGE
    document.addEventListener(`DOMContentLoaded`, () => {
        //CON EL OPERADOR OR SI ESTA VACIO EL ARRAY NO DA NULL, CREA UNO VACIO
        tweetsGuardados = JSON.parse(localStorage.getItem(`tweets`)) || [];
        console.log(tweetsGuardados);
        crearHTML();
    })
}



//FUNCIONES
function agregarTweets(e) {
    e.preventDefault();

    //TEXTAREA DONDE USUARIO ESCRIBE
    const tweet = document.querySelector(`#tweet`).value;
    // VALIDAR
    if (tweet === ``) {
        mostrarMensajeError(`No puedes escribir un tweet vacio`);
        return;
    }
    //AÑADIR A LA ARRAY DE TWEET
    const tweetObj = {
        id: Date.now(),
        tweet
    }
    tweetsGuardados = [...tweetsGuardados, tweetObj];

    //CREAR HTML
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();
}

function crearHTML() {
    limpiarHTML();
    if (tweetsGuardados.length > 0) {
        tweetsGuardados.forEach(tweet => {
            //AGREGAR BOTON ELIMINAR
            const btnEliminar = document.createElement(`a`);
            btnEliminar.classList.add(`borrar-tweet`);
            btnEliminar.textContent = `X`;
            btnEliminar.onclick = ()=>{
                borrarTweet(tweet.id);
            }
            const li = document.createElement(`li`);
            li.innerText = tweet.tweet;
            //ASIGNAMOS BOTON ELIMINAR
            li.appendChild(btnEliminar);
            //LO METEMOS DENTRO DEL HTML CADA LI
            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}

function borrarTweet(id){
    console.log(`Borrando`, id)
    tweetsGuardados = tweetsGuardados.filter( tweet => tweet.id !== id);
    console.log(tweetsGuardados)
    crearHTML();
}

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function mostrarMensajeError(texto) {
    const mensajeError = document.createElement(`p`);
    mensajeError.textContent = texto;
    mensajeError.classList.add(`error`);
    const contenido = document.querySelector(`#contenido`);
    contenido.appendChild(mensajeError);
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function sincronizarStorage() {
    //AGREGA LOS TWEETS A LOCALSTORAGE
    localStorage.setItem(`tweets`, JSON.stringify(tweetsGuardados));
}