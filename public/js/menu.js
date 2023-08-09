export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "MenuScene" });
    }

    preload() {
        this.load.audio('boton_Audio', './assets/Audios/Son_Boton_Bat.mp3');
        this.load.audio('fondo_Audio', './assets/Audios/Fondo_Sound.wav');
        this.load.image("fondo_1", "./img/Fondo_Menu.png");
        this.load.image("NewPar", "./img/NuevaPartida.png");
        this.load.image("TituloMenu", "./img/Titulo_Menu.png");
        this.load.image("Opciones", "./img/Opciones.png");
        this.load.image("Creditos", "./img/Creditos.png");
        this.load.image("EspadaDer", "./img/Espada_Der.png");
        this.load.image("EspadaIzq", "./img/Espada_Izq.png");
        this.load.image("Puente", "./img/Puente.png");

    }

    create() {
        this.sound.stopAll()
        this.Bot = this.sound.add('boton_Audio');
        this.Bot.play();
        this.Fon = this.sound.add('fondo_Audio');
        this.Fon.play();


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
            .on("pointerup", () => {
                localStorage.removeItem('SimonBolivar');
                localStorage.removeItem('Enemigo');
                localStorage.removeItem('numEnemigo');
                this.scene.start("Game");
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
            });

        this.tweens.add({
            targets: buttonCreditos,
            y: 450,
            duration: 1000,
            ease: 'Bounce',
            delay: 400,
        });

    }

    update() {
    }
}
