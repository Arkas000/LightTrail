import Phaser from 'phaser';
import MainScene from "./scenes/mainScene";

const config = {
    type: Phaser.AUTO,
    pixelArt: false,
    roundPixels: false,
    width: 720,
    height: 960,
    parent: 'canvas-container',
    scene: [ MainScene ]
};

const game = new Phaser.Game(config);
