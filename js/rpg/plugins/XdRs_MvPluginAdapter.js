//==============================================================================================================
// MV -> MZ  Adapter.js
//==============================================================================================================
/*:
 * @target MZ
 * @plugindesc MV插件适配器.
 * @author 芯☆淡茹水
 *
 * @help 
 * 
 * 使用该插件，尽可能的将 MV系列插件 兼容到 MZ 。
 * 
 * 调用 MV插件命令 方法：
 * 事件 - 脚本：
 * 第一行写标志 <MvPluginCommand>
 * 第二行写需要执行的MV插件命令
 * 第三行以及以下，依次序写该插件命令的参数。注意：一个参数就是一行 ！！！
 * 
 * 示例：执行MV插件命令 CommandTest , 参数依次为 5, ABC, true
 * 事件 - 脚本：
 * <MvPluginCommand>
 * CommandTest
 * 5
 * ABC
 * true
 * 
 *==============================================================================================================
 *
 * @param closeSmoothing
 * @text 是否关闭图像平滑处理。
 * @type boolean
 * @desc 是否关闭图像平滑处理。
 * @default false
 * 
 * 
*/
//==============================================================================================================
;var XdRsData = XdRsData || {};
XdRsData.adapter = {};
XdRsData.adapter.parameters = PluginManager.parameters('XdRs_MvPluginAdapter');
//==============================================================================================================
XdRsData.adapter.isCloseSmooth = function() {
    return this.parameters['closeSmoothing'] === 'true';
};
//==============================================================================================================
Bitmap.prototype._setDirty = function() {
    this._baseTexture.update();
};
//==============================================================================================================
DataManager.isThisGameFile = function(savefileId) {
    return !!this.savefileInfo(savefileId);
};
DataManager.loadSavefileInfo = function(savefileId) {
    return this.savefileInfo(savefileId);
};
DataManager.lastAccessedSavefileId = function() {
    return $gameSystem.savefileId();
};
//==============================================================================================================
BattleManager.setStatusWindow = function(window) {
    // 弃用。
};
//==============================================================================================================
XdRsData.adapter.Bitmap_initialize = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function(width, height) {
    XdRsData.adapter.Bitmap_initialize.call(this, width, height);
    this._smooth = !XdRsData.adapter.isCloseSmooth();
};
//==============================================================================================================
Game_Battler.prototype.startAnimation = function(animationId, mirror) {
    $gameTemp.requestAnimation([this], animationId, mirror);
};
Game_Battler.prototype.isAnimationRequested = function() {
    return false;
};
Game_Battler.prototype.shiftAnimation = function() {
    return null;
};
//==============================================================================================================
Game_CharacterBase.prototype.requestAnimation = function(animationId) {
    $gameTemp.requestAnimation([this], animationId);
};
Game_CharacterBase.prototype.animationId = function() {
    return 0;
};
//==============================================================================================================
XdRsData.adapter.Game_Interpreter_command355 = Game_Interpreter.prototype.command355;
Game_Interpreter.prototype.command355 = function() {
    if (/<MvPluginCommand>/.test(this.currentCommand().parameters[0])) {
        return this.analysisMvPluginCommand();
    }
    return XdRsData.adapter.Game_Interpreter_command355.call(this);
};
Game_Interpreter.prototype.analysisMvPluginCommand = function() {
    var command = null, args = [];
    if (this.nextEventCode() === 655) {
        this._index++;
        command = this.currentCommand().parameters[0];
    }
    while (this.nextEventCode() === 655) {
        this._index++;
        args.push(this.currentCommand().parameters[0]);
    }
    this.pluginCommand(command, args);
    return true;
};
//==============================================================================================================
function Sprite_Base() {
    this.initialize(...arguments);
}
Sprite_Base.prototype = Object.create(Sprite.prototype);
Sprite_Base.prototype.constructor = Sprite_Base;
//==============================================================================================================
Window_Base._iconWidth  = ImageManager.iconWidth;
Window_Base._iconHeight = ImageManager.iconHeight;
Window_Base._faceWidth  = ImageManager.faceWidth;
Window_Base._faceHeight = ImageManager.faceHeight;

XdRsData.adapter.Window_Base_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function() {
    const [x, y, w, h] = arguments;
    if (y === undefined) XdRsData.adapter.Window_Base_initialize.call(this, x);
    else XdRsData.adapter.Window_Base_initialize.call(this, new Rectangle(x, y, w, h));
};
Window_Base.prototype.standardFontFace = function() {
    return $gameSystem.mainFontFace();
};
Window_Base.prototype.standardFontSize = function() {
    return $gameSystem.mainFontSize();
};
Window_Base.prototype.standardPadding = function() {
    return $gameSystem.windowPadding();
};
Window_Base.prototype.textPadding = function() {
    return this.itemPadding();
};
Window_Base.prototype.textColor = function(n) {
    return ColorManager.textColor(n);
};
//==============================================================================================================
// end
//==============================================================================================================