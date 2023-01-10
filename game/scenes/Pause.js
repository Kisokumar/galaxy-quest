import Button from "./utils/Button";

export default class Pause extends Phaser.Scene {
  constructor() {
    super("Pause");
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

    this.mainText = this.add
      .text(screenCenterX, screenCenterY - 180, "Paused", {
        font: "30px Audiowide",
      })
      .setScale(4)
      .setResolution(8)
      .setOrigin(0.5, 0.5)
      .setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.resume = new Button(
      screenCenterX - 340,
      screenCenterY + 100,
      "Resume",
      this,
      () => {
        this.buttonClick.play();
        this.scene.stop("Pause");
        if (data.sceneName === "SinglePlayer") {
          this.sound.resumeAll();
          this.scene.resume("SinglePlayer");
        } else if (data.sceneName === "Freeplay") {
          this.sound.resumeAll();
          this.scene.resume("Freeplay");
        }
      },
      3
    );

    this.restart = new Button(
      screenCenterX,
      screenCenterY + 300,
      "Restart",
      this,
      () => {
        this.buttonClick.play();

        this.scene.stop("Pause");
        this.scene.stop("SinglePlayer");
        this.scene.stop("Freeplay");
        if (data.sceneName === "SinglePlayer") {
          this.scene.start("SinglePlayer");
        } else if (data.sceneName === "Freeplay") {
          this.scene.start("Freeplay");
        }
      },
      3
    );

    this.mainmenu = new Button(
      screenCenterX + 300,
      screenCenterY + 100,
      "Main Menu",
      this,
      () => {
        this.buttonClick.play();

        this.scene.stop("Pause");
        this.scene.stop("SinglePlayer");
        this.scene.stop("Freeplay");
        this.scene.start("MainMenu");
      },
      3
    );

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
      screenCenterX - 100,
      screenCenterY + 335,
      "O on controller",
      { font: "15px Audiowide" }
    );
    this.text.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff).setResolution(8);

    this.text = this.add.text(
      screenCenterX - 440,
      screenCenterY + 130,
      "X on controller",
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

        this.scene.stop("Pause");
        this.scene.stop("SinglePlayer");
        this.scene.stop("Freeplay");
        if (this.rocket1.gameMode === "SinglePlayer") {
          this.scene.run("SinglePlayer");
        } else if (this.rocket1.gameMode === "Freeplay") {
          this.scene.run("Freeplay");
        }
      }
      if (this.gamepad.A) {
        this.buttonClick.play();
        this.scene.stop("Pause");
        if (this.rocket1.gameMode === "SinglePlayer") {
          this.sound.resumeAll();
          this.scene.resume("SinglePlayer");
        } else if (this.rocket1.gameMode === "Freeplay") {
          this.sound.resumeAll();
          this.scene.resume("Freeplay");
        }
      }
      if (this.gamepad.X) {
        this.buttonClick.play();
        this.scene.stop("Pause");
        this.scene.stop("SinglePlayer");
        this.scene.stop("Freeplay");
        this.scene.start("MainMenu");
      }
    }
  }
}
