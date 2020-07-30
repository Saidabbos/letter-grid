module sh.scene {
    export class Boot extends Phaser.Scene {
        init() {
            new FitScaleManager(this.game).setup();
        }

        create() {
            game.scene.remove('Boot');
            game.scene.add('Preloader', sh.scene.Preloader, true);
        }
    }
}