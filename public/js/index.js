import { Game } from "./game.js";

var config = {
  type: Phaser.AUTO,
  width: 1345,
  height: 604,
  scene: [Game],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  }
};

  var game = new Phaser.Game(config);

