//=============================================================================
// RPGツクールMZ - LL_TrackNameWindow.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc The song title is displayed when BGM is switching.
 * @author Lulu's Church
 * @url https://nine-yusha.com/plugin
 *
 * @help LL_TrackNameWindow.js
 *
 * The song title is displayed when switching BGM.
 * You can implement the song title which is common in adventure games.
 * The song title window will not be displayed during the battle.
 * You can switch the display / non-display state of the song title using the plug-in command.
 *
 * Author: Lulu's Church
 * Plugin Creating Date: 2020/9/8
 *
 * This plugin is distributed under the MIT license.
 * Please feel free to use it.
 * https://opensource.org/licenses/mit-license.php
 * 
 * Translated from Japanese to English by Kupotepo
 *
 * @command setEnabled
 * @text Song name displays ON・OFF
 * @desc Switches the display / non-display of the song title.
 *
 * @arg enabled
 * @text Song name indication
 * @desc If you turn it OFF, the song title will not be displayed.
 * @default true
 * @type boolean
 *
 * @param trackLists
 * @text Song title list
 * @desc Define the song title. BGM that is not included in the song title list is not displayed.
 * @default []
 * @type struct<trackLists>[]
 *
 * @param twX
 * @text X coordinate
 * @desc The display position (X) of the window.
 * @default 576
 * @max 2000
 * @min -2000
 * @type number
 *
 * @param twY
 * @text Y coordinate
 * @desc The display position (Y) of the window. 50 or more is recommended as it cannot be displayed at the location of the map name window.
 * @default 50
 * @max 2000
 * @min -2000
 * @type number
 *
 * @param twWidth
 * @text Banners
 * @desc The size (width) of the window.
 * @default 240
 * @type number
 *
 * @param twTransition
 * @text Transition Animation
 * @desc Select the animation when the window is displayed.
 * @type select
 * @default 3
 * @option Fade
 * @value 1
 * @option Float left
 * @value 2
 * @option Float right
 * @value 3
 * @option Under the float
 * @value 4
 * @option On the float
 * @value 5
 *
 * @param twShowCount
 * @text Display time
 * @desc The time of the window is displayed (1/60 seconds).
 * @default 150
 * @type number
 *
 * @param twOriginalBg
 * @text Background image file name
 * @desc If you want to use a background image, select a file.
 * @dir img/pictures
 * @type file
 *
 * @param twTextColor
 * @text Text Color
 * @desc Enter the text color with the CSS color code.
 * @default #ffffff
 * @type string
 *
 * @param twTextBorder
 * @text Text Border
 * @desc Please select the border of the characters.
 * @default rgba(0, 0, 0, 0.6)
 * @type select
 * @option Black (Default)
 * @value rgba(0, 0, 0, 0.6)
 * @option 白
 * @value rgba(255, 255, 255, 0.6)
 * @option None
 * @value rgba(0, 0, 0, 0)
 */

/*~struct~trackLists:
 *
 * @param trackFile
 * @text trackFile
 * @desc Select the file to give the song title.
 * @dir audio/bgm
 * @type file
 *
 * @param trackName
 * @text Song Name
 * @desc Please enter the song name.
 * @default
 * @type string
 */

