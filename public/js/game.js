import { Puntos } from "./preguntas.js";

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
    this.load.tilemapCSV("map", "./data/mapa.csv");
    this.load.image("tiles", "./img/Imagen.png");
    this.load.image('enemigo', './img/Enemigo.png');
    this.load.audio('Audio_Fon', './assets/Audios/Fondo_Sound.wav');
    this.load.audio('Pasos', './assets/Audios/Pasos.mp3');
    this.load.audio('Audio_Bat', './assets/Audios/Batalla.mp3');
    this.load.audio('Son_Bton_Bat', './assets/Audios/Son_Boton_Bat.mp3');
    this.load.spritesheet('PerFron', './img/SimonBolivar/front-Sheet.png', { frameWidth: 320, frameHeight: 320 });
    this.load.spritesheet('PerEsp', './img/SimonBolivar/back-Sheet.png', { frameWidth: 320, frameHeight: 320 });
    this.load.spritesheet('PerDer', './img/SimonBolivar/right-Sheet.png', { frameWidth: 320, frameHeight: 320 });
    this.load.spritesheet('PerIzq', './img/SimonBolivar/left-Sheet.png', { frameWidth: 320, frameHeight: 320 });

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

    var map = this.make.tilemap({ key: "map", tileWidth: 32, tileHeight: 32 });
    var tiles = map.addTilesetImage("tiles", null, 32, 32, 0, 0);
    var layer = map.createLayer(0, tiles);
    this.cameras.main.setBounds(0, 0, 3200, 3200);

    this.wrapRect = new Phaser.Geom.Rectangle(0, 0, 1367, 1239);

    this.enemigos = this.physics.add.staticGroup();

    for (let i = 0; i < 7; i++) {
      this.enemigos.create(this.puntos[i].x, this.puntos[i].y, this.puntos[i].tipo,
      ).setScale(0.3, 0.3).setSize(70, 70).setOffset(108, 110);
    }

    localStorage.setItem("Enemigo", JSON.stringify(this.puntos));


    /// debugger;
    //Personaje
    if (!localStorage.getItem("SimonBolivar")) {
      localStorage.setItem("SimonBolivar", JSON.stringify({ posX: 200, posY: 200, vida: 100 }));
    }
    this.personaje = this.physics.add
      .sprite(JSON.parse(localStorage.getItem("SimonBolivar")).posX, JSON.parse(localStorage.getItem("SimonBolivar")).posY, "PerFron")
      .setScale(0.2)
      .setBounce(0.2);

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
  }

  update(time, dt) {

    let { posX, posY } = localStorage.getItem("SimonBolivar")
    // Guardar el estado del juego actualizado

    this.physics.add.collider(this.personaje, this.enemigos, (personaje, enemigo) => {
      this.scene.start('Batalla');
      var div = document.getElementById("con_preguntas");
      div.style.display = "block";
      var div = document.getElementById("barra-vida");
      div.style.display = "block";
      var div = document.getElementById("barra-vidaE");
      div.style.display = "block";

      this.numEnemigo = this.enemigos.getChildren().indexOf(enemigo);
      localStorage.setItem('numEnemigo', this.numEnemigo);
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
    }else{
      this.PasosD.play();
      this.personaje.anims.stop();
    }

  }

}


