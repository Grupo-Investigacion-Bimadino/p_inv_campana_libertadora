export class CasaFrancisco extends Phaser.Scene {

    constructor() {
        super({ key: "CasaFrancisco" });
    }

    preload() {
        this.load.tilemapCSV("a_Suelo", "./data/CasaInterior/a_Suelo.csv");
        this.load.tilemapCSV("a_Pared", "./data/CasaInterior/a_Pared.csv");
        this.load.tilemapCSV("a_Pared2", "./data/CasaInterior/a_Pared2.csv");

        this.load.image("Tile", "./data/TileGeneral.png");

        this.load.spritesheet('PerFron', './img/SimonBolivar/front-Sheet.png', { frameWidth: 320, frameHeight: 320 });
        this.load.spritesheet('PerEsp', './img/SimonBolivar/back-Sheet.png', { frameWidth: 320, frameHeight: 320 });
        this.load.spritesheet('PerDer', './img/SimonBolivar/right-Sheet.png', { frameWidth: 320, frameHeight: 320 });
        this.load.spritesheet('PerIzq', './img/SimonBolivar/left-Sheet.png', { frameWidth: 320, frameHeight: 320 });

    }
    create() {
        // PERSONAJE //
        this.personaje = this.physics.add
            .sprite(695, 810, "PerEsp")
            .setScale(0.2)
            .setBounce(0.1)
            .setSize(150, 80)
            .setOffset(90, 180);

        this.personaje.body.debugShowBody = true;
        // PERSONAJE //

        // CAMARA //
        this.mainCamera = this.cameras.main;
        this.mainCamera.setBounds(0, 0, 0, 0);
        this.mainCamera.setFollowOffset(0, 0);
        this.cameras.main.setBounds(0, 0, 0, 900);
        // CAMARA //

        // MAPA //
        var Suelo = this.make.tilemap({ key: "a_Suelo", tileWidth: 32, tileHeight: 32 });
        var tileset = Suelo.addTilesetImage("Tile", null, 32, 32, 0, 0);
        var capaSuelo = Suelo.createLayer(0, tileset);
        capaSuelo.setPosition(200, 100);

        var Pared = this.make.tilemap({ key: "a_Pared", tileWidth: 32, tileHeight: 32 });
        var capaPared = Pared.createLayer(0, tileset);
        capaPared.setPosition(200, 100);

        var Pared2 = this.make.tilemap({ key: "a_Pared2", tileWidth: 32, tileHeight: 32 });
        var capaPared2 = Pared2.createLayer(0, tileset);
        capaPared2.setPosition(168, 100);

        capaPared.setCollision([8563, 8564, 8565, 8645, 8963, 8964]);
        capaPared2.setCollision([8641]);
        capaSuelo.setCollision([8654]);
        this.physics.add.collider(this.personaje, [capaPared, capaPared2, capaSuelo]);

        this.personaje.depth = 1;
        capaSuelo.depth = 0;
        capaPared.depth = 0;
        capaPared2.depth = 2;
        // MAPA //

        // ANIMACIONES PERSONAJE //
        this.anims.create({ key: 'arriba', frames: this.anims.generateFrameNumbers('PerEsp', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'abajo', frames: this.anims.generateFrameNumbers('PerFron', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'derecha', frames: this.anims.generateFrameNumbers('PerDer', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'izquierda', frames: this.anims.generateFrameNumbers('PerIzq', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
        // ANIMACIONES PERSONAJE //
    }

    update() {
        // console.log(this.personaje.x, this.personaje.y);
        this.cameras.main.startFollow(this.personaje);

        const keyA = this.input.keyboard.addKey('A');
        const keyD = this.input.keyboard.addKey('D');
        const keyW = this.input.keyboard.addKey('W');
        const keyS = this.input.keyboard.addKey('S');
        this.personaje.setVelocity(0);

        if (keyD.isDown || keyW.isDown || keyA.isDown || keyS.isDown) {
            if (keyD.isDown && keyW.isDown) {
                this.personaje.setVelocityX(150);
                this.personaje.setVelocityY(-150);
                this.personaje.anims.play('arriba', true);
                // this.PasosAr.stop();
            } else if (keyA.isDown && keyW.isDown) {
                this.personaje.setVelocityX(-150);
                this.personaje.setVelocityY(-150);
                this.personaje.anims.play('arriba', true);
                // this.PasosAr.stop();
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
        } else {
            this.personaje.anims.stop();
        }

    }
}
