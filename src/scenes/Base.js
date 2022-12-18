export default class Base extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  rngBase(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  addRocket(sprite, x, y) {
    let rocket = this.physics.add.sprite(x, y, sprite).setScale(0.35);
    rocket.Health = 100000;
    rocket.Fuel = 100000;
    rocket.score = 0;
    rocket.rotateValue = 0;
    return rocket;
  }

  // physics for all rockets declared once
  fireLaser(rocket, sprite) {
    let laser = rocket.lasers.create(rocket.x, rocket.y, sprite);
    rocket.Fuel -= 2600;
    this.fireBooster(rocket, 0);
    laser.depth = 0;
    laser.rotation = rocket.rotation + Math.PI / 2;
    laser.setScale(0.01);
    laser.setCollideWorldBounds(false);
    laser.setVelocityX(1000 * Math.sin(rocket.rotation));
    laser.setVelocityY(-1000 * Math.cos(rocket.rotation));
  }

  fireBooster(rocket, strength = 1) {
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

  // side booster
  turnRight(rocket, strength = 1) {
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
    rocket.rotation += 0.1;
    rocket.rotateValue = 0.008 * strength;
  }

  turnLeft(rocket, strength = 1) {
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
    rocket.rotation -= 0.1;
    rocket.rotateValue = -0.008 * strength;
  }

  default(rocket) {
    rocket.anims.play("default", true);
  }

  updateRocket(rocket) {
    rocket.rotation += rocket.rotateValue;
    if (rocket.teleportTimer < 65) {
      rocket.teleportTimer += 0.07;
    }
    rocket.score += 0.0008;
    if (rocket.score < 0) {
      rocket.score = 0;
    }
    rocket.scoreText.setText(`Score: ${rocket.score.toFixed(0)}`);
    if (rocket.teleportTimer < 60) {
      rocket.teleportText.setFill(" #FF0000");
      rocket.teleportText.setText(
        `Teleporter is recharging: ${(rocket.teleportTimer / 0.6).toFixed(0)}%`
      );
    } else {
      rocket.teleportText.setText(`Teleporter is ready: 100%`);
      rocket.teleportText.setFill(" #00FF00");
    }
  }

  preload() {}

  //background

  create() {}
}
