namespace sh {
    export class App extends Phaser.Game {

        public static readonly CANVAS_WIDTH: number = 980;
        public static readonly CANVAS_HEIGHT: number = 600;

        constructor() {
            let config: Phaser.Types.Core.GameConfig = {
                type: Phaser.WEBGL,
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
}

let game: sh.App;
window.onload = () => {
    game = new sh.App();
};

let delayedCalls = [];
function delayedCall(delay: number, callback: Function, args?: any[], callbackScope?: any): Phaser.Time.TimerEvent | number {
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
            (dc as Phaser.Time.TimerEvent).remove(false);
        } else {
            clearTimeout(dc);
        }
    }
    delayedCalls = [];
}

function setPageBackground(bg: string) {
    document.querySelector("html").style.backgroundImage = "url(assets/imgs/" + bg + ".jpg)";
}

function setupButton(btn, frame) {
    btn.on('pointerdown', ()=>{btn.setFrame(frame + '_hover' + '0000')});
    btn.on('pointerover', ()=>{btn.setFrame(frame + '_hover' + '0000');game.scene.getAt(0).sound.add("button hover").play();});
    btn.on('pointerout', ()=>{btn.setFrame(frame + '0000')});
    btn.on('pointerup', ()=>{btn.setFrame(frame + '0000');game.scene.getAt(0).sound.add('activity selection - button selection').play();});
}
function setupButtonTextureBased(btn:Phaser.GameObjects.Image, texture, hoverTexture) {
    btn.on('pointerdown', ()=>{btn.setTexture(hoverTexture)});
    btn.on('pointerover', ()=>{btn.setTexture(hoverTexture);game.scene.getAt(0).sound.add("button hover").play();});
    btn.on('pointerout', ()=>{btn.setTexture(texture)});
    btn.on('pointerup', ()=>{btn.setTexture(texture);game.scene.getAt(0).sound.add('activity selection - button selection').play();});
}