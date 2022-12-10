import Phaser, { Game } from "phaser";
import Freeplay from "./scenes/Freeplay";
import MainMenu from "./scenes/MainMenu";

var config = {
  type: Phaser.AUTO,
  input: {
    gamepad: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: false,
    },
  },
  scene: [MainMenu, Freeplay],
  // scene: [MainMenu, GameOver,SinglePlayer, TwoPlayer],
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "root",
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    // width: 1540,
    // height: 790,
    width: window.innerWidth,
    height: window.innerHeight,
  },
};

const game = new Phaser.Game(config);
