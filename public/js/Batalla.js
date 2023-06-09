import { Preguntas } from "./preguntas.js";

export class Batalla extends Phaser.Scene {
    Ultimo;
    Estado;
    Reproducir;
    constructor() {
        super({ key: "Batalla" });
    }

    preload() {
        this.load.audio('Audio_Bat', ['./assets/Audios/Batalla.mp3']);
        this.load.audio('Son_Bton_Bat', ['./assets/Audios/Son_Boton_Bat.mp3']);
        this.load.audio('Disparo', ['./assets/Audios/Disparo.mp3']);
        this.load.image('Fondo', ['./img/Fondo_Bat.png'])
        this.load.image('Esclavo', ['./img/Esclavito.png'])
        this.load.image('Soldado', ['./img/Soldado.png'])

    }
    create() {
        const Fondo = this.add.image(-50, 0, 'Fondo').setOrigin(0, 0).setScale(0.25);
        Fondo.depth = 0;
        const Esclavo = this.add.image(50, 200, 'Esclavo').setOrigin(0, 0).setScale(0.25);
        Esclavo.depth = 1;
        const Soldado = this.add.image(600, 80, 'Soldado').setOrigin(0, 0).setScale(0.25);
        Esclavo.depth = 1;

        this.sound.stopAll();
        this.Afondo = this.sound.add('Audio_Bat');
        this.Batalla = this.sound.add('Son_Bton_Bat');
        this.Afondo.play();
        this.Afondo.volume = 0.1;


        var numEnemigo = localStorage.getItem('numEnemigo');
        var vidaMaxima = 100; 
        var AltoMaximo = 200; 
        var VidaP = JSON.parse(localStorage.getItem("personaje")).vida;
        const arreglo = JSON.parse(localStorage.getItem('Enemigo'));
        const elemento = arreglo[numEnemigo];
        var VidaE = elemento.vida;

        const barraVida = document.getElementById('barra-vida');
        const barraVidaE = document.getElementById('barra-vidaE');


        this.cameras.main.setBounds(0, 0, 3200, 3200);

        const preguntas = Preguntas();

        this.wrapRect = new Phaser.Geom.Rectangle(0, 0, 1367, 1239);



        const div = document.getElementById("con_preguntas");
        const divOs = document.getElementById("oscuro");

        const Probar = () => {
            var preguntaActual;
            var respuestaSeleccionada;

            var textoPregunta = this.add.text(400, 100, "", {
                fontSize: "32px",
                fill: "#F700FF",
            });
            var opciones = [];

            function mezclarRespuestas(respuestas) {
                // Crear un array con los índices de las respuestas
                var indices = [...Array(respuestas.length).keys()];

                // Mezclar los índices
                for (var i = indices.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = indices[i];
                    indices[i] = indices[j];
                    indices[j] = temp;
                }

                // Crear un nuevo array con las respuestas en el orden mezclado
                var respuestasMezcladas = [];
                for (var i = 0; i < indices.length; i++) {
                    respuestasMezcladas.push(respuestas[indices[i]]);
                }
                return respuestasMezcladas;
            }

            function preguntar() {
                // Obtener pregunta aleatoria
                preguntaActual = Phaser.Math.Between(0, preguntas.length - 1);

                // Mezclar respuestas
                var respuestasMezcladas = mezclarRespuestas(
                    preguntas[preguntaActual].respuestas
                );

                // Crear un elemento p para mostrar la pregunta
                var preguntaEl = document.createElement("a");
                preguntaEl.classList.add("Op_pre");
                preguntaEl.textContent = preguntas[preguntaActual].pregunta;

                // Agregar el elemento p como hijo del div con_preguntas
                const divP = document.getElementById("preguntas");
                div.innerHTML = "";
                div.appendChild(preguntaEl);

                respuestasMezcladas.forEach((respuesta, index) => {
                    const opcion = document.createElement("a");
                    opcion.classList.add("Op_res"); //AGREGAR ESTILOS
                    opcion.textContent = respuesta;
                    opcion.addEventListener("click", function () {
                        respuestaSeleccionada = respuesta;
                        validarRespuesta();
                    });
                    div.appendChild(opcion);
                });
            }
            this.Estado = 0; 
            const self = this;
            var Disparo = this.sound.add('Disparo');
            function validarRespuesta() {
                var respuestaCorrecta = preguntas[preguntaActual].correcta;
                // Acceder a 'Estado' a través de 'self'
                if (respuestaSeleccionada === respuestaCorrecta) {
                    VidaE -= 15;
                    const porcentajeVidaE = (VidaE / vidaMaxima) * 100;
                    barraVidaE.style.width = `${(porcentajeVidaE / 100) * AltoMaximo}px`; 
                    Disparo.play();
                    if (VidaE < 1) {
                        self.Estado = 1;
                        barraVidaE.style.width = `${200}px`; 
                        barraVida.style.width = `${200}px`; 
                    }
                } else {
                    VidaP -= 25;
                    const porcentajeVida = (VidaP / vidaMaxima) * 100;
                    barraVida.style.width = `${(porcentajeVida / 100) * AltoMaximo}px`; 
                    Disparo.play();
                    if (VidaP < 1) {
                        self.Estado = 1;
                        barraVidaE.style.width = `${200}px`; 
                        barraVida.style.width = `${200}px`; 
                    }
                }
                preguntar();
            }

            // Crear opciones de respuesta
            for (var i = 0; i < 4; i++) {
                var opcion = this.add.text(400, 200 + i * 50, "", {
                    fontSize: "24px",
                    fill: "#F700FF",
                });
                opcion.setInteractive();
                opcion.on("pointerdown", function () {
                    respuestaSeleccionada = this.text;
                    validarRespuesta();
                });
                opciones.push(opcion);
            }

            preguntar();
        };

        Probar();

    }

    update() {
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC).isDown) {
            this.scene.start('Game');
        }
        
        if (this.Estado===1) {
            var Derrota = document.getElementById("con_preguntas");
            Derrota.style.display = "none";
            var VidaP = document.getElementById("barra-vida");
            VidaP.style.display = "none";
            var VidaE = document.getElementById("barra-vidaE");
            VidaE.style.display = "none";
            this.scene.start('Game');
        } 

    }

}
