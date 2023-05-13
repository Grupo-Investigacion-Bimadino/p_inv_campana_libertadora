export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "MenuScene" });
    }

    preload() {
        this.load.image("fondo_1", "./img/Fondo_1.png");
        this.load.image("Enemigo", "./img/Enemigo.png");
    }

    create() {          
        this.add.image(0, 0, 'fondo_1').setOrigin(0, 0).setScale(0.4);

        this.buttonNew = this.add.image("Enemigo");

        // Crear el botón "Continuar"
        var buttonNew = this.add.text(200, 200, "Nueva Partida", { fontSize: "32px", fill: "Red" })
            .setInteractive()
            .on("pointerup", () => {
                localStorage.removeItem('personaje');
                this.scene.start("Game");
            });

        // Crear el botón "Continuar"
        const buttonPlay = this.add.text(200, 300, "Continuar", { fontSize: "32px", fill: "Red" })
            .setInteractive()
            .on("pointerup", () => {
                this.scene.start("Game");
            });


        // Crear el botón "Configuración"
        const buttonSettings = this.add.text(200, 400, "Configuración", { fontSize: "32px", fill: "Red" })
            .setInteractive()
            .on("pointerup", () => {
            });

        // Crear el botón "Créditos"
        const buttonCredits = this.add.text(200, 500, "Créditos", { fontSize: "32px", fill: "Red" })
            .setInteractive()
            .on("pointerup", () => {
            });
    }

    update() {
        this.sound.stopAll();
    }
}
