export default class Freeplay extends Phaser.Scene {
  constructor() {
    super("Freeplay");
    this.starQuant = this.rng(10, 15);
  }

  preload() {
    //preload assets
    this.load.image("background", "bg.jpeg");
    this.load.image("rocket", "rocket.png");
    this.load.image("meteor", "meteor.png");
    this.load.image("star", "star.png");
    this.load.atlas("rocketsprite", "rocket-sprite.png", "rocket-sprite.json");
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  rng(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  addRocket(sprite, x, y) {
    this.physics.add.sprite(x, y, sprite).setScale(0.35);
    this.Health = 100000;
    this.Fuel = 100000;
  }

  create() {
    //background
    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    const bg = this.add
      .image(screenCenterX, screenCenterY, "background")
      .setOrigin(0.5)
      .setScale(1);

    //keys
    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.shiftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );
    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    //create animations
    this.anims.create({
      key: "default",
      frames: this.anims.generateFrameNames("rocketsprite", {
        prefix: "firing",
        end: 0,
        zeroPad: 3,
      }),
      repeat: -1,
    });

    this.anims.create({
      key: "firing",
      frames: this.anims.generateFrameNames("rocketsprite", {
        prefix: "firing",
        start: 0,
        end: 7,
        zeroPad: 3,
      }),
      repeat: 0,
    });

    this.rocket1 = this.addRocket("rocket", screenCenterX, screenCenterY);

    this.healthText = this.add
      .text(1875, 20, "Health: Unlimited", {
        font: "20px Audiowide",
        // fill: "#FFFFFF",
        fill: " #00FF00",
      })
      .setOrigin(1, 0);

    this.fuelText = this.add
      .text(1875, 80, "Fuel: Unlimited", {
        font: "20px Audiowide",
        // fill: "#FFFFFF",
        fill: " #00FF00",
      })
      .setOrigin(1, 0);

    this.scoreText = this.add
      .text(1875, 250, "Score: 0", {
        // .text(530, 20, "Score: 0", {
        font: "20px Audiowide",
        // fill: "#FFFFFF",
        // fill: " #00FF00",
      })
      .setOrigin(1, 0);

    this.starsText = this.add
      .text(
        1875,
        200,
        `Stars Left: ${this.starQuant}`,
        // `Stars Left: ${stars.getChildren().length}`,
        {
          font: "20px Audiowide",
        }
      )
      .setOrigin(1, 0);

    this.teleportText = this.add
      .text(1875, 140, `Teleporter is ready: 100%`, {
        // fill: " #00FF00",
        fill: " #00FF00",
        font: "20px Audiowide",
      })
      .setOrigin(1, 0);
  }
}
