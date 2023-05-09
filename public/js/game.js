import { Preguntas } from "./preguntas.js";

export class Game extends Phaser.Scene {
  constructor() {
    super({ key: "Game" });
    this.velocity = 200;
    this.wrapRect;
    this.aliens = [];
    this.puntos = {
      1: { x: 900, y: 300 },
      2: { x: 300, y: 400 },
      3: { x: 500, y: 800 },
      4: { x: 900, y: 610 },
      5: { x: 1500, y: 1700 },
      6: { x: 1300, y: 1300 },
      7: { x: 427.5, y: 1245}
    };
  }

  preload() {
    this.load.tilemapCSV("map", "./data/mapa.csv");
    this.load.image("tiles", "./img/imagen.png");
    this.load.image("personaje", "./img/Personaje.png");
    this.load.image('enemigo', './img/Personaje.png');
    this.load.audio('Audio_Fon', ['./assets/Audios/Fondo_Sound.wav']);
    this.load.audio('Pasos', ['./assets/Audios/Pasos.mp3']);
  }
  create() {
    this.fondo = this.sound.add('Audio_Fon');
    this.PasosD = this.sound.add('Pasos');
    this.PasosZ = this.sound.add('Pasos');
    this.PasosAr = this.sound.add('Pasos');
    this.PasosAb = this.sound.add('Pasos');

    this.mainCamera = this.cameras.main;
    this.mainCamera.setBounds(0, 0, 0, 0);
    this.mainCamera.setFollowOffset(0, 0);

    this.fondo.play();
    var map = this.make.tilemap({ key: "map", tileWidth: 32, tileHeight: 32 });
    var tiles = map.addTilesetImage("tiles", null, 32, 32, 0, 0);
    var layer = map.createLayer(0, tiles);
    this.cameras.main.setBounds(0, 0, 3200, 3200);

    const preguntas = Preguntas();

    this.wrapRect = new Phaser.Geom.Rectangle(0, 0, 1367, 1239);
    for (let i = 1; i <= 7; i++)
    {
        this.aliens.push(this.add.image(this.puntos[i].x, this.puntos[i].y, 'enemigo').setScale(0.3,0.3));
      }
    

    const div = document.getElementById("con_preguntas");
    const divOs = document.getElementById("oscuro");

    const button = document.getElementById("boton-personalizado");

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

      function validarRespuesta() {
        var respuestaCorrecta = preguntas[preguntaActual].correcta;

        if (respuestaSeleccionada === respuestaCorrecta) {
          console.log("Respuesta correcta!");
          // Incrementa el puntaje en 10
          puntaje += 10;
          // Actualiza el texto del objeto de texto
          puntajeTexto.setText(`Experiencia: ${puntaje}`);
        } else {
          console.log("Respuesta incorrecta.");
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

    button.addEventListener("click", function () {
      if (divOs.style.display === "block") {
        divOs.style.display = "none";
      } else {
        divOs.style.display = "block";
        Probar();
      }
    });

    let puntaje = 0;
    let puntajeTexto = this.add.text(10, 10, `Experiencia: ${puntaje}`, {
      fontSize: "24px",
      fill: "#FFF",
      fontFamily: "Comic Sans",
    });


    //Personaje
    this.personaje = this.physics.add
      .sprite(200, 200, "personaje")
      .setScale(0.3, 0.3)
      .setInteractive();
    //Personaje

  }

  update(time, delta) {
    //MOVIMIENTO DEL PERSONAJE.

    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isUp) {
      this.personaje.setVelocityY(0);
      this.PasosAb.play();
    }
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isUp) {
      this.personaje.setVelocityX(0);
      this.PasosD.play();
    }
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isUp) {
      this.personaje.setVelocityX(0);
      this.PasosZ.play();
    }
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isUp) {
      this.personaje.setVelocityY(0);
      this.PasosAr.play();
    }
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
      this.personaje.setVelocityX(-150);
    }
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
      this.personaje.setVelocityX(150);
    }
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
      this.personaje.setVelocityY(150);
    }
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
      this.personaje.setVelocityY(-150);
    }


    // Obtener la posición del cursor en relación a la cámara
    const cursorPosition = this.input.activePointer.positionToCamera(this.cameras.main);

    // Obtener el ángulo entre el personaje y el cursor
    const Angle = Phaser.Math.Angle.Between(this.personaje.x, this.personaje.y, cursorPosition.x, cursorPosition.y);

    // Establecer la rotación del personaje al ángulo calculado
    this.personaje.rotation = Angle;

    // Establece la rotación de 'objeto1' para que mire en esa dirección
    this.mainCamera.startFollow(this.personaje);



  }

}


