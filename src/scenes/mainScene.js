import Phaser from 'phaser';

class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.speedMultiplier = 2000;
    }

    preload() {
        this.load.image('sky', './assets/sky.png');
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    }

    create() {
        this.bg = this.add.image(512, 384, 'sky');
        this.bg.setScale(1.8);

        this.r1 = this.add.circle(200, 200, 80, 0x6666ff);
    }


    update(time, delta) {
        //console.log(time, delta);
        this.r1.x += 1*(1/delta);
    }
}

export default MainScene;
