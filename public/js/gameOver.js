export class gameOver extends Phaser.Scene {
    constructor() {
        super({ key: "gameOver" });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Fondo de la escena (puedes ajustar esto a tu gusto)
        this.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0);

        // Texto de "Game Over"
        const gameOverText = this.add.text(width / 2, height / 3, "Game Over", {
            fontSize: "48px",
            fill: "#ff0000",
            align: "center",
        });
        gameOverText.setOrigin(0.5);

        // Puntuación obtenida (ajusta esto según cómo guardes tu puntuación)
        const score = JSON.parse(localStorage.getItem('SimonBolivar')).conocimiento; // Ejemplo de puntaje
        const scoreText = this.add.text(
            width / 2,
            height / 2,
            `Puntuación: ${score}`,
            {
                fontSize: "32px",
                fill: "#ffffff",
                align: "center",
            }
        );
        scoreText.setOrigin(0.5);

        // Botón para reiniciar
        const restartButton = this.add.text(width / 2, (height * 2) / 3, "Reiniciar", {
            fontSize: "24px",
            fill: "#00ff00",
        })
            .setOrigin(0.5)
            .setInteractive()
            .on("pointerdown", () => {
                // Reinicia el juego o vuelve a la escena de juego
            })
            .on('pointerover', function () {
                document.body.style.cursor = 'pointer';
            })
            .on('pointerout', function () {
                document.body.style.cursor = 'default';
            });

        // Botón para volver al menú
        const menuButton = this.add.text(width / 2, (height * 2) / 3 + 60, "Menú", {
            fontSize: "24px",
            fill: "#00ff00",
        })
            .setOrigin(0.5)
            .setInteractive()
            .on("pointerdown", () => {
                // Vuelve a la escena del menú principal
                this.scene.start("MenuScene");
            })
            .on('pointerover', function () {
                document.body.style.cursor = 'pointer';
            })
            .on('pointerout', function () {
                document.body.style.cursor = 'default';
            });
    }
}
