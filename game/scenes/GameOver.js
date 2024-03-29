import Button from "./utils/Button";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
    this.singlePlayer;
    this.twoPlayer;
    this.freeplayButton;
  }
  preload() {
    this.load.image("background", "bg.jpeg");
    this.load.audio("buttonClick", "buttonClick.mp3");
  }
  create(data) {
    this.buttonClick = this.sound.add("buttonClick", {
      volume: 0.22,
      loop: false,
    });
    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    // const bg = this.add
    //   .image(screenCenterX, screenCenterY, "background")
    //   .setOrigin(0.5)
    //   .setScale(1);

    this.gameOverText = this.add
      .text(screenCenterX, screenCenterY - 180, "Game Over!", {
        font: "30px Audiowide",
      })
      .setScale(4)
      .setResolution(8)
      .setOrigin(0.5, 0.5)
      .setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    if (data.event === "Stars") {
      this.gameOverText.setText("You Win!");
    }

    this.singlePlayer = new Button(
      screenCenterX - 300,
      screenCenterY + 100,
      "Play Again",
      this,
      () => {
        this.buttonClick.play();
        this.scene.stop("GameOver");
        this.scene.stop("SinglePlayer");
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
        this.buttonClick.play();
        this.scene.stop("GameOver");
        this.scene.stop("SinglePlayer");
        this.scene.start("MainMenu");
      },
      3
    );

    this.gameMessage = this.add
      .text(screenCenterX, screenCenterY - 90, "", {
        font: "30px Audiowide",
      })
      .setOrigin(0.5, 0.5)
      .setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);
    this.gameMessage.setText(data.message).setResolution(8);

    this.gameScore = this.add
      .text(screenCenterX, screenCenterY - 30, "", {
        font: "30px Audiowide",
      })
      .setOrigin(0.5, 0.5)
      .setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff)
      .setResolution(8);
    this.gameScore.setText(data.finalScore);

    this.text = this.add.text(
      screenCenterX + 178,
      screenCenterY + 130,
      "on controller",
      { font: "15px Audiowide" }
    );
    this.text.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);
    this.text = this.add.text(screenCenterX + 160, screenCenterY + 125, "□ ", {
      font: "25px Audiowide",
    });
    this.text.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff).setResolution(8);

    this.text = this.add.text(
      screenCenterX - 440,
      screenCenterY + 130,
      "O on controller",
      { font: "15px Audiowide" }
    );
    this.text.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff).setResolution(8);

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
        this.buttonClick.play();
        this.scene.stop("GameOver");
        this.scene.stop("SinglePlayer");
        this.scene.start("SinglePlayer");
      }
      if (this.gamepad.X) {
        this.buttonClick.play();
        this.scene.stop("GameOver");
        this.scene.stop("SinglePlayer");
        this.scene.start("MainMenu");
      }
    }
  }
}
