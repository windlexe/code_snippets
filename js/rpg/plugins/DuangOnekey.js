//=============================================================================
// DuangOnekey.js
//=============================================================================

/*:
 * @plugindesc v1.75 一键出售商店（武器/防具） 插件  
 * @author Duang
 *
 * @help
 *
 * ////////////////////////////////////////////////////////////////////////////
 * ----------------------------- Terms of Usage: ------------------------------
 * ////////////////////////////////////////////////////////////////////////////
 * 群里有个哥们说想要个一键回收装备插件
 * duang 就写了个简单的 
 * 一起逆天吧  ！ 
 * 加入qq群： 863966119 逆天交流群  ！ 逆天！
 * 一群rm作者大佬陪你共同成长！
 * 尽情享受吧！：
 * 作者：Duang
 * 作者qq：546566631
 *
 * ！！！如果使用了《YEP_ItemCore.js》 yep  物品核心插件
 * ！！！请在  《YEP_ItemCore.js》 插件设置中将  Midgame Note Parsing 参数设置为 true  
 * ！！！如果不进行设置也能成功！ 但是自定义的品质注解 DuangQualityNote 必须为 <xx:1> 这种插件常用注解格式 
 * 
 *
 * ————————————————————————————————————————————————————————————————————————
 * 避免使用道具或技能时因为误操作而导致的任何损失。
 * 
 * 如需指定图片文件，请将文件放在 img/sell_info 文件夹中
 * ————————————————————————————————————————————————————————————————————————
 * 
 * Change Log
 *
 * V1.75 加强了对yep独立物品判断，解决了1把武器生成多个独立数据只删除一个独立数据的情况
 * V1.74 增加了首次打开快速跳转到一键出售的选项参数 方便用户使用 
 * V1.73 增加了窗口 ‘全部标签’ 分类选项 可在插件参数进行配置‘全部标签’是否显示
 * V1.72 增加了自定义金币动画播放方式参数
 * V1.71 增加了可自定义选项列表文本参数
 * V1.70 解决选择出售显示小数点的问题
 * V1.60 解决会导致 CategorySythesis合成项目插件  插件指令失效的问题
 * V1.50 解决与 YEP_ShopMenuCore 插件冲突的问题
 * V1.40 增加了对yep独立物品判断，出售时删除数据库独立物品数据
 * V1.30 借鉴了mog，增加了出售后掉落金币
 * V1.20 完善了部分显示问题
 * V1.10 完善了插件窗口背景参数设置
 * v1.00 完成插件一键出售
 * 
 * ////////////////////////////////////////////////////////////////////////////
 * -------------------------------- Commands: --------------------------------- 
 * ////////////////////////////////////////////////////////////////////////////
 * 编写事件指令打开出售商店
 * Plugin Command:
 *   DuangOnekey open             # 打开回收商店
 *
 * ============================================================================
 * 用户规约
 * ============================================================================
 * 
 *  MIT规约。
 *  如果你使用了本插件，请在致谢中包含'Duang' 谢啦！
 * If you are using this plugin, credit the following people: 
 
 * ============================================================================
 * 关于本插件如何与其他品质插件的兼容
 * ============================================================================
 * 想法是 为了兼容不同的 品质插件  毕竟每个品质插件的注解都不一样，有的是 <xx品质：1>  所以为了 兼容 这些品质， 
 * 把本插件中的 DuangQualityNote配置改成可以自定义的  你可以定义为 <xx品质：1>与品质插件保持一致， 
 * 这样就不用再去往武器上写额外的注解了
 * 
 * 注意！！！：自定义的品质注解 DuangQualityNote 请使用 <xx:1> 这种插件常用注解格式 
 * 注意！！！：   < : > 这3个符号字符皆为英文输入法下的字符 输入中文字符会导致插件解析不到品质信息
 *
 * 关于未定义品质： 即 未在插件里配置对应品质标签的武器和防具 都算未定义品质！
 *
 * - Duang
 * @param Gold Icon Index
 * @text 金币的图标位置索引
 * @type number
 * @min 1
 * @default 313
 
 * @param Sale price rate
 * @text 出售价格的比率 默认为初始价格的一半 即 物品价格/2
 * @type Number
 * @min 1
 * @max 10
 * @default 2
 *
 * @param Quick Sell
 * @text 是否 第一次打开选择分类后 直接跳转到 一键出售按钮选择窗口
 * @type boolean
 * @on 是
 * @off 否
 * @desc 便捷用户使用 第一次择分类后 直接跳转到一键出售选项 
 * @default false
 *
 * @param ShowAllTag
 * @text 是否显示 '全部' 选项分类标签
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否显示 '全部' 选项标签 默认不显示
 * @default false
 *
 * @param DuangQuality List 1-15
 * @text ----装备品质名称列表1-10----
 * @default
 *
 * @param DuangQuality 1
 * @text 装备品质名称1
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default {"DuangQualityName":"普通","DuangQualityNote":"<颜色:1>","IsEnable":"true","QualityColor":"#FFFFFF"}
 *
 * @param DuangQuality 2
 * @text 装备品质名称2
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default {"DuangQualityName":"稀有","DuangQualityNote":"<颜色:2>","IsEnable":"true","QualityColor":"#40C0F0"}
 *
 * @param DuangQuality 3
 * @text 装备品质名称3
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default {"DuangQualityName":"史诗","DuangQualityNote":"<颜色:3>","IsEnable":"true","QualityColor":"#8080FF"}
 *
 * @param DuangQuality 4
 * @text 装备品质名称4
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default {"DuangQualityName":"传说","DuangQualityNote":"<颜色:4>","IsEnable":"true","QualityColor":"#FF69B4"} 
 *
 * @param DuangQuality 5
 * @text 装备品质名称5
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default {"DuangQualityName":"神圣","DuangQualityNote":"<颜色:5>","IsEnable":"true","QualityColor":"#FFFF40"}
 *
 * @param DuangQuality 6
 * @text 装备品质名称6
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default {"DuangQualityName":"创世","DuangQualityNote":"<颜色:6>","IsEnable":"true","QualityColor":"#FF4444"}
 *
 * @param DuangQuality 7
 * @text 装备品质名称7
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default 
 *
 * @param DuangQuality 8
 * @text 装备品质名称8
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default 
 *
 * @param DuangQuality 9
 * @text 装备品质名称9
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default 
 *
 * @param DuangQuality 10
 * @text 装备品质名称10
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default 
 *
 *
 * @param DuangQuality 11
 * @text 装备品质名称11
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default 
 *
 *
 * @param DuangQuality 12
 * @text 装备品质名称12
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default 
 *
 *
 * @param DuangQuality 13
 * @text 装备品质名称13
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default 
 *
 *
 * @param DuangQuality 14
 * @text 装备品质名称14
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default 
 *
 *
 * @param DuangQuality 15
 * @text 装备品质名称15
 * @parent DuangQuality List 1-15
 * @type struct<DuangQuality>
 * @desc 编辑品质描述信息
 * @default 
 *
 * @param showSelectQualityColor
 * @text 根据配置绘制品质窗口列表颜色
 * @type boolean
 * @on 绘制
 * @off 不绘制
 * @desc 是否绘制品质窗口颜色，只针对品质选项窗口的选项列表中的颜色。
 * @default true
 *
 * @param showNullQuality
 * @text 是否显示无定义品质标签的列表
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 参数是否显示。
 * @default true
 *
 * @param nullQualityText
 * @text 无定义品质标签描述文本
 * @desc 无定义品质标签描述文本
 * @default 无品质 
 *
 * @param nullQualityColor
 * @text 无定义品质标签颜色
 * @desc 无定义品质标签颜色
 * @default #FFFFFF
 *
 * @param 金币掉落
 * @default
 *
 * @param isShowAnimations
 * @text 出售后是否显示金币掉落
 * @parent 金币掉落
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否显示金币掉落
 * @default true
 *
 * @param X - showAnimations
 * @text 金币掉落初始生成位置x
 * @parent 金币掉落
 * @desc 金币掉落初始生成位置x
 * @default 750
 * 
 * @param Y - showAnimations
 * @text 金币掉落初始生成位置Y
 * @parent 金币掉落
 * @desc 金币掉落初始生成位置Y
 * @default 580
 *
 * @param ShowgoldIconSize
 * @parent 金币掉落
 * @text 金币掉落图标大小比例
 * @desc 填1.0表示物品图标的原尺寸（24x24像素），
 * 填1.5表示图标大50%（36x36像素）。
 * @default 0.8
 *
 * @param ShowAnimations ID
 * @parent 金币掉落
 * @text 金币掉落绑定动画id
 * @desc 金币掉落绑定动画id（需要显示金币掉落） 不设置则金币掉落不绑定动画
 * @type Number
 *
 * @param Animations way
 * @parent 金币掉落
 * @text 金币掉落绑定动画运行方式
 * @desc 1（跟随图标位置播放动画） 2（图标初始位置播放动画）
 * @type Number
 * @min 1
 * @max 2
 * @default 1
 *
 * @param Animations way number
 * @parent 金币掉落
 * @text 选择初始位置播放动画时 一键出售播放动画的数量
 * @desc 1（多图标多个动画） 2（多图标只显示1个动画） 
 * @type Number
 * @min 1
 * @max 2
 * @default 1
 *
 * @param ShowAnimationsNum
 * @text 一键出售金币掉落生成个数
 * @parent 金币掉落
 * @type Number
 * @min 1
 * @max 10
 * @default 6
 *
 * @param WindowSet
 * @text ----出售商店窗口 参数设置----
 * @default
 * 
 * @param Window Background Image
 * @parent WindowSet
 * @desc 指定确认窗口的背景图片，空白为不指定，无需文件后缀 请在将文件放入文件夹img/sell_info/下
 * @default
 *
 * @param HelpWindowSet
 * @text --- 选择商店上方帮助窗口 参数设置 ---
 * @default
 *
 * @param H Window Image
 * @text  覆盖帮助窗口图片
 * @parent HelpWindowSet
 * @desc 覆盖帮助窗口显示内容为一张图片，空白为不指定，无需文件后缀 请在将文件放入文件夹img/sell_info/下
 * @default
 * 
 * @param SelectSellWindowSet
 * @text --- 选择出售后窗口 参数设置 ---
 * @default
 *
 * @param D Window Width
 * @parent SelectSellWindowSet
 * @desc 确认窗口的宽度
 * @default 465
 * 
 * @param D Window Height
 * @parent SelectSellWindowSet
 * @desc 确认窗口的高度
 * @default 280
 * 
 * @param TextSet
 * @text --- 自定义列表选项文本 ---
 * @default
 *
 * @param WindowSellAllText
 * @parent TextSet
 * @desc 初始选项中 全部选项标签的描述文本（若配置 全部标签不显示 则该配置文本不生效）
 * @default 全部
 *
 * @param WindowSellWeaponText
 * @parent TextSet
 * @desc 初始选项中 出售武器选项的描述文本
 * @default 出售武器
 *
 * @param WindowSellArmorText
 * @parent TextSet
 * @desc 初始选项中 出售防具选项的描述文本
 * @default 出售防具
 *
 * @param WindowCancelText
 * @parent TextSet
 * @desc 初始选项中 取消选项的描述文本
 * @default 取消
 *
 * @param SelectionText
 * @parent TextSet
 * @text 品质列表描述
 * @desc 品质列表描述 如 《装备品质：》+ xx品质
 * @default 装备品质： 
 * 
 * @param Selection2TextoneKey
 * @parent TextSet
 * @desc 操作选项列表中 一键出售选项的描述文本
 * @default 一键出售
 *
 * @param Selection2TextSone
 * @parent TextSet
 * @desc 操作选项列表中 选择出售选项的描述文本
 * @default 选择出售
 *
 * @param Selection2CancelText
 * @parent TextSet
 * @desc 操作选项列表中 取消选项的描述文本
 * @default 取消
 *
 * @param ShopNumberOKText
 * @parent TextSet
 * @desc 单项出售窗口中 出售选项的描述文本
 * @default 出售
 *
 * @param ShopNumberCancelText
 * @parent TextSet
 * @desc 单项出售窗口中 取消选项的描述文本
 * @default 取消
 */
