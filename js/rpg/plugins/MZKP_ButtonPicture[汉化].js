//=============================================================================
// RPG Maker MZ Kadokawa Plugin - Button Picture
// MZKP_ButtonPicture.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 使得图片可以点击。
 * @author Yoji Ojima
 *
 * @help
 * 这个插件提供了一个命令，当图片被点击时调用
 * 一个普通事件。
 *
 * 在以下程序中使用它。
 *   1. 执行 "显示图片"，以显示你的按钮图像。
 *   2. 调用插件命令 "设置按钮图片"。
 *
 * @command set
 * @text 设置按钮图片
 * @desc 使得指定的图片可以点击。
 *
 * @arg pictureId
 * @type number
 * @min 1
 * @max 100
 * @default 1
 * @text 图片编号
 * @desc 图片的控制编号。
 *
 * @arg commonEventId
 * @type common_event
 * @default 1
 * @text 共同事件
 * @desc 当图片被点击时调用的普通事件。
 */

/*:ja
 * @target MZ
 * @plugindesc 使得图片可以点击。
 * @author Yoji Ojima
 *
 * @help
 * 这个插件提供了一个命令，当图片被点击时调用
 * 提供します。
 *
 * 在以下程序中使用它。
 *   1. 执行 "显示图片"，以显示你的按钮图像。
 *   2. 调用插件命令 "设置按钮图片"。
 *
 * @command set
 * @text 设置按钮图片
 * @desc 使得指定的图片可以点击。
 *
 * @arg pictureId
 * @type number
 * @min 1
 * @max 100
 * @default 1
 * @text 图片编号
 * @desc 图片的控制编号。
 *
 * @arg commonEventId
 * @type common_event
 * @default 1
 * @text 共同事件
 * @desc 当图片被点击时调用的共同事件。
 */

(() => {
    const pluginName = "MZKP_ButtonPicture";

    PluginManager.registerCommand(pluginName, "set", args => {
        const pictureId = Number(args.pictureId);
        const commonEventId = Number(args.commonEventId);
        const picture = $gameScreen.picture(pictureId);
        if (picture) {
            picture.mzkp_commonEventId = commonEventId;
        }
    });

    Sprite_Picture.prototype.isClickEnabled = function() {
        const picture = this.picture();
        return picture && picture.mzkp_commonEventId && !$gameMessage.isBusy();
    };

    Sprite_Picture.prototype.onClick = function() {
        $gameTemp.reserveCommonEvent(this.picture().mzkp_commonEventId);
    };

    Spriteset_Base.prototype.mzkp_isAnyPicturePressed = function() {
        return this._pictureContainer.children.some(sprite =>
            sprite.isPressed()
        );
    };

    const _Scene_Map_isAnyButtonPressed =
        Scene_Map.prototype.isAnyButtonPressed;
    Scene_Map.prototype.isAnyButtonPressed = function() {
        return (
            _Scene_Map_isAnyButtonPressed.apply(this, arguments) ||
            this._spriteset.mzkp_isAnyPicturePressed()
        );
    };
})();