(() => {
    "use strict";
    const pluginName = "LL_TrackNameWindow";

    const parameters = PluginManager.parameters(pluginName);
    const twX = Number(parameters.twX || 576);
    const twY = Number(parameters.twY || 50);
    const twWidth = Number(parameters.twWidth || 240);
    const twHeight = 60;
    const twTransition = Number(parameters.twTransition || 3);
    const twShowCount = Number(parameters.twShowCount || 150);
    const twOriginalBg = String(parameters.twOriginalBg || null);
    const twTextColor = String(parameters.twTextColor || "#ffffff");
    const twTextBorder = String(parameters.twTextBorder || "rgba(0, 0, 0, 255)");
    const trackLists = JSON.parse(parameters.trackLists || []);
    let trackListParams = [];
	trackLists.forEach((elm) => {
		trackListParams.push(JSON.parse(elm));
    });

    PluginManager.registerCommand(pluginName, "setEnabled", args => {
		const enabled = eval(args.enabled || "true");
        $gameSystem._TrackNameWindowDisabled = !enabled;
	});

    // For maintaining the display state of the song title window
    let trackInfo = null;
    let trackNameWindowShow = false;

    const _AudioManager_playBgm = AudioManager.playBgm;
    AudioManager.playBgm = function(bgm, pos) {
        if (!this.isCurrentBgm(bgm) && bgm.name && !this._meBuffer) {
            // Get the title of the song to display
            trackInfo = null;
            trackInfo = trackListParams.find(function(item, index) {
                if (String(item.trackFile) == bgm.name) return true;
            });
            if (trackInfo) {
                if (trackInfo.trackName != "") {
                    trackNameWindowShow = true;
                }
            }
        }
        _AudioManager_playBgm.apply(this, arguments);
    };

    const _Scene_Map_onTransferEnd = Scene_Map.prototype.onTransferEnd;
    Scene_Map.prototype.onTransferEnd = function() {
        this._trackNameWindow.open();
        _Scene_Map_onTransferEnd.apply(this, arguments);
    };

    const _Scene_Map_stop = Scene_Map.prototype.stop;
    Scene_Map.prototype.stop = function() {
        this._trackNameWindow.close();
        _Scene_Map_stop.apply(this, arguments);
    };

    const _Scene_Map_terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function() {
        _Scene_Map_terminate.apply(this, arguments);
        if (!SceneManager.isNextScene(Scene_Battle)) {
            this._trackNameWindow.hide();
        }
    };

    const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        this.createTrackNameWindow();
        _Scene_Map_createAllWindows.apply(this, arguments);
    };

    Scene_Map.prototype.createTrackNameWindow = function() {
        const rect = this.trackNameWindowRect();
        this._trackNameWindow = new Window_TrackName(rect);
        this.addWindow(this._trackNameWindow);
    };

    Scene_Map.prototype.trackNameWindowRect = function() {
        return new Rectangle(twX, twY, twWidth, twHeight);
    };

    const _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function() {
        _Scene_Map_callMenu.apply(this, arguments);
        this._trackNameWindow.hide();
    };

    //-----------------------------------------------------------------------------
    // Window_TrackName
    //
    // 曲名を表示するウィンドウです。

    function Window_TrackName() {
        this.initialize(...arguments);
    }

    Window_TrackName.prototype = Object.create(Window_Base.prototype);
    Window_TrackName.prototype.constructor = Window_TrackName;

    Window_TrackName.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this.opacity = 0;
        this.contentsOpacity = 0;
        this._showCount = 0;
        // Background image
        this.createBackground();
        this.refresh();
    };

    Window_TrackName.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        if ($gameParty.inBattle()) {
            this._showCount = 0;
        }
        // Song title window displays the decision.
        if (trackNameWindowShow && !$gameSystem._TrackNameWindowDisabled) {
            this.show();
            this.refresh();
            trackNameWindowShow = false;
        }
        if (this._showCount > 0) {
            this.updateFadeIn();
            this._showCount--;
        } else {
            this.updateFadeOut();
        }
    };

    Window_TrackName.prototype.updateFadeIn = function() {
        this.contentsOpacity += 16;
        // animation
        if (this.x > twX) this.x -= 2;
        if (this.x < twX) this.x += 2;
        if (this.y > twY) this.y -= 2;
        if (this.y < twY) this.y += 2;
        // background image
        if (this._bgSprite) this._bgSprite.opacity = this.contentsOpacity;
    };

    Window_TrackName.prototype.updateFadeOut = function() {
        this.contentsOpacity -= 16;
        // background image
        if (this._bgSprite) this._bgSprite.opacity = this.contentsOpacity;
    };

    Window_TrackName.prototype.open = function() {
        this.refresh();
        this._showCount = 0;
    };

    Window_TrackName.prototype.close = function() {
        this._showCount = 0;
    };

    Window_TrackName.prototype.show = function() {
        // If the song title window is hidden, the process is interrupted
        if ($gameSystem._TrackNameWindowDisabled || SceneManager.isNextScene(Scene_Battle)) return;
        this._showCount = twShowCount;
        // animation
        if (twTransition == 2) this.x -= 32;
        if (twTransition == 3) this.x += 32;
        if (twTransition == 4) this.y += 32;
        if (twTransition == 5) this.y -= 32;
        // background image
        if (this._bgSprite) this._bgSprite.opacity = 0;
    };

    Window_TrackName.prototype.refresh = function() {
        this.contents.clear();
        if (trackInfo) {
            const width = this.innerWidth;
            this.contents.fontSize = 16;
            this.changeTextColor(twTextColor);
            this.changeOutlineColor(twTextBorder);
            // Draw color tones if you don't use the original background image
            if (twOriginalBg == "null") {
                if (this._bgSprite) this._bgSprite.opacity = 255;
                this.drawBackground(0, 0, width, 624);
                this.drawText('♪', 2, 0, 24, "left");
            }
            this.drawText(trackInfo.trackName, 24, 0, width - 36, "center");
        }
    };

    Window_TrackName.prototype.drawBackground = function(x, y, width, height) {
        const color1 = ColorManager.dimColor1();
        const color2 = ColorManager.dimColor2();
        const half = width / 2;
        this.contents.gradientFillRect(x, y, half, height, color2, color1);
        this.contents.gradientFillRect(x + half, y, half, height, color1, color2);
    };

    Window_TrackName.prototype.createBackground = function() {
        if (twOriginalBg == "null") return;
        this._bgSprite = new Sprite();
        this._bgSprite.bitmap = ImageManager.loadPicture(twOriginalBg);
        this._bgSprite.bitmap.addLoadListener(function() {
            this._bgSprite.x = twWidth / 2 - this._bgSprite.width / 2;
            this._bgSprite.y = twHeight / 2 - this._bgSprite.height / 2;
        }.bind(this));
        this._bgSprite.opacity = 0;
        this.addChildToBack(this._bgSprite);
    };
})();
