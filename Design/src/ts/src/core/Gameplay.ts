namespace sh.core {
    export class Gameplay {

        private totalLettersCount:number = 25;

        public readonly totalRoundsNum:number = 2;
        public readonly failsNumToLose:number = 3;
        public readonly choicesNumPerRound:number = 5;

        // public readonly allLettersNames:string[] = ["أ","ث","ج","د ","ش","ص","ظ","ع","غ","ق","ك","م","ه","و","ي"];

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

        public onLetterChosen():boolean {
            if (this.isNewRound()) {
                this.currentRound++;
                if (this.currentRound >= this.totalRoundsNum) {
                    this.onComplete(this.correctAnswersCount, this.correctAnswersCount);
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
            return this.getCurrentTotalAnswersCount() % this.choicesNumPerRound == 0;
        }

        public isRoundsComplete():boolean {
            return this.getCurrentTotalAnswersCount() / this.choicesNumPerRound >= this.totalRoundsNum;
        }

        private randomizeGrid():void {
            let _letters:object[] = this.letters.slice();
            this.gridLettersNames = [];
            let correctLetterName = this.getCorrectLetterName();
            for (let k:number = 0; k < this.totalLettersCount / this.choicesNumPerRound - 1; k++) {
                let rndLetterName = Phaser.Utils.Array.RemoveRandomElement(_letters);
                for (let i:number = 0; i < this.choicesNumPerRound; i++) {
                    this.gridLettersNames.push(rndLetterName['correctLetterName']);
                }
            }
            for (let i:number = 0; i < this.choicesNumPerRound; i++) {
                this.gridLettersNames.push(correctLetterName);
            }
        }

        public reset():void {
            let json = game.cache.json.get('gameplay');
            this.letters = json["letters"].slice();

            let _letters = this.letters.slice();
            this.roundsLetter = [];
            for (let i:number = 0; i < this.totalRoundsNum; i++) {
                this.roundsLetter.push(Phaser.Utils.Array.RemoveRandomElement(_letters));
            }

            this.nextLetter();

            this.currentRound = 0;
            this.correctAnswersCount = 0;
            this.wrongAnswersCount = 0;
            this.correctAnswersCountThisRound = 0;
            this.wrongAnswersCountThisRound = 0;
        }
    }
}