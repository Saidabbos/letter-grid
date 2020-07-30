var sh;
(function (sh) {
    class App extends Phaser.Game {
        constructor() {
            let config = {
                type: Phaser.AUTO,
                width: App.CANVAS_WIDTH,
                height: App.CANVAS_HEIGHT,
                scale: {
                    mode: FitScaleManager.detectBestScaleMode(),
                    autoCenter: Phaser.Scale.CENTER_BOTH
                },
                transparent: true,
                scene: {
                    create: () => {
                        this.scene.add('Boot', sh.scene.Boot, true);
                    }
                }
            };
            super(config);
        }
    }
    App.CANVAS_WIDTH = 980;
    App.CANVAS_HEIGHT = 600;
    sh.App = App;
})(sh || (sh = {}));
let game;
window.onload = () => {
    game = new sh.App();
};
let delayedCalls = [];
function delayedCall(delay, callback, args, callbackScope) {
    let scene = game.scene.getAt(0);
    if (scene) {
        let dc = scene.time.delayedCall(delay, callback, args, callbackScope);
        delayedCalls.push(dc);
        return dc;
    }
    let t = setTimeout(callback, delay);
    delayedCalls.push(t);
    return t;
}
function destroyAllDelayedCalls() {
    for (let dc of delayedCalls) {
        if (dc instanceof Phaser.Time.TimerEvent) {
            dc.remove(false);
        }
        else {
            clearTimeout(dc);
        }
    }
    delayedCalls = [];
}
function setPageBackground(bg) {
    document.querySelector("html").style.backgroundImage = "url(assets/imgs/" + bg + ".jpg)";
}
function setupButton(btn, frame) {
    btn.on('pointerdown', () => { btn.setFrame(frame + '_hover' + '0000'); });
    btn.on('pointerover', () => { btn.setFrame(frame + '_hover' + '0000'); game.scene.getAt(0).sound.add("button hover").play(); });
    btn.on('pointerout', () => { btn.setFrame(frame + '0000'); });
    btn.on('pointerup', () => { btn.setFrame(frame + '0000'); game.scene.getAt(0).sound.add('activity selection - button selection').play(); });
}
function setupButtonTextureBased(btn, texture, hoverTexture) {
    btn.on('pointerdown', () => { btn.setTexture(hoverTexture); });
    btn.on('pointerover', () => { btn.setTexture(hoverTexture); game.scene.getAt(0).sound.add("button hover").play(); });
    btn.on('pointerout', () => { btn.setTexture(texture); });
    btn.on('pointerup', () => { btn.setTexture(texture); game.scene.getAt(0).sound.add('activity selection - button selection').play(); });
}
/**
 * @author Roman Parada
 * This class is created to fix overlapping of bottom part of canvas by navigation bar in iOS.
 * It make a delayed resize of the canvas (like Phaser-3 FIT methods does) and it overrides Phaser-3 input window to Phaser-3 core transform methods
 *
 * How to use:
 * Just call the code line below in Boot scene's init() method of your project:
 * new FitScaleManager(this.game).setup();
 */
