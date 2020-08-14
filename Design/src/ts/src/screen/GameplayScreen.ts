namespace sh.screen {

    import Gameplay = sh.core.Gameplay;

    export class GameplayScreen extends Phaser.GameObjects.Container {
        private rows:number = 5;
        private cols:number = 5;

        _gameStage: Phaser.GameObjects.Image;
        _btnSound: Phaser.GameObjects.Image;
        _btnClose: Phaser.GameObjects.Image;

        private gameplayContainer: Phaser.GameObjects.Container;

        grid: Phaser.GameObjects.Container[][];
        crescentMoons:Phaser.GameObjects.Image[];

        gameplay: Gameplay;
        targetLetterLabel:Phaser.GameObjects.Image;

        private bgMusic:any = null;

        private doorsWindow:DoorsWindow;

        constructor(scene: Phaser.Scene, gameplay: Gameplay) {
            super(scene);
            this.gameplay = gameplay;window["t"]=this;
        }

        public showGameplay(): void {
            setPageBackground("bg-australia");

            this.bgMusic = this.scene.sound.add("B-g ambience");
            this.bgMusic.play();
            this.bgMusic.loop = true;

            this._gameStage = new Phaser.GameObjects.Image(this.scene, game.scale.width / 2, game.scale.height / 2, '3 Letter Grid');
            this._gameStage.setOrigin(0.485, 0.48);
            this._gameStage.setInteractive();
            this._btnSound = new Phaser.GameObjects.Image(this.scene, 160-105, 100-50, 'Sound');
            this._btnSound.setInteractive({cursor: 'pointer'});
            setupButtonTextureBased(this._btnSound, 'Sound','Sound HOVER EFFECT');
            this._btnClose = new Phaser.GameObjects.Image(this.scene, 1025-105, 100-50,'x Button');
            this._btnClose.setInteractive({cursor: 'pointer'});
            setupButtonTextureBased(this._btnClose, 'x Button','x Button HOVER EFFECT');

            this.gameplayContainer = new Phaser.GameObjects.Container(this.scene);
            this.addAt(this.gameplayContainer, 0);

            this.targetLetterLabel = new Phaser.GameObjects.Image(this.scene, 590, 90, null);
            this.targetLetterLabel.tint = Math.round(0x000000 * 0.9);

            this.doorsWindow = new DoorsWindow(this.scene);

            this.gameplayContainer.add([
                this._gameStage,
                this.doorsWindow,
                this._btnSound,
                this._btnClose,
                this.targetLetterLabel
            ]);

            this.gameplay.reset();
            this.createGrid();
            this.createCrescentMoons();
            this.createInput();
            this.showOutGrid();
            this.gameplay.setupCallbacks(this.showCompleteWindow, this.showLoseWindow);
        }

        public showOutGrid():void {
            this.setInputEnabled(false);

            let delay:number = 700;
            for (let i:number = 0; i < this.rows; i++) {
                for (let j:number = 0; j < this.cols; j++) {
                    let c = this.grid[i][j];
                    c.setScale(0);
                    this.scene.tweens.add({
                        targets: c,
                        "scale": 1,
                        duration: 300,
                        delay: delay
                    });
                }
            }

            delayedCall(delay, ()=>{
                this.scene.sound.add("open").play();
            });

            this.targetLetterLabel.visible = false;
            this.resetCrescentMoons();
            this.randomizeGrid();

            delayedCall(1200, ()=>{
                this.targetLetterLabel.visible = true;
                this.updateClickLetterTargetLabel();

                if (this.gameplay.isNewRound()) {
                    if (!this.gameplay.isRoundsComplete()) {
                        this.playCorrectAudio();
                        delayedCall(2000, ()=>{
                            this.setInputEnabled(true);
                        });
                    }
                } else {
                    this.setInputEnabled(true);
                }
            });
        }

        private showInGrid(showOut:boolean):void {
            this.setInputEnabled(false);

            let delay:number = 700;
            for (let i:number = 0; i < this.rows; i++) {
                for (let j:number = 0; j < this.cols; j++) {
                    let c = this.grid[i][j];
                    this.scene.tweens.add({
                        targets: c,
                        "scale": 0,
                        duration: 300,
                        delay: delay,
                        onComplete:()=>{
                            c["bg"].setTexture('rr_def');
                        }
                    });
                }
            }

            delayedCall(delay, ()=>{
                this.scene.sound.add("close").play();
            });

            if (showOut) {
                delayedCall(1000, ()=>{
                    this.showOutGrid();
                });
            }
        }

        public createInput(): void {
            for (let i:number = 0; i < this.rows; i++) {
                for (let j:number = 0; j < this.cols; j++) {
                    let c = this.grid[i][j];
                    c["bg"].on('pointerup', () => {
                        this.playBtnClickAnim(c);
                        c["bg"].disableInteractive();

                        let l = c["letter"];
                        if (l && l.texture.key == this.gameplay.getCorrectLetterName()) {
                            c["bg"].setTexture('rr_active');
                            let completed:boolean = this.onCorrectAnswer();
                            if (!completed) {
                                if (this.gameplay.isNewRound()) {
                                    this.showInGrid(true);
                                }
                            } else {
                                this.showInGrid(false);
                            }
                        } else {
                            c["bg"].setTexture('rr_wrong');
                            let lost:boolean = this.onWrongAnswer();
                            if (!lost) {
                                if (this.gameplay.isNewRound()) {
                                    this.showInGrid(true);
                                }
                            } else {
                                this.showInGrid(false);
                            }
                        }
                    });
                }
            }



            this._btnSound.on('pointerup', () => {
                this.playBtnClickAnim(this._btnSound);

                this.onSoundClick();
            });

            this._btnClose.on('pointerup', () => {
                this.playBtnClickAnim(this._btnClose);

                this.onCloseClick();
            });
        }

        public createGrid():void {
            let startX:number = 355;
            let startY:number = 215;
            let dx:number = 76;
            let dy:number = 71;
            this.grid = [];
            for (let i:number = 0; i < this.rows; i++) {
                let arr = [];
                for (let j:number = 0; j < this.cols; j++) {
                    let c:Phaser.GameObjects.Container = new Phaser.GameObjects.Container(this.scene, startX+i*dx, startY+j*dy);
                    this.gameplayContainer.add(c);
                    c["bg"] = new Phaser.GameObjects.Image(this.scene, 0, 0, 'rr_def');
                    c.add(c["bg"]);
                    c["letter"] = new Phaser.GameObjects.Image(this.scene, 0, 0, null);
                    c["letter"]["rectContainer"] = c;
                    c.add(c["letter"]);
                    c["letter"].tint = Math.round(0x000000 * 0.9);
                    arr.push(c);
                }
                this.grid.push(arr);
            }
        }

        private randomizeGrid():void {
            let gridLettersNames:string[] = this.gameplay.gridLettersNames.slice();
            for (let i:number = 0; i < this.rows; i++) {
                for (let j:number = 0; j < this.cols; j++) {
                    let l:Phaser.GameObjects.Image = this.grid[i][j]["letter"];
                    let rnd:any = Phaser.Utils.Array.RemoveRandomElement(gridLettersNames);
                    l.setTexture(rnd);
                }
            }
        }

        public updateClickLetterTargetLabel():void {
            this.targetLetterLabel.setTexture(this.gameplay.getCorrectLetterName());
        }

        public createCrescentMoons():void {
            this.crescentMoons = [];
            let dy:number = 61;
            for (let i:number = 0; i < this.gameplay.choicesNumPerRound; i++) {
                let cm = new Phaser.GameObjects.Image(this.scene, 179, 261 + i * dy, 'crescent_moon_def');
                this.crescentMoons.push(cm);
                this.gameplayContainer.add(cm);
            }
        }

        public resetCrescentMoons():void {
            for (let i:number = 0; i < this.crescentMoons.length; i++) {
                this.setMoonsActive(i, false);
            }
        }

        public setMoonsActive(index:number, active:boolean):void {
            this.crescentMoons[index].setTexture(active ? 'crescent_moon_active' : 'crescent_moon_def')
        }

        private soundGooseYes = null;
        public onCorrectAnswer(): boolean {
            this.setMoonsActive(this.gameplay.correctAnswersCountThisRound, true);

            let completed:boolean = this.gameplay.onCorrectAnswer();

            this.soundGooseYes = this.scene.sound.add("Correct click");
            this.soundGooseYes.play();

            return completed;
        }

        private soundGooseNo = null;
        public onWrongAnswer(): boolean {
            let lost:boolean = this.gameplay.onWrongAnswer();

            this.soundGooseNo = this.scene.sound.add("Incorrect click");
            this.soundGooseNo.play();

            return lost;
        }

        private correctAudio = null;
        private playCorrectAudio():void {
            if (this.correctAudio) {
                this.correctAudio.stop();
            }
            try {
                this.correctAudio = this.scene.sound.add('translate_click_on');
                this.correctAudio.play();
                if (this.areYouSureWindow && this.areYouSureWindow.parentContainer == this) {
                    this.correctAudio.pause();
                }
                delayedCall(750, ()=>{
                    this.correctAudio = this.scene.sound.add(this.gameplay.getCorrectAudioKey());
                    this.correctAudio.play();
                    if (this.areYouSureWindow && this.areYouSureWindow.parentContainer == this) {
                        this.correctAudio.pause();
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }

        public onSoundClick(): void {
            this.playCorrectAudio();
        }

        public onCloseClick(): void {
            this.showAreYouSurePage();
            this.scene.sound.add('warning page pop up sfx').play();
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
                this.wfsnd = this.scene.sound.add("Unlock the Gate Open the mosque gate by entering the passcode.");
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

            delayedCall(1500, () => {
                this.bgMusic.stop();

                this.doorsWindow.open(()=>{
                    this.scene.sound.add("Call to prayer").play();

                    delayedCall(6000, () => {
                        setPageBackground("bg-blue");

                        this.add(completeWindow);
                        completeWindow.show(score, starScore);
                    });
                });
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
                for (let i:number = 0; i < this.rows; i++) {
                    for (let j:number = 0; j < this.cols; j++) {
                        this.grid[i][j]["bg"].setInteractive({cursor: 'pointer'});
                    }
                }
            } else {
                for (let i:number = 0; i < this.rows; i++) {
                    for (let j:number = 0; j < this.cols; j++) {
                        this.grid[i][j]["bg"].disableInteractive();
                    }
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