import { Batalla } from "./Batalla.js";
import { Game } from "./game.js";
import { MenuScene } from "./menu.js";
// import { creditos } from "./creditos.js";

var config = {
  type: Phaser.AUTO,
  width: '100%',
  height: '96%',
  scene: [ MenuScene, Game, Batalla],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  }
};

  var game = new Phaser.Game(config);
  

