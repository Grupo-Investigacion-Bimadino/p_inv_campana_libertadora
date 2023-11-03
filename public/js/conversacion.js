export class Conversacion extends Phaser.Scene {
    constructor() {
        super({ key: 'Conversacion' });
        this.jugador = "";
        this.startText = null;
        this.textIndex = 0; // Índice para rastrear el texto actual
    }

    preload() {
        this.load.image('carta', './img/Inicio/carta.png');

        this.load.audio('intro1', './assets/Audios/intro1.mp3');
    }

    create() {
        this.intro1 = this.sound.add('intro1');
        this.intro1.play();
        this.intro1.setVolume = 5;

        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 1)');
        if (!localStorage.getItem("SimonBolivar")) {
            localStorage.setItem("SimonBolivar", JSON.stringify({ posX: 157, posY: 947, vida: 100, estado: 1, conocimiento: 0}));
          }

        this.jugador = JSON.parse(localStorage.getItem('SimonBolivar'));
        
        // Define un array de textos para mostrar
        this.texts = [
            'En medio de los turbulentos tiempos de la lucha por la independencia en América del Sur,\n' +
            'te adentrarás en la piel del valiente líder revolucionario, Simón Bolívar. Tu misión es liberar\n' +
            'a Colombia del férreo control de las fuerzas realistas y abrir el camino hacia la ansiada \n' +
            'libertad. Con el estruendo de la guerra y las tensiones en aumento, enfrentarás desafíos\n' +
            'que probarán tu liderazgo, astucia y conocimiento histórico.\n'+
            '\n'+
            '                                                Enter para continuar',
            "Texto 2: Este es el segundo texto.",
        ];

        this.startText = this.add.text(650, 300, "", {
            font: "22px Arial Narrow",
            fill: "#ffffff",
            align: 'left',
        });
        this.startText.setOrigin(0.5);
        this.startText.depth = 9;

        var velocidadEscritura = 50; // Milisegundos por carácter
        var i = 0;

        this.time.addEvent({
            delay: velocidadEscritura,
            callback: () => {
                if (i < this.texts[this.textIndex].length) {
                    this.startText.text += this.texts[this.textIndex][i];
                    i++;
                }
            },
            repeat: this.texts[this.textIndex].length - 1
        });

        // Habilita la detección de teclado
        this.input.keyboard.on("keydown-ENTER", this.siguienteTexto, this);

    }
    siguienteTexto() {
        if (this.textIndex < this.texts.length - 1) {
            // Si hay más textos, avanza al siguiente
            this.textIndex++;
            this.startText.text = ""; // Borra el texto actual
            var i = 0;

            // Inicia la animación de escritura para el nuevo texto
            this.time.addEvent({
                delay: this.velocidadEscritura,
                callback: () => {
                    if (i < this.texts[this.textIndex].length) {
                        this.startText.text += this.texts[this.textIndex][i];
                        i++;
                    }
                },
                repeat: this.texts[this.textIndex].length - 1
            });
        } else {
            // Si no hay más textos, oculta el texto y continúa
            this.jugador.estado = 0;
            localStorage.setItem("SimonBolivar", JSON.stringify(this.jugador));
            this.scene.stop("conversacion");
            this.scene.start("Game");        
            this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0)');
        }
    }
}
