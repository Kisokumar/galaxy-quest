import Phaser, { Game } from "phaser";
import MainMenu from "./scenes/MainMenu";
import SinglePlayer from "./scenes/SinglePlayer";
import GameOver from "./scenes/GameOver";
import Paused from "./scenes/Paused";

const width = 1920;
const height = 1070;

var config = {
  type: Phaser.AUTO,
  transparent: true,
  input: {
    gamepad: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0, x: 0 },
      // debug: true,
    },
  },
  // scene: [GameOver, SinglePlayer, MainMenu],
  scene: [MainMenu, Paused, SinglePlayer, GameOver],
  // scene: [SinglePlayer],
  // scene: [MainMenu, GameOver, FreePlay, SinglePlayer, TwoPlayer],
  scale: {
    mode: Phaser.Scale.FIT,
    // parent: "root",
    parent: "game-display",
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    width: width,
    height: height,
  },
};

const game = new Phaser.Game(config);
