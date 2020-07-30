module sh.scene {

    export class Preloader extends Phaser.Scene {

        preload() {
        }

        create() {
            this.load.json('gameplay', 'assets/json/gameplay.json');
            this.load.pack('preloader', 'assets/pack.json');

            this.load.on('progress', (value:number) => {
            }, this);

            this.load.on('complete', () => {
                this.nextScene();
            });

            this.load.start();
        }

        private nextScene():void {
            game.scene.remove('Preloader');
            game.scene.add('ScreenMain', sh.scene.MainScene, true);
        }
    }
}