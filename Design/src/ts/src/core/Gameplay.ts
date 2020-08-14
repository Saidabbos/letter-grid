namespace sh.core {
    export class Gameplay {

        private totalLettersCount:number = 25;

        public totalRoundsNum:number = 2;
        public readonly failsNumToLose:number = 3;
        public readonly choicesNumPerRound:number = 5;

        private currentRound:number = 0;
        private currentLetter:object = null;
        private letters:object[];

        private correctAnswersCount: number = 0;
        private wrongAnswersCount: number = 0;
        public correctAnswersCountThisRound: number = 0;
        public wrongAnswersCountThisRound: number = 0;

        private roundsLetter:object[];

        public gridLettersNames:string[];

        private onComplete:(score:number, starScore:number)=>void;
        private onLose:(score:number, starScore:number)=>void;

        constructor() {
        }

        public setupCallbacks(onComplete:(score:number, starScore:number)=>void, onLose:(score:number, starScore:number)=>void):void {
            this.onComplete = onComplete;
            this.onLose = onLose;
        }

        public calculateScore():number {
            return this.choicesNumPerRound * this.totalRoundsNum - this.wrongAnswersCount;
        }

        public onLetterChosen():boolean {
            if (this.correctAnswersCountThisRound == this.choicesNumPerRound) {
                this.currentRound++;
                if (this.currentRound >= this.totalRoundsNum) {
                    let score:number = this.calculateScore();
                    this.onComplete(score, score);
                    return true;
                } else {
                    this.nextLetter();
                }
            }
            return false;
        }

        public nextLetter():void {
            if (this.roundsLetter.length == 0) {
                this.currentLetter = null;
            } else {
                this.currentLetter = Phaser.Utils.Array.RemoveRandomElement(this.roundsLetter);
                this.randomizeGrid();
            }
            this.correctAnswersCountThisRound = 0;
            this.wrongAnswersCountThisRound = 0;
        }

        public getCorrectLetterName():string {
            return this.currentLetter['correctLetterName'];
        }

        public getCorrectAudioKey():string {
            return this.currentLetter['correctAudioKey'];
        }

        public onCorrectAnswer(): boolean {
            this.correctAnswersCount++;
            this.correctAnswersCountThisRound++;

            return this.onLetterChosen();
        }

        public onWrongAnswer(): boolean {
            this.wrongAnswersCount++;
            this.wrongAnswersCountThisRound++;

            if (this.wrongAnswersCountThisRound >= this.failsNumToLose) {
                this.onLose(0, 0);
                return true;
            } else {
                this.onLetterChosen();
            }
            return false;
        }

        public getCurrentTotalAnswersCount(): number {
            return this.correctAnswersCount + this.wrongAnswersCount;
        }

        public getCurrentTotalAnswersCountThisRound(): number {
            return this.correctAnswersCountThisRound + this.wrongAnswersCountThisRound;
        }

        public isNewRound():boolean {
            return this.getCurrentTotalAnswersCountThisRound() == 0;
        }

        public isRoundsComplete():boolean {
            return this.getCurrentTotalAnswersCount() / this.choicesNumPerRound >= this.totalRoundsNum;
        }

        private randomizeGrid():void {
            let _letters:object[] = this.letters.slice();
            this.gridLettersNames = [];
            let correctLetterName = this.getCorrectLetterName();
            for (let i:number = 0; i < this.choicesNumPerRound; i++) {
                this.gridLettersNames.push(correctLetterName);
            }
            let differentLettersNum:number = 10;
            let differentLettersRepeating:number = (this.totalLettersCount - this.choicesNumPerRound) / differentLettersNum;
            for (let i:number = 0; i < differentLettersNum; i++) {
                let rndLetter = Phaser.Utils.Array.RemoveRandomElement(_letters);
                for (let k:number = 0; k < differentLettersRepeating; k++) {
                    this.gridLettersNames.push(rndLetter['correctLetterName']);
                }
            }
        }

        public reset():void {
            let json = game.cache.json.get('gameplay');
            this.letters = json["letters"].slice();
            let correctLetters:string[] = json["correctLetters"];

            this.roundsLetter = [];

            for (let l of correctLetters) {
                for (let i:number = this.letters.length - 1; i >= 0; i--) {
                    if (this.letters[i]['correctLetterName'] == l) {
                        this.roundsLetter.push(this.letters[i]);
                        this.letters.splice(i, 1);
                    }
                }
            }

            this.totalRoundsNum = this.roundsLetter.length;

            this.nextLetter();

            this.currentRound = 0;
            this.correctAnswersCount = 0;
            this.wrongAnswersCount = 0;
            this.correctAnswersCountThisRound = 0;
            this.wrongAnswersCountThisRound = 0;
        }
    }
}