export default class Freeplay extends Phaser.Scene {
  constructor() {
    super("Freeplay");
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
  }
}
