import Button from "./utils/Button";

export default class Paused extends Phaser.Scene {
  constructor() {
    super("Paused");
    this.singlePlayer;
    this.twoPlayer;
    this.freeplayButton;
  }
  preload() {
    // this.load.image("background", "bg.jpeg");
  }
  create() {
    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    // const bg = this.add
    //   .image(screenCenterX, screenCenterY, "background")
    //   .setOrigin(0.5)
    //   .setScale(1);

    this.add
      .text(screenCenterX, screenCenterY - 180, "Paused", {
        font: "30px Audiowide",
      })
      .setScale(4)
      .setResolution(8)
      .setOrigin(0.5, 0.5)
      .setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.singlePlayer = new Button(
      screenCenterX - 300,
      screenCenterY + 100,
      "Play Again",
      this,
      () => {
        this.scene.start("SinglePlayer");
      },
      3
    );
    this.twoPlayer = new Button(
      screenCenterX + 300,
      screenCenterY + 100,
      "Main Menu",
      this,
      () => {
        this.scene.start("MainMenu");
      },
      3
    );

    this.text = this.add.text(
      screenCenterX - 120,
      screenCenterY - 460,
      "Game message",
      { font: "20px Audiowide" }
    );
    this.text.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.text = this.add.text(
      screenCenterX + 160,
      screenCenterY + 130,
      "X on controller",
      { font: "15px Audiowide" }
    );
    this.text.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.text = this.add.text(
      screenCenterX - 440,
      screenCenterY + 130,
      "O on controller",
      { font: "15px Audiowide" }
    );
    this.text.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.input.gamepad.on(
      "down",
      function (pad, button, index) {
        // text.setText("Using controller, refresh to use keyboard");
        this.gamepad = pad;
      },
      this
    );
  }
  update() {
    if (this.gamepad) {
      if (this.gamepad.B) {
        this.scene.stop("GameOver");
        this.scene.stop("SinglePlayer");
        this.scene.start("SinglePlayer");
      }
      if (this.gamepad.A) {
        this.scene.stop("GameOver");
        this.scene.stop("SinglePlayer");
        this.scene.start("MainMenu");
      }
    }
  }
}
