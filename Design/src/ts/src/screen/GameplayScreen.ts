namespace sh.screen {

    import Gameplay = sh.core.Gameplay;

    export class GameplayScreen extends Phaser.GameObjects.Container {
        _gameStage: Phaser.GameObjects.Image;
        _btnSound: Phaser.GameObjects.Image;
        _btnClose: Phaser.GameObjects.Image;

        private gameplayContainer: Phaser.GameObjects.Container;

        hexagons: Phaser.GameObjects.Container[];
        letters: Phaser.GameObjects.Image[];

        gameplay: Gameplay;

        private bgMusic:any = null;

        constructor(scene: Phaser.Scene, gameplay: Gameplay) {
            super(scene);
            this.gameplay = gameplay;
        }

        public showGameplay(): void {
            setPageBackground("bg-australia");

            this.bgMusic = this.scene.sound.add("bg_sound");
            this.bgMusic.play();
            this.bgMusic.loop = true;

            this.gameplay.reset();

            this._gameStage = new Phaser.GameObjects.Image(this.scene, game.scale.width / 2, game.scale.height / 2, null);
            this._gameStage.setOrigin(0.488, 0.476);
            this._gameStage.setInteractive();
            this._btnSound = new Phaser.GameObjects.Image(this.scene, 160-105, 100-50, 'Sound');
            this._btnSound.setInteractive({cursor: 'pointer'});
            setupButtonTextureBased(this._btnSound, 'Sound','Sound HOVER EFFECT');
            this._btnClose = new Phaser.GameObjects.Image(this.scene, 1025-105, 100-50,'x Button');
            this._btnClose.setInteractive({cursor: 'pointer'});
            setupButtonTextureBased(this._btnClose, 'x Button','x Button HOVER EFFECT');

            this.gameplayContainer = new Phaser.GameObjects.Container(this.scene);
            this.addAt(this.gameplayContainer, 0);

            this.gameplayContainer.add([
                this._gameStage,
                this._btnSound,
                this._btnClose
            ]);

            this.createInput();
            this.gameplay.setupCallbacks(this.showCompleteWindow, this.showLoseWindow);
        }

        public createInput(): void {
            this._btnSound.on('pointerup', () => {
                this.playBtnClickAnim(this._btnSound);

                this.onSoundClick();
            });

            this._btnClose.on('pointerup', () => {
                this.playBtnClickAnim(this._btnClose);

                this.onCloseClick();
            });
        }

        private soundGooseYes = null;
        public onCorrectAnswer(): boolean {
            let completed:boolean = this.gameplay.onCorrectAnswer();

            this.soundGooseYes = this.scene.sound.add("Goose Yes");
            this.soundGooseYes.play();

            return completed;
        }

        private soundGooseNo = null;
        public onWrongAnswer(): boolean {
            let lost:boolean = this.gameplay.onWrongAnswer();

            this.soundGooseNo = this.scene.sound.add("Goose no");
            this.soundGooseNo.play();

            return lost;
        }

        private correctAudio = null;
        private playCorrectAudio():void {
            if (this.correctAudio) {
                this.correctAudio.stop();
            }
            this.correctAudio = this.scene.sound.add(this.gameplay.getCorrectAudioKey());
            this.correctAudio.play();
            if (this.areYouSureWindow && this.areYouSureWindow.parentContainer == this) {
                this.correctAudio.pause();
            }
        }

        public onSoundClick(): void {
            this.playCorrectAudio();
        }

        public onCloseClick(): void {
            this.showAreYouSurePage();
        }

        private playBtnClickAnim(target): void {
            target.scaleX = target.scaleY = 1;
            this.scene.tweens.add({
                targets: target,
                "scaleX": 0.9,
                "scaleY": 0.9,
                duration: 100,
                yoyo: true
            });
        }

        private wfsnd = null;
        private instructionPage: InstructionPage;
        public showInstructionPage(): void {
            setPageBackground("bg-blue");

            let playInstructionSound:()=>void = ()=>{
                if (this.wfsnd) {
                    this.wfsnd.stop();
                }
                this.wfsnd = this.scene.sound.add("Welcome Find the sound");
                this.wfsnd.play();
            };

            this.instructionPage = new InstructionPage(this.scene, (target) => {
                this.playBtnClickAnim(target);
                this.remove(this.instructionPage);
                this.showGameplay();

                if (this.wfsnd) {
                    this.wfsnd.stop();
                }
            },(target) => {
                this.playBtnClickAnim(target);
                playInstructionSound();
            });
            this.add(this.instructionPage);
            playInstructionSound();
        }

        private areYouSureWindow:AreYouSureWindow;
        public showAreYouSurePage(): void {
            setPageBackground("bg-blue");

            this.pauseSounds();

            this.areYouSureWindow = new AreYouSureWindow(this.scene, ()=> {
                this.remove(this.areYouSureWindow);
                this.destroyGameplay();
                this.showInstructionPage();
            },()=> {
                this.remove(this.areYouSureWindow);
                this.unpauseSounds();
                setPageBackground("bg-australia");
            });
            this.add(this.areYouSureWindow);
        }

        public showCompleteWindow: (score: number, starScore: number) => void = (score: number, starScore: number) => {
            let completeWindow: CompleteWindow = new CompleteWindow(this.scene, (target) => {
                this.playBtnClickAnim(target);
            }, (target) => {
                this.playBtnClickAnim(target);
                this.destroyGameplay();
                this.remove(completeWindow);
                this.showInstructionPage();
            }, (target) => {
                this.playBtnClickAnim(target);
            });
            this.setInputEnabled(false);
            delayedCall(750, () => {
                setPageBackground("bg-blue");

                this.add(completeWindow);
                completeWindow.show(score, starScore);

                this.bgMusic.stop();
            });
        };

        public showLoseWindow: (score: number, starScore: number) => void = (score: number, starScore: number) => {
            let tryAgainWindow: TryAgainWindow = new TryAgainWindow(this.scene, (target) => {
                this.playBtnClickAnim(target);
            }, (target) => {
                this.playBtnClickAnim(target);
                this.destroyGameplay();
                this.remove(tryAgainWindow);
                this.showInstructionPage();
            });
            this.setInputEnabled(false);
            delayedCall(750, () => {
                setPageBackground("bg-blue");

                this.add(tryAgainWindow);
                tryAgainWindow.show(score, starScore);

                this.bgMusic.stop();
            });
        };

        public setInputEnabled(enabled: boolean): void {
            if (enabled) {
                for (let hc of this.hexagons) {
                    hc["bg"].setInteractive({cursor: 'pointer'});
                }
            } else {
                for (let hc of this.hexagons) {
                    hc["bg"].disableInteractive();
                }
            }
        }

        public pauseSounds():void {
            if (this.soundGooseYes) this.soundGooseYes.stop();
            if (this.soundGooseNo) this.soundGooseNo.stop();
            if (this.correctAudio) this.correctAudio.pause();
            if (this.bgMusic) this.bgMusic.pause();
        }

        public unpauseSounds():void {
            if (this.correctAudio) this.correctAudio.resume();
            if (this.bgMusic) this.bgMusic.resume();
        }

        public destroyGameplay():void {
            this.setInputEnabled(false);
            this.remove(this.gameplayContainer);
            destroyAllDelayedCalls();
        }
    }
}