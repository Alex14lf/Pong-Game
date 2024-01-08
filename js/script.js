let canvas;
let ctx;
let anchoCanvas = 800;
let altoCanvas = 400;
const FPS = 60;

//Botones
let lose=document.querySelector(".lose");
let win=document.querySelector(".win");
let restart=document.querySelector(".button");

// Puntos de jugador y rival
let puntosJugador = 0;
let puntosRival = 0;

//Variable que determinara si se juega o no
let juegoEnPausa = false;

// Crear barras y pelota
const barraJugador = new Barra(20, altoCanvas / 2 - 50, 10, 100, '#00F');
const barraRival = new Barra(anchoCanvas - 30, altoCanvas / 2 - 50, 10, 100, '#F00');
const pelota = new Pelota(anchoCanvas / 2, altoCanvas / 2, 10, '#FFF');

const inicializa = () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    setInterval(principal, 1000 / FPS);
};


const dibujarTablero = () => {
    ctx.fillStyle = '#AE00FF';
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
};

const dibujarMarcador = () => {
    const separacion = 100;
    // Dibujar marcador del jugador
    ctx.fillStyle = '#FFF';
    ctx.font = "50px Arial";
    ctx.fillText(puntosJugador, canvas.width * 0.25, separacion);

    // Dibujar marcador del rival
    ctx.fillText(puntosRival, canvas.width * 0.75, separacion);
};

principal = () => {
    // borrarCanvas();
    dibujarTablero();
    dibujarMarcador();
    if (!juegoEnPausa) {
        barraJugador.dibujar();
        barraRival.dibujar();
        pelota.dibujar();
        pelota.mover();

        if ((pelota.x - pelota.radio < barraJugador.x + barraJugador.ancho) && (pelota.y > barraJugador.y && pelota.y < barraJugador.y + barraJugador.alto)){
            pelota.velocidadX = -pelota.velocidadX;
        }

        if ((pelota.x + pelota.radio > barraRival.x) &&(pelota.y > barraRival.y && pelota.y < barraRival.y + barraRival.alto)) {
            pelota.velocidadX = -pelota.velocidadX;
        }

        if (pelota.x - pelota.radio < 0) {
            // Gol del rival
            puntosRival++;
            pelota.reiniciar();
        }

        if (pelota.x + pelota.radio > canvas.width) {
            // Gol del jugador 
            puntosJugador++;
            pelota.reiniciar();
        }

        // Mover la barra del rival automáticamente
        if (pelota.y < barraRival.y + barraRival.alto / 2 && barraRival.y > 0) {
            barraRival.y -= 1.2; // Ajustar la velocidad 
        } else if (pelota.y > barraRival.y + barraRival.alto / 2 && barraRival.y + barraRival.alto < canvas.height) {
            barraRival.y += 1.2; // Ajustar la velocidad 
        }
        

        // Asegurarse de que la barra del rival no desborde arriba o abajo
        if (barraRival.y < 0) {
            barraRival.y = 0;
        } else if (barraRival.y + barraRival.alto > canvas.height) {
            barraRival.y = canvas.height - barraRival.alto;
        }

        if (puntosJugador === 5 || puntosRival === 5) {
            juegoEnPausa=true;
        }
    } else {
        if(puntosJugador===5){
            win.classList.remove("none");
            restart.classList.remove("none")
        }
        else if(puntosRival===5){
            lose.classList.remove("none");
            restart.classList.remove("none")
        }
    }
};

document.addEventListener("DOMContentLoaded", inicializa);
document.addEventListener("DOMContentLoaded", principal);
document.addEventListener("keydown", (event)=> {
    if (event.key === 'ArrowUp' && barraJugador.y > 0) {
        barraJugador.y -= 10;
    }
    else if (event.key === 'ArrowDown' && barraJugador.y + barraJugador.alto < canvas.height) {
        barraJugador.y += 10;
    }
});
restart.addEventListener("click",()=>{
    puntosJugador = 0;
    puntosRival = 0;
    pelota.reiniciar();
    win.classList.add("none");
    lose.classList.add("none");
    juegoEnPausa = false;
});