;;function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _createForOfIteratorHelper(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,s=function(){};return{s:s,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:s}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,i=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return a=e.done,e},e:function(e){i=!0,o=e},f:function(){try{a||null==n.return||n.return()}finally{if(i)throw o}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(e){var t=_isNativeReflectConstruct();return function(){var n,r=_getPrototypeOf(e);if(t){var s=_getPrototypeOf(this).constructor;n=Reflect.construct(r,arguments,s)}else n=r.apply(this,arguments);return _possibleConstructorReturn(this,n)}}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var game;!function(e){var t=function(t){_inherits(r,Phaser.Game);var n=_createSuper(r);function r(){var t;_classCallCheck(this,r);var s={type:Phaser.WEBGL,width:r.CANVAS_WIDTH,height:r.CANVAS_HEIGHT,parent:"game-container",dom:{createContainer:!1},scale:{mode:FitScaleManager.detectBestScaleMode(),autoCenter:Phaser.Scale.CENTER_BOTH},transparent:!0,scene:{create:function(){t.scene.add("Boot",e.scene.Boot,!0)}}};return t=n.call(this,s)}return r}();t.CANVAS_WIDTH=980,t.CANVAS_HEIGHT=600,e.App=t}(sh||(sh={})),window.onload=function(){game=new sh.App};var delayedCalls=[];function delayedCall(e,t,n,r){var s=game.scene.getAt(0);if(s){var o=s.time.delayedCall(e,t,n,r);return delayedCalls.push(o),o}var a=setTimeout(t,e);return delayedCalls.push(a),a}function pauseAllDelayedCalls(){var e,t=_createForOfIteratorHelper(delayedCalls);try{for(t.s();!(e=t.n()).done;){var n=e.value;n instanceof Phaser.Time.TimerEvent&&(n.paused=!0)}}catch(e){t.e(e)}finally{t.f()}}function resumeAllDelayedCalls(){var e,t=_createForOfIteratorHelper(delayedCalls);try{for(t.s();!(e=t.n()).done;){var n=e.value;n instanceof Phaser.Time.TimerEvent&&(n.paused=!1)}}catch(e){t.e(e)}finally{t.f()}}function destroyAllDelayedCalls(){var e,t=_createForOfIteratorHelper(delayedCalls);try{for(t.s();!(e=t.n()).done;){var n=e.value;n instanceof Phaser.Time.TimerEvent?n.remove(!1):clearTimeout(n)}}catch(e){t.e(e)}finally{t.f()}delayedCalls=[]}function setPageBackground(e){document.querySelector("html").style.backgroundImage="url(assets/imgs/"+e+".jpg)"}function setupButton(e,t){e.on("pointerdown",(function(){e.setFrame(t+"_hover0000")})),e.on("pointerover",(function(){e.setFrame(t+"_hover0000"),game.scene.getAt(0).sound.add("button hover").play()})),e.on("pointerout",(function(){e.setFrame(t+"0000")})),e.on("pointerup",(function(){e.setFrame(t+"0000"),game.scene.getAt(0).sound.add("activity selection - button selection").play()}))}function setupButtonTextureBased(e,t,n){e.on("pointerdown",(function(){e.setTexture(n)})),e.on("pointerover",(function(){e.setTexture(n),game.scene.getAt(0).sound.add("button hover").play()})),e.on("pointerout",(function(){e.setTexture(t)})),e.on("pointerup",(function(){e.setTexture(t),game.scene.getAt(0).sound.add("activity selection - button selection").play()}))}var sh,FitScaleManager=function(){function e(t){var n=this;_classCallCheck(this,e),this.doResize=function(){var e=n.calculateScale(),t=n.phaserScaleManager.width*e,r=n.phaserScaleManager.height*e;n.canvasStyle.width=t+"px",n.canvasStyle.height=r+"px",n.canvasStyle.marginLeft=(window.innerWidth-t)/2+"px",n.canvasStyle.marginTop=(window.innerHeight-r)/2+"px"},this.game=t,this.canvasStyle=this.game.canvas.style,this.phaserScaleManager=this.game.scale}return _createClass(e,[{key:"setup",value:function(){this.phaserScaleManager.addListener(Phaser.Scale.Events.RESIZE,this.onResize,this),this.overridePhaserTransformMethods(),this.onResize()}},{key:"calculateScale",value:function(){return game.scale.scaleMode==Phaser.Scale.NONE?1:Math.min(window.innerWidth/this.phaserScaleManager.width,window.innerHeight/this.phaserScaleManager.height)}},{key:"overridePhaserTransformMethods",value:function(){var e=this;this.game.scale.transformX=function(t){return(t-parseInt(e.canvasStyle.marginLeft.split("px")[0]))/e.calculateScale()},this.game.scale.transformY=function(t){return(t-parseInt(e.canvasStyle.marginTop.split("px")[0]))/e.calculateScale()}}},{key:"onResize",value:function(){setTimeout(this.doResize,e.RESIZE_DELAY)}}],[{key:"detectBestScaleMode",value:function(){var e=/iPad|iPhone|iPod/.test(navigator.platform||""),t=window.navigator.userAgent.toLowerCase().indexOf("android")>-1;return e||t?Phaser.Scale.FIT:Phaser.Scale.NONE}}]),e}();FitScaleManager.RESIZE_DELAY=500,function(e){!function(e){var t=function(){function e(){_classCallCheck(this,e),this.totalLettersCount=25,this.totalRoundsNum=2,this.failsNumToLose=3,this.choicesNumPerRound=5,this.currentRound=0,this.currentLetter=null,this.correctAnswersCount=0,this.wrongAnswersCount=0,this.correctAnswersCountThisRound=0,this.wrongAnswersCountThisRound=0}return _createClass(e,[{key:"setupCallbacks",value:function(e,t){this.onComplete=e,this.onLose=t}},{key:"calculateScore",value:function(){return this.choicesNumPerRound*this.totalRoundsNum-this.wrongAnswersCount}},{key:"onLetterChosen",value:function(){if(this.correctAnswersCountThisRound==this.choicesNumPerRound){if(this.currentRound++,this.currentRound>=this.totalRoundsNum){var e=this.calculateScore();return this.onComplete(e,e),!0}this.nextLetter()}return!1}},{key:"nextLetter",value:function(){if(0==this.roundsLetter.length)this.currentLetter=null;else{var e=Math.floor(Math.random()*this.roundsLetter.length);this.currentLetter=this.roundsLetter[e],this.roundsLetter.splice(e,1),this.gridLettersNames=[];for(var t=this.getCorrectLetterName(),n=0;n<this.choicesNumPerRound;n++)this.gridLettersNames.push(t);var r=this.roundsWrongLetters[e];this.roundsWrongLetters.splice(e,1);var s,o=_createForOfIteratorHelper(r);try{for(o.s();!(s=o.n()).done;)for(var a=s.value,i=0;i<2;i++)this.gridLettersNames.push(a)}catch(e){o.e(e)}finally{o.f()}}this.correctAnswersCountThisRound=0,this.wrongAnswersCountThisRound=0}},{key:"getCorrectLetterName",value:function(){return this.currentLetter.correctLetterName}},{key:"getCorrectAudioKey",value:function(){return this.currentLetter.correctAudioKey}},{key:"onCorrectAnswer",value:function(){return this.correctAnswersCount++,this.correctAnswersCountThisRound++,this.onLetterChosen()}},{key:"onWrongAnswer",value:function(){return this.wrongAnswersCount++,this.wrongAnswersCountThisRound++,this.wrongAnswersCountThisRound>=this.failsNumToLose?(this.onLose(0,0),!0):(this.onLetterChosen(),!1)}},{key:"getCurrentTotalAnswersCount",value:function(){return this.correctAnswersCount+this.wrongAnswersCount}},{key:"getCurrentTotalAnswersCountThisRound",value:function(){return this.correctAnswersCountThisRound+this.wrongAnswersCountThisRound}},{key:"isNewRound",value:function(){return 0==this.getCurrentTotalAnswersCountThisRound()}},{key:"isRoundsComplete",value:function(){return this.getCurrentTotalAnswersCount()/this.choicesNumPerRound>=this.totalRoundsNum}},{key:"reset",value:function(){var e=game.cache.json.get("gameplay");this.letters=e.letters.slice();var t=e.rounds;this.roundsLetter=[],this.roundsWrongLetters=[];var n,r=_createForOfIteratorHelper(t);try{for(r.s();!(n=r.n()).done;){for(var s=n.value,o=s.correctLetter,a=this.letters.length-1;a>=0;a--)if(this.letters[a].correctLetterName==o){this.roundsLetter.push(this.letters[a]);break}this.roundsWrongLetters.push(s.wrongLetters)}}catch(e){r.e(e)}finally{r.f()}this.totalRoundsNum=this.roundsLetter.length,this.nextLetter(),this.currentRound=0,this.correctAnswersCount=0,this.wrongAnswersCount=0,this.correctAnswersCountThisRound=0,this.wrongAnswersCountThisRound=0}}]),e}();e.Gameplay=t}(e.core||(e.core={}))}(sh||(sh={})),function(e){!function(t){var n=function(t){_inherits(r,Phaser.Scene);var n=_createSuper(r);function r(){return _classCallCheck(this,r),n.apply(this,arguments)}return _createClass(r,[{key:"init",value:function(){var e=this;this.game.scale.transformX=function(t){for(var n=0,r=game.canvas.parentElement;r;){if(r.offsetLeft){n=r.offsetLeft;break}r=r.parentElement}return(t-n)*e.game.scale.displayScale.x},this.game.scale.transformY=function(t){for(var n=0,r=game.canvas.parentElement;r;){if(r.offsetTop){n=r.offsetTop;break}r=r.parentElement}return(t-n)*e.game.scale.displayScale.y}}},{key:"create",value:function(){game.scene.remove("Boot"),game.scene.add("Preloader",e.scene.Preloader,!0)}}]),r}();t.Boot=n}(e.scene||(e.scene={}))}(sh||(sh={})),function(e){!function(t){var n=e.core.Gameplay,r=function(t){_inherits(s,Phaser.Scene);var r=_createSuper(s);function s(){return _classCallCheck(this,s),r.apply(this,arguments)}return _createClass(s,[{key:"create",value:function(){this.gameplay=new n,this.gameplayScreen=new e.screen.GameplayScreen(this,this.gameplay),this.children.add(this.gameplayScreen),this.gameplayScreen.showInstructionPage()}}]),s}();t.MainScene=r}(e.scene||(e.scene={}))}(sh||(sh={})),function(e){!function(t){var n=function(t){_inherits(r,Phaser.Scene);var n=_createSuper(r);function r(){return _classCallCheck(this,r),n.apply(this,arguments)}return _createClass(r,[{key:"preload",value:function(){}},{key:"create",value:function(){var e=this;this.load.json("gameplay","assets/json/gameplay.json"),this.load.pack("preloader","assets/pack.json"),this.load.on("progress",(function(e){}),this),this.load.on("complete",(function(){e.nextScene()})),this.load.start()}},{key:"nextScene",value:function(){game.scene.remove("Preloader"),game.scene.add("ScreenMain",e.scene.MainScene,!0)}}]),r}();t.Preloader=n}(e.scene||(e.scene={}))}(sh||(sh={})),function(e){!function(e){var t=function(e){_inherits(n,Phaser.GameObjects.Container);var t=_createSuper(n);function n(e,r,s){var o;return _classCallCheck(this,n),(o=t.call(this,e))._areYouSurePage=new Phaser.GameObjects.Image(o.scene,-105,-48,"Exit warning"),o._areYouSurePage.setOrigin(0,0),o._areYouSurePage.setInteractive(),o._btnSureYes=new Phaser.GameObjects.Image(o.scene,game.scale.width/2-95,435,"btnYES1"),o._btnSureYes.setInteractive({cursor:"pointer"}),o._btnSureYes.once("pointerup",r),setupButtonTextureBased(o._btnSureYes,"btnYES1","btnYES2"),o._btnSureNo=new Phaser.GameObjects.Image(o.scene,game.scale.width/2+95,435,"btnNO1"),o._btnSureNo.setInteractive({cursor:"pointer"}),o._btnSureNo.once("pointerup",s),setupButtonTextureBased(o._btnSureNo,"btnNO1","btnNO2"),o.add(o._areYouSurePage),o.add(o._btnSureYes),o.add(o._btnSureNo),o}return n}();e.AreYouSureWindow=t}(e.screen||(e.screen={}))}(sh||(sh={})),function(e){!function(e){var t=function(e){_inherits(n,Phaser.GameObjects.Container);var t=_createSuper(n);function n(e,r,s,o){var a;_classCallCheck(this,n),(a=t.call(this,e)).music=null,a.setPosition(-104.5,-48),a._bgComplete=new Phaser.GameObjects.Image(a.scene,0,0,"Completion page LATEST UPDATED"),a._bgComplete.setOrigin(0,0),a._bgComplete.setInteractive(),a._cup=new Phaser.GameObjects.Image(a.scene,400,410,"Trophy"),a._btnBack=new Phaser.GameObjects.Image(a.scene,570,570,"btnBACK1"),a._btnReplay=new Phaser.GameObjects.Image(a.scene,720,570,"btnReplay1"),a._btnNext=new Phaser.GameObjects.Image(a.scene,870,570,"btnNEXT1");var i=new Phaser.GameObjects.Image(a.scene,620,440,"Collected Points");a.totalScoreTxt=a.scene.add.text(845,352,"",{fontFamily:"Kids Rock Demo",fontSize:35,color:"#F49F1C",align:"center",stroke:"#70451A",strokeThickness:6}),a.totalScoreTxt.setOrigin(.5,.5);var c=a.totalScoreTxt.context.createLinearGradient(0,0,0,a.totalScoreTxt.height);return c.addColorStop(0,"#FFFF00"),c.addColorStop(1,"#C17316"),a.totalScoreTxt.setFill(c),a.starScoreTxt=a.scene.add.text(648,433,"",{fontFamily:"Kids Rock Demo",fontSize:24,color:"#FFFFFF",align:"center"}),a.starScoreTxt.setOrigin(.5,.5),a.add([a._bgComplete,i,a._cup,a._btnBack,a._btnReplay,a._btnNext,a.totalScoreTxt,a.starScoreTxt]),a._btnBack.setInteractive({cursor:"pointer"}),a._btnBack.on("pointerup",(function(){r(a._btnBack)})),setupButtonTextureBased(a._btnBack,"btnBACK1","btnBACK2"),a._btnReplay.setInteractive({cursor:"pointer"}),a._btnReplay.once("pointerup",(function(){s(a._btnReplay),a.music&&a.music.stop()})),setupButtonTextureBased(a._btnReplay,"btnReplay1","btnReplay2"),a._btnNext.setInteractive({cursor:"pointer"}),a._btnNext.on("pointerup",(function(){o(a._btnNext)})),setupButtonTextureBased(a._btnNext,"btnNEXT1","btnNEXT2"),a}return _createClass(n,[{key:"show",value:function(e,t){this._cup.scale=1.25,this.scene.tweens.add({targets:this._cup,scale:1,duration:500,ease:Phaser.Math.Easing.Back.Out}),this.totalScoreTxt.text=String(e),this.starScoreTxt.text=String(t),this.music=this.scene.sound.add("Activity completion fantastic"),this.music.play()}}]),n}();e.CompleteWindow=t}(e.screen||(e.screen={}))}(sh||(sh={})),function(e){!function(e){var t=function(e){_inherits(n,Phaser.GameObjects.Container);var t=_createSuper(n);function n(e){var r;return _classCallCheck(this,n),(r=t.call(this,e))._DoorR=new Phaser.GameObjects.Image(r.scene,504.5,158,"Door R"),r._DoorR.setOrigin(0,0),r._DoorL=new Phaser.GameObjects.Image(r.scene,313.5,158,"Door L"),r._DoorL.setOrigin(0,0),r._DoorInside=new Phaser.GameObjects.Image(r.scene,313,158,"Door Inside"),r._DoorInside.setOrigin(0,0),r.add(r._DoorInside),r.add(r._DoorR),r.add(r._DoorL),r}return _createClass(n,[{key:"openDoor",value:function(e,t,n,r,s,o,a){e.visible=!1;for(var i=n.slice(),c=0;c<n.length;c+=2)i[c]+=100;for(var u=1;u<n.length;u+=2)i[u]+=198;var l=this.scene.make.mesh({key:e.texture.key,x:e.x,y:e.y,vertices:i.slice(),uv:[0,0,0,1,1,1,0,0,1,1,1,0]});l.def_vertices=i,e.tweenDoorValueX=l.def_vertices[r[0]],e.tweenDoorValueY=0,this.scene.tweens.add({targets:e,tweenDoorValueX:.6*-n[r[0]]+100,tweenDoorValueY:a,duration:t,ease:Phaser.Math.Easing.Linear,onUpdate:function(){for(var t=0;t<s.length;t++)l.vertices[s[t]]=l.def_vertices[s[t]]+o[t]*e.tweenDoorValueY;var n,a=_createForOfIteratorHelper(r);try{for(a.s();!(n=a.n()).done;){var i=n.value;l.vertices[i]=e.tweenDoorValueX}}catch(e){a.e(e)}finally{a.f()}}}),this.add(l),this.scene.sound.add("Door opening").play()}},{key:"open",value:function(e){this.openDoor(this._DoorR,2e3,[-this._DoorR.width/2,-this._DoorR.height/2,-this._DoorR.width/2,this._DoorR.height/2,this._DoorR.width/2,this._DoorR.height/2,-this._DoorR.width/2,-this._DoorR.height/2,this._DoorR.width/2,this._DoorR.height/2,this._DoorR.width/2,-this._DoorR.height/2],[0,2,6],[1,3,7],[-1,1,-1],50),this.openDoor(this._DoorL,2e3,[-this._DoorL.width/2,-this._DoorL.height/2,-this._DoorL.width/2,this._DoorL.height/2,this._DoorL.width/2,this._DoorL.height/2,-this._DoorL.width/2,-this._DoorL.height/2,this._DoorL.width/2,this._DoorL.height/2,this._DoorL.width/2,-this._DoorL.height/2],[4,8,10],[5,9,11],[-1,-1,1],-50),delayedCall(2e3,e)}}]),n}();e.DoorsWindow=t}(e.screen||(e.screen={}))}(sh||(sh={})),function(e){!function(e){var t=function(t){_inherits(r,Phaser.GameObjects.Container);var n=_createSuper(r);function r(t,s){var o;return _classCallCheck(this,r),(o=n.call(this,t)).rows=5,o.cols=5,o.bgMusic=null,o.sfxOpen=null,o.sfxClose=null,o.soundGooseYes=null,o.soundGooseNo=null,o.correctAudio=null,o.wfsnd=null,o.sfxCallToPrayer=null,o.showCompleteWindow=function(t,n){var r=new e.CompleteWindow(o.scene,(function(e){o.playBtnClickAnim(e)}),(function(e){o.playBtnClickAnim(e),o.destroyGameplay(),o.remove(r),o.showInstructionPage()}),(function(e){o.playBtnClickAnim(e)}));o.setInputEnabled(!1),delayedCall(1500,(function(){o.bgMusic.stop(),o.doorsWindow.open((function(){o.sfxCallToPrayer=o.scene.sound.add("Call to prayer"),o.sfxCallToPrayer.play(),delayedCall(6e3,(function(){setPageBackground("bg-blue"),o.add(r),r.show(t,n)}))}))}))},o.showLoseWindow=function(t,n){var r=new e.TryAgainWindow(o.scene,(function(e){o.playBtnClickAnim(e)}),(function(e){o.playBtnClickAnim(e),o.destroyGameplay(),o.remove(r),o.showInstructionPage()}));o.setInputEnabled(!1),delayedCall(750,(function(){setPageBackground("bg-blue"),o.add(r),r.show(t,n),o.bgMusic.stop()}))},o.gameplay=s,window.t=_assertThisInitialized(o),o}return _createClass(r,[{key:"showGameplay",value:function(){setPageBackground("bg-australia"),this.bgMusic=this.scene.sound.add("B-g ambience"),this.bgMusic.play(),this.bgMusic.loop=!0,this._gameStage=new Phaser.GameObjects.Image(this.scene,game.scale.width/2,game.scale.height/2,"3 Letter Grid"),this._gameStage.setOrigin(.485,.48),this._gameStage.setInteractive(),this._btnSound=new Phaser.GameObjects.Image(this.scene,55,50,"Sound"),this._btnSound.setInteractive({cursor:"pointer"}),setupButtonTextureBased(this._btnSound,"Sound","Sound HOVER EFFECT"),this._btnClose=new Phaser.GameObjects.Image(this.scene,920,50,"x Button"),this._btnClose.setInteractive({cursor:"pointer"}),setupButtonTextureBased(this._btnClose,"x Button","x Button HOVER EFFECT"),this.gameplayContainer=new Phaser.GameObjects.Container(this.scene),this.addAt(this.gameplayContainer,0),this.targetLetterLabel=new Phaser.GameObjects.Image(this.scene,590,90,null),this.targetLetterLabel.tint=Math.round(0),this.doorsWindow=new e.DoorsWindow(this.scene),this.gameplayContainer.add([this._gameStage,this.doorsWindow,this._btnSound,this._btnClose,this.targetLetterLabel]),this.gameplay.reset(),this.createGrid(),this.createCrescentMoons(),this.createInput(),this.showOutGrid(),this.gameplay.setupCallbacks(this.showCompleteWindow,this.showLoseWindow)}},{key:"showOutGrid",value:function(){var e=this;this.setInputEnabled(!1);for(var t=0;t<this.rows;t++)for(var n=0;n<this.cols;n++){var r=this.grid[t][n];r.setScale(0),this.scene.tweens.add({targets:r,scale:1,duration:300,delay:700})}delayedCall(700,(function(){e.sfxOpen=e.scene.sound.add("open"),e.sfxOpen.play()})),this.targetLetterLabel.visible=!1,this.resetCrescentMoons(),this.randomizeGrid(),delayedCall(1200,(function(){e.targetLetterLabel.visible=!0,e.updateClickLetterTargetLabel(),e.gameplay.isNewRound()?e.gameplay.isRoundsComplete()||(e.playCorrectAudio(),delayedCall(2e3,(function(){e.setInputEnabled(!0)}))):e.setInputEnabled(!0)}))}},{key:"showInGrid",value:function(e){var t=this;this.setInputEnabled(!1);for(var n=0;n<this.rows;n++)for(var r=function(e){var r=t.grid[n][e];t.scene.tweens.add({targets:r,scale:0,duration:300,delay:700,onComplete:function(){r.bg.setTexture("rr_def")}})},s=0;s<this.cols;s++)r(s);delayedCall(700,(function(){t.sfxClose=t.scene.sound.add("close"),t.sfxClose.play()})),e&&delayedCall(1e3,(function(){t.showOutGrid()}))}},{key:"createInput",value:function(){for(var e=this,t=0;t<this.rows;t++)for(var n=function(n){var r=e.grid[t][n];r.bg.on("pointerup",(function(){e.playBtnClickAnim(r),r.bg.disableInteractive();var t=r.letter;t&&t.texture.key==e.gameplay.getCorrectLetterName()?(r.bg.setTexture("rr_active"),e.onCorrectAnswer()?e.showInGrid(!1):e.gameplay.isNewRound()&&e.showInGrid(!0)):(r.bg.setTexture("rr_wrong"),e.onWrongAnswer()?e.showInGrid(!1):e.gameplay.isNewRound()&&e.showInGrid(!0))}))},r=0;r<this.cols;r++)n(r);this._btnSound.on("pointerup",(function(){e.playBtnClickAnim(e._btnSound),e.onSoundClick()})),this._btnClose.on("pointerup",(function(){e.playBtnClickAnim(e._btnClose),e.onCloseClick()}))}},{key:"createGrid",value:function(){this.grid=[];for(var e=0;e<this.rows;e++){for(var t=[],n=0;n<this.cols;n++){var r=new Phaser.GameObjects.Container(this.scene,355+76*e,215+71*n);this.gameplayContainer.add(r),r.bg=new Phaser.GameObjects.Image(this.scene,0,0,"rr_def"),r.add(r.bg),r.letter=new Phaser.GameObjects.Image(this.scene,0,0,null),r.letter.rectContainer=r,r.add(r.letter),r.letter.tint=Math.round(0),t.push(r)}this.grid.push(t)}}},{key:"randomizeGrid",value:function(){var e=null,t=null,n=Number.MAX_VALUE,r=0,s=Number.MAX_VALUE;do{r++,e=Phaser.Utils.Array.Shuffle(this.gameplay.gridLettersNames.slice()),(s=this.checkRandomizationSimilarity(e))<n&&(n=s,t=e)}while(s>0&&r<100);for(var o=0;o<this.rows;o++)for(var a=0;a<this.cols;a++){var i=this.grid[o][a].letter,c=t.shift();i.setTexture(c)}}},{key:"checkRandomizationSimilarity",value:function(e){for(var t=0,n=0;n<e.length-1;n++)e[n]==e[n+1]&&t++;for(var r=0;r<e.length-this.rows;r++)r+this.rows<e.length&&e[r]==e[r+this.rows]&&t++;return t}},{key:"updateClickLetterTargetLabel",value:function(){this.targetLetterLabel.setTexture(this.gameplay.getCorrectLetterName())}},{key:"createCrescentMoons",value:function(){this.crescentMoons=[];for(var e=0;e<this.gameplay.choicesNumPerRound;e++){var t=new Phaser.GameObjects.Image(this.scene,179,261+61*e,"crescent_moon_def");this.crescentMoons.push(t),this.gameplayContainer.add(t)}}},{key:"resetCrescentMoons",value:function(){for(var e=0;e<this.crescentMoons.length;e++)this.setMoonsActive(e,!1)}},{key:"setMoonsActive",value:function(e,t){this.crescentMoons[e].setTexture(t?"crescent_moon_active":"crescent_moon_def")}},{key:"onCorrectAnswer",value:function(){this.setMoonsActive(this.gameplay.correctAnswersCountThisRound,!0);var e=this.gameplay.onCorrectAnswer();return this.soundGooseYes=this.scene.sound.add("Correct click"),this.soundGooseYes.play(),e}},{key:"onWrongAnswer",value:function(){var e=this.gameplay.onWrongAnswer();return this.soundGooseNo=this.scene.sound.add("Incorrect click"),this.soundGooseNo.play(),e}},{key:"playCorrectAudio",value:function(){var e=this;this.correctAudio&&this.correctAudio.stop();try{this.correctAudio=this.scene.sound.add("translate_click_on"),this.correctAudio.play(),this.areYouSureWindow&&this.areYouSureWindow.parentContainer==this&&this.correctAudio.pause(),delayedCall(750,(function(){e.correctAudio=e.scene.sound.add(e.gameplay.getCorrectAudioKey()),e.correctAudio.play(),e.areYouSureWindow&&e.areYouSureWindow.parentContainer==e&&e.correctAudio.pause()}))}catch(e){console.log(e)}}},{key:"onSoundClick",value:function(){this.playCorrectAudio()}},{key:"onCloseClick",value:function(){this.showAreYouSurePage(),this.scene.sound.add("warning page pop up sfx").play()}},{key:"playBtnClickAnim",value:function(e){e.scaleX=e.scaleY=1,this.scene.tweens.add({targets:e,scaleX:.9,scaleY:.9,duration:100,yoyo:!0})}},{key:"showInstructionPage",value:function(){var t=this;setPageBackground("bg-blue");var n=function(){t.wfsnd&&t.wfsnd.stop(),t.wfsnd=t.scene.sound.add("Unlock the Gate Open the mosque gate by entering the passcode."),t.wfsnd.play()};this.instructionPage=new e.InstructionPage(this.scene,(function(e){t.playBtnClickAnim(e),t.remove(t.instructionPage),t.showGameplay(),t.wfsnd&&t.wfsnd.stop()}),(function(e){t.playBtnClickAnim(e),n()})),this.add(this.instructionPage),n()}},{key:"showAreYouSurePage",value:function(){var t=this;pauseAllDelayedCalls(),setPageBackground("bg-blue"),this.pauseSounds(),this.areYouSureWindow=new e.AreYouSureWindow(this.scene,(function(){t.remove(t.areYouSureWindow),t.destroyGameplay(),t.showInstructionPage()}),(function(){t.remove(t.areYouSureWindow),t.unpauseSounds(),resumeAllDelayedCalls(),setPageBackground("bg-australia")})),this.add(this.areYouSureWindow)}},{key:"setInputEnabled",value:function(e){if(e)for(var t=0;t<this.rows;t++)for(var n=0;n<this.cols;n++)this.grid[t][n].bg.setInteractive({cursor:"pointer"});else for(var r=0;r<this.rows;r++)for(var s=0;s<this.cols;s++)this.grid[r][s].bg.disableInteractive()}},{key:"pauseSounds",value:function(){this.scene.sound.pauseAll()}},{key:"unpauseSounds",value:function(){this.scene.sound.resumeAll()}},{key:"destroyGameplay",value:function(){this.setInputEnabled(!1),this.remove(this.gameplayContainer),destroyAllDelayedCalls()}}]),r}();e.GameplayScreen=t}(e.screen||(e.screen={}))}(sh||(sh={})),function(e){!function(e){var t=function(e){_inherits(n,Phaser.GameObjects.Container);var t=_createSuper(n);function n(e,r,s){var o;return _classCallCheck(this,n),(o=t.call(this,e))._instructionPage=new Phaser.GameObjects.Image(o.scene,-105,-48,"Instructions page  ALL ACTIVITY  TITLEs"),o._instructionPage.setOrigin(0,0),o._instructionPage.setInteractive(),o._instructionPageTitle=new Phaser.GameObjects.Image(o.scene,495,105,"welcome"),o._instructionPageTitle.setScale(.75),o._btnPlay=new Phaser.GameObjects.Image(o.scene,game.scale.width/2,430,"btnPLAY1"),o._btnPlay.setInteractive({cursor:"pointer"}),o._btnPlay.once("pointerup",r),setupButtonTextureBased(o._btnPlay,"btnPLAY1","btnPLAY2"),o.instrTxt=o.scene.add.text(game.scale.width/2,game.scale.height/2,"Open the mosque gate by entering\nthe passcode.",{fontFamily:"Kids Rock Demo",fontSize:30,color:"#43425D",align:"center"}),o.instrTxt.setLineSpacing(20),o.instrTxt.setOrigin(.5,.5),o._btnSoundInstruction=new Phaser.GameObjects.Image(o.scene,695,106,"Sound"),o._btnSoundInstruction.setInteractive({cursor:"pointer"}),o._btnSoundInstruction.on("pointerup",s),setupButtonTextureBased(o._btnSoundInstruction,"Sound","Sound HOVER EFFECT"),o.add(o._instructionPage),o.add(o._instructionPageTitle),o.add(o.instrTxt),o.add(o._btnPlay),o.add(o._btnSoundInstruction),o}return n}();e.InstructionPage=t}(e.screen||(e.screen={}))}(sh||(sh={})),function(e){!function(e){var t=function(e){_inherits(n,Phaser.GameObjects.Container);var t=_createSuper(n);function n(e,r,s){var o;_classCallCheck(this,n),(o=t.call(this,e)).music=null,o.setPosition(-106,-48),o._bg=new Phaser.GameObjects.Image(o.scene,0,0,"Try again page"),o._bg.setOrigin(0,0),o._bg.setInteractive(),o._star=new Phaser.GameObjects.Image(o.scene,400,415,"Break Star"),o._btnBack=new Phaser.GameObjects.Image(o.scene,600,580,"btnBACK1"),o._btnReplay=new Phaser.GameObjects.Image(o.scene,765,580,"btnReplay1"),o.totalScoreTxt=o.scene.add.text(830,355,"",{fontFamily:"Kids Rock Demo",fontSize:35,color:"#F49F1C",align:"center",stroke:"#70451A",strokeThickness:6}),o.totalScoreTxt.setOrigin(.5,.5);var a=o.totalScoreTxt.context.createLinearGradient(0,0,0,o.totalScoreTxt.height);return a.addColorStop(0,"#FFFF00"),a.addColorStop(1,"#C17316"),o.totalScoreTxt.setFill(a),o.starScoreTxt=o.scene.add.text(635,431,"",{fontFamily:"Kids Rock Demo",fontSize:24,color:"#FFFFFF",align:"center"}),o.starScoreTxt.setOrigin(.5,.5),o.add([o._bg,o._star,o._btnBack,o._btnReplay,o.totalScoreTxt,o.starScoreTxt]),o._btnBack.setInteractive({cursor:"pointer"}),o._btnBack.on("pointerup",(function(){r(o._btnBack)})),setupButtonTextureBased(o._btnBack,"btnBACK1","btnBACK2"),o._btnReplay.setInteractive({cursor:"pointer"}),o._btnReplay.once("pointerup",(function(){s(o._btnReplay),o.music&&o.music.stop()})),setupButtonTextureBased(o._btnReplay,"btnReplay1","btnReplay2"),o}return _createClass(n,[{key:"show",value:function(e,t){this._star.scale=1.25,this.scene.tweens.add({targets:this._star,scale:1,duration:500,ease:Phaser.Math.Easing.Back.Out}),this.totalScoreTxt.text=String(e),this.starScoreTxt.text=String(t),this.music=this.scene.sound.add("Fail - close one"),this.music.play()}}]),n}();e.TryAgainWindow=t}(e.screen||(e.screen={}))}(sh||(sh={}));
//# sourceMappingURL=main.js.map
