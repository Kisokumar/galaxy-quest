import Base from "./Base";

function rng(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default class SinglePlayer extends Base {
  constructor() {
    super("SinglePlayer");
    this.starQuant = this.rngBase(10, 15);
  }

  preload() {
    //preload assets
    this.load.image("background", "bg.jpeg");
    this.load.image("rocket", "rocket.png");
    this.load.image("meteor", "meteor.png");
    this.load.image("star", "star.png");
    this.load.image("laser", "laser.png");
    this.load.atlas("rocketsprite", "rocket-sprite.png", "rocket-sprite.json");
    this.cursors = this.input.keyboard.createCursorKeys();
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

    //keys player 1
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

    //create animations player 1
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

    // player 1 rocket and stats
    this.rocket1 = this.addRocket("rocket", screenCenterX, screenCenterY);
    this.rocket1.body.setSize(90, 170);

    this.rocket1.healthText = this.add
      .text(1875, 20, "Health: 100%", {
        font: "20px Audiowide",
        // fill: "#FFFFFF",
        fill: " #00FF00",
      })
      .setOrigin(1, 0);

    this.rocket1.fuelText = this.add
      .text(1875, 80, "Fuel: 100%", {
        font: "20px Audiowide",
        // fill: "#FFFFFF",
        fill: " #00FF00",
      })
      .setOrigin(1, 0);

    this.rocket1.scoreText = this.add
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

    this.rocket1.teleportText = this.add
      .text(1875, 140, `Teleporter is ready: 100%`, {
        // fill: " #00FF00",
        fill: " #00FF00",
        font: "20px Audiowide",
      })
      .setOrigin(1, 0);

    this.controls = this.add
      .text(1875, 300, ``, {
        // fill: " #00FF00",
        font: "20px Audiowide",
      })
      .setOrigin(1, 0);

    this.input.keyboard.on(
      "keydown",
      function (keyboard, button, index) {
        this.controls.setText("Using: Keyboard");
        this.started = true;
        this.rocket1.rotateValue /= 2;
      },
      this
    );

    this.input.gamepad.on(
      "down",
      function (pad, button, index) {
        // text.setText("Using controller, refresh to use keyboard");
        this.controls.setText("Using: Controller");
        this.gamepad = pad;
        this.rocket1.rotateValue /= 2;
        this.started = true;
      },
      this
    );

    //creating environment
    this.meteors = this.physics.add.group();
    this.stars = this.physics.add.group();

    this.rocket1.lasers = this.physics.add.group();
    this.rocket1.laserTimer = 0;
    this.rocket1.teleportTimer = 61;
    this.rocket1.depth = 10;

    function createObjects(object, key, q, xCord, yCord) {
      object.createMultiple({
        classType: Phaser.Physics.Arcade.Sprite,
        quantity: q,
        key: key,
        active: true,
        setXY: {
          x: rng(xCord - 50, xCord + 50),
          y: rng(yCord - 50, xCord + 50),
          stepX: 10,
          stepY: 10,
        },
      });
    }

    function createObjectRandomLocation(object, key, q) {
      for (let i = 0; i < q; i++) {
        object.create(rng(-1500, 1500), rng(-1500, 1500), key);
      }
    }

    // createObjects(this.meteors, "meteor", 10, 1500, 0);
    createObjectRandomLocation(this.meteors, "meteor", 40, 1400, 10);
    createObjectRandomLocation(this.stars, "star", this.starQuant, 1500, 0);

    // createObjectRandomLocation(this.stars, "star", 2000, 1500, 0);

    // /addtemp
    this.meteors.getChildren().forEach((meteor) => {
      meteor.setBounce(rng(1, 10) * 0.1).setScale(rng(4, 13) * 0.1);
      meteor.rotation = rng(1, 100);
      meteor.body
        .setVelocity(rng(-120, 120), rng(-120, 120))
        .setMaxSpeed(1000)
        .setSize(50, 50);
      this.physics.add.collider(
        meteor,
        this.meteors,
        () => null, //function
        null,
        this
      );
      // meteor.setBounce(1);
      this.physics.add.overlap(
        meteor,
        this.rocket1.lasers,
        () => {
          meteor.destroy();
        }, //function
        null,
        this
      );
      // meteors hitting rocket
      this.physics.add.collider(this.rocket1, meteor, () => {
        if (this.rocket1.body.speed > 100) {
          this.rocket1.Health -=
            Math.abs(
              meteor.scale * this.rocket1.body.speed * meteor.body.speed
            ) * 0.6;
        } else {
          this.rocket1.Health -=
            Math.abs(
              meteor.scale * this.rocket1.body.speed * meteor.body.speed
            ) * 4.4;
        }
        this.rocket1.rotateValue += rng(-5, 5) * 0.007;
        this.rocket1.score -= 200;
        if (this.started) {
          this.cameras.main.shake(100, 0.01);
          if (this.rocket1.Health < 0) {
            this.rocket1.Health = 0;
            this.rocket1.healthText.setText(`Health: 0.00%`);
            this.rocket1.healthText.setFill("#FF0000");
          } else if (this.rocket1.Health < 30000) {
            this.rocket1.healthText.setFill("#FF0000");
          } else if (this.rocket1.Health < 50000) {
            this.rocket1.healthText.setFill("#FFA500");
          } else if (this.rocket1.Health < 80000) {
            this.rocket1.healthText.setFill("#FFFF00");
          }
          this.rocket1.healthText.setText(
            `Health: ${(this.rocket1.Health / 1000).toFixed(2)}%`
          );
        }
      });
    });
    this.stars.getChildren().forEach((star) => {
      // meteor.body.setVelocity(rng(-60, 60), rng(-60, 60));
      star.rotation = rng(-100, 100);
      star.setScale(0.1);
      // star.setCollideWorldBounds(true);
      star.body
        .setVelocity(rng(-120, 120), rng(-120, 120))
        .setSize(500, 500)
        .setBounce(1);
      this.physics.add.collider(
        star,
        this.stars,
        () => null, //function
        null,
        this
      );
      this.physics.add.overlap(star, this.rocket1, () => {
        if (this.started) {
          this.rocket1.Fuel += 20000;
          this.rocket1.score += (star.body.speed + this.rocket1.body.speed) / 2;
          if (this.rocket1.Fuel < 0) {
            this.rocket1.Fuel = 0;
            this.rocket1.fuelText.setText(`Fuel: 0.00%`);
            this.rocket1.fuelText.setFill("#FF0000");
          } else if (this.rocket1.Fuel > 100000) {
            this.rocket1.Fuel = 100000;
          } else if (this.rocket1.Fuel < 30000) {
            this.rocket1.fuelText.setFill("#FF0000");
          } else if (this.rocket1.Fuel < 50000) {
            this.rocket1.fuelText.setFill("#FFA500");
          } else if (this.rocket1.Fuel < 80000) {
            this.rocket1.fuelText.setFill("#FFFF00");
          }
          this.rocket1.fuelText.setText(
            `Fuel: ${(this.rocket1.Fuel / 1000).toFixed(2)}%`
          );
          star.destroy();
          this.starsText.setText(
            `Stars Left: ${this.stars.getChildren().length}`
          );
        }
      });
    });

    //testing

    // this.fireBooster(this.rocket1, 100);
    // this.turnLeft(this.rocket1);
    this.turnRight(this.rocket1);
  }

  update() {
    // this.fireLaser(this.rocket1, "laser", this.time.now);
    this.physics.world.wrap(this.rocket1, 40);
    this.physics.world.wrap(this.meteors, 200);
    this.physics.world.wrap(this.stars, 300);

    if (this.started) {
      this.updateRocket(this.rocket1);
      if (this.rocket1.Health === 0) {
        this.scene.pause();
        this.scene.run("GameOver");
      }
      if (this.rocket1.Fuel === 0) {
        this.scene.pause();
        this.scene.run("GameOver");
      }
      if (this.stars.getChildren().length === 0) {
        this.scene.pause();
        this.scene.run("GameOver");
        // this.scene.swapPosition("SinglePlayer", "GameOver");
      }
    }

    //

    if (this.gamepad) {
      if (this.gamepad.left) {
        this.turnLeft(this.rocket1);
      }

      if (this.gamepad.leftStick) {
        // this.rocket1.turnLeft( leftStickSensitivity * -1 * this.gamepad.leftStick.x * 1.9);
        if (this.gamepad.leftStick.angle() != 0) {
          this.rocket1.rotateValue = 0;
          this.rocket1.rotation = this.gamepad.leftStick.angle() + Math.PI / 2;
        }
      }

      if (this.gamepad.B) {
        // location.reload();
        this.scene.restart();
      }

      if (this.gamepad.A && this.time.now > this.rocket1.laserTimer) {
        this.rocket1.laserTimer = this.time.now;
        this.fireLaser(this.rocket1, "laser", this.time.now);
        this.rocket1.laserTimer += 250;
      }

      // teleport
      if (this.gamepad.X) {
        if (this.rocket1.teleportTimer.toFixed(0) > 60) {
          this.rocket1.setPosition(rng(0, 1500), rng(0, 1500));
          this.rocket1.teleportTimer = 0;
        }
      }

      if (this.gamepad.buttons[9].pressed) {
        // console.log(this.gamepad.buttons[9].pressed);
        // console.log("Asd");
        this.scene.pause();
        this.scene.run("Paused");
      }

      //thrust
      if (this.gamepad.R2 > 0 || this.gamepad.Y) {
        if (this.gamepad.Y) {
          this.fireBooster(this.rocket1, 7.5);
        } else if (this.gamepad.R2 > 0) {
          this.fireBooster(this.rocket1, 1.5 * this.gamepad.R2);
        }
      } else {
        this.default(this.rocket1);
      }

      //   // keyboard
      // } else {
      //   if (cursors.right.isDown || dKey.isDown) {
      //     this.rocket1.turnRight();
      //   }
      //   if (cursors.left.isDown || aKey.isDown) {
      //     this.rocket1.turnLeft();
      //   }
      //   //shoot
      //   if (spaceKey.isDown) {
      //     null;
      //   }

      //   // teleport
      //   if (eKey.isDown) {
      //     if (time.toFixed(0) > 60) {
      //       this.rocket1.setPosition(rng(0, 1500), rng(0, 1500));
      //       this.rocket1.teleportTimer = 0;
      //     }
      //   }
      //   if (rKey.isDown) {
      //     location.reload();
      //   }
      //   if (shiftKey.isDown || cursors.up.isDown || wKey.isDown) {
      //     if (shiftKey.isDown) {
      //       this.rocket1.fireBooster(7.5);
      //     } else if (cursors.up.isDown || wKey.isDown) {
      //       this.rocket1.fireBooster(1);
      //     }
      //   } else {
      //     this.rocket1.default();
      //   }
    }
  } //
}
