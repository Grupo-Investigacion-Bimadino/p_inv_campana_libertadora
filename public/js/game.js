import { Puntos } from "./preguntas.js";
import { movimiento } from "./preguntas.js";


export class Game extends Phaser.Scene {
  Ultimo;
  Reproducir;
  puntos = Puntos();
  numEnemigo;

  constructor() {
    super({ key: "Game" });
    this.velocity = 200;
    this.wrapRect;
    this.aliens = [];
    this.Ultimo = 1;
    this.Reproducir = 1;
    this.esc = 1;
  }

  preload() {
    this.load.tilemapCSV("a_Pasto", "./data/a_Pasto.csv");
    this.load.tilemapCSV("a_Arboles", "./data/a_Arboles.csv");
    this.load.tilemapCSV("a_Casas2", "./data/a_Casas2.csv");
    this.load.tilemapCSV("a_Casas", "./data/a_Casas.csv");
    this.load.tilemapCSV("a_Puente", "./data/a_Puente.csv");
    this.load.tilemapCSV("a_Puente2", "./data/a_Puente2.csv");
    this.load.tilemapCSV("a_Pasto2", "./data/a_Pasto2.csv");
    this.load.tilemapCSV("a_TierraDetalles", "./data/a_TierraDetalle.csv");

    this.load.image("Tile", "./data/TileGeneral.png");
    this.load.image("fondo", "./img/fondoBatalla.png");
    this.load.image('esclavo', './img/Esclavito.png');
    this.load.image('soldado', './img/Soldado.png');

    this.load.audio('Audio_Fon', './assets/Audios/Fondo_Sound.wav');
    this.load.audio('Pasos', './assets/Audios/Pasos.mp3');
    this.load.audio('Audio_Bat', './assets/Audios/Batalla.mp3');
    this.load.audio('Son_Bton_Bat', './assets/Audios/Son_Boton_Bat.mp3');
    this.load.spritesheet('PerFron', './img/SimonBolivar/front-Sheet.png', { frameWidth: 320, frameHeight: 320 });
    this.load.spritesheet('PerEsp', './img/SimonBolivar/back-Sheet.png', { frameWidth: 320, frameHeight: 320 });
    this.load.spritesheet('PerDer', './img/SimonBolivar/right-Sheet.png', { frameWidth: 320, frameHeight: 320 });
    this.load.spritesheet('PerIzq', './img/SimonBolivar/left-Sheet.png', { frameWidth: 320, frameHeight: 320 });
    this.load.spritesheet('eneFron', './img/enemigoEspañol/front-Sheet.png', { frameWidth: 320, frameHeight: 320 });
    this.load.spritesheet('eneEsp', './img/enemigoEspañol/back-Sheet.png', { frameWidth: 320, frameHeight: 320 });
    this.load.spritesheet('eneDer', './img/enemigoEspañol/right-Sheet.png', { frameWidth: 320, frameHeight: 320 });
    this.load.spritesheet('eneIzq', './img/enemigoEspañol/left-Sheet.png', { frameWidth: 320, frameHeight: 320 });

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
    this.fondo.setVolume = 0.1;

    // Cargar el tilemap CSV
    var Pasto = this.make.tilemap({ key: "a_Pasto", tileWidth: 32, tileHeight: 32 });
    var Pasto2 = this.make.tilemap({ key: "a_Pasto2", tileWidth: 32, tileHeight: 32 });
    var TierraDetalles = this.make.tilemap({ key: "a_TierraDetalles", tileWidth: 32, tileHeight: 32 });
    var Arboles = this.make.tilemap({ key: "a_Arboles", tileWidth: 32, tileHeight: 32 });
    var Puente = this.make.tilemap({ key: "a_Puente", tileWidth: 32, tileHeight: 32 });
    var Puente2 = this.make.tilemap({ key: "a_Puente2", tileWidth: 32, tileHeight: 32 });
    var Casas = this.make.tilemap({ key: "a_Casas", tileWidth: 32, tileHeight: 32 });
    var Casas2 = this.make.tilemap({ key: "a_Casas2", tileWidth: 32, tileHeight: 32 });

    // Asignar las imágenes a las capas del tilemap
    var tileset = Pasto.addTilesetImage("Tile", null, 32, 32, 0, 0);

    var capaPasto = Pasto.createLayer(0, tileset);
    var capaPasto2 = Pasto2.createLayer(0, tileset);
    var capaTierra = TierraDetalles.createLayer(0, tileset);
    var capaArboles = Arboles.createLayer(0, tileset);
    var capa3 = Puente.createLayer(0, tileset);
    var capa4 = Puente2.createLayer(0, tileset);
    var capa5 = Casas.createLayer(0, tileset);
    var capa6 = Casas2.createLayer(0, tileset);


    // // Establecer colisión con todos los tiles excepto los especificados en nonCollisionTiles
    capaArboles.setCollision([1184, 1704, 1706, 1864, 1865, 4033, 4034, 4035, 4113, 4149, , 4193, 4194, 4195, 4115]);
    capaPasto.setCollision([232]);

    this.cameras.main.setBounds(0, 0, 3200, 3200);

    this.wrapRect = new Phaser.Geom.Rectangle(0, 0, 1367, 1239);

    this.enemigos = this.physics.add.group();
    const routes = movimiento();

    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];

      const enemy = this.physics.add.sprite(route[0].x, route[0].y, 'eneFron').setScale(0.2, 0.2).setSize(70, 70).setOffset(108, 110);
      this.enemigos.add(enemy);

      const path = this.add.path(route[0].x, route[0].y);
      for (let j = 1; j < route.length; j++) {
        path.lineTo(route[j].x, route[j].y);
      }

