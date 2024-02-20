import { Puntos } from "./preguntas.js";
import { PuntosA } from "./preguntas.js";

export class Game extends Phaser.Scene {
  Ultimo;
  Reproducir;
  puntos = Puntos();
  puntosA = PuntosA();
  numEnemigo;

  constructor() {
    super({ key: "Game" });
    this.startText;
    this.backgroundImage;
    this.textVisible = true;
    this.velocity = 200;
    this.velocity = 200;
    this.wrapRect;
    this.Ultimo = 1;
    this.Reproducir = 1;
    this.esc = 1;
    this.routes = [];
    this.routesA = [];
    this.Inicio = 0;
    this.Col = 0;
    this.numEnemigo = "";
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
    this.load.image('esclavo', './img/SimonBolivar/back-Sheet-batalla.png');
    this.load.image('soldado', './img/enemigoEspañol/front-Sheet-batalla.png');
    this.load.image('colicionador', './img/Colicionador.png');

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

    this.load.spritesheet('CamFron', './img/Campesino/front-Sheet.png', { frameWidth: 320, frameHeight: 320 });
    this.load.spritesheet('CamEsp', './img/Campesino/back-Sheet.png', { frameWidth: 320, frameHeight: 320 });
    this.load.spritesheet('CamDer', './img/Campesino/right-Sheet.png', { frameWidth: 320, frameHeight: 320 });
    this.load.spritesheet('CamIzq', './img/Campesino/left-Sheet.png', { frameWidth: 320, frameHeight: 320 });

    this.load.spritesheet('infFron', './img/Informante/front-Sheet.png', { frameWidth: 320, frameHeight: 320 });

  }
  create() {
    this.mainCamera = this.cameras.main;

    const cameraWidth = this.mainCamera.width;
    const cameraHeight = this.mainCamera.height;

    const x = cameraWidth * 0.0;
    const y = cameraHeight * 0.0;

    this.minimapCamera = this.cameras.add(x, y, 215, 120).setZoom(0.13);
    this.minimapCamera.setBackgroundColor(0x00b90d);
    this.minimapCamera.setBounds(0, 0, 3200, 3200);



    if (!localStorage.getItem("Enemigo")) {
      localStorage.setItem("Enemigo", JSON.stringify(this.puntos));
    }
    if (!localStorage.getItem("Rutas")) {
      localStorage.setItem("Rutas", JSON.stringify(this.routes));
    }
    if (!localStorage.getItem("Aliado")) {
      localStorage.setItem("Aliado", JSON.stringify(this.puntosA));
    }
    if (!localStorage.getItem("RutasA")) {
      localStorage.setItem("RutasA", JSON.stringify(this.routesA));
    }

    this.sound.stopAll();
    this.fondo = this.sound.add('Audio_Fon');
    this.PasosD = this.sound.add('Pasos');
    this.PasosZ = this.sound.add('Pasos');
    this.PasosAr = this.sound.add('Pasos');
    this.PasosAb = this.sound.add('Pasos');
    this.Afondo = this.sound.add('Audio_Bat');
    this.Batalla = this.sound.add('Son_Bton_Bat');


    var puntaje = 10;


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
    capaArboles.setCollision([278, 357, 359, 2848,2849,2850,2851,2852, 491, 518, 1184, 1686, 1704, 1706, 1864, 1865, 2852, 4033, 4034, 4035, 4113, 4141, 4142, 4143, 4149, , 4193, 4194, 4195, 4115]);
    capaPasto.setCollision([232, 517,518,518,518,518,518,518,518,518,518,518,518,518,518,518,519]);

    this.cameras.main.setBounds(0, 0, 4832, 3232);

    this.wrapRect = new Phaser.Geom.Rectangle(0, 0, 1367, 1239);
    const enemySpeed = 2;
    this.enemigos = this.physics.add.group();
    this.routes = JSON.parse(localStorage.getItem("Rutas"));
    for (let i = 0; i < this.routes.length; i++) {
      const route = this.routes[i];
      const enemy = this.physics.add.sprite(route.x, route.y).setScale(0.2, 0.2).setSize(70, 70).setOffset(118, 110);
      this.enemigos.add(enemy);
      const path = this.add.path(route[0].x, route[0].y);
      for (let j = 1; j < route.length; j++) {
        path.lineTo(route[j].x, route[j].y);
      }
      enemy.path = path;
      enemy.t = 0; // Inicializar el tiempo de la ruta del enemigo
      enemy.speed = enemySpeed; // Establecer la velocidad constante para el enemigo
    }

    this.aliados = this.physics.add.group();
    this.routesA = JSON.parse(localStorage.getItem("RutasA"));
    for (let i = 0; i < this.routesA.length; i++) {
      const routeA = this.routesA[i];
      const ally = this.physics.add.sprite(routeA.x, routeA.y).setScale(0.2, 0.2).setSize(70, 70).setOffset(118, 110);
      this.aliados.add(ally);
      const path = this.add.path(routeA[0].x, routeA[0].y);
      for (let j = 1; j < routeA.length; j++) {
        path.lineTo(routeA[j].x, routeA[j].y);
      }
      ally.path = path;
      ally.t = 0; // Inicializar el tiempo de la ruta del aliado
      ally.speed = 1; // Establecer la velocidad constante para el aliado
    }

    /// debugger;
    //Personaje

    this.personaje = this.physics.add
      .sprite(JSON.parse(localStorage.getItem("SimonBolivar")).posX, JSON.parse(localStorage.getItem("SimonBolivar")).posY, "PerFron")
      .setScale(0.2)
      .setBounce(0.1)
      .setSize(80, 80)
      .setOffset(120, 180);

    this.personaje.body.debugShowBody = true;
    this.anims.create({ key: 'arriba', frames: this.anims.generateFrameNumbers('PerEsp', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'abajo', frames: this.anims.generateFrameNumbers('PerFron', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'derecha', frames: this.anims.generateFrameNumbers('PerDer', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'izquierda', frames: this.anims.generateFrameNumbers('PerIzq', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });


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
    capa6.depth = 5;
    this.enemigos.getChildren().forEach((enemy) => {
      enemy.depth = 1;
    });
    this.aliados.getChildren().forEach((Aly) => {
      Aly.depth = 1;
    });

    this.anims.create({ key: 'eneLeftAnim', frames: this.anims.generateFrameNumbers('eneIzq', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'eneRightAnim', frames: this.anims.generateFrameNumbers('eneDer', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'eneFrontAnim', frames: this.anims.generateFrameNumbers('eneFron', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'eneBackAnim', frames: this.anims.generateFrameNumbers('eneEsp', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });

    this.anims.create({ key: 'camLeftAnim', frames: this.anims.generateFrameNumbers('CamIzq', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'camRightAnim', frames: this.anims.generateFrameNumbers('CamDer', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'camFrontAnim', frames: this.anims.generateFrameNumbers('CamFron', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'camBackAnim', frames: this.anims.generateFrameNumbers('CamEsp', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });

    this.colicionador = this.physics.add
      .sprite(2540, 808, "colicionador")
      .setScale(0.2)
      .setBounce(0.1)
      .setSize(159, 120)
      .setOffset(120, 180);

    this.scene.launch('UI');
  }



  update() {
    this.cameras.main.startFollow(this.personaje);
    this.minimapCamera.startFollow(this.personaje);
    const playerX = this.personaje.x;

    if (this.scene.key === "Game") {

      const playerX = this.personaje.x;
      const playerY = this.personaje.y;
      // console.log(" X: " + playerX, " Y: " + playerY);
      const followThreshold = 100; // Seguimiento 150
      this.quienes = [];

      this.aliados.getChildren().forEach((ally) => {
        const point = ally.path.getPoint(ally.t);
        ally.setPosition(point.x, point.y);

        if (point) {
          // Determinar la dirección del movimiento
          const nextPoint = ally.path.getPoint(ally.t + 0.01); // Usar un pequeño incremento en t para obtener el siguiente punto

          if (nextPoint) {
            if (point.x === nextPoint.x || point.y === nextPoint.y) {
              if (point.x < nextPoint.x) {
                ally.anims.play('camRightAnim', true);
              } else if (point.x > nextPoint.x) {
                ally.anims.play('camLeftAnim', true);
              }
            } else {
              if (point.y < nextPoint.y) {
                ally.anims.play('camFrontAnim', true);
              } else if (point.y > nextPoint.y) {
                ally.anims.play('camBackAnim', true);
              }
            }
            ally.setPosition(point.x, point.y);

          }
        }
        ally.t += ally.speed / ally.path.getLength();

        if (ally.t > 1) {
          ally.t = 0; // Reiniciar el tiempo cuando se completa la ruta
        }
      });

      this.enemigos.getChildren().forEach((enemy) => {
        const enemyX = enemy.x;
        const enemyY = enemy.y;
        const t = enemy.t;
        const point = enemy.path.getPoint(t);
        const distance = Phaser.Math.Distance.Between(playerX, playerY, enemyX, enemyY);

        if (distance < followThreshold) {
          this.numEnemigo = this.enemigos.getChildren().indexOf(enemy);
          localStorage.setItem('numEnemigo', this.numEnemigo);
          // Actualiza la animación en función de la dirección del movimiento
          if (Math.abs(enemyX - playerX) > Math.abs(enemyY - playerY)) {
            if (enemyX > playerX) {
              enemy.anims.play('eneLeftAnim', true);
            } else {
              enemy.anims.play('eneRightAnim', true);
            }
          } else {
            if (enemyY > playerY) {
              enemy.anims.play('eneBackAnim', true);
            } else {
              enemy.anims.play('eneFrontAnim', true);
            }
          }

          // El enemigo sigue al personaje
          const angle = Phaser.Math.Angle.Between(enemyX, enemyY, playerX, playerY);
          const speed = 180; // Ajusta la velocidad de seguimiento
          const quien = this.enemigos.getChildren().indexOf(enemy);
          this.quienes.push(quien);


          enemy.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);


        } else {
          if (point) {
            // Determinar la dirección del movimiento
            const nextPoint = enemy.path.getPoint(t + 0.01); // Usar un pequeño incremento en t para obtener el siguiente punto

            if (nextPoint) {
              if (point.x === nextPoint.x || point.y === nextPoint.y) {
                if (point.x < nextPoint.x) {
                  enemy.anims.play('eneRightAnim', true);
                } else if (point.x > nextPoint.x) {
                  enemy.anims.play('eneLeftAnim', true);
                }
              } else {
                if (point.y < nextPoint.y) {
                  enemy.anims.play('eneFrontAnim', true);
                } else if (point.y > nextPoint.y) {
                  enemy.anims.play('eneBackAnim', true);
                }
              }
              enemy.setPosition(point.x, point.y);

            }
          }
          this.numEnemigo = this.enemigos.getChildren().indexOf(enemy);

          enemy.t += enemy.speed / enemy.path.getLength();
          if (enemy.t > 1) {
            enemy.t = 0; // Reiniciar el tiempo cuando se completa la ruta  
          }
        }
      });
    }

    let { posX, posY } = localStorage.getItem("SimonBolivar")

    this.physics.add.collider(this.personaje, this.colicionador, (personaje, colicionador) => {
      this.scene.stop('game');
      this.scene.start('CasaFrancisco');
      this.enemigos.getChildren().forEach((enemy, index) => {
        const posX = enemy.x;
        const posY = enemy.y;

        const rutaEnemigo1 = this.routes[index];
        const objeto3Enemigo1 = rutaEnemigo1[4];
        objeto3Enemigo1.x = enemy.x;
        objeto3Enemigo1.y = enemy.y;

        localStorage.setItem('Rutas', JSON.stringify(this.routes));
      });
    });

    this.physics.add.collider(this.personaje, this.enemigos, (personaje, enemigo) => {
      if (this.Col === 0) {
        this.numEnemigo = this.enemigos.getChildren().indexOf(enemigo);
        this.scene.stop('game')
        this.scene.start('Batalla');
        this.numEnemigo = this.enemigos.getChildren().indexOf(enemigo);
        localStorage.setItem('numEnemigo', this.numEnemigo);
        const Per = JSON.parse(localStorage.getItem('SimonBolivar'))
        Per.posX = this.personaje.x;
        Per.posY = this.personaje.y;
        localStorage.setItem('SimonBolivar', JSON.stringify(Per));
        const ruta = JSON.parse(localStorage.getItem('Rutas'))
       
        this.enemigos.getChildren().forEach((enemy) => {
          for (let i = 0; i < this.quienes.length; i++) {
            const element = ruta[i];
            const posX = enemy.x;
            const posY = enemy.y;
            const newInicio = { x: posX, y: posY };
            element.unshift(newInicio);
            if (element.length < 5) {
              localStorage.setItem('Rutas', JSON.stringify(ruta));
            }
          }

        });

      }

    });



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
        localStorage.setItem("SimonBolivar", JSON.stringify({ posX: this.personaje.x, posY: this.personaje.y }));
        this.scene.start('MenuScene');
      }
    }

    //MOVIMIENTO DEL PERSONAJE.
    const keyA = this.input.keyboard.addKey('A');
    const keyD = this.input.keyboard.addKey('D');
    const keyW = this.input.keyboard.addKey('W');
    const keyS = this.input.keyboard.addKey('S');
    const cursors = this.input.keyboard.createCursorKeys();
    this.personaje.setVelocity(0);
    

    if (this.Ultimo === 1) {
      if ((keyD.isDown || keyW.isDown || keyA.isDown || keyS.isDown || cursors.right.isDown || cursors.up.isDown || cursors.left.isDown || cursors.down.isDown)) {
        if ((keyD.isDown || cursors.right.isDown) && (keyW.isDown || cursors.up.isDown)) {
          this.personaje.setVelocityX(150);
          this.personaje.setVelocityY(-150);
          this.personaje.anims.play('arriba', true);
          this.PasosAr.stop();
        } else if ((keyA.isDown || cursors.left.isDown) && (keyW.isDown || cursors.up.isDown)) {
          this.personaje.setVelocityX(-150);
          this.personaje.setVelocityY(-150);
          this.personaje.anims.play('arriba', true);
          this.PasosAr.stop();
        } else if ((keyD.isDown || cursors.right.isDown) && (keyS.isDown || cursors.down.isDown)) {
          this.personaje.setVelocityX(150);
          this.personaje.setVelocityY(150);
          this.personaje.anims.play('abajo', true);
        } else if ((keyA.isDown || cursors.left.isDown) && (keyS.isDown || cursors.down.isDown)) {
          this.personaje.setVelocityX(-150);
          this.personaje.setVelocityY(150);
          this.personaje.anims.play('abajo', true);
        } else if (keyD.isDown || cursors.right.isDown) {
          this.personaje.setVelocityX(150);
          this.personaje.anims.play('derecha', true);
        } else if (keyW.isDown || cursors.up.isDown) {
          this.personaje.setVelocityY(-150);
          this.personaje.anims.play('arriba', true);
        } else if (keyS.isDown || cursors.down.isDown) {
          this.personaje.setVelocityY(150);
          this.personaje.anims.play('abajo', true);
        } else if (keyA.isDown || cursors.left.isDown) {
          this.personaje.setVelocityX(-150);
          this.personaje.anims.play('izquierda', true);
        }
      } else {
        this.PasosD.play();
        this.personaje.anims.stop();
      }
    } else {
      this.PasosD.play();
      this.personaje.anims.stop();
    }

  }


}


