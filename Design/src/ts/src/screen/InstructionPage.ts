namespace sh.screen {
    export class InstructionPage extends Phaser.GameObjects.Container {

        private _instructionPage: Phaser.GameObjects.Image;
        private _instructionPageTitle: Phaser.GameObjects.Image;
        private _btnPlay: Phaser.GameObjects.Image;
        private _btnSoundInstruction: Phaser.GameObjects.Image;
        private instrTxt: Phaser.GameObjects.Text;

        constructor(scene: Phaser.Scene, onPlayClick:(target)=>void, onSndClick:(target)=>void) {
            super(scene);

            this._instructionPage = new Phaser.GameObjects.Image(this.scene, 0-105, 0-48, 'Instructions page  ALL ACTIVITY  TITLEs');
            this._instructionPage.setOrigin(0, 0);
            this._instructionPage.setInteractive();

            this._instructionPageTitle = new Phaser.GameObjects.Image(this.scene, 495, 105, 'welcome');
            this._instructionPageTitle.setScale(0.75);

            this._btnPlay = new Phaser.GameObjects.Image(this.scene, game.scale.width / 2, 480 - 50, 'btnPLAY1');
            this._btnPlay.setInteractive({cursor: 'pointer'});
            this._btnPlay.once('pointerup', onPlayClick);
            setupButtonTextureBased(this._btnPlay, 'btnPLAY1', 'btnPLAY2');

            this.instrTxt = this.scene.add.text(game.scale.width / 2, game.scale.height / 2, "Open the mosque gate\nby entering the passcode.", {
                "fontFamily": "Kids Rock Demo",
                "fontSize": 37,
                "color": "#A25122",
                "align": 'center',
                'stroke': '#FFFFFF',
                'strokeThickness': 6,
            });
            this.instrTxt.setOrigin(0.5, 0.5);

            this._btnSoundInstruction = new Phaser.GameObjects.Image(this.scene, 800 - 105, 156 - 50, 'Sound');
            this._btnSoundInstruction.setInteractive({cursor: 'pointer'});
            this._btnSoundInstruction.on('pointerup', onSndClick);
            setupButtonTextureBased(this._btnSoundInstruction, 'Sound','Sound HOVER EFFECT');

            this.add(this._instructionPage);
            this.add(this._instructionPageTitle);
            this.add(this.instrTxt);
            this.add(this._btnPlay);
            this.add(this._btnSoundInstruction);
        }
    }
}