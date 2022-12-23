/*
  This file holds all base assets and functions
  so that other files can extend this class and access/override them.
*/

export default class Base extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  createKeys() {
    //keys player 1
    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.shiftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );
    this.cursors = this.input.keyboard.createCursorKeys();
    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.mKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    // this.pointer = this.input.activePointer;
  }

  createAnimations() {
    // create animations player 1
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
  }

  // returns random int between inputs(min,max)
  rngBase(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // spins each sprite inside a group based on their current speed
  spinGroup(spriteGroup) {
    spriteGroup.getChildren().forEach((sprite) => {
      let spriteSpeed = sprite.body.velocity.x + sprite.body.velocity.y;
      if (sprite.body.speed > 200) {
        sprite.rotation += 0.0004 * spriteSpeed;
        sprite.body.speed = this.rngBase(0, 200);
      } else {
        sprite.rotation -= 0.0004 * spriteSpeed;
      }
    });
  }

  // adds rocket to game env using given sprite and coords
  addRocket(sprite, x, y) {
    let rocket = this.physics.add.sprite(x, y, sprite).setScale(0.35);
    rocket.Health = 100000;
    rocket.Fuel = 100000;
    rocket.score = 0;
    rocket.rotateValue = 0;
    rocket.checkWorldBounds = true;
    rocket.highScore = window.localStorage.getItem("highScore") || 0;
    rocket.highscoretext = `High Score: ${parseInt(rocket.highScore).toFixed(
      0
    )}`;
    rocket.teleporttext = `Teleport is recharging: ${(
      rocket.teleportTimer / 0.6
    ).toFixed(0)}%`;
    return rocket;
  }

  // physics for all rockets declared once here
  fireLaser(rocket, sprite) {
    let laser = rocket.lasers.create(rocket.x, rocket.y, sprite);
    rocket.Fuel -= 2600;
    this.fireBooster(rocket, 0);
    laser.depth = 0;
    laser.rotation = rocket.rotation + Math.PI / 2;
    laser.setScale(0.01);
    laser.setCollideWorldBounds(false);
    laser.setVelocityX(
      1000 * Math.sin(rocket.rotation) + rocket.body.velocity.x
    );
    laser.setVelocityY(
      -1000 * Math.cos(rocket.rotation) + rocket.body.velocity.y
    );
    this.laserSound.play();
  }

  // fire booster for a specific rocket, strength can be specified, default is 1
  fireBooster(rocket, strength = 1, demo = false) {
    if (demo == true) {
      rocket.anims.play("firing", true);
      let x = 2 * Math.sin(rocket.rotation);
      let y = -1 * 2 * Math.cos(rocket.rotation);
      rocket.setVelocityX(x * strength * 2);
      rocket.setVelocityY(y * strength * 2);
    } else {
      if (rocket.firing === false) {
        rocket.firing = true;
        rocket.thruster.play();
      }
      if (strength > 3) {
        rocket.Fuel -= 42 * strength;
        rocket.fuelText.setText(`Fuel: ${(rocket.Fuel / 1000).toFixed(2)}%`);
      } else {
        rocket.Fuel -= 24.7 * strength;
        rocket.fuelText.setText(`Fuel: ${(rocket.Fuel / 1000).toFixed(2)}%`);
        rocket.fuelText.setText(`Fuel: ${(rocket.Fuel / 1000).toFixed(2)}%`);
      }
      if (rocket.Fuel < 0) {
        rocket.Fuel = 0;
        rocket.fuelText.setText(`Fuel: 0.00%`);
        rocket.fuelText.setFill("#FF0000");
      } else if (rocket.Fuel < 30000) {
        rocket.fuelText.setFill("#FF0000");
      } else if (rocket.Fuel < 50000) {
        rocket.fuelText.setFill("#FFA500");
      } else if (rocket.Fuel < 80000) {
        rocket.fuelText.setFill("#FFFF00");
      } else if (rocket.Fuel > 80000) {
        rocket.fuelText.setFill("#00FF00");
      }
      rocket.anims.play("firing", true);
      let x = 2 * Math.sin(rocket.rotation);
      let y = -1 * 2 * Math.cos(rocket.rotation);
      rocket.setVelocityX(rocket.body.velocity.x + x * strength * 2);
      rocket.setVelocityY(rocket.body.velocity.y + y * strength * 2);
    }
  }

  // steer right
  turnRight(rocket, strength = 0.7, demo = false) {
    if (demo == true) {
      rocket.rotation += 0.1 * strength;
      rocket.rotateValue = 0;
    } else {
      rocket.fuelText.setText(`Fuel: ${(rocket.Fuel / 1000).toFixed(2)}%`);
      if (rocket.Fuel < 0) {
        rocket.Fuel = 0;
        rocket.fuelText.setText(`Fuel: 0.00%`);
        rocket.fuelText.setFill("#FF0000");
      } else if (rocket.Fuel < 30000) {
        rocket.fuelText.setFill("#FF0000");
      } else if (rocket.Fuel < 50000) {
        rocket.fuelText.setFill("#FFA500");
      } else if (rocket.Fuel < 80000) {
        rocket.fuelText.setFill("#FFFF00");
      }
      rocket.rotation += 0.1 * strength;
      rocket.rotateValue = 0;
    }
  }

  // steer left
  turnLeft(rocket, strength = 0.7, demo = false) {
    if (demo == true) {
      rocket.rotation -= 0.1 * strength;
      rocket.rotateValue = 0;
    } else {
      rocket.fuelText.setText(`Fuel: ${(rocket.Fuel / 1000).toFixed(2)}%`);
      if (rocket.Fuel < 0) {
        rocket.Fuel = 0;
        rocket.fuelText.setText(`Fuel: 0.00%`);
        rocket.fuelText.setFill("#FF0000");
      } else if (rocket.Fuel < 30000) {
        rocket.fuelText.setFill("#FF0000");
      } else if (rocket.Fuel < 50000) {
        rocket.fuelText.setFill("#FFA500");
      } else if (rocket.Fuel < 80000) {
        rocket.fuelText.setFill("#FFFF00");
      }
      rocket.rotation -= 0.1 * strength;
      rocket.rotateValue = 0;
    }
  }

  // play default animation
  default(rocket) {
    rocket.anims.play("default", true);
    rocket.firing = false;
    this.rocket1.thruster.stop();
  }

  // - spins rocket periodically if its been hit and is floating
  // - updates the score and teleport availability
  updateRocket(rocket) {
    rocket.rotation += rocket.rotateValue;
    if (rocket.teleportTimer < 65) {
      rocket.teleportTimer += 0.1;
    }
    if (Math.round(rocket.teleportTimer) === 60) {
      this.teleportReady.play();
    }
    rocket.score += 0.0008;
    rocket.highscoretext = `High Score: ${parseInt(rocket.highScore).toFixed(
      0
    )}`;
    if (rocket.score.toFixed(0) > parseInt(rocket.highScore).toFixed(0) - 1) {
      // window.localStorage.setItem("highScore", rocket.score);
      rocket.highscoretext = `New High Score: ${parseInt(
        rocket.highScore
      ).toFixed(0)}`;
      rocket.highScore = rocket.score;
    }
    if (rocket.score < 0) {
      rocket.score = 0;
    }
    rocket.scoreText.setText(`Score: ${rocket.score.toFixed(0)}`);
    rocket.highScoreText.setText(rocket.highscoretext);
    if (rocket.teleportTimer < 60) {
      rocket.teleportText.setFill(" #FF0000");
      rocket.teleportmessage = `Teleport is recharging: ${(
        rocket.teleportTimer / 0.6
      ).toFixed(0)}%`;
      rocket.teleportText.setText(rocket.teleportmessage);
    } else {
      rocket.teleportmessage = `Teleport: Available`;
      rocket.teleportText.setText(rocket.teleportmessage);
      rocket.teleportText.setFill(" #00FF00");
    }
  }

  // handles all controller inputs using a specified gamepad and rocket (can be used to expand to two player)
  // allows for multiple rockets and controllers
  updateGamePadControls(rocket, gamepad) {
    // steer left
    if (gamepad.left) {
      this.turnLeft(rocket);
    }

    // steer right
    if (gamepad.right) {
      this.turnRight(rocket);
    }

    // steer rocket
    if (gamepad.leftStick) {
      if (gamepad.leftStick.angle() != 0) {
        rocket.rotateValue = 0;
        rocket.rotation = gamepad.leftStick.angle() + Math.PI / 2;
      }
    }

    // reload game
    if (gamepad.B) {
      // location.reload();
      this.scene.restart();
    }

    // shoot laser
    if (gamepad.A && this.time.now > rocket.laserTimer) {
      rocket.laserTimer = this.time.now;
      this.fireLaser(rocket, "laser", this.time.now);
      rocket.laserTimer += 200;
    }

    // teleport
    if (gamepad.X) {
      if (rocket.teleportTimer.toFixed(0) > 60) {
        this.teleportSound.play();
        rocket.setPosition(this.rngBase(0, 1500), this.rngBase(0, 1500));
        rocket.teleportTimer = 0;
      }
    }

    // start button
    if (gamepad.buttons[9].pressed) {
      //console.log("start button pressed")
    }

    // mute toggle
    if (gamepad.R1) {
      if (this.time.now > this.muteTimer) {
        this.muteTimer = this.time.now;
        this.muteTimer = this.time.now + 250;
        if (this.sound.mute === true) {
          window.localStorage.setItem("mute", false);
          this.sound.mute = false;
          rocket.muteToggle.setText(`Unmuted`);
        } else {
          window.localStorage.setItem("mute", true);
          this.sound.mute = true;
          rocket.muteToggle.setText(`Muted`);
        }
      }
    }

    //thrust
    if (gamepad.R2 > 0 || gamepad.Y) {
      if (gamepad.Y) {
        this.fireBooster(rocket, 7.5);
      } else if (gamepad.R2 > 0) {
        this.fireBooster(rocket, 1.5 * gamepad.R2);
      }
    } else {
      this.default(rocket);
    }
  }

  // just for fun
  flyInfinityLoop(rocket) {
    this.fireBooster(rocket, rocket.speedDemo, true);
    if (rocket.direction === "left") {
      if (rocket.left === "small") {
        this.turnLeft(rocket, rocket.speedDemo / this.rngBase(100, 300), true);
      } else {
        this.turnLeft(rocket, rocket.speedDemo / this.rngBase(600, 700), true);
      }
    } else {
      if (rocket.right === "small") {
        this.turnRight(rocket, rocket.speedDemo / this.rngBase(100, 300), true);
      } else {
        this.turnRight(rocket, rocket.speedDemo / this.rngBase(600, 700), true);
      }
    }

    rocket.collided = rocket.body.checkWorldBounds();
    if (rocket.collided === true) {
      rocket.body.rotation = 0;
      rocket.x = this.screenCenterX;
      rocket.y = this.screenCenterY + 20;
    }

    if (
      rocket.body.rotation < 2.9 &&
      rocket.body.rotation > -2.9 &&
      this.time.now > rocket.turnTimer
    ) {
      rocket.turnTimer = this.time.now;
      if (rocket.direction === "right") {
        rocket.speedDemo = this.rngBase(10, 200);
        rocket.direction = "left";
        if (this.right === "small") {
          this.right = "big";
        } else {
          this.right = "small";
        }
      } else {
        rocket.speedDemo = this.rngBase(10, 200);
        rocket.direction = "right";
        if (rocket.left === "small") {
          rocket.left = "big";
        } else {
          rocket.left = "small";
        }
      }
      rocket.turnTimer += 100;
    }
  }
}
