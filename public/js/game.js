import { Preguntas } from "./preguntas.js";

export class Game extends Phaser.Scene {
  constructor() {
    super({ key: "Game" });
    this.velocity = 200;
  }

  preload() {
    this.load.tilemapCSV("map", "./data/mapa.csv");
    this.load.image("tiles", "./img/imagen.png");
    this.load.image("personaje", "./img/Personaje.png");
    this.load.image('enemigo', './img/Personaje.png');
  }
  create() {
    var map = this.make.tilemap({ key: "map", tileWidth: 32, tileHeight: 32 });
    var tiles = map.addTilesetImage("tiles", null, 32, 32, 0, 0);
    var layer = map.createLayer(0, tiles);
    this.cameras.main.setBounds(0, 0, 3200, 3200);

    const preguntas = Preguntas();

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
    this.personaje = this.add
      .sprite(200, 200, "personaje")
      .setScale(0.3, 0.3)
      .setInteractive();
    //Personaje
    //Enemigo
    this.enemigo = this.add
      .sprite(600, 300, "enemigo")
      .setScale(0.3, 0.3)
      .setInteractive();
    //Enemigo

    let enemigos = this.physics.add.group();

    for (let i = 0; i < 5; i++) {
      let enemigo = this.physics.add.sprite(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500), 'enemigo') .setScale(0.3, 0.3);
      enemigos.add(enemigo);
    }
        
  }

  update(time, delta) {
    //MOVIMIENTO DEL PERSONAJE.
    let dx = 0,
      dy = 0;
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
      dx -= 1;
    }
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
      dx += 1;
    }
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
      dy -= 1;
    }
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
      dy += 1;
    }

    // Obtener la posición del cursor en relación a la cámara
    const cursorPosition = this.input.activePointer.positionToCamera(this.cameras.main);

    // Obtener el ángulo entre el personaje y el cursor
    const Angle = Phaser.Math.Angle.Between(this.personaje.x, this.personaje.y, cursorPosition.x, cursorPosition.y);

    // Establecer la rotación del personaje al ángulo calculado
    this.personaje.rotation = Angle;


        // Define la distancia mínima para considerar que los objetos están lo suficientemente cerca
    const MIN_DISTANCE = 300;
    
    // Calcula la distancia entre los centros de los dos objetos
    const distance = Phaser.Math.Distance.Between(this.enemigo.x, this.enemigo.y, this.personaje.x, this.personaje.y);

    // Compara la distancia con la distancia mínima
    if (distance < MIN_DISTANCE && distance > 80) {
      const distance = Math.sqrt(dx * dx + dy * dy);
      const normalizedX = dx / distance;
      const normalizedY = dy / distance;
      if (this.personaje.x < this.enemigo.x) { this.enemigo.x -= (100 * delta) / 1000; }
      else { this.enemigo.x += (70 * delta) / 1000; }
      if (this.personaje.y < this.enemigo.y) { this.enemigo.y -= (100 * delta) / 1000; }
      else { this.enemigo.y += (70 * delta) / 1000; }

      // Obtén el ángulo entre los dos objetos
      var angle = Phaser.Math.Angle.Between(this.enemigo.x, this.enemigo.y, this.personaje.x, this.personaje.y);

      // Establece la rotación de 'objeto1' para que mire en esa dirección
      this.enemigo.rotation = angle;
    }



    if (dx !== 0 || dy !== 0) {
      const distance = Math.sqrt(dx * dx + dy * dy);
      const normalizedX = dx / distance;
      const normalizedY = dy / distance;
      this.personaje.x += (normalizedX * this.velocity * delta) / 1000;
      this.personaje.y += (normalizedY * this.velocity * delta) / 1000;
    }

    //MOVIMIENTO DE LA CÁMARA
    this.cameras.main.scrollX += dx * this.velocity * delta / 1000;
    this.cameras.main.scrollY += dy * this.velocity * delta / 1000;

    //SETEO EL OBJETO QUE DEBE SEGUIR LA CÁMARA
    this.cameras.main.startFollow(this.personaje);

    //Definir los límites del mapa
    var limiteXMaximo = 1000;
    var limiteXMinimo = 0;
    var limiteYMaximo = 500;
    var limiteYMinimo = 0;

  }

}


