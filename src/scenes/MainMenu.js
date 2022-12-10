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
        // this.scene.start("SinglePlayer");
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

    // remove after finishing single and two player modes
    this.text = this.add.text(
      screenCenterX + 150,
      screenCenterY + 130,
      "Coming soon. . .",
      { font: "15px Audiowide" }
    );
    this.text.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);
    this.text = this.add.text(
      screenCenterX - 480,
      screenCenterY + 130,
      "Coming soon. . .",
      { font: "15px Audiowide" }
    );
    this.text.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.freeplayButton = new Button(
      screenCenterX,
      screenCenterY + 300,
      "Freeplay",
      this,
      () => {
        this.scene.start("Freeplay");
      },
      3
    );
  }
}