/* ---------------------------------------------------------------------------
 * struct<DuangQuality>
 * ---------------------------------------------------------------------------
 */
/*~struct~DuangQuality:
 *
 * @param DuangQualityName
 * @text 装备品质名称
 * @desc 装备品质名称，可以使用文字代码。
 * @default 
 *
 * @param DuangQualityNote
 * @text 装备品质备注
 * @desc 装备品质备注，根据备注信息区分装备品质的显示！
 * @default 
 *
 * @param IsEnable
 * @text 是否显示
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 参数是否显示。
 * @default true
 *
 * @param QualityColor
 * @text 品质颜色
 * @desc 品质颜色
 * @default 
 */
/*~struct~ParamText:
 *
 * @param Name
 * @text 参数用语
 * @desc 参数的显示名称。
 * @default 
 *
 * @param Show
 * @text 参数是否显示
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 参数是否显示。
 * @default true
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

var Imported = Imported || {};
Imported.GT_ObjectInfoWindow = true;

var GT = GT || {};
GT.OIWin = GT.OIWin || {};
var Duang = Duang || {}; 
　Duang.parameters = PluginManager.parameters('DuangOnekey');

  Duang.price_icon_index =  Number(Duang.parameters['Gold Icon Index'] || 313);
  Duang.sale_price_rate =  Number(Duang.parameters['Sale price rate'] || 2);
  Duang.quick_sell = String(Duang.parameters['Quick Sell'] || "false") == "true";
  Duang.showAllTag = String(Duang.parameters['ShowAllTag'] || "false") == "true";
  
  Duang.showNullQuality = String(Duang.parameters['showNullQuality'] || "true") == "true";
  Duang.nullQualityText = String(Duang.parameters['nullQualityText'] || "无品质");
  Duang.nullQualityColor = String(Duang.parameters['nullQualityColor'] || "#FFFFFF");
 
  Duang.showSelectQualityColor = String(Duang.parameters['showSelectQualityColor'] || "true") == "true";

  Duang.d_Window_width = Number(Duang.parameters['D Window Width'] || 465);
  Duang.d_Window_height = Number(Duang.parameters['D Window Height'] || 280);;
  
  Duang.h_Window_img = String(Duang.parameters['H Window Image']);
  
  Duang.window_img = String(Duang.parameters['Window Background Image']);
  
  Duang.isShowAnimations = String(Duang.parameters['isShowAnimations'] || "true") == "true";
  Duang.showAnimationsy_ID =  Number(Duang.parameters['ShowAnimations ID']);
  Duang.animations_way =  Number(Duang.parameters['Animations way'] || 1);
  Duang.animations_way_number =  Number(Duang.parameters['Animations way number'] || 1);
  
  Duang.showgoldIconSize = Number(Duang.parameters['ShowgoldIconSize'] || 0.8);
  Duang.showAnimationsNum =  Number(Duang.parameters['ShowAnimationsNum'] || 6);
  Duang.showAnimations_X = Number(Duang.parameters['X - showAnimations'] || 750);
  Duang.showAnimations_Y = Number(Duang.parameters['Y - showAnimations'] || 580);
  

  Duang.windowSellAllText = String(Duang.parameters['WindowSellAllText'] || "全部");
  Duang.windowSellWeaponText = String(Duang.parameters['WindowSellWeaponText'] || "出售武器");
  Duang.windowSellArmorText = String(Duang.parameters['WindowSellArmorText'] || "出售防具");
  Duang.windowCancelText = String(Duang.parameters['WindowCancelText'] || "取消");
  
  Duang.selectionText = String(Duang.parameters['SelectionText'] || "装备品质：");
  
  Duang.selection2TextoneKey = String(Duang.parameters['Selection2TextoneKey'] || "一键出售");
  Duang.selection2TextSone = String(Duang.parameters['Selection2TextSone'] || "选择出售");
  Duang.selection2CancelText = String(Duang.parameters['Selection2CancelText'] || "取消");
  
  Duang.shopNumberOKText = String(Duang.parameters['ShopNumberOKText'] || "出售");
  Duang.shopNumberCancelText = String(Duang.parameters['ShopNumberCancelText'] || "取消");
//新建一个场景
Scene_Duang = function() {	
        this.initialize.apply(this, arguments);
};
Scene_Duang.prototype = Object.create(Scene_Shop.prototype);
Scene_Duang.prototype.constructor = Scene_Duang;

//初始化
Scene_Duang.prototype.initialize = function() {
        Scene_Shop.prototype.initialize.call(this);
};                                                          
 //创建命令窗口
Scene_Duang.prototype.createCommandWindow = function() {
		this._commandWindow = new Window_ShopCommand(this._goldWindow.x, this._purchaseOnly);
		this._commandWindow.y = this._helpWindow.height;
		this._commandWindow.setHandler('onesell',    this.commandBuy.bind(this));
		this._commandWindow.setHandler('sell',   this.commandSell.bind(this));
		this._commandWindow.setHandler('cancel', this.popScene.bind(this));
		this.addWindow(this._commandWindow);
};
	

Scene_Duang.prototype.createBackground = function() {
		if (Duang.window_img){
		this._backgroundSprite = new TilingSprite(ImageManager.loadDuangShellInfo(Duang.window_img));
		}else{
			 this._backgroundSprite = new Sprite();
			 this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
		}
        this._backgroundSprite.move(0, 0, Graphics.width, Graphics.height);
        this.addChild(this._backgroundSprite);  
};

//初始化

Window_Help.prototype.createWindow_img = function() {		
	if (Duang.h_Window_img){
		this._backgroundSprite = new Sprite(ImageManager.loadDuangShellInfo(Duang.h_Window_img));
		this._backgroundSprite.move(0, 0, Graphics.width, Graphics.height);
		this.addChild(this._backgroundSprite);  
	}
};



ImageManager.loadDuangShellInfo = function(filename) {
		return this.loadBitmap('img/sell_info/', filename, 0, true);
};
Scene_Duang.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);

    this.createHelpWindow();
    this.createGoldWindow();
    this.createCommandWindow();
    this.createDummyWindow();

  
	this.createWindow_DuangShop_Selection();
	this.createWindow_DuangShop_Selection2();
	this.createWindow_DuangShopSell();
	this.createNumberWindow();
};
//创建假人窗口
Scene_Duang.prototype.createDummyWindow = function() {
    var wy = this._commandWindow.y + this._commandWindow.height;
    var wh = Graphics.boxHeight - wy;
    this._dummyWindow = new Window_Base(0, wy, Graphics.boxWidth, wh);
    this.addWindow(this._dummyWindow);
};


//创建数值窗口
Scene_Duang.prototype.createNumberWindow = function() {
    var y = this._duangShopSell.y*1.3;
	var x = this._duangShopSell.width/3;
	var ww = Duang.d_Window_width;
	var wh = Duang.d_Window_height;
    this._numberDuangWindow = new Window_DuangShopNumber(x, y, ww,wh);
    this._numberDuangWindow.hide();
    this._numberDuangWindow.setHandler('ok',     this.onNumberOk.bind(this));
    this._numberDuangWindow.setHandler('cancel', this.onNumberCancel.bind(this));
	this._numberDuangWindow.deselect();
    this._numberDuangWindow.deactivate();
    this.addWindow(this._numberDuangWindow);
};
//创建金钱窗口
Scene_Duang.prototype.createGoldWindow = function() {
    this._goldWindow = new Window_Gold(0, this._helpWindow.height);
    this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
    this.addWindow(this._goldWindow);
};
//创建帮助窗口

Scene_Duang.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Help();
	this._helpWindow.createWindow_img();
    this.addWindow(this._helpWindow);
};
//创建命令窗口
Scene_Duang.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_DuangShopCommand(this._goldWindow.x, this._purchaseOnly);
    this._commandWindow.y = this._helpWindow.height;
	if(Duang.showAllTag){
	 this._commandWindow.setHandler('allsellw',    this.commandallsell.bind(this));
	}
    this._commandWindow.setHandler('onesellw',    this.commandonesell.bind(this));
    this._commandWindow.setHandler('onesella',   this.commandonesella.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};
Scene_Duang.prototype.createWindow_DuangShop_Selection = function() {
     var wy = this._helpWindow.height+this._commandWindow.height;
	 var wh =  wy;
			var sX = 0,
            sY = 0,
            sW = 330,
            sH = (Graphics.boxHeight - wy)-150;
    this._selectionWindow = new Window_DuangShop_Selection(sX, wh, sW, sH);
	this._selectionWindow.setHandler('ok', this.onSelection.bind(this));
		
    this._selectionWindow.setHandler('cancel', this.onSelectioncancel.bind(this));
	this._selectionWindow.hide();
    this._selectionWindow.deactivate();
    this.addWindow(this._selectionWindow);
};
//创建命令窗口
Scene_Duang.prototype.createWindow_DuangShop_Selection2 = function() {
	 var wh = Graphics.boxHeight -  (this._helpWindow.height+this._commandWindow.height+this._selectionWindow.height);
			var sX = 0,
            sY = this._helpWindow.height+this._commandWindow.height+this._selectionWindow.height,
            sW = (Graphics.boxWidth/3.5);
    this._selectionWindow2 = new Window_DuangShop_Selection2(sX, sY, 0, wh);
    this._selectionWindow2.setHandler('onesell',    this.onesell.bind(this));
    this._selectionWindow2.setHandler('view',   this.onesellview.bind(this));
    this._selectionWindow2.setHandler('cancel', this.onesellcancel.bind(this));
	this._selectionWindow2.hide();
	this._selectionWindow2.deselect();
    this._selectionWindow2.deactivate();
    this.addWindow(this._selectionWindow2);
};

Scene_Duang.prototype.createWindow_DuangShopSell = function() {
      var wy = this._selectionWindow2.height+this._selectionWindow.height;
	  var wh = Graphics.boxHeight - wy;
			var sX = this._selectionWindow.width,
            sY = 0,
            sW = Graphics.boxWidth-this._selectionWindow.width,
            sH = (Graphics.boxHeight/3)*2;
    this._duangShopSell = new Window_DuangShopSell(sX, wh, sW, wy);
	this._duangShopSell.setHelpWindow(this._helpWindow);
	this._duangShopSell.setHandler('ok',     this.onSellOk.bind(this));
    this._duangShopSell.setHandler('cancel', this.duangShopSellcancel.bind(this));
	this._duangShopSell.hide();
    this._duangShopSell.deactivate();
	this._selectionWindow.setBeastDataWindows(this._duangShopSell);
    this.addWindow(this._duangShopSell);
};



//当卖出确定
Scene_Duang.prototype.onSellOk = function() {
    this._item = this._duangShopSell.item();
	this._selectionWindow.deactivate();
	this._selectionWindow2.deactivate();
	this._duangShopSell.deactivate();
	var value = Math.round(this._item.price/Duang.sale_price_rate ) ;	
    this._numberDuangWindow.setup(this._item, value);
    this._numberDuangWindow.setCurrencyUnit(this.currencyUnit());
    this._numberDuangWindow.show();
	this._numberDuangWindow.select(0);
    this._numberDuangWindow.activate();  
};
//当数字确定
Scene_Duang.prototype.onNumberOk = function() {
    SoundManager.playShop();
	var number=this._numberDuangWindow.number();
	var value = Math.round(this._item.price/Duang.sale_price_rate ) ;
	this.sellEffects(1);
	$gameParty.gainGold(value);
	$gameParty.loseItem(this._item, number);
    this._goldWindow.refresh();
	this._numberDuangWindow.hide();
	this._numberDuangWindow.deactivate();
	this._duangShopSell.activate();
	if (Imported.YEP_ItemCore){
		if (DataManager.isIndependent(this._item)){
			if(typeof(this._item.baseItemId) != undefined&&this._item.baseItemId!=null){
				var baseItem=DataManager.getBaseItem(this._item);
				if (DataManager.isIndependent(baseItem)){
					if(typeof(baseItem.baseItemId) != undefined&&baseItem.baseItemId!=null){
						var basebaseItem=DataManager.getBaseItem(baseItem);
						if (DataManager.isIndependent(basebaseItem)){
							if(typeof(basebaseItem.baseItemId) != undefined&&basebaseItem.baseItemId!=null){
							DataManager.removeIndependentItem(basebaseItem);
							}									
						}	
						DataManager.removeIndependentItem(baseItem);									
					}	 
				}	
			DataManager.removeIndependentItem(this._item);						
			}
		}
	}
};
//当数字取消
Scene_Duang.prototype.onNumberCancel = function() {
    SoundManager.playCancel();
	this._numberDuangWindow.hide();
    this.activateSellWindow();
};
//活动卖出窗口
Scene_Duang.prototype.activateSellWindow = function() {
	this._duangShopSell.activate();
	this._duangShopSell.refresh();
};

Scene_Duang.prototype.commandallsell = function() {
	this._selectionWindow.show();
	this._selectionWindow.datatype='allweaponAndarmor';
	this._duangShopSell.show();
	this._selectionWindow2.show();
    this._selectionWindow.activate();
	var DuangQualityList = $dataQualitys;	
    for (var i = 0; i < DuangQualityList.length; i++) {
         var quality =DuangQualityList[i];
		 if(quality!=null){
			var num =	this._selectionWindow.selectnumber(i-1);
			if(num!=0){
				this._selectionWindow.select(i-1);
					if(Duang.quick_sell){
					  this._selectionWindow.deactivate();
					  this._selectionWindow2.activate();
					  this._selectionWindow2.select(0); 
					}
				return 	
			}
		}	
    }
	this._selectionWindow.select(0); 
}


Scene_Duang.prototype.commandonesell = function() {
	this._selectionWindow.show();
	this._selectionWindow.datatype='weapon';
	this._duangShopSell.show();
	this._selectionWindow2.show();
    this._selectionWindow.activate();
	var DuangQualityList = $dataQualitys;	
   for (var i = 0; i < DuangQualityList.length; i++) {
         var quality =DuangQualityList[i];
		 if(quality!=null){
			var num =	this._selectionWindow.selectnumber(i-1);
			if(num!=0){
				this._selectionWindow.select(i-1); 
					if(Duang.quick_sell){
					  this._selectionWindow.deactivate();
					  this._selectionWindow2.activate();
					  this._selectionWindow2.select(0); 
					}
				return 	
			}
		}	
    }
	this._selectionWindow.select(0); 
}
Scene_Duang.prototype.commandonesella = function() {
	this._selectionWindow.show();
	this._selectionWindow.datatype='armor';
	this._duangShopSell.show();
	this._selectionWindow2.show();
    this._selectionWindow.activate();
	var DuangQualityList = $dataQualitys;	
    for (var i = 0; i < DuangQualityList.length; i++) {
         var quality =DuangQualityList[i];
		 if(quality!=null){
			var num =	this._selectionWindow.selectnumber(i-1);
			if(num!=0){
				this._selectionWindow.select(i-1); 
					if(Duang.quick_sell){
					  this._selectionWindow.deactivate();
					  this._selectionWindow2.activate();
					  this._selectionWindow2.select(0); 
					}
				return 	
			}
		}	
    }
	this._selectionWindow.select(0); 
}

Scene_Duang.prototype.onSelection = function() {
	  this._selectionWindow.deactivate();
	  this._selectionWindow2.activate();
	  this._selectionWindow2.select(0); 
}
Scene_Duang.prototype.onSelectioncancel = function() {
	  this._selectionWindow.deactivate();
	  this._selectionWindow.deselect();
	  this._selectionWindow.hide();
	  this._duangShopSell.deactivate();
	  this._duangShopSell.deselect();
	  this._duangShopSell.hide();
	  this._selectionWindow2.deactivate();
	  this._selectionWindow2.deselect();
	  this._selectionWindow2.hide(); 
	  this._commandWindow.activate(); 

}


Scene_Duang.prototype.onSelection = function() {
	  this._selectionWindow.deactivate();
	  this._selectionWindow2.activate();
	  this._selectionWindow2.select(0); 
}
Scene_Duang.prototype.onDSelect = function() {
	 
}
Scene_Duang.prototype.onesell = function() {
	 this.Onekeysell();
}
Scene_Duang.prototype.onesellview = function() { 
	  this._selectionWindow2.deactivate();  
	  this._duangShopSell.activate(); 
	  this._duangShopSell.select(0); 
}
Scene_Duang.prototype.onesellcancel = function() {
	  this._duangShopSell.deactivate();
	  this._duangShopSell.deselect();  
	  this._selectionWindow2.deactivate();
	  this._selectionWindow2.deselect();
	  this._selectionWindow.activate(); 
}

Scene_Duang.prototype.duangShopSellcancel = function() {
	  this._duangShopSell.deactivate();
	  this._duangShopSell.deselect();  
	  this._selectionWindow2.activate(); 
}



Scene_Duang.prototype.Onekeysell = function(){	
	var list = this._duangShopSell._data;
		var money=0;
        for (var i = 0; i < list.length; i++) {
            var item =list[i];
			var value = Math.round(item.price/Duang.sale_price_rate);    
			money+=value;  
			$gameParty.loseItem(item, 1);
			if (Imported.YEP_ItemCore){
				if (DataManager.isIndependent(item)){
					if(typeof(item.baseItemId) != undefined&&item.baseItemId!=null){
						var baseItem=DataManager.getBaseItem(item);
						if (DataManager.isIndependent(baseItem)){
							if(typeof(baseItem.baseItemId) != undefined&&baseItem.baseItemId!=null){
								var basebaseItem=DataManager.getBaseItem(baseItem);
								if (DataManager.isIndependent(basebaseItem)){
									if(typeof(basebaseItem.baseItemId) != undefined&&basebaseItem.baseItemId!=null){
									DataManager.removeIndependentItem(basebaseItem);
									}									
								}	
								DataManager.removeIndependentItem(baseItem);									
							}	 
						}	
					DataManager.removeIndependentItem(item);						
					}
				}
			}
        }
	if(list.length>0){
		this.sellEffects(Duang.showAnimationsNum);
	}	
	$gameParty.gainGold(money);
    this._duangShopSell.refresh();
	this._goldWindow.refresh();
	this._selectionWindow2.deselect();
    this._selectionWindow2.deactivate();
    this._selectionWindow.activate();
};


DataManager.getDatabase = function(item) {
    if (!item) return [];
    if (DataManager.isItem(item)) return $dataItems;
    if (DataManager.isWeapon(item)) return $dataWeapons;
    if (DataManager.isArmor(item)) return $dataArmors;
    return [];
};
Scene_Duang.prototype.sellEffects = function(goldIconnum){	

		if(Duang.isShowAnimations){
		  var sp = new Sprite();
		  sp.bitmap = SceneManager.backgroundBitmap();
		  sp.move(Duang.showAnimations_X, Duang.showAnimations_Y, Graphics.width/2, Graphics.height/2);
		  this._sellSprite = new SpriteSellGolds(sp,goldIconnum);
		  this.addChild(this._sellSprite); 
			
		}
 
};
//-----------------------------------------------------------------------------
// Window_ShopCommand
// 窗口商店命令
// The window for selecting buy/sell on the shop screen.
// 商店画面为了选择买卖的窗口

function Window_DuangShopCommand() {
    this.initialize.apply(this, arguments);
}
//设置原形 
Window_DuangShopCommand.prototype = Object.create(Window_HorzCommand.prototype);
//设置创造者
Window_DuangShopCommand.prototype.constructor = Window_DuangShopCommand;
//初始化
Window_DuangShopCommand.prototype.initialize = function(width, purchaseOnly) {
    this._windowWidth = width;
    this._purchaseOnly = purchaseOnly;
    Window_HorzCommand.prototype.initialize.call(this, 0, 0);
};
//窗口宽
Window_DuangShopCommand.prototype.windowWidth = function() {
    return this._windowWidth;
};
//最大列
Window_DuangShopCommand.prototype.maxCols = function() {
	if(Duang.showAllTag){
	  return 4;
	}else{
	  return 3;
	}
    
};
//制作命令列表
Window_DuangShopCommand.prototype.makeCommandList = function() {
	if(Duang.showAllTag){
		this.addCommand(Duang.windowSellAllText,    'allsellw');
	}
	this.addCommand(Duang.windowSellWeaponText,    'onesellw');
	this.addCommand(Duang.windowSellArmorText,    'onesella');
	this.addCommand(Duang.windowCancelText, 'cancel');
};
//创建一个窗口
	function Window_DuangShop_Selection() {
		
        this.initialize.apply(this, arguments);
    }   
    Window_DuangShop_Selection.prototype = Object.create(Window_Selectable.prototype);	
    Window_DuangShop_Selection.prototype.constructor = Window_DuangShop_Selection;
    Window_DuangShop_Selection.lastTopRow = 0;
    Window_DuangShop_Selection.lastIndex  = 0;
	Window_DuangShop_Selection.datatype  = "weapon";
//初始化
    Window_DuangShop_Selection.prototype.initialize = function(x, y, width, height) {	
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);      
        this.refresh();
        this.setTopRow(Window_DuangShop_Selection.lastTopRow);
        this.select(Window_DuangShop_Selection.lastIndex);
        this.activate();
        
    };
    //返回最大列
    Window_DuangShop_Selection.prototype.maxCols = function() {
        return 1;
    };

    //返回项目
    Window_DuangShop_Selection.prototype.maxItems = function() {
        return this._list ? this._list.length : 0;
    };
	//为了重新定义窗口数据 留的方法
    Window_DuangShop_Selection.prototype.setBeastDataWindows = function(window1) {
        this._duangShopSell = window1;
        this.updateStatus();
    };
    
	//更新 
    Window_DuangShop_Selection.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        this.updateStatus();
    };
    //更新
    Window_DuangShop_Selection.prototype.updateStatus = function() {      
        var beast = this._list[this.index()];   
        if (this._duangShopSell) {
            this._duangShopSell.setBeast(beast);
        }
     
    };
   //循环遍历品质数组 绘制窗口列表数据项
    Window_DuangShop_Selection.prototype.refresh = function() {
        this._list = [];
		var DuangQualityList = $dataQualitys;		
        for (var i = 0; i < DuangQualityList.length; i++) {
            var quality =DuangQualityList[i];
			if(quality!=null){
				 this._list.push(quality);
			}	
        }
		//创建内容
        this.createContents();
		//绘制列表
        this.drawAllItems();
    };

    Window_DuangShop_Selection.prototype.drawItem = function(index) {
		
        var beast= this._list[index],
            rect = this.itemRectForText(index),
            id = index + 1,
            name;
		if(beast==null){
			return;
		}	
		//绘制
		this.changeTextColor(this.normalColor());
        this.drawText(Duang.selectionText , rect.x, rect.y, 0);
        this.resetTextColor();
		
		if(Duang.showSelectQualityColor){
			  //改变文字颜色
			var color=beast.QualityColor;
			this.changeTextColor(color);
		}
		name = beast.DuangQualityName ;
		var width = this.textWidth(name);
		var width1 = this.textWidth(Duang.selectionText);
	
        this.drawText(name, rect.x + width1, rect.y, width, 'left');

    };
	//选择
	Window_DuangShop_Selection.prototype.selectnumber = function(index) {
		if(this._duangShopSell){
			if(index!=-1){
				var beast= this._list[index];
				if(beast==null){
					return;
				}	
				var duangnote=beast.DuangQualityNote;
				this._duangShopSell.DuangQualityNote=duangnote;
				this._duangShopSell._category=this.datatype;
				return	this._duangShopSell.makeItemList();
			return;
			}
		}
		return	0;
	}
	Window_DuangShop_Selection.prototype.select = function(index) {
		// _索引 设置为 index
		this._index = index;
		//停留计数 = 0 
		this._stayCount = 0;
		//确定光标可见
		this.ensureCursorVisible();
		//更新光标
		this.updateCursor();
		//呼叫更新帮助
		this.callUpdateHelp();
		
		if(this._duangShopSell){

			if(index!=-1){
				var beast= this._list[index];
				if(beast==null){
					return;
				}	
				var duangnote=beast.DuangQualityNote;
				this._duangShopSell.DuangQualityNote=duangnote;
				this._duangShopSell._category=this.datatype;
				this._duangShopSell.makeItemList();
				this._duangShopSell.createContents();
				this._duangShopSell.drawAllItems();
			}
		}
		
	};

function Window_DuangShop_Selection2() {	
        this.initialize.apply(this, arguments);
    }   
    Window_DuangShop_Selection2.prototype = Object.create(Window_Command.prototype);	
    Window_DuangShop_Selection2.prototype.constructor = Window_DuangShop_Selection2;
    Window_DuangShop_Selection2.lastTopRow = 0;
    Window_DuangShop_Selection2.lastIndex  = 0;


    Window_DuangShop_Selection2.prototype.initialize = function(x, y, width, height) {	
        Window_Command.prototype.initialize.call(this, x, y, width, height); 
		this._wd=width;
		this._height=height;
    };

    Window_DuangShop_Selection2.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
     
    };
   //制作命令列表
Window_DuangShop_Selection2.prototype.makeCommandList = function() {
	this.addCommand(Duang.selection2TextoneKey,    'onesell');
	this.addCommand(Duang.selection2TextSone,   'view');
	this.addCommand(Duang.selection2CancelText, 'cancel');
};
  //窗口宽
Window_DuangShop_Selection2.prototype.windowWidth = function() {
    return 330;
}; 
//窗口高
Window_DuangShop_Selection2.prototype.windowHeight = function() {
    return 150;
};
//项目文本排列
Window_DuangShop_Selection2.prototype.itemTextAlign = function() {
    return 'left';
};
//-----------------------------------------------------------------------------
// 窗口

function Window_DuangShopSell() {
    this.initialize.apply(this, arguments);
}
Window_DuangShopSell.DuangQualityNote='none';

Window_DuangShopSell.prototype = Object.create(Window_ItemList.prototype);

Window_DuangShopSell.prototype.constructor = Window_ShopSell;

Window_DuangShopSell.prototype.initialize = function(x, y, width, height) {
    Window_ItemList.prototype.initialize.call(this, x, y, width, height);
};
//是允许
Window_DuangShopSell.prototype.isEnabled = function(item) {
    return item && item.price > 0;
};
Window_DuangShopSell.prototype.setBeast= function(beast) {
        this._beast = beast;
        this.refresh();
    };


//制作项目列表
Window_DuangShopSell.prototype.makeItemList = function() {
	this._data1=[];
	
	if(this._category=='allweaponAndarmor'){
		this._category='weapon';
		this._data = $gameParty.allItems().filter(function(item) {
			return this.includes(item);
		}, this);
		this._category='armor';
		this._data1 = $gameParty.allItems().filter(function(item) {
			return this.includes(item);
		}, this);
		this._data.push.apply(this._data, this._data1);
		this._category='allweaponAndarmor';
	}else{
		  this._data = $gameParty.allItems().filter(function(item) {
			return this.includes(item);
		  }, this);
	}
    if (this.includes(null)) {
        this._data.push(null);
    }
	
	if(this.DuangQualityNote!=null&&this.DuangQualityNote!=''&&this.DuangQualityNote!='none'){
		var newdata=[];
	
			if(this.DuangQualityNote=='DuangNullQuality'){
				for (var i = 0; i < this._data.length; i++) {
					var item = this._data[i];
					if(this.validNullQuality(item,this.DuangQualityNote)){
						 newdata.push(item);
					}
				}
				this._data=newdata;	
			
			}else{
				for (var i = 0; i < this._data.length; i++) {
				var item = this._data[i];
					if(this.valid(item,this.DuangQualityNote)){
						 newdata.push(item);
					}
				}
				this._data=newdata;		
			}		 
	}
	return this._data.length;
};
Window_DuangShopSell.prototype.valid = function (item,DuangQualityNote) {
	if(item.meta.length!=0){
		if(DuangQualityNote.indexOf("<") != -1&&DuangQualityNote.indexOf(":") != -1&&DuangQualityNote.indexOf(">") != -1){	
			if(DuangQualityNote.length>4){
				var a = DuangQualityNote.indexOf("<");
				var b = DuangQualityNote.indexOf(":", a);
				var a2 = DuangQualityNote.indexOf(">");
				var c = DuangQualityNote.substring(a+1,b);
				var cc = DuangQualityNote.substring(b+1,a2);
				if(item.meta[c]==cc){
					return true;
				}else{
					return false;
				}
			}			
		}		
	}
	var notedata = item.note.split(/[\r\n]+/);
	if(notedata.indexOf(DuangQualityNote) != -1){
		return true;
	}else{
		return false;
	}
}
Window_DuangShopSell.prototype.validNullQuality = function (item,DuangQualityNote) {
	var boo=true;
	for (var i = 0; i < $dataQualitys.length; ++i) {
        var qualityData = $dataQualitys[i];
        if (qualityData) {	
				  var DuangQualityNote = qualityData.DuangQualityNote;
				  if(this.valid(item,DuangQualityNote)){
					 boo=false;
					 break;
				  }		
		}
    }
	return boo;

}
//数字宽
Window_DuangShopSell.prototype.numberWidth = function() {
    return this.textWidth('000000');
};

//绘制项目
Window_DuangShopSell.prototype.drawItem = function(index) {
   var item = this._data[index];
    if (item) {   
        var rect = this.itemRect(index);
        rect.width -= this.textPadding()	
        this.changePaintOpacity(this.isEnabled(item));	
       
		var numberWidth = this.numberWidth();
		var iconBoxWidth = Window_Base._iconWidth + 4;
		if(rect.width <427){
			this.drawItemName(item, rect.x, rect.y, rect.width - iconBoxWidth );
		}else{
			rect.width=rect.width-numberWidth;
			rect.width = Math.round(rect.width*0.9); 
			this.drawItemName(item, rect.x, rect.y, rect.width - iconBoxWidth );
			this.drawItemprice(item, rect.x+rect.width+4, rect.y,numberWidth );
		}
        this.changePaintOpacity(1);
    }
};
//=============================
// * 添加标识
//=============================
var _Duang_drawItemName = Window_Base.prototype.drawItemName;
Window_Base.prototype.drawItemName = function(item, x, y, width) {
	this._Duang_isDrawingItemName = true;
	_Duang_drawItemName.call(this, item, x, y, width);
	this._Duang_isDrawingItemName = false;
}
//=============================
// * 根据标识修改颜色 解决drill 颜色核心对生成出来的物品颜色 显示不对的问题
//=============================

var Duang_drawText = Window_Base.prototype.drawText;
Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
	if(Imported.Drill_ItemTextColor){
		if( this._Duang_isDrawingItemName == true ){
			var item = this._drill_ITC_curItem;
			if( DataManager.isItem(item) ){
				var item__id = item.id;
				if( $dataItems[item.id].baseItemId ){ item__id = $dataItems[item.id].baseItemId; }	//Yep物品核心兼容
				var color = $gameSystem._drill_ITC_items[ item__id ];
				if(color == undefined){
					for (var i=0;i<3;i++)
						{ 
							if( $dataItems[item__id].baseItemId ){
								item__id = $dataItems[item__id].baseItemId;
								break
							}
						}
					var color = $gameSystem._drill_ITC_items[ item__id ];
				}
				
				
				if( color != "" ){this.changeTextColor(color); this._drill_ITC_isDrawingItemName=false;}
			}
			if( DataManager.isWeapon(item) ){
				var item__id = item.id;
				if( $dataWeapons[item.id].baseItemId ){ item__id = $dataWeapons[item.id].baseItemId; }
				var color = $gameSystem._drill_ITC_weapons[ item__id ];
				if(color == undefined){
					for (var i=0;i<3;i++)
						{ 
							if( $dataWeapons[item__id].baseItemId ){
								item__id = $dataWeapons[item__id].baseItemId;
								break
							}
						}
					var color = $gameSystem._drill_ITC_weapons[ item__id ];
				}
				if( color != "" ){this.changeTextColor(color); this._drill_ITC_isDrawingItemName=false;}
			}
			if( DataManager.isArmor(item) ){
				var item__id = item.id;
				if( $dataArmors[item.id].baseItemId ){ item__id = $dataArmors[item.id].baseItemId; }
				var color = $gameSystem._drill_ITC_armors[ item__id ];
				if(color == undefined){
					for (var i=0;i<3;i++)
						{ 
							if( $dataArmors[item__id].baseItemId ){
								item__id = $dataArmors[item__id].baseItemId;
								break
							}
						}
					var color = $gameSystem._drill_ITC_armors[ item__id ];
				}
				if( color != "" ){this.changeTextColor(color); this._drill_ITC_isDrawingItemName=false;}
			}
			if( DataManager.isSkill(item) ){
				var color = $gameSystem._drill_ITC_skills[ item.id ];
				if( color != "" ){this.changeTextColor(color);}
			}
		}
		Duang_drawText.call(this, text, x, y, maxWidth, align);
		if( this._Duang_isDrawingItemName == true ){
			this.resetTextColor();
		}
	}else{
		Duang_drawText.call(this, text, x, y, maxWidth, align);
	}
}

Window_DuangShopSell.prototype.drawItemprice = function(item, x, y, width) {
    if (this.needsNumber()) {	
		var value = Math.round(item.price/Duang.sale_price_rate) ;//显示价格
		 var xx = this.textWidth(value);
		this.drawCurrencyValue(value, item.currencyUnit, x, y, width);
    }
};
//绘制货币数值
Window_DuangShopSell.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
    var unitWidth = Math.min(80, this.textWidth(unit));
    this.resetTextColor();
    this.drawText(value, x, y, width, 'right');
    this.changeTextColor(this.systemColor());
    var iconBoxWidth = Window_Base._iconWidth + 4;
	this.drawIcon( Duang.price_icon_index,  x+width , y+2 );	
};

Window_DuangShopSell.prototype.drawIcon = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
};
//最大列数
Window_DuangShopSell.prototype.maxCols = function() {
    return 2;
};

//-----------------------------------------------------------------------------
// Window_DuangShopNumber
// 窗口


function Window_DuangShopNumber() {
    this.initialize.apply(this, arguments);
}

Window_DuangShopNumber.prototype = Object.create(Window_Command.prototype);

Window_DuangShopNumber.prototype.constructor = Window_DuangShopNumber;

Window_DuangShopNumber.prototype.initialize = function(x, y, width,height) {
    Window_Command.prototype.initialize.call(this, x, y);
 this.clearCommandList();
    this.makeCommandList();
    this.deactivate();
    this._item = null;
    this._price = 0;
    this._number = 1;
	this._height = height;
	this._width =width;
    this._currencyUnit = TextManager.currencyUnit;
	
};

Window_DuangShopNumber.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
   
};
//刷新
Window_DuangShopNumber.prototype.refresh = function() {
	
	this.clearCommandList();
    this.makeCommandList();
    this.createContents();
	 Window_Selectable.prototype.refresh.call(this);
    this.drawItemName(this._item, 0, this.itemY());
    this.drawMultiplicationSign();
	this.drawNumber();
	this.drawTotalPrice();
	
	// this.drawItem();
};
Window_DuangShopNumber.prototype.createBackground = function() {
		if (Duang.D_Window_img){
		this._backgroundSprite = new TilingSprite(ImageManager.loadDuangShellInfo(Duang.D_Window_img));
		}else{
			 this._backgroundSprite = new Sprite();
			 this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
		}
        this._backgroundSprite.move(0, 0, Graphics.width, Graphics.height);
        this.addChild(this._backgroundSprite);  
};
Window_DuangShopNumber.prototype.maxCols = function() {
    return 2;
};
Window_DuangShopNumber.prototype.itemTextAlign = function() {
    return 'center';
};

//数目
Window_DuangShopNumber.prototype.number = function() {
    return this._number;
};
//安装
Window_DuangShopNumber.prototype.setup = function(item,price) {
    this._item = item;
    this._price = price;
    this._number = 1;
    this.refresh();
};
Window_DuangShopNumber.prototype.windowWidth = function() {
    return Duang.d_Window_width;  
};

Window_DuangShopNumber.prototype.windowHeight = function() {
    return Duang.d_Window_height;
};



//设置货币单位
Window_DuangShopNumber.prototype.setCurrencyUnit = function(currencyUnit) {
    this._currencyUnit = currencyUnit;
    this.refresh();
};


Window_DuangShopNumber.prototype.makeCommandList = function() {	
  this.addCommand(Duang.shopNumberOKText, 'ok');
  this.addCommand(Duang.shopNumberCancelText, 'cancel');
 
};
Window_DuangShopNumber.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this._width / 4;
    rect.height = 55;
   // rect.x = index % maxCols * (rect.width + rect.width * 0.4) + rect.width * 0.8;
    rect.x =((this._width-(rect.width*2))/3)+(((this._width-(rect.width*2))/3)*index) + rect.width *index-18;
    rect.y = this.windowHeight() - 18 - rect.height;//Math.floor(index / maxCols) * rect.height - this._scrollY;
    return rect;
};

//绘制增加标记
Window_DuangShopNumber.prototype.drawMultiplicationSign = function() {
    var sign = '\u00d7';
    var width = this.textWidth(sign);
    var x = 300 ;
    var y = this.itemY();
    this.resetTextColor();
    this.drawText(sign, x, y, width);
	
};
//绘制数字
Window_DuangShopNumber.prototype.drawNumber = function() {
    var x = 200;
    var y = this.itemY();
    var width = 200 - this.textPadding();
    this.resetTextColor();
    this.drawText(this._number, x, y, width, 'right');
};
//绘制合计价格
Window_DuangShopNumber.prototype.drawTotalPrice = function() {
    var total = this._price * this._number;
    var width = this.contentsWidth() - this.textPadding();
    this.drawCurrencyValue(total, this._currencyUnit, 0, this.priceY(), width);
};
Window_DuangShopNumber.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
    var unitWidth = Math.min(80, this.textWidth(unit));
    this.resetTextColor();
    this.drawText(value, x-30, y, width - unitWidth - 6, 'right');
    this.changeTextColor(this.systemColor());
   // this.drawText(unit, x + width - unitWidth, y, unitWidth, 'right');
	this.drawIcon( Duang.price_icon_index, x + width - unitWidth-30, y );
	
};

Window_DuangShopNumber.prototype.itemY = function() {
    return Math.round(this.contentsHeight() / 2 - this.lineHeight() * 1.5);
};
//价格y
Window_DuangShopNumber.prototype.priceY = function() {
    return Math.round(this.contentsHeight() / 2 + this.lineHeight() / 2);
};
//按键y
Window_DuangShopNumber.prototype.buttonY = function() {
    return Math.round(this.priceY() + this.lineHeight() * 2.5);
};

//播放确定声音
Window_DuangShopNumber.prototype.playOkSound = function() {
};


function SpriteSellGolds() {
    this.initialize.apply(this, arguments);
};

SpriteSellGolds.prototype = Object.create(Sprite.prototype);
SpriteSellGolds.prototype.constructor = SpriteSellGolds;
// * Initialize
SpriteSellGolds.prototype.initialize = function(sprite,goldIconnum) {
    Sprite.prototype.initialize.call(this);	
    this._sprite = sprite;
    this._mode = 0;
    this.visible = false;
	this._goldIconnum = goldIconnum;
    this.createIcon();
	this._sprite1=null;
};

//==============================
// * Initialize
//==============================
SpriteSellGolds.prototype.gainDropItems = function() {
    var items = this._enemy._treasure.item;
    items.forEach(function(item) {
        $gameParty.gainItem(item, 1);
    });
};

// * create Icon
SpriteSellGolds.prototype.createIcon = function() {
    this._iconImg = ImageManager.loadSystem("IconSet")
    this._icons = [];
	this._spritelist=[];
    for (var i = 0; i < this._goldIconnum; i++) { 
            this._icons[i] = new Sprite_Base();
            this._icons[i].bitmap = this._iconImg;
            this._icons[i].iconIndex = Duang.price_icon_index;
            this._icons[i].index = i;
            this._icons[i].anchor.x = 0.5;
            this._icons[i].anchor.y = 1;
            this.refreshIcons(this._icons[i]);
            this.addChild(this._icons[i]);	
			if(Duang.showAnimationsy_ID){
				if(Duang.animations_way==1){
					this._icons[i].startAnimation($dataAnimations[Duang.showAnimationsy_ID], false, 0);
				}else{
					if(Duang.animations_way_number==1){
						this. _sprite1 = new Sprite_Base();
						this. _sprite1.x=this._icons[i].x;
						this._sprite1.y = -this._icons[i].intY+this._icons[i].y ;
						this.addChild(this._sprite1);	
						this._sprite1.startAnimation($dataAnimations[Duang.showAnimationsy_ID], false, 0);
						this._spritelist[i]=this. _sprite1;
					}else{
						if(i==0){
						this._sprite1 = new Sprite_Base();			
						this._sprite1.x=this._icons[i].x;
						this._sprite1.y = -this._icons[i].intY+this._icons[i].y ;
						this.addChild(this._sprite1);	
						this. _sprite1.startAnimation($dataAnimations[Duang.showAnimationsy_ID], false, 0);
						this._spritelist[i]=this. _sprite1;
						}
					}	
				}	
			}
    };
    this._icons.sort(function(a, b){return b.intY-a.intY});
    this.children.sort(function(a, b){return b.intY-a.intY});
    for (var i = 0; i < this._icons.length; i++) {
         this.refreshWait(this._icons[i],i,this._icons.length);
    };
};
// * refresh Wait
SpriteSellGolds.prototype.refreshWait = function(sprite,index,maxv) {
    var mv = maxv * 20;
    var mvt = mv - (20 * index)
    sprite.wait = 20 + mvt;
};
// * refresh Icons
SpriteSellGolds.prototype.refreshIcons = function(sprite) {
    var w = Window_Base._iconWidth;
    var h = Window_Base._iconHeight;
    var iconindex = sprite.iconIndex;
    var sx = iconindex % 16 * w;
    var sy = Math.floor(iconindex / 16) * h;
    var hr = Math.randomInt(h);
    sprite.setFrame(sx,sy,w,h);
    sprite.intY = ((this._sprite.height / 3) + hr) - h;
    sprite.dr = 60;
    sprite.dy = 15;
    sprite.y = -40;
    sprite.ry = sprite.y + sprite.intY;
    var randx = (Math.random() * 0.5) + (sprite.index / 8);
    var rands = Math.randomInt(2);
    sprite.sx = rands === 0 ? randx : -randx;
    sprite.scale.x = Duang.showgoldIconSize;
    sprite.scale.y = sprite.scale.x;
};

// * Update Bounce
SpriteSellGolds.prototype.updateBounce = function(sprite) {
     sprite.dy += 0.6;
     sprite.ry += sprite.dy;
     if (sprite.ry >= 0) {
         sprite.ry = 0;
         sprite.dy *= -0.7;
     };
     sprite.y = -sprite.intY + Math.round(sprite.ry);
     if (sprite.y < -sprite.intY) {sprite.x += sprite.sx};	
     if (sprite.y === -sprite.intY) {this.updateFade(sprite)}; 
};

// * Update Float
SpriteSellGolds.prototype.updateFloat= function(sprite) {
    sprite.wait--;
    if (sprite.wait > 0) {return};	
    sprite.y -= 3
    sprite.opacity -= 8; 
};

// * Update Animation
SpriteSellGolds.prototype.updateAnimation= function(sprite) {
   if (this._mode === 1) {
       this.updateFloat(sprite);
   } else {
       this.updateBounce(sprite);
   };
};
// * Update Fade
SpriteSellGolds.prototype.updateFade = function(sprite) {
    sprite.wait--;
    if (sprite.wait > 0) {return};
    sprite.opacity -= 15;
    sprite.scale.x -= 0.05
    sprite.scale.y += 0.15
};
// * Update Sprites
SpriteSellGolds.prototype.updateSprites = function(sprite,i) {
     this.visible = true;
     this.updateAnimation(sprite);
     if (sprite.opacity <= 0) {	 	
		 if(this._spritelist[i]){
			this._spritelist[i].visible = false ;
		 }
		 sprite.visible = false};
};
// * Update
SpriteSellGolds.prototype.update = function() {
    Sprite.prototype.update.call(this);	
    this.x = this._sprite.x;
    this.y = this._sprite.y;
    if (this._iconImg.isReady()) {
        for (var i = 0; i < this._icons.length; i++) {
            if (this._icons[i].visible) {
				this.updateSprites(this._icons[i],i)
				};
        };
    };
};
// ----------------------------------------------------------------------------------------------------------------------------
// Plugin Commands
// ----------------------------------------------------------------------------------------------------------------------------
// 代码指令 相关   
  var duang_pluginCommand = Game_Interpreter.prototype.pluginCommand;
   Game_Interpreter.prototype.pluginCommand = function(command, args) {
        if (command === 'DuangOnekey') {
            switch (args[0]) {
                case 'open':
                    SceneManager.push(Scene_Duang);
                break;
            }
        }else {
            duang_pluginCommand.call(this, command, args);
        }
    };
	
	
//=============================================================================
// DataManager
//=============================================================================	
var $dataQualitys = [null];
Duang.totalCount = 0;

DataManager.qualityDatabaseAdd = function(id, data) {
	
    if (!data) return $dataQualitys.push(null);
    var DuangQualityName = data['DuangQualityName'];
    var DuangQualityNote = data['DuangQualityNote'];
	var QualityColor = data['QualityColor'];
	var IsEnable = data['IsEnable'];
    var DuangQuality = {
        DuangQualityName: DuangQualityName,
		QualityColor:QualityColor,
        id: id,
        DuangQualityNote: DuangQualityNote,
        IsEnable: IsEnable
    };
	if(IsEnable=='true'){
		$dataQualitys.push(DuangQuality);
	}
    Duang.totalCount += 1;
};	
	
DataManager.qualityDatabaseCreate = function() {
	if(Duang.showNullQuality){
		var nullquality= {"DuangQualityName":Duang.nullQualityText,"DuangQualityNote":"DuangNullQuality","QualityColor":Duang.nullQualityColor,"IsEnable":"true"}
		this.qualityDatabaseAdd(0, nullquality);
	}
    for (var i = 1; i <= 15; ++i) {
        var qualityData = JSON.parse(Duang.parameters['DuangQuality ' + i] || 'null');
        if (qualityData) {
			this.qualityDatabaseAdd(i, qualityData);
		}
    }

};

Duang.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
   Duang.DataManager_isDatabaseLoaded.call(this); 
    if (!Duang._loaded) {

		this.qualityDatabaseCreate();
        Duang._loaded = true;
    }
    return true;
};