import Base from "./Base";

// returns random int between inputs(min,max)
function rng(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// disable right click
document.addEventListener("contextmenu", (event) => event.preventDefault());

export default class SinglePlayer extends Base {
  constructor() {
    super("SinglePlayer");
  }

  // preload assets
  preload() {
    this.load.audio("lasersound", "laser2.mp3");
    this.load.audio("teleportsound", "teleport.mp3");
    this.load.audio("teleportReady", "teleportReady.mp3");
    this.load.audio("starGrab", "starGrab.wav");
    this.load.audio("rocketHit", "rocketHit.mp3");
    this.load.audio("meteorExplodes", "meteorExplodes.mp3");
    this.load.audio("gameOver", "gameOver.mp3");
    this.load.audio("gameMusic", "gameMusic.mp3");
    // this.load.audio("thruster", "thruster.mp3");
    this.load.audio("thruster", "thruster2.mp3");

    this.load.image("background", "bg.jpeg");
    this.load.image("rocket", "rocket.png");
    this.load.image("meteor", "meteor.png");
    this.load.image("star", "star.png");
    this.load.image("laser", "laser.png");
    this.load.atlas("rocketsprite", "rocket-sprite.png", "rocket-sprite.json");
  }

  // game environment setup
  create() {
    // game started value
    this.started = false;
    // background
    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    const bg = this.add
      .image(screenCenterX, screenCenterY, "background")
      .setOrigin(0.5)
      .setScale(1);

    // create animations player 1
    this.createAnimations();
    this.createKeys();

    // player 1 rocket and stats
    this.rocket1 = this.addRocket("rocket", screenCenterX, screenCenterY);
    this.rocket1.body.setSize(90, 170);
    this.rocket1.setImmovable(true);
    this.starQuant = this.rngBase(10, 25);

    this.rocket1.firing = false;

    //adding laser sound
    this.laserSound = this.sound.add("lasersound", {
      volume: 0.004,
      loop: false,
    });
    this.rocket1.thruster = this.sound.add("thruster", {
      volume: 0.05,
      loop: true,
    });
    this.teleportSound = this.sound.add("teleportsound", {
      volume: 0.03,
      loop: false,
    });
    this.teleportReady = this.sound.add("teleportReady", {
      volume: 0.03,
      loop: false,
    });
    this.starGrab = this.sound.add("starGrab", { volume: 0.04, loop: false });
    this.rocketHit = this.sound.add("rocketHit", { volume: 0.08, loop: false });
    this.meteorExplodes = this.sound.add("meteorExplodes", {
      volume: 0.0199,
      loop: false,
    });
    this.gameOver = this.sound.add("gameOver", { volume: 0.3, loop: false });
    this.gameMusic = this.sound.add("gameMusic", { volume: 0.009, loop: true });
    this.sound.volume = 0.9;
    // this.sound.stopAll();
    this.sound.stopByKey("menuMusic");
    this.sound.stopByKey("thruster");
    this.sound.stopByKey("gameMusic");
    this.gameMusic.stop();
    this.gameMusic.play();

    // this.sound.mute = false;
    let localMute = window.localStorage.getItem("mute");
    if (localMute === "false") {
      this.sound.mute = false;
    } else {
      this.sound.mute = true;
    }
    this.muteTimer = 0;
    var muteDisplay = this.sound.mute ? "Unmuted" : "Muted";

    this.startText = this.add.text(
      screenCenterX - 430,
      screenCenterY - 90,
      "Press any key on controller or keyboard to begin...",
      { font: "30px Audiowide" }
    );
    this.startText.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    let stats1X = 1890;
    let stats1Y = 180;

    let stats2X = 1890;
    let stats2Y = -220;

    this.rocket1.highScoreText = this.add
      .text(stats1X + 0, stats1Y + 50, ``, {
        font: "20px Audiowide",
      })
      .setOrigin(1, 0);
    this.rocket1.highScoreText.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.controls = this.add
      .text(stats1X + 0, stats1Y, ``, {
        // fill: " #00FF00",
        font: "20px Audiowide",
      })
      .setOrigin(1, 0);
    this.controls.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.starsText = this.add
      .text(stats1X + 0, stats1Y + 100, ``, {
        font: "20px Audiowide",
      })
      .setOrigin(1, 0);
    this.starsText.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.rocket1.muteToggle = this.add
      .text(stats1X + 0, stats1Y + 150, ``, {
        font: "20px Audiowide",
      })
      .setOrigin(1, 0);
    this.rocket1.muteToggle.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.rocket1.scoreText = this.add
      .text(stats1X + 0, stats1Y + 200, "", {
        font: "20px Audiowide",
      })
      .setOrigin(1, 0);
    this.rocket1.scoreText.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.rocket1.fuelText = this.add
      .text(stats2X + 0, stats2Y + 350, "", {
        font: "20px Audiowide",
        fill: " #00FF00",
      })
      .setOrigin(1, 0);

    this.rocket1.healthText = this.add
      .text(stats2X + 0, stats2Y + 300, "", {
        font: "20px Audiowide",
        fill: " #00FF00",
      })
      .setOrigin(1, 0);

    this.rocket1.teleportText = this.add
      .text(stats2X + 0, stats2Y + 250, ``, {
        // fill: " #00FF00",
        fill: " #00FF00",
        font: "20px Audiowide",
      })
      .setOrigin(1, 0);

    // after input from controller or keyboard, starts displaying & tracking game stats
    this.input.keyboard.on(
      "keydown",
      function (keyboard, button, index) {
        this.controls.setText("Using: Keyboard");
        this.rocket1.rotateValue /= 2;
        this.rocket1.rotateValue /= 2;
        this.started = true;

        this.startText.setText("");
        // this.rocket1.muteToggle.setText(`${muteDisplay}`);
        if (this.sound.mute === true) {
          this.rocket1.muteToggle.setText(`Muted`);
        } else {
          this.rocket1.muteToggle.setText(`Unmuted`);
        }
        this.rocket1.healthText.setText(
          `Health: ${(this.rocket1.Health / 1000).toFixed(2)}%`
        );
        this.rocket1.fuelText.setText(
          `Fuel: ${(this.rocket1.Fuel / 1000).toFixed(2)}%`
        );
        this.rocket1.scoreText.setText(
          `Score: ${this.rocket1.score.toFixed(0)}`
        );
        this.starsText.setText(`Stars Left: ${this.starQuant}`);
        this.rocket1.highScoreText.setText(this.rocket1.highscoretext);
        this.rocket1.teleportText.setText(this.rocket1.teleportmessage);
        // this.rocket1.teleportText.setText(
        //   `Teleport is recharging: ${(this.rocket1.teleportTimer / 0.6).toFixed(
        //     0
        //   )}%`
        // );
        this.rocket1.setImmovable(false);
      },
      this
    );

    this.input.gamepad.on(
      "down",
      function (pad, button, index) {
        this.controls.setText("Using: Controller");
        this.gamepad = pad;
        this.rocket1.rotateValue /= 2;
        this.started = true;

        this.startText.setText("");
        // this.rocket1.muteToggle.setText(`${muteDisplay}`);
        if (this.sound.mute === true) {
          this.rocket1.muteToggle.setText(`Muted`);
        } else {
          this.rocket1.muteToggle.setText(`Unmuted`);
        }
        this.rocket1.healthText.setText(
          `Health: ${(this.rocket1.Health / 1000).toFixed(2)}%`
        );
        this.rocket1.fuelText.setText(
          `Fuel: ${(this.rocket1.Fuel / 1000).toFixed(2)}%`
        );
        this.rocket1.scoreText.setText(
          `Score: ${this.rocket1.score.toFixed(0)}`
        );
        this.starsText.setText(`Stars Left: ${this.starQuant}`);
        this.rocket1.highScoreText.setText(this.rocket1.highscoretext);
        this.rocket1.teleportText.setText(this.rocket1.teleportmessage);
        // this.rocket1.teleportText.setText(
        //   `Teleport is recharging: ${(this.rocket1.teleportTimer / 0.6).toFixed(
        //     0
        //   )}%`
        // );
        this.rocket1.setImmovable(false);
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

    // creates objects inside a group with same coordinates (unused)
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

    // create sprites in random locations within a group
    function createObjectRandomLocation(object, key, q) {
      for (let i = 0; i < q; i++) {
        object.create(rng(-1500, 1500), rng(-1500, 1500), key);
      }
    }
    createObjectRandomLocation(this.meteors, "meteor", 40, 1400, 10);
    createObjectRandomLocation(this.stars, "star", this.starQuant, 1500, 0);

    // meteor config and collider (meteors->meteors) (laser->meteors)
    this.meteors.getChildren().forEach((meteor) => {
      meteor.setBounce(rng(6, 10) * 0.1).setScale(rng(4, 13) * 0.1);
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
      // meteor.body.isCircle = true;
      this.physics.add.overlap(
        meteor,
        this.rocket1.lasers,
        () => {
          this.cameras.main.shake(meteor.scale * 70, 0.01);
          this.meteorExplodes.play();
          this.rocket1.score += 200;
          this.rocket1.highScore =
            window.localStorage.getItem("highScore") || 0;
          meteor.destroy();
        },
        null,
        this
      );

      // star config and collider (rocket->meteors)
      this.physics.add.collider(this.rocket1, meteor, () => {
        if (this.started) {
          if (this.rocket1.body.speed > 100) {
            this.rocketHit.play();
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
          this.rocket1.highScore =
            window.localStorage.getItem("highScore") || 0;
          this.cameras.main.shake(
            this.rocket1.body.speed * meteor.body.speed * meteor.scale * 0.02,
            0.01
          );
          this.rocket1.healthText.setText(
            `Health: ${(this.rocket1.Health / 1000).toFixed(2)}%`
          );
          if (this.rocket1.Health < 0) {
            this.rocket1.Health = 0;
            this.rocket1.healthText.setText(`Health: 0.00%`);
            this.rocket1.healthText.setFill("#FF0000");
          } else if (this.rocket1.Health < 30000) {
            this.rocket1.healthText.setFill("#FF0000");
          } else if (
            this.rocket1.Health > 50000 &&
            this.rocket1.Health < 80000
          ) {
            this.rocket1.healthText.setFill("#FFA500");
          } else if (
            this.rocket1.Health < 50000 &&
            this.rocket1.Health > 30000
          ) {
            this.rocket1.healthText.setFill("#FFFF00");
          } else {
            this.rocket1.healthText.setFill("#00FF00");
          }
        }
      });
    });

    // adding star config and collider (stars->stars)
    this.stars.getChildren().forEach((star) => {
      // star.changeX = rng(2, 20);
      // star.changeY = rng(2, 20);
      star.rotation = rng(-100, 100);
      star.setScale(0.1);
      star.body.setMaxVelocity(200);
      star.body
        .setVelocity(rng(-120, 120), rng(-120, 120))
        .setSize(500, 500)
        .setBounce(1);
      star.body.isCircle = true;
      this.physics.add.collider(
        star,
        this.stars,
        () => null, //function
        null,
        this
      );

      // star grabbed by player
      this.physics.add.overlap(star, this.rocket1, () => {
        if (this.started) {
          this.starGrab.play();
          // this.stars.getChildren().forEach((starCurrent) => {
          //   starCurrent.body.velocity.x += starCurrent.changeX * 2;
          //   starCurrent.body.velocity.y += starCurrent.changeY * 2;
          // });
          this.rocket1.Fuel += 20000;
          this.rocket1.score += (star.body.speed + this.rocket1.body.speed) / 2;
          this.rocket1.highScore =
            window.localStorage.getItem("highScore") || 0;
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
          this.starQuant -= 1;
          this.starsText.setText(`Stars Left: ${this.starQuant}`);
        }
      });
    });

    //testing

    // this.fireBooster(this.rocket1, 100);
    // this.turnLeft(this.rocket1);
    // this.turnRight(this.rocket1);
  }

  // executed periodically while game is running
  update() {
    // allow objects to wrap around map
    this.physics.world.wrap(this.rocket1, 40);
    this.physics.world.wrap(this.meteors, 200);
    this.physics.world.wrap(this.stars, 300);

    // spins sprites in a group based on their individual speed
    this.spinGroup(this.meteors);
    this.spinGroup(this.stars);

    // game over logic
    if (this.started) {
      this.updateRocket(this.rocket1);
      if (this.rocket1.Health === 0) {
        if (
          this.rocket1.score.toFixed(0) >
          parseInt(this.rocket1.highScore).toFixed(0)
        ) {
          window.localStorage.setItem("highScore", this.rocket1.score);
          // this.rocket1.highScoreText.setTint();
          // this.rocket1.highScoreText.setFill("#00FF00");
        }

        this.scene.pause();
        // this.sound.stopAll();
        this.sound.stopByKey("thruster");
        this.gameOver.play();
        this.scene.run("GameOver");
      }
      if (this.rocket1.Fuel === 0) {
        if (
          this.rocket1.score.toFixed(0) >
          parseInt(this.rocket1.highScore).toFixed(0) - 1
        ) {
          window.localStorage.setItem("highScore", this.rocket1.score);
        }
        this.scene.pause();
        // this.sound.stopAll();
        this.sound.stopByKey("thruster");
        this.gameOver.play();
        this.scene.run("GameOver");
      }
      if (this.starQuant === 0) {
        if (
          this.rocket1.score.toFixed(0) >
          parseInt(this.rocket1.highScore).toFixed(0) - 1
        ) {
          window.localStorage.setItem("highScore", this.rocket1.score);
        }
        // this sound will be changed to win sound
        this.scene.pause();
        // this.sound.stopAll();
        this.sound.stopByKey("thruster");
        this.gameOver.play();
        this.scene.run("GameOver");
      }
    }

    // gamepad controls handler
    if (this.gamepad) {
      this.updateGamePadControls(this.rocket1, this.gamepad);
      // keyboard controls handler
    } else {
      // steer right
      if (this.cursors.right.isDown || this.dKey.isDown) {
        this.turnRight(this.rocket1, 0.7);
      }

      // steer left
      if (this.cursors.left.isDown || this.aKey.isDown) {
        this.turnLeft(this.rocket1, 0.7);
      }

      // shoot laser
      if (
        // (this.spaceKey.isDown || this.pointer.isDown) &&
        this.spaceKey.isDown &&
        this.time.now > this.rocket1.laserTimer
      ) {
        this.rocket1.laserTimer = this.time.now;
        this.fireLaser(this.rocket1, "laser", this.time.now);
        this.rocket1.laserTimer += 200;
      }

      // restart game
      if (this.rKey.isDown) {
        this.scene.restart();
      }

      //fire booster
      // if (this.shiftKey.isDown || this.cursors.up.isDown || this.wKey.isDown) {
      if (
        // this.pointer.isDown ||
        this.shiftKey.isDown ||
        this.cursors.up.isDown ||
        this.wKey.isDown
      ) {
        // if (this.rocket1.firing === false) {
        //   this.rocket1.firing = true;
        //   this.rocket1.thruster.play();
        // }
        if (this.shiftKey.isDown) {
          this.fireBooster(this.rocket1, 3);
        } else if (
          this.cursors.up.isDown ||
          this.wKey.isDown
          // this.wKey.isDown ||
          // this.pointer.isDown
        ) {
          this.fireBooster(this.rocket1, 1.4);
        }
        // default animation
      } else {
        this.default(this.rocket1);
        // this.rocket1.firing === false;
        // this.rocket1.thruster.play();
      }
      // teleport
      if (this.eKey.isDown) {
        if (this.rocket1.teleportTimer.toFixed(0) > 60) {
          this.teleportSound.play();
          this.rocket1.setPosition(rng(0, 1500), rng(0, 1500));
          this.rocket1.teleportTimer = 0;
        }
      }
      // toggle mute
      if (this.mKey.isDown) {
        if (this.time.now > this.muteTimer) {
          this.muteTimer = this.time.now;
          this.muteTimer = this.time.now + 250;
          if (this.sound.mute === true) {
            window.localStorage.setItem("mute", false);
            this.sound.mute = false;
            this.rocket1.muteToggle.setText(`Unmuted`);
          } else {
            window.localStorage.setItem("mute", true);
            this.sound.mute = true;
            this.rocket1.muteToggle.setText(`Muted`);
          }
        }
      }
    }
  }
}
