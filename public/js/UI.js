export class UI extends Phaser.Scene {
    constructor() {
        super({ key: 'UI' });
    }

    preload() {
        this.load.image('cerebro', './assets/Cerebro.png');
        this.load.image('corazon', './assets/corazon.png');
        this.load.image('margen', './assets/Margen.webp');

    }

    create() {
        const personaje = JSON.parse(localStorage.getItem("SimonBolivar"));
        this.Vida = personaje.vida;
        this.Conocimiento = personaje.conocimiento;
        const camera = this.cameras.main;

        const cameraWidth = camera.width;
        const cameraHeight = camera.height;

        const x = cameraWidth * 0.03;  // 50% del ancho
        const y = cameraHeight * 0.02; // 10% del alto

        const margen = this.add.image(109, 62, 'margen');
        margen.setScale(0.8);


        const Conocimiento = this.add.image(x + 200, y + 5, 'cerebro');
        Conocimiento.setScale(0.006);

        const conocimientoContainerPer = this.add.container(x, y);
        const VidaContainerPer = this.add.container(x, y + 20);

        const fondoBarraCon = this.add.graphics();
        fondoBarraCon.fillStyle(0x000000);
        fondoBarraCon.fillRect(219, -1, 200, 12);
        conocimientoContainerPer.add(fondoBarraCon);

        const barraColorCon = this.add.graphics();
        barraColorCon.fillStyle(0x50CEE8);
        barraColorCon.fillRect(220, 0, (this.Conocimiento / 100) * 200, 10);
        conocimientoContainerPer.add(barraColorCon);

        const Vida = this.add.image(x + 200, y + 25, 'corazon');
        Vida.setScale(0.2);


        const barraColorVida = this.add.graphics();
        barraColorVida.fillStyle(0xFF0000);
        barraColorVida.fillRect(220, 0, (this.Vida / 100) * 200, 10);
        VidaContainerPer.add(barraColorVida);

        const fondoBarraVida = this.add.graphics();
        fondoBarraVida.fillStyle(0x000000);
        fondoBarraVida.fillRect(219, 19, 202, 12);
        conocimientoContainerPer.add(fondoBarraVida);
    }
}
