import { Batalla } from "./Batalla.js";
import { Game } from "./game.js";
import { MenuScene } from "./menu.js";
// import { creditos } from "./creditos.js";
import { CasaFrancisco } from "./CasaFrancisco.js";
import { Conversacion } from "./conversacion.js";
import { UI } from "./UI.js";
import { gameOver } from "./gameOver.js";

var config = {
  type: Phaser.AUTO,
  width: '100%',
  height: '96%',
  scene: [MenuScene, Game, Batalla, CasaFrancisco, Conversacion, UI, gameOver],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  }
};

  var game = new Phaser.Game(config);
  

