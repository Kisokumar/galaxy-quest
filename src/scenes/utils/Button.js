export default class Button {
  constructor(x, y, label, scene, callback, scale) {
    const button = scene.add
      .text(x, y, label, { fontFamily: "Audiowide" })
      .setOrigin(0.5)
      .setPadding(10)
      .setScale(scale)
      .setResolution(8)
      .setStyle({ backgroundColor: "#111" })
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => callback())
      .on("pointerover", () => button.setStyle({ fill: "#F725FF" }))
      .on("pointerout", () => button.setStyle({ fill: "#FFF" }));
  }
}