      enemy.path = path;
      enemy.t = 0; // Inicializar el tiempo de la ruta del enemigo
    }

    localStorage.setItem("Enemigo", JSON.stringify(this.puntos));

    /// debugger;
    //Personaje
    if (!localStorage.getItem("SimonBolivar")) {
      localStorage.setItem("SimonBolivar", JSON.stringify({ posX: 1815, posY: 882, vida: 100 }));
    }
    this.personaje = this.physics.add
      .sprite(JSON.parse(localStorage.getItem("SimonBolivar")).posX, JSON.parse(localStorage.getItem("SimonBolivar")).posY, "PerFron")
      .setScale(0.2)
      .setBounce(0.1)
      .setSize(80, 80)
      .setOffset(120, 180);

    this.personaje.body.debugShowBody = true;

    this.anims.create({
      key: 'arriba',
      frames: this.anims.generateFrameNumbers('PerEsp', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'abajo',
      frames: this.anims.generateFrameNumbers('PerFron', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'derecha',
      frames: this.anims.generateFrameNumbers('PerDer', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'izquierda',
      frames: this.anims.generateFrameNumbers('PerIzq', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });




    if (!localStorage.getItem('numEnemigo')) {
      localStorage.setItem('numEnemigo', JSON.stringify(this.numEnemigo));
    }

    this.physics.add.collider(this.personaje, [capaArboles, capaPasto]);
    this.personaje.depth = 1;
    capaPasto.depth = 0;
    capaPasto2.depth = 0;
    capaTierra.depth = 1;
    capaArboles.depth = 1;
    capa3.depth = 2;
    capa4.depth = 3;
    capa5.depth = 4;
    capa6.depth = 6;
    this.enemigos.getChildren().forEach((enemy) => {
      enemy.depth =  1;
    });  
    this.anims.create({
      key: 'eneLeftAnim',
      frames: this.anims.generateFrameNumbers('eneIzq', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    }); 
   
  }

  update(time, dt) {

    this.cameras.main.startFollow(this.personaje);

    if (this.scene.key === "Game") {
      this.enemigos.getChildren().forEach((enemy) => {
        const t = enemy.t;
        const point = enemy.path.getPoint(t);
    
        if (point) {
          // Determinar la dirección del movimiento
          const nextPointIndex = Math.floor(t * (1));
          const nextPoint = enemy.path.getPoint(nextPointIndex);
    
          if (point.x < nextPoint.x) {
            // El enemigo se mueve hacia la derecha
          } else {
            // El enemigo se mueve hacia la izquierda
            enemy.anims.play('eneLeftAnim', true);
          }
    
          enemy.setPosition(point.x, point.y);
        }
    
        enemy.t += 0.001; // Puedes ajustar este valor para controlar la velocidad de movimiento de los enemigos
        if (enemy.t > 1) {
          enemy.t = 0; // Reiniciar el tiempo cuando se completa la ruta
        }
      });
    }
    
    let { posX, posY } = localStorage.getItem("SimonBolivar")

    this.physics.add.collider(this.personaje, this.enemigos, (personaje, enemigo) => {
      this.scene.start('Batalla');
      this.numEnemigo = this.enemigos.getChildren().indexOf(enemigo);
      localStorage.setItem('numEnemigo', this.numEnemigo);
    });




    // Acceder a las coordenadas x e y del sprite del personaje
    // const posx = this.personaje.x;
    // const posy = this.personaje.y;

    // console.log("Posición X:", posx , "   Posición Y:", posy);




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
        localStorage.setItem("PerFron", JSON.stringify({ posX: this.personaje.x, posY: this.personaje.y }));
        this.scene.start('MenuScene');
      }
    }

    //MOVIMIENTO DEL PERSONAJE.
    const keyA = this.input.keyboard.addKey('A');
    const keyD = this.input.keyboard.addKey('D');
    const keyW = this.input.keyboard.addKey('W');
    const keyS = this.input.keyboard.addKey('S');
    this.personaje.setVelocity(0);

    if (this.Ultimo === 1) {
      if (keyD.isDown || keyW.isDown || keyA.isDown || keyS.isDown) {
        if (keyD.isDown && keyW.isDown) {
          this.personaje.setVelocityX(150);
          this.personaje.setVelocityY(-150);
          this.personaje.anims.play('arriba', true);
          this.PasosAr.stop();
        } else if (keyA.isDown && keyW.isDown) {
          this.personaje.setVelocityX(-150);
          this.personaje.setVelocityY(-150);
          this.personaje.anims.play('arriba', true);
          this.PasosAr.stop();
        } else if (keyD.isDown && keyS.isDown) {
          this.personaje.setVelocityX(150);
          this.personaje.setVelocityY(150);
          this.personaje.anims.play('abajo', true);
        } else if (keyA.isDown && keyS.isDown) {
          this.personaje.setVelocityX(-150);
          this.personaje.setVelocityY(150);
          this.personaje.anims.play('abajo', true);
        } else if (keyD.isDown) {
          this.personaje.setVelocityX(150);
          this.personaje.anims.play('derecha', true);
        } else if (keyW.isDown) {
          this.personaje.setVelocityY(-150);
          this.personaje.anims.play('arriba', true);
        } else if (keyS.isDown) {
          this.personaje.setVelocityY(150);
          this.personaje.anims.play('abajo', true);
        } else if (keyA.isDown) {
          this.personaje.setVelocityX(-150);
          this.personaje.anims.play('izquierda', true);
        }
      } else if (!(keyD.isDown || keyW.isDown || keyA.isDown || keyS.isDown)) {
        this.PasosD.play();
        this.personaje.anims.stop();
      }
    } else {
      this.PasosD.play();
      this.personaje.anims.stop();
    }

  }

}


