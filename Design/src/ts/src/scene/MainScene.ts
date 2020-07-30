namespace sh.scene {

    import Gameplay = sh.core.Gameplay;
    import GameplayScreen = sh.screen.GameplayScreen;

    export class MainScene extends Phaser.Scene {

        private gameplay:Gameplay;
        private gameplayScreen:GameplayScreen;

        public create():void {
            this.gameplay = new Gameplay();

            this.gameplayScreen = new sh.screen.GameplayScreen(this, this.gameplay);
            this.children.add(this.gameplayScreen);
            this.gameplayScreen.showInstructionPage();
        }
    }
}