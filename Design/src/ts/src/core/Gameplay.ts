namespace sh.core {
    export class Gameplay {

        public readonly allLettersNames:string[] = ["أ","ث","ج","د ","ش","ص","ظ","ع","غ","ق","ك","م","ه","و","ي"];

        private currentRound:number = 0;
        private currentLetter:number = 0;
        private letters:object[];

        private correctAnswersCount: number = 0;
        private wrongAnswersCount: number = 0;

        private onComplete:(score:number, starScore:number)=>void;
        private onLose:(score:number, starScore:number)=>void;

        constructor() {
            this.reset();
            let json = game.cache.json.get('gameplay');
            this.letters = json["letters"];
        }

        public setupCallbacks(onComplete:(score:number, starScore:number)=>void, onLose:(score:number, starScore:number)=>void):void {
            this.onComplete = onComplete;
            this.onLose = onLose;
        }

        public onLetterChosen():boolean {
            if (this.isNewRound()) {
                this.currentRound++;
                if (this.currentRound >= 3) {
                    this.onComplete(this.correctAnswersCount, this.correctAnswersCount);
                    return true;
                } else {
                    this.nextLetter();
                }
            }
            return false;
        }

        public nextLetter():void {
            if (this.currentLetter == this.letters.length - 1) {
                this.currentLetter = 0;
            } else {
                this.currentLetter++;
            }
        }

        public getCorrectLetterName():string {
            return this.letters[this.currentLetter]['correctLetterName'];
        }

        public getCorrectAudioKey():string {
            return this.letters[this.currentLetter]['correctAudioKey'];
        }

        public onCorrectAnswer(): boolean {
            this.correctAnswersCount++;

            return this.onLetterChosen();
        }

        public onWrongAnswer(): boolean {
            this.wrongAnswersCount++;

            if (this.wrongAnswersCount >= 4) {
                this.onLose(this.correctAnswersCount, this.correctAnswersCount);
                return true;
            } else {
                this.onLetterChosen();
            }
            return false;
        }

        public getCurrentTotalAnswersCount(): number {
            return this.correctAnswersCount + this.wrongAnswersCount;
        }

        public isNewRound():boolean {
            return this.getCurrentTotalAnswersCount() % 5 == 0;
        }

        public isRoundsComplete():boolean {
            return this.getCurrentTotalAnswersCount() / 5 >= 3;
        }

        public reset():void {
            this.currentRound = 0;
            this.currentLetter = 0;
            this.correctAnswersCount = 0;
            this.wrongAnswersCount = 0;
        }
    }
}