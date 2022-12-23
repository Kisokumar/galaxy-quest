import Phaser, { Game } from "phaser";
import MainMenu from "./scenes/MainMenu";
import SinglePlayer from "./scenes/SinglePlayer";
import GameOver from "./scenes/GameOver";

const width = 1920;
const height = 1070;

if (window.localStorage.getItem("mute") === null) {
  window.localStorage.setItem("mute", false);
}

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
  scene: [MainMenu, SinglePlayer, GameOver],
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

document.fonts.load('1rem "Audiowide"').then(() => {
  const game = new Phaser.Game(config);
});
