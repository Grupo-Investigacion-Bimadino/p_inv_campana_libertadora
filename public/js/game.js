import { Preguntas } from "./preguntas.js";

export class Game extends Phaser.Scene {
  Ultimo;
  Reproducir;

  constructor() {
    super({ key: "Game" });
    this.velocity = 200;
    this.wrapRect;
    this.aliens = [];
    this.puntos = {
      1: { n: 1, x: 900, y: 300, nivel: 1, tipo: "enemigo" },
      2: { n: 2, x: 300, y: 400, nivel: 2, tipo: "enemigo" },
      3: { n: 3, x: 500, y: 800, nivel: 3, tipo: "enemigo" },
      4: { n: 4, x: 900, y: 610, nivel: 4, tipo: "enemigo" },
      5: { n: 5, x: 1500, y: 1700, nivel: 5, tipo: "enemigo" },
      6: { n: 6, x: 1300, y: 1300, nivel: 6, tipo: "enemigo" },
      7: { n: 7, x: 427.5, y: 1245, nivel: 7, tipo: "enemigo" }
    };
    this.Ultimo = 1;
    this.Reproducir = 1;
    this.esc = 1;    
  }

  preload() {
    this.load.tilemapCSV("map", "./data/mapa.csv");
    this.load.image("tiles", "./img/imagen.png");
    this.load.image("personaje", "./img/Personaje.png");
    this.load.image('enemigo', './img/enemigo.png');
    this.load.audio('Audio_Fon', ['./assets/Audios/Fondo_Sound.wav']);
    this.load.audio('Pasos', ['./assets/Audios/Pasos.mp3']);
    this.load.audio('Audio_Bat', ['./assets/Audios/Batalla.mp3']);
    this.load.audio('Son_Bton_Bat', ['./assets/Audios/Son_Boton_Bat.mp3']);

    }
  create() {    
    this.sound.stopAll();
    this.fondo = this.sound.add('Audio_Fon');
    this.PasosD = this.sound.add('Pasos');
    this.PasosZ = this.sound.add('Pasos');
    this.PasosAr = this.sound.add('Pasos');
    this.PasosAb = this.sound.add('Pasos');
    this.Afondo = this.sound.add('Audio_Bat');
    this.Batalla = this.sound.add('Son_Bton_Bat');


    var puntaje = 10;

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

    this.enemigos = this.physics.add.staticGroup();

    for (let i = 1; i <= 7; i++) {

      var enemigo = this.enemigos.create(this.puntos[i].x, this.puntos[i].y, this.puntos[i].tipo,
      ).setScale(0.3, 0.3).setSize(70, 70).setOffset(108, 110);
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
          puntaje += 5;
          document.getElementById('Puntajee').innerHTML = 'PUNTOS: ' + puntaje;
          console.log("puntos=  " + puntaje);
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

    Probar();
    /// debugger;
    //Personaje
    let datosPersonaje={}; 
    if (!localStorage.getItem("personaje")) {
      localStorage.setItem("personaje", JSON.stringify({posX:200, posY:200}));
    }
    this.personaje = this.physics.add
    .sprite(JSON.parse(localStorage.getItem("personaje")).posX, JSON.parse(localStorage.getItem("personaje")).posY, "personaje")
    .setScale(0.3, 0.3)
    .setBounce(0.2)
    

    
    //Personaje

    document.getElementById('Puntajee').innerHTML = 'PUNTOS: ' + puntaje;

  }

  update(time, dt) {

    let {posX, posY} = localStorage.getItem("personaje")
    // Guardar el estado del juego actualizado

    this.physics.add.collider(this.personaje, this.enemigos, mostrarVentanaModal);

    function mostrarVentanaModal() {
      document.getElementById("oscuro").style.display = "block";
    }

    if (this.Ultimo === 2) {
      if (this.Reproducir === 1) {
        this.Afondo.play();
        this.Afondo.setVolume(0.3);
        this.Afondo.setSeek(1, 5);
        this.Reproducir = 2;
      }
      this.fondo.stop();
    }

    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC).isDown) {
      if (this.Ultimo === 1) {
        localStorage.setItem("personaje", JSON.stringify({posX:this.personaje.x, posY:this.personaje.y}));
        this.scene.start('MenuScene');
      }
      else {
        document.getElementById("oscuro").style.display = "none";
        this.Afondo.stop();
      }
    }

    if (document.getElementById("oscuro").style.display === "block") {
      this.Ultimo = 2;
      this.fondo.stop();
      this.PasosAb.stop();
      this.PasosAr.stop();
      this.PasosD.stop();
      this.PasosZ.stop();
    }
    if (document.getElementById("oscuro").style.display === "none") {
      this.Ultimo = 1;
    }
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
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown && this.Ultimo === 1) {
      this.personaje.setVelocityX(-150);
    }
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown && this.Ultimo === 1) {
      this.personaje.setVelocityX(150);
    }
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown && this.Ultimo === 1) {
      this.personaje.setVelocityY(150);
    }
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown && this.Ultimo === 1) {
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


