import Button from "./utils/Button";

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
    this.singlePlayer;
    this.twoPlayer;
    this.freeplayButton;
  }
  preload() {
    this.load.image("background", "bg.jpeg");
  }
  create() {
    window.localStorage.setItem("mute", false);
    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    const bg = this.add
      .image(screenCenterX, screenCenterY, "background")
      .setOrigin(0.5)
      .setScale(1);

    this.add
      .text(screenCenterX, screenCenterY - 180, "Galaxy Quest", {
        font: "30px Audiowide",
      })
      .setScale(4)
      .setResolution(8)
      .setOrigin(0.5, 0.5)
      .setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.singlePlayer = new Button(
      screenCenterX - 300,
      screenCenterY + 100,
      "Single Player",
      this,
      () => {
        this.scene.start("SinglePlayer");
      },
      3
    );
    this.twoPlayer = new Button(
      screenCenterX + 300,
      screenCenterY + 100,
      "Two Player",
      this,
      () => {
        // this.scene.start("TwoPlayer");
      },
      3
    );
    this.freeplayButton = new Button(
      screenCenterX,
      screenCenterY + 300,
      "Freeplay",
      this,
      () => {
        // this.scene.start("Freeplay");
      },
      3
    );

    // remove after finishing single and two player modes
    this.text = this.add.text(
      screenCenterX + 150,
      screenCenterY + 130,
      "Coming soon. . .",
      { font: "15px Audiowide" }
    );
    this.text.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);
    this.text = this.add.text(
      screenCenterX - 120,
      screenCenterY - 460,
      "Better with controller!",
      { font: "20px Audiowide" }
    );
    this.text.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.text = this.add.text(
      screenCenterX - 95,
      screenCenterY + 330,
      "on controller",
      { font: "15px Audiowide" }
    );
    this.text.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);
    this.text = this.add.text(screenCenterX - 115, screenCenterY + 325, "□ ", {
      font: "25px Audiowide",
    });
    this.text.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.text = this.add.text(
      screenCenterX - 475,
      screenCenterY + 130,
      "X on controller",
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
      if (this.gamepad.A) {
        this.scene.stop("MainMenu");
        this.scene.stop("SinglePlayer");
        this.scene.start("SinglePlayer");
      }
      if (this.gamepad.X) {
        console.log("FreePlay");
        // this.scene.stop("MainMenu");
        // this.scene.stop("SinglePlayer");
        // this.scene.start("MainMenu");
      }
    }
  }
}
