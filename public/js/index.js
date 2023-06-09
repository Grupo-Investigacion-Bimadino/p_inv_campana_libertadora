import { Batalla } from "./Batalla.js";
import { Game } from "./game.js";
import { MenuScene } from "./menu.js";

var config = {
  type: Phaser.AUTO,
  width: 1345,
  height: 604,
  scene: [ MenuScene, Game, Batalla],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
};

  var game = new Phaser.Game(config);
  

