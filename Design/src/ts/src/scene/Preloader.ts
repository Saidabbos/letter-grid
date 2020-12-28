module sh.scene {

    export class Preloader extends Phaser.Scene {

        preload() {
            this.load.json('gameplay', 'assets/json/gameplay.json');
        }

        create() {
            this.load.pack('preloader', 'assets/pack.json');

            let json = game.cache.json.get('gameplay');
            for (let l of json["letters"]) {
                this.load.image(l["correctLetterName"], "assets/imgs/letters/"+l["correctLetterName"]+".png");
            }

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