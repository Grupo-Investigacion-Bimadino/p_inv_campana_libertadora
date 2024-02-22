import { movimiento } from "./preguntas.js";
import { movimientoA } from "./preguntas.js";

export class MenuScene extends Phaser.Scene {
    rutas = movimiento();
    rutasA = movimientoA();
    PuntoTotal = 0;
    constructor() {
        super({ key: "MenuScene" });
    }

    preload() {
        this.load.audio('boton_Audio', './assets/Audios/Son_Boton_Bat.mp3');
        this.load.audio('fondo_Audio', './assets/Audios/Fondo_Sound.wav');
        this.load.image("fondo_1", "./img/Fondo_Menu.svg");
        this.load.image("NewPar", "./img/NuevaPartida.svg");
        this.load.image("TituloMenu", "./img/Titulo_Menu.svg");
        this.load.image("Opciones", "./img/Opciones.svg");
        this.load.image("Creditos", "./img/creditos.svg");
        this.load.image("EspadaDer", "./img/Espada_Der.svg");
        this.load.image("EspadaIzq", "./img/Espada_Izq.svg");
        this.load.image("Puente", "./img/Puente.svg");

    }

    create() {
        this.sound.stopAll()
        this.Bot = this.sound.add('boton_Audio');
        this.Bot.play();
        this.Fon = this.sound.add('fondo_Audio');
        this.Fon.play();
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;


        this.add.image(0, 0, 'fondo_1').setOrigin(0, 0).setScale(0.25);
        const Titulo = this.add.image(670, 110, "TituloMenu").setScale(0.25);
        Titulo.depth = 4;

        const Puente = this.add.image(670, 470, "Puente").setScale(0.25);

        const EspadaDer = this.add.image(1550, 700, "EspadaDer").setScale(0.25);
        this.tweens.add({
            targets: EspadaDer,
            x: 700,
            y: 150,
            duration: 300,
            ease: 'Lunear',
        });
        EspadaDer.depth = 1;

        const EspadaIzq = this.add.image(0, 700, "EspadaIzq").setScale(0.25);
        this.tweens.add({
            targets: EspadaIzq,
            x: 600,
            y: 150,
            duration: 300,
            ease: 'Lunear',
        });
        EspadaDer.depth = 1;

        // Crear el botón "NuevaPartida"
        const buttonNew = this.add.sprite(650, 100, "NewPar")
            .setScale(0.25)
            .setInteractive()
            .on('pointerover', function () {
                document.body.style.cursor = 'pointer';
            })
            .on('pointerout', function () {
                document.body.style.cursor = 'default';
            })
            .on("pointerup", () => {
                document.body.style.cursor = 'default';
                localStorage.removeItem('SimonBolivar');
                localStorage.removeItem('numEnemigo');
                localStorage.removeItem('Enemigo');
                localStorage.removeItem('Rutas');
                localStorage.removeItem('Aliados');
                localStorage.removeItem('RutasA');
                localStorage.setItem("Rutas", JSON.stringify(this.rutas));
                localStorage.setItem("RutasA", JSON.stringify(this.rutasA));
                if (!localStorage.getItem("PuntoTotal")) {
                    localStorage.setItem("PuntoTotal", JSON.stringify({ Puntos: this.PuntoTotal }));
                }
                this.Fon.stop();
                this.scene.start("Conversacion");
            });

        this.tweens.add({
            targets: buttonNew,
            y: 250,
            duration: 1000,
            ease: 'Bounce',
            delay: 440,
        });
        buttonNew.depth = 2

        // Crear el botón "Opciones"
        const buttonOpciones = this.add.sprite(650, 100, "Opciones")
            .setScale(0.25)
            .setInteractive()
            .on("pointerup", () => {
            })
            .on('pointerover', function () {
                document.body.style.cursor = 'pointer';
            })
            .on('pointerout', function () {
                document.body.style.cursor = 'default';
            });

        this.tweens.add({
            targets: buttonOpciones,
            y: 350,
            duration: 1000,
            ease: 'Bounce',
            delay: 420,
        });
        buttonOpciones.depth = 1;

        // Crear el botón "Creditos"
        const buttonCreditos = this.add.sprite(650, 100, "Creditos")
            .setScale(0.25)
            .setInteractive()
            .on("pointerup", () => {
                this.scene.start("creditos");
            })
            .on('pointerover', function () {
                document.body.style.cursor = 'pointer';
            })
            .on('pointerout', function () {
                document.body.style.cursor = 'default';
            });

        this.tweens.add({
            targets: buttonCreditos,
            y: 450,
            duration: 1000,
            ease: 'Bounce',
            delay: 400,
        });

                
        if (localStorage.getItem('PuntoTotal')) {
            const score = JSON.parse(localStorage.getItem('PuntoTotal')).Puntos;
            const scoreText = this.add.text(
                10,
                10,
                `Puntos Total: ${score}`,
                {
                    fontSize: "24px", 
                    fill: "#ffffff",
                    align: "left",
                    backgroundColor: "#000000",
                    padding: { 
                        left: 10,
                        right: 10,
                        top: 5,
                        bottom: 5
                    },
                }
            );
            scoreText.setOrigin(0);
            scoreText.depth = 4;
        }

    }

    update() {
        const keyP = this.input.keyboard.addKey('P');
        const keyA = this.input.keyboard.addKey('A');
        if (keyP.isDown & keyA.isDown) {
            localStorage.setItem("PuntoTotal", JSON.stringify({ Puntos: 0 }));
        }
    }
}
