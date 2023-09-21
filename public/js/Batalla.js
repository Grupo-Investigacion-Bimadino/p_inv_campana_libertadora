import { Preguntas } from "./preguntas.js";
import { movimiento } from "./preguntas.js";

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

    }
    create() {
        this.scene.stop("UI");
        var div1 = document.getElementById("con_preguntas");
        div1.style.display = "block";


        var imagen = this.textures.get('fondo');
        var imagen2 = this.textures.get('esclavo');
        var imagen3 = this.textures.get('soldado');

        const fondo = this.add.image(-100, -10, imagen).setOrigin(0, 0).setScale(0.25);
        fondo.depth = 0;
        const Bolivar = this.add.image(50, 200, imagen2).setOrigin(0, 0).setScale(0.7);
        Bolivar.depth = 1;
        const Soldado = this.add.image(600, 80, imagen3).setOrigin(0, 0).setScale(0.5);
        Soldado.depth = 1;

        this.sound.stopAll();
        this.Afondo = this.sound.add('Audio_Bat');
        this.Batalla = this.sound.add('Son_Bton_Bat');
        this.Afondo.play();
        this.Afondo.volume = 0.1;


        var numEnemigo = JSON.parse(localStorage.getItem('numEnemigo'));
        var vidaMaxima = 100;
        var AltoMaximo = 200;
        const Personaje = JSON.parse(localStorage.getItem("SimonBolivar"));
        var VidaP = Personaje.vida;
        const Enemigos = JSON.parse(localStorage.getItem('Enemigo'));
        const Rutas = JSON.parse(localStorage.getItem('Rutas'));
        const enemigo = Enemigos[numEnemigo];
        var VidaE = enemigo.vida;



        const vidaContainer = this.add.container(640, 40);

        const fondoBarra = this.add.graphics();
        fondoBarra.fillStyle(0x000000);
        fondoBarra.fillRect(-2, -2, 204, 24);
        vidaContainer.add(fondoBarra);

        const barraColor = this.add.graphics();
        barraColor.fillStyle(0xff0000);
        barraColor.fillRect(0, 0, (VidaE / vidaMaxima) * 200, 20);
        vidaContainer.add(barraColor);

        const vidaContainerPer = this.add.container(140, 500);

        const fondoBarraPer = this.add.graphics();
        fondoBarraPer.fillStyle(0x000000);
        fondoBarraPer.fillRect(-2, -2, 204, 24);
        vidaContainerPer.add(fondoBarraPer);

        const barraColorPer = this.add.graphics();
        barraColorPer.fillStyle(0xff0000);
        barraColorPer.fillRect(0, 0, (VidaP / vidaMaxima) * 200, 20);
        vidaContainerPer.add(barraColorPer);

        // Ajustar el tamaño de las barras de vida al cambiar el tamaño de la ventana
        const self = this;
        this.scale.on('resize', function (gameSize) {
            const width = gameSize.width * 0.2;

            vidaContainer.setPosition(width, 40);
            fondoBarra.clear();
            fondoBarra.fillStyle(0x000000);
            fondoBarra.fillRect(0, 0, width, 20);
            barraColor.clear();
            barraColor.fillStyle(0xff0000);
            barraColor.fillRect(0, 0, (VidaE / vidaMaxima) * width, 20);

            vidaContainerPer.setPosition(140, 500);
            fondoBarraPer.clear();
            fondoBarraPer.fillStyle(0x000000);
            fondoBarraPer.fillRect(0, 0, 200, 20);
            barraColorPer.clear();
            barraColorPer.fillStyle(0xff0000);
            barraColorPer.fillRect(0, 0, (VidaP / vidaMaxima) * 200, 20);
        });



        this.cameras.main.setBounds(0, 0, 3200, 3200);

        const preguntas = Preguntas();

        this.wrapRect = new Phaser.Geom.Rectangle(0, 0, 1367, 1239);



        const div = document.getElementById("con_preguntas");

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
                    VidaE -= 25;
                    const porcentajeVidaE = (VidaE / vidaMaxima) * 100;
                    const nuevaLongitud = (porcentajeVidaE / 100) * AltoMaximo;
                    barraColor.clear(); // Limpiar la barra de color
                    barraColor.fillStyle(0xff0000); // Establecer el color de la barra
                    barraColor.fillRect(0, 0, nuevaLongitud, 20);
                    Disparo.play();
                    Enemigos[numEnemigo].vida = VidaE;
                    localStorage.setItem('Enemigo', JSON.stringify(Enemigos));
                    if (VidaE < 1) {
                        self.Estado = 1;
                        Enemigos.splice(numEnemigo, 1);
                        Rutas.splice(numEnemigo, 1);
                        localStorage.setItem('Enemigo', JSON.stringify(Enemigos));
                        localStorage.setItem('Rutas', JSON.stringify(Rutas));
                        Personaje.vida = VidaP;
                        localStorage.setItem("SimonBolivar", JSON.stringify(Personaje));
                        console.log(Personaje);
                    }
                } else {
                    VidaP -= 25;
                    const porcentajeVida = (VidaP / vidaMaxima) * 100;
                    const nuevaLongitudPer = (porcentajeVida / 100) * AltoMaximo;
                    barraColorPer.clear(); // Limpiar la barra de color
                    barraColorPer.fillStyle(0xff0000); // Establecer el color de la barra
                    barraColorPer.fillRect(0, 0, nuevaLongitudPer, 20);
                    Disparo.play();
                    if (VidaP < 1) {
                        self.Estado = 1;
                        localStorage.setItem("SimonBolivar", JSON.stringify({ posX: 157, posY: 947, vida: VidaP }));
                        const rutasEnemigos = JSON.parse(localStorage.getItem("Rutas"));
                        const rutaEnemigo = rutasEnemigos[numEnemigo];
                        for (let i = 0; i < rutasEnemigos.length; i++) {
                            if (rutaEnemigo.length > 2) {
                                const element = rutasEnemigos[i];
                                element.splice(0, 1);
                                localStorage.setItem('Rutas', JSON.stringify(rutasEnemigos));        
                            }
                        }          
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
            this.Estado === 1;
        }

        if (this.Estado === 1) {
            var Derrota = document.getElementById("con_preguntas");
            Derrota.style.display = "none";
            this.scene.start('Game');
        }

    }

}