class FitScaleManager {
    constructor(game) {
        this.doResize = () => {
            let scale = this.calculateScale();
            let newCanvasWidth = this.phaserScaleManager.width * scale;
            let newCanvasHeight = this.phaserScaleManager.height * scale;
            this.canvasStyle.width = newCanvasWidth + 'px';
            this.canvasStyle.height = newCanvasHeight + 'px';
            this.canvasStyle.marginLeft = (window.innerWidth - newCanvasWidth) / 2 + 'px';
            this.canvasStyle.marginTop = (window.innerHeight - newCanvasHeight) / 2 + 'px';
        };
        this.game = game;
        this.canvasStyle = this.game.canvas.style;
        this.phaserScaleManager = this.game.scale;
    }
    static detectBestScaleMode() {
        let iOS = /iPad|iPhone|iPod/.test(navigator.platform || "");
        let isAndroid = window.navigator.userAgent.toLowerCase().indexOf("android") > -1;
        return iOS || isAndroid ? Phaser.Scale.FIT : Phaser.Scale.NONE;
    }
    ;
    /**
     * Just call this method once in Boot scene's init() method
     */
    setup() {
        this.phaserScaleManager.addListener(Phaser.Scale.Events.RESIZE, this.onResize, this);
        this.overridePhaserTransformMethods();
        this.onResize();
    }
    calculateScale() {
        if (game.scale.scaleMode == Phaser.Scale.NONE)
            return 1;
        return Math.min(window.innerWidth / this.phaserScaleManager.width, window.innerHeight / this.phaserScaleManager.height);
    }
    overridePhaserTransformMethods() {
        this.game.scale.transformX = (pageX) => {
            return (pageX - parseInt(this.canvasStyle.marginLeft.split("px")[0])) / this.calculateScale();
        };
        this.game.scale.transformY = (pageY) => {
            return (pageY - parseInt(this.canvasStyle.marginTop.split("px")[0])) / this.calculateScale();
        };
    }
    onResize() {
        setTimeout(this.doResize, FitScaleManager.RESIZE_DELAY);
    }
}
FitScaleManager.RESIZE_DELAY = 500;
var sh;
(function (sh) {
    var core;
    (function (core) {
        class Gameplay {
            constructor() {
                this.allLettersNames = ["أ", "ث", "ج", "د ", "ش", "ص", "ظ", "ع", "غ", "ق", "ك", "م", "ه", "و", "ي"];
                this.currentRound = 0;
                this.currentLetter = 0;
                this.correctAnswersCount = 0;
                this.wrongAnswersCount = 0;
                this.reset();
                let json = game.cache.json.get('gameplay');
                this.letters = json["letters"];
            }
            setupCallbacks(onComplete, onLose) {
                this.onComplete = onComplete;
                this.onLose = onLose;
            }
            onLetterChosen() {
                if (this.isNewRound()) {
                    this.currentRound++;
                    if (this.currentRound >= 3) {
                        this.onComplete(this.correctAnswersCount, this.correctAnswersCount);
                        return true;
                    }
                    else {
                        this.nextLetter();
                    }
                }
                return false;
            }
            nextLetter() {
                if (this.currentLetter == this.letters.length - 1) {
                    this.currentLetter = 0;
                }
                else {
                    this.currentLetter++;
                }
            }
            getCorrectLetterName() {
                return this.letters[this.currentLetter]['correctLetterName'];
            }
            getCorrectAudioKey() {
                return this.letters[this.currentLetter]['correctAudioKey'];
            }
            onCorrectAnswer() {
                this.correctAnswersCount++;
                return this.onLetterChosen();
            }
            onWrongAnswer() {
                this.wrongAnswersCount++;
                if (this.wrongAnswersCount >= 4) {
                    this.onLose(this.correctAnswersCount, this.correctAnswersCount);
                    return true;
                }
                else {
                    this.onLetterChosen();
                }
                return false;
            }
            getCurrentTotalAnswersCount() {
                return this.correctAnswersCount + this.wrongAnswersCount;
            }
            isNewRound() {
                return this.getCurrentTotalAnswersCount() % 5 == 0;
            }
            isRoundsComplete() {
                return this.getCurrentTotalAnswersCount() / 5 >= 3;
            }
            reset() {
                this.currentRound = 0;
                this.currentLetter = 0;
                this.correctAnswersCount = 0;
                this.wrongAnswersCount = 0;
            }
        }
        core.Gameplay = Gameplay;
    })(core = sh.core || (sh.core = {}));
})(sh || (sh = {}));
var sh;
(function (sh) {
    var scene;
    (function (scene) {
        class Boot extends Phaser.Scene {
            init() {
                new FitScaleManager(this.game).setup();
            }
            create() {
                game.scene.remove('Boot');
                game.scene.add('Preloader', sh.scene.Preloader, true);
            }
        }
        scene.Boot = Boot;
    })(scene = sh.scene || (sh.scene = {}));
})(sh || (sh = {}));
var sh;
(function (sh) {
    var scene;
    (function (scene) {
        var Gameplay = sh.core.Gameplay;
        class MainScene extends Phaser.Scene {
            create() {
                this.gameplay = new Gameplay();
                this.gameplayScreen = new sh.screen.GameplayScreen(this, this.gameplay);
                this.children.add(this.gameplayScreen);
                this.gameplayScreen.showInstructionPage();
            }
        }
        scene.MainScene = MainScene;
    })(scene = sh.scene || (sh.scene = {}));
})(sh || (sh = {}));
var sh;
(function (sh) {
    var scene;
    (function (scene) {
        class Preloader extends Phaser.Scene {
            preload() {
            }
            create() {
                this.load.json('gameplay', 'assets/json/gameplay.json');
                this.load.pack('preloader', 'assets/pack.json');
                this.load.on('progress', (value) => {
                }, this);
                this.load.on('complete', () => {
                    this.nextScene();
                });
                this.load.start();
            }
            nextScene() {
                game.scene.remove('Preloader');
                game.scene.add('ScreenMain', sh.scene.MainScene, true);
            }
        }
        scene.Preloader = Preloader;
    })(scene = sh.scene || (sh.scene = {}));
})(sh || (sh = {}));
var sh;
(function (sh) {
    var screen;
    (function (screen) {
        class AreYouSureWindow extends Phaser.GameObjects.Container {
            constructor(scene, onYes, onNo) {
                super(scene);
                this._areYouSurePage = new Phaser.GameObjects.Image(this.scene, -105, 0 - 48, 'Exit warning');
                this._areYouSurePage.setOrigin(0, 0);
                this._areYouSurePage.setInteractive();
                this._btnSureYes = new Phaser.GameObjects.Image(this.scene, game.scale.width / 2 - 95, 485 - 50, 'btnYES1');
                this._btnSureYes.setInteractive({ cursor: 'pointer' });
                this._btnSureYes.once('pointerup', onYes);
                setupButtonTextureBased(this._btnSureYes, 'btnYES1', 'btnYES2');
                this._btnSureNo = new Phaser.GameObjects.Image(this.scene, game.scale.width / 2 + 95, 485 - 50, 'btnNO1');
                this._btnSureNo.setInteractive({ cursor: 'pointer' });
                this._btnSureNo.once('pointerup', onNo);
                setupButtonTextureBased(this._btnSureNo, 'btnNO1', 'btnNO2');
                this.add(this._areYouSurePage);
                this.add(this._btnSureYes);
                this.add(this._btnSureNo);
            }
        }
        screen.AreYouSureWindow = AreYouSureWindow;
    })(screen = sh.screen || (sh.screen = {}));
})(sh || (sh = {}));
var sh;
(function (sh) {
    var screen;
    (function (screen) {
        class CompleteWindow extends Phaser.GameObjects.Container {
            constructor(scene, onBack, onReplay, onNext) {
                super(scene);
                this.music = null;
                this.setPosition(-104.5, -48);
                this._bgComplete = new Phaser.GameObjects.Image(this.scene, 0, 0, 'Completion page LATEST UPDATED');
                this._bgComplete.setOrigin(0, 0);
                this._bgComplete.setInteractive();
                this._cup = new Phaser.GameObjects.Image(this.scene, 400, 410, 'Trophy');
                this._btnBack = new Phaser.GameObjects.Image(this.scene, 570, 570, 'btnBACK1');
                this._btnReplay = new Phaser.GameObjects.Image(this.scene, 720, 570, 'btnReplay1');
                this._btnNext = new Phaser.GameObjects.Image(this.scene, 870, 570, 'btnNEXT1');
                let _CollectedPoints = new Phaser.GameObjects.Image(this.scene, 620, 440, 'Collected Points');
                this.totalScoreTxt = this.scene.add.text(845, 352, "", {
                    "fontFamily": "Kids Rock Demo",
                    "fontSize": 35,
                    "color": "#F49F1C",
                    "align": 'center',
                    'stroke': '#70451A',
                    'strokeThickness': 6
                });
                this.totalScoreTxt.setOrigin(0.5, 0.5);
                let grd = this.totalScoreTxt.context.createLinearGradient(0, 0, 0, this.totalScoreTxt.height);
                grd.addColorStop(0, '#FFFF00');
                grd.addColorStop(1, '#C17316');
                this.totalScoreTxt.setFill(grd);
                this.starScoreTxt = this.scene.add.text(648, 433, "", {
                    "fontFamily": "Kids Rock Demo",
                    "fontSize": 24,
                    "color": "#FFFFFF",
                    "align": 'center'
                });
                this.starScoreTxt.setOrigin(0.5, 0.5);
                this.add([
                    this._bgComplete,
                    _CollectedPoints,
                    this._cup,
                    this._btnBack,
                    this._btnReplay,
                    this._btnNext,
                    this.totalScoreTxt,
                    this.starScoreTxt
                ]);
                this._btnBack.setInteractive({ cursor: 'pointer' });
                this._btnBack.on('pointerup', () => {
                    onBack(this._btnBack);
                    // if (this.music) {
                    //     this.music.stop();
                    // }
                });
                setupButtonTextureBased(this._btnBack, 'btnBACK1', 'btnBACK2');
                this._btnReplay.setInteractive({ cursor: 'pointer' });
                this._btnReplay.once('pointerup', () => {
                    onReplay(this._btnReplay);
                    if (this.music) {
                        this.music.stop();
                    }
                });
                setupButtonTextureBased(this._btnReplay, 'btnReplay1', 'btnReplay2');
                this._btnNext.setInteractive({ cursor: 'pointer' });
                this._btnNext.on('pointerup', () => {
                    onNext(this._btnNext);
                    // if (this.music) {
                    //     this.music.stop();
                    // }
                });
                setupButtonTextureBased(this._btnNext, 'btnNEXT1', 'btnNEXT2');
            }
            show(score, starScore) {
                this._cup.scale = 1.25;
                this.scene.tweens.add({
                    targets: this._cup,
                    "scale": 1,
                    duration: 500,
                    ease: Phaser.Math.Easing.Back.Out
                });
                this.totalScoreTxt.text = String(score);
                this.starScoreTxt.text = String(starScore);
                // let music = this.scene.sound.add("viktory");
                this.music = this.scene.sound.add("Activity completion fantastic");
                this.music.play();
            }
        }
        screen.CompleteWindow = CompleteWindow;
    })(screen = sh.screen || (sh.screen = {}));
})(sh || (sh = {}));
var sh;
(function (sh) {
    var screen;
    (function (screen) {
        class GameplayScreen extends Phaser.GameObjects.Container {
            constructor(scene, gameplay) {
                super(scene);
                this.bgMusic = null;
                this.soundGooseYes = null;
                this.soundGooseNo = null;
                this.correctAudio = null;
                this.wfsnd = null;
                this.showCompleteWindow = (score, starScore) => {
                    let completeWindow = new screen.CompleteWindow(this.scene, (target) => {
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
                this.showLoseWindow = (score, starScore) => {
                    let tryAgainWindow = new screen.TryAgainWindow(this.scene, (target) => {
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
                this.gameplay = gameplay;
            }
            showGameplay() {
                setPageBackground("bg-australia");
                this.bgMusic = this.scene.sound.add("bg_sound");
                this.bgMusic.play();
                this.bgMusic.loop = true;
                this.gameplay.reset();
                this._gameStage = new Phaser.GameObjects.Image(this.scene, game.scale.width / 2, game.scale.height / 2, null);
                this._gameStage.setOrigin(0.488, 0.476);
                this._gameStage.setInteractive();
                this._btnSound = new Phaser.GameObjects.Image(this.scene, 160 - 105, 100 - 50, 'Sound');
                this._btnSound.setInteractive({ cursor: 'pointer' });
                setupButtonTextureBased(this._btnSound, 'Sound', 'Sound HOVER EFFECT');
                this._btnClose = new Phaser.GameObjects.Image(this.scene, 1025 - 105, 100 - 50, 'x Button');
                this._btnClose.setInteractive({ cursor: 'pointer' });
                setupButtonTextureBased(this._btnClose, 'x Button', 'x Button HOVER EFFECT');
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
            createInput() {
                this._btnSound.on('pointerup', () => {
                    this.playBtnClickAnim(this._btnSound);
                    this.onSoundClick();
                });
                this._btnClose.on('pointerup', () => {
                    this.playBtnClickAnim(this._btnClose);
                    this.onCloseClick();
                });
            }
            onCorrectAnswer() {
                let completed = this.gameplay.onCorrectAnswer();
                this.soundGooseYes = this.scene.sound.add("Goose Yes");
                this.soundGooseYes.play();
                return completed;
            }
            onWrongAnswer() {
                let lost = this.gameplay.onWrongAnswer();
                this.soundGooseNo = this.scene.sound.add("Goose no");
                this.soundGooseNo.play();
                return lost;
            }
            playCorrectAudio() {
                if (this.correctAudio) {
                    this.correctAudio.stop();
                }
                this.correctAudio = this.scene.sound.add(this.gameplay.getCorrectAudioKey());
                this.correctAudio.play();
                if (this.areYouSureWindow && this.areYouSureWindow.parentContainer == this) {
                    this.correctAudio.pause();
                }
            }
            onSoundClick() {
                this.playCorrectAudio();
            }
            onCloseClick() {
                this.showAreYouSurePage();
            }
            playBtnClickAnim(target) {
                target.scaleX = target.scaleY = 1;
                this.scene.tweens.add({
                    targets: target,
                    "scaleX": 0.9,
                    "scaleY": 0.9,
                    duration: 100,
                    yoyo: true
                });
            }
            showInstructionPage() {
                setPageBackground("bg-blue");
                let playInstructionSound = () => {
                    if (this.wfsnd) {
                        this.wfsnd.stop();
                    }
                    this.wfsnd = this.scene.sound.add("Welcome Find the sound");
                    this.wfsnd.play();
                };
                this.instructionPage = new screen.InstructionPage(this.scene, (target) => {
                    this.playBtnClickAnim(target);
                    this.remove(this.instructionPage);
                    this.showGameplay();
                    if (this.wfsnd) {
                        this.wfsnd.stop();
                    }
                }, (target) => {
                    this.playBtnClickAnim(target);
                    playInstructionSound();
                });
                this.add(this.instructionPage);
                playInstructionSound();
            }
            showAreYouSurePage() {
                setPageBackground("bg-blue");
                this.pauseSounds();
                this.areYouSureWindow = new screen.AreYouSureWindow(this.scene, () => {
                    this.remove(this.areYouSureWindow);
                    this.destroyGameplay();
                    this.showInstructionPage();
                }, () => {
                    this.remove(this.areYouSureWindow);
                    this.unpauseSounds();
                    setPageBackground("bg-australia");
                });
                this.add(this.areYouSureWindow);
            }
            setInputEnabled(enabled) {
                if (enabled) {
                    for (let hc of this.hexagons) {
                        hc["bg"].setInteractive({ cursor: 'pointer' });
                    }
                }
                else {
                    for (let hc of this.hexagons) {
                        hc["bg"].disableInteractive();
                    }
                }
            }
            pauseSounds() {
                if (this.soundGooseYes)
                    this.soundGooseYes.stop();
                if (this.soundGooseNo)
                    this.soundGooseNo.stop();
                if (this.correctAudio)
                    this.correctAudio.pause();
                if (this.bgMusic)
                    this.bgMusic.pause();
            }
            unpauseSounds() {
                if (this.correctAudio)
                    this.correctAudio.resume();
                if (this.bgMusic)
                    this.bgMusic.resume();
            }
            destroyGameplay() {
                this.setInputEnabled(false);
                this.remove(this.gameplayContainer);
                destroyAllDelayedCalls();
            }
        }
        screen.GameplayScreen = GameplayScreen;
    })(screen = sh.screen || (sh.screen = {}));
})(sh || (sh = {}));
var sh;
(function (sh) {
    var screen;
    (function (screen) {
        class InstructionPage extends Phaser.GameObjects.Container {
            constructor(scene, onPlayClick, onSndClick) {
                super(scene);
                this._instructionPage = new Phaser.GameObjects.Image(this.scene, 0 - 105, 0 - 48, 'Instructions page  ALL ACTIVITY  TITLEs');
                this._instructionPage.setOrigin(0, 0);
                this._instructionPage.setInteractive();
                this._instructionPageTitle = new Phaser.GameObjects.Image(this.scene, 495, 105, 'welcome');
                this._btnPlay = new Phaser.GameObjects.Image(this.scene, game.scale.width / 2, 480 - 50, 'btnPLAY1');
                this._btnPlay.setInteractive({ cursor: 'pointer' });
                this._btnPlay.once('pointerup', onPlayClick);
                setupButtonTextureBased(this._btnPlay, 'btnPLAY1', 'btnPLAY2');
                this.instrTxt = this.scene.add.text(game.scale.width / 2, game.scale.height / 2, "Find the sound.", {
                    "fontFamily": "Kids Rock Demo",
                    "fontSize": 37,
                    "color": "#A25122",
                    "align": 'center',
                    'stroke': '#FFFFFF',
                    'strokeThickness': 6,
                });
                this.instrTxt.setOrigin(0.5, 0.5);
                this._btnSoundInstruction = new Phaser.GameObjects.Image(this.scene, 800 - 105, 156 - 50, 'Sound');
                this._btnSoundInstruction.setInteractive({ cursor: 'pointer' });
                this._btnSoundInstruction.on('pointerup', onSndClick);
                setupButtonTextureBased(this._btnSoundInstruction, 'Sound', 'Sound HOVER EFFECT');
                this.add(this._instructionPage);
                this.add(this._instructionPageTitle);
                this.add(this.instrTxt);
                this.add(this._btnPlay);
                this.add(this._btnSoundInstruction);
            }
        }
        screen.InstructionPage = InstructionPage;
    })(screen = sh.screen || (sh.screen = {}));
})(sh || (sh = {}));
var sh;
(function (sh) {
    var screen;
    (function (screen) {
        class TryAgainWindow extends Phaser.GameObjects.Container {
            constructor(scene, onBack, onReplay) {
                super(scene);
                this.music = null;
                this.setPosition(-106, -48);
                this._bg = new Phaser.GameObjects.Image(this.scene, 0, 0, 'Try again page');
                this._bg.setOrigin(0, 0);
                this._bg.setInteractive();
                this._star = new Phaser.GameObjects.Image(this.scene, 400, 415, 'Break Star');
                this._btnBack = new Phaser.GameObjects.Image(this.scene, 600, 580, 'btnBACK1');
                this._btnReplay = new Phaser.GameObjects.Image(this.scene, 765, 580, 'btnReplay1');
                this.totalScoreTxt = this.scene.add.text(830, 355, "", {
                    "fontFamily": "Kids Rock Demo",
                    "fontSize": 35,
                    "color": "#F49F1C",
                    "align": 'center',
                    'stroke': '#70451A',
                    'strokeThickness': 6
                });
                this.totalScoreTxt.setOrigin(0.5, 0.5);
                let grd = this.totalScoreTxt.context.createLinearGradient(0, 0, 0, this.totalScoreTxt.height);
                grd.addColorStop(0, '#FFFF00');
                grd.addColorStop(1, '#C17316');
                this.totalScoreTxt.setFill(grd);
                this.starScoreTxt = this.scene.add.text(635, 431, "", {
                    "fontFamily": "Kids Rock Demo",
                    "fontSize": 24,
                    "color": "#FFFFFF",
                    "align": 'center'
                });
                this.starScoreTxt.setOrigin(0.5, 0.5);
                this.add([
                    this._bg,
                    this._star,
                    this._btnBack,
                    this._btnReplay,
                    this.totalScoreTxt,
                    this.starScoreTxt
                ]);
                this._btnBack.setInteractive({ cursor: 'pointer' });
                this._btnBack.on('pointerup', () => {
                    onBack(this._btnBack);
                    // if (this.music) {
                    //     this.music.stop();
                    // }
                });
                setupButtonTextureBased(this._btnBack, 'btnBACK1', 'btnBACK2');
                this._btnReplay.setInteractive({ cursor: 'pointer' });
                this._btnReplay.once('pointerup', () => {
                    onReplay(this._btnReplay);
                    if (this.music) {
                        this.music.stop();
                    }
                });
                setupButtonTextureBased(this._btnReplay, 'btnReplay1', 'btnReplay2');
            }
            show(score, starScore) {
                this._star.scale = 1.25;
                this.scene.tweens.add({
                    targets: this._star,
                    "scale": 1,
                    duration: 500,
                    ease: Phaser.Math.Easing.Back.Out
                });
                this.totalScoreTxt.text = String(score);
                this.starScoreTxt.text = String(starScore);
                this.music = this.scene.sound.add("Fail - close one");
                this.music.play();
            }
        }
        screen.TryAgainWindow = TryAgainWindow;
    })(screen = sh.screen || (sh.screen = {}));
})(sh || (sh = {}));
//# sourceMappingURL=main.js.map