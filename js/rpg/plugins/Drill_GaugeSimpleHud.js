//=============================================================================
// Drill_GaugeSimpleHud.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        地图UI - 简单生命框
 * @author Drill_up
 * 
 * @Drill_LE_param "生命框-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_GSH_button_length"
 * 
 * @help  
 * =============================================================================
 * +++ Drill_GaugeSimpleHud +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在地图界面中快速显示一个或多个生命框。
 * 【支持插件关联资源的打包、加密】
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件必须基于核心。
 * 基于：
 *   - Drill_CoreOfGaugeMeter       系统 - 参数条核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于地图的各个层级。
 * 生命框：
 *   (1.生命框是一个基于 参数条核心 样式的贴图，具体数字配置方式
 *      可以去看看参数条核心。
 *   (2.你可以将生命框放置在地图层级的 下层、中层、上层、图片层、
 *      最顶层 中。
 *   (3.每个生命框只能绑定到一个物体上。
 * 设计：
 *   (1.生命框包含两个参数条，分别为 生命条 和 魔法条 。
 *      这两个参数条不仅仅能表现 生命值、魔法值，还可以绑定变量。
 *      你可以通过绑定变量，表现一个 可破坏物 的生命条。
 *   (2.你可以把显示 玩家 数据的生命框，挂到别的事件头上 。
 *      生命框与 高级变量框 的原理相似，
 *      都是以框为主体，只提供 参数条 显示功能，不操作数据本身。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__ui （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__ui文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 需要配置资源文件：
 * 
 * 资源-固定框背景
 * 资源-固定框前景
 * 
 * 注意，参数条的资源设置，需要在参数条核心中配置。
 * 参数条核心 的资源路径为 img/Special__meter 。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过插件指令控制生命框集合：
 * 
 * 插件指令：>地图简单生命框 : 生命框[1] : 绑定到 : 玩家
 * 插件指令：>地图简单生命框 : 生命框[1] : 绑定到 : 本事件
 * 插件指令：>地图简单生命框 : 生命框[1] : 绑定到 : 事件[10]
 * 插件指令：>地图简单生命框 : 生命框[1] : 绑定到 : 事件变量[21]
 * 插件指令：>地图简单生命框 : 生命框[1] : 去除绑定
 * 插件指令：>地图简单生命框 : 去除全部生命框绑定
 * 
 * 插件指令：>地图简单生命框 : 生命框[1] : 修改平移 : 位置[-24,24]
 * 插件指令：>地图简单生命框 : 生命框[1] : 修改生命值-绑定类型 : 固定值
 * 插件指令：>地图简单生命框 : 生命框[1] : 修改生命值-变量 : 21
 * 插件指令：>地图简单生命框 : 生命框[1] : 修改魔法值-绑定类型 : 固定值
 * 插件指令：>地图简单生命框 : 生命框[1] : 修改魔法值-变量 : 21
 * 插件指令：>地图简单生命框 : 生命框[1] : 修改生命段上限-绑定类型 : 固定值
 * 插件指令：>地图简单生命框 : 生命框[1] : 修改生命段上限-固定值 : 270
 * 插件指令：>地图简单生命框 : 生命框[1] : 修改生命段上限-变量 : 21
 * 插件指令：>地图简单生命框 : 生命框[1] : 修改魔法段上限-绑定类型 : 固定值
 * 插件指令：>地图简单生命框 : 生命框[1] : 修改魔法段上限-固定值 : 270
 * 插件指令：>地图简单生命框 : 生命框[1] : 修改魔法段上限-变量 : 21
 * 
 * 1.每个生命框都是单独的对象，一个生命框只能绑定到一个物体上。
 * 2.生命框中的 生命值、魔法值 可以表示玩家领队的实际生命，
 *   也可以通过绑定变量，来表示一些事件的生命。
 * 
 * -----------------------------------------------------------------------------
 * ----插件性能
 * 测试仪器：   4G 内存，Intel Core i5-2520M CPU 2.5GHz 处理器
 *              Intel(R) HD Graphics 3000 集显 的垃圾笔记本
 *              (笔记本的3dmark综合分：571，鲁大师综合分：48456)
 * 总时段：     20000.00ms左右
 * 对照表：     0.00ms  - 40.00ms （几乎无消耗）
 *              40.00ms - 80.00ms （低消耗）
 *              80.00ms - 120.00ms（中消耗）
 *              120.00ms以上      （高消耗）
 * 工作类型：   持续执行
 * 时间复杂度： o(n^3)*o(贴图处理) 每帧
 * 测试方法：   开启玩家和事件的5个简单生命框，并进行测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【23.96ms】
 *              100个事件的地图中，平均消耗为：【20.53ms】
 *               50个事件的地图中，平均消耗为：【12.52ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.需要注意的是，测试中配置的简单生命条，不含游标、不含粒子效果。
 *   如果配置的内容要复杂的多，那么消耗肯定会陡增。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 *
 *
 * 
 * @param ----生命框集合----
 * @default 
 * 
 * @param 生命框-1
 * @parent ----生命框集合----
 * @type struct<DrillGSHStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 生命框-2
 * @parent ----生命框集合----
 * @type struct<DrillGSHStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 生命框-3
 * @parent ----生命框集合----
 * @type struct<DrillGSHStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 生命框-4
 * @parent ----生命框集合----
 * @type struct<DrillGSHStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 生命框-5
 * @parent ----生命框集合----
 * @type struct<DrillGSHStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 生命框-6
 * @parent ----生命框集合----
 * @type struct<DrillGSHStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 生命框-7
 * @parent ----生命框集合----
 * @type struct<DrillGSHStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 生命框-8
 * @parent ----生命框集合----
 * @type struct<DrillGSHStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 生命框-9
 * @parent ----生命框集合----
 * @type struct<DrillGSHStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 生命框-10
 * @parent ----生命框集合----
 * @type struct<DrillGSHStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 生命框-11
 * @parent ----生命框集合----
 * @type struct<DrillGSHStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 生命框-12
 * @parent ----生命框集合----
 * @type struct<DrillGSHStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 生命框-13
 * @parent ----生命框集合----
 * @type struct<DrillGSHStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 生命框-14
 * @parent ----生命框集合----
 * @type struct<DrillGSHStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 生命框-15
 * @parent ----生命框集合----
 * @type struct<DrillGSHStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 生命框-16
 * @parent ----生命框集合----
 * @type struct<DrillGSHStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 生命框-17
 * @parent ----生命框集合----
 * @type struct<DrillGSHStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 生命框-18
 * @parent ----生命框集合----
 * @type struct<DrillGSHStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 生命框-19
 * @parent ----生命框集合----
 * @type struct<DrillGSHStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * @param 生命框-20
 * @parent ----生命框集合----
 * @type struct<DrillGSHStyle>
 * @desc 漂浮数字的详细配置信息。
 * @default 
 * 
 * 
 */
/*~struct~DrillGSHStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的漂浮数字==
 *
 * @param ---参数值---
 * @desc 
 * 
 * @param 生命值为零后框是否消失
 * @parent ---参数值---
 * @type boolean
 * @on 消失
 * @off 不消失
 * @desc true - 消失，false - 不消失
 * @default false
 *
 * @param 生命值-绑定类型
 * @parent ---参数值---
 * @type select
 * @option 领队角色的生命值
 * @value 领队角色的生命值
 * @option 变量
 * @value 变量
 * @desc 生命值的绑定类型。
 * @default 领队角色的生命值
 *
 * @param 生命值-变量
 * @parent 生命值-绑定类型
 * @type variable
 * @min 0
 * @desc 用于表示生命值的 变量的值。
 * @default 0
 *
 * @param 魔法值-绑定类型
 * @parent ---参数值---
 * @type select
 * @option 领队角色的魔法值
 * @value 领队角色的魔法值
 * @option 变量
 * @value 变量
 * @desc 生命值的绑定类型。
 * @default 领队角色的魔法值
 *
 * @param 魔法值-变量
 * @parent 魔法值-绑定类型
 * @type variable
 * @min 0
 * @desc 参数条的样式，对应参数条核心中的配置的id值。
 * @default 0
 *
 * @param ---段上限---
 * @desc 
 *
 * @param 生命段上限-绑定类型
 * @parent ---段上限---
 * @type select
 * @option 领队角色的生命上限
 * @value 领队角色的生命上限
 * @option 变量
 * @value 变量
 * @option 固定值
 * @value 固定值
 * @desc 段上限的绑定类型。
 * @default 领队角色的生命上限
 *
 * @param 生命段上限-变量
 * @parent 生命段上限-绑定类型
 * @type variable
 * @min 0
 * @desc 用于表示生命 段上限 的 变量的值。
 * @default 0
 *
 * @param 生命段上限-固定值
 * @parent 生命段上限-绑定类型
 * @type number
 * @min 1
 * @desc 用于表示生命 段上限 的值。
 * @default 100
 *
 * @param 魔法段上限-绑定类型
 * @parent ---段上限---
 * @type select
 * @option 领队角色的魔法上限
 * @value 领队角色的魔法上限
 * @option 变量
 * @value 变量
 * @option 固定值
 * @value 固定值
 * @desc 段上限的绑定类型。
 * @default 领队角色的魔法上限
 *
 * @param 魔法段上限-变量
 * @parent 魔法段上限-绑定类型
 * @type variable
 * @min 0
 * @desc 用于表示生命 段上限 的 变量的值。
 * @default 0
 *
 * @param 魔法段上限-固定值
 * @parent 魔法段上限-绑定类型
 * @type number
 * @min 1
 * @desc 用于表示生命 段上限 的值。
 * @default 100
 *
 * @param ---层级---
 * @desc 
 *
 * @param 平移-位置 X
 * @parent ---层级---
 * @desc 以玩家/事件的位置为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 * 
 * @param 平移-位置 Y
 * @parent ---层级---
 * @desc 以玩家/事件的位置为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 地图层级
 * @parent ---层级---
 * @type select
 * @option 下层
 * @value 下层
 * @option 中层
 * @value 中层
 * @option 上层
 * @value 上层
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 漂浮数字所在的地图层级。
 * @default 图片层
 *
 * @param 图片层级
 * @parent ---层级---
 * @desc 时间数字所处在的图片层级。
 * @default 12
 * 
 * 
 * @param ----参数条----
 * @desc 
 * 
 * @param 生命-是否显示参数条
 * @parent ----参数条----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param 生命-参数条样式
 * @parent 生命-是否显示参数条
 * @type number
 * @min 0
 * @desc 参数条的样式，对应参数条核心中的配置的id值。
 * @default 0
 *
 * @param 生命-平移-参数条 X
 * @parent 生命-是否显示参数条
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 10
 *
 * @param 生命-平移-参数条 Y
 * @parent 生命-是否显示参数条
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 10
 * 
 * @param 魔法-是否显示参数条
 * @parent ----参数条----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param 魔法-参数条样式
 * @parent 魔法-是否显示参数条
 * @type number
 * @min 0
 * @desc 参数条的样式，对应参数条核心中的配置的id值。
 * @default 0
 *
 * @param 魔法-平移-参数条 X
 * @parent 魔法-是否显示参数条
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 10
 *
 * @param 魔法-平移-参数条 Y
 * @parent 魔法-是否显示参数条
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 10
 *
 * 
 * @param ----外框----
 * @desc 
 *
 * @param 资源-固定框背景
 * @parent ----外框----
 * @desc 固定框背景的图片资源。
 * @default 地图生命框背景-默认
 * @require 1
 * @dir img/Map__ui/
 * @type file
 *
 * @param 平移-固定框背景 X
 * @parent ----外框----
 * @desc 修正校对背景的位置用，x轴方向平移，单位像素。
 * @default 0
 *
 * @param 平移-固定框背景 Y
 * @parent ----外框----
 * @desc 修正校对背景的位置用，y轴方向平移，单位像素。
 * @default 0
 *
 * @param 资源-固定框前景
 * @parent ----外框----
 * @desc 固定框前景的图片资源，可以遮住生命条、魔法条、怒气条。
 * @default 地图生命框前景-默认
 * @require 1
 * @dir img/Map__ui/
 * @type file
 *
 * @param 平移-固定框前景 X
 * @parent ----外框----
 * @desc 修正校对前景的位置用，x轴方向平移，单位像素。
 * @default 0
 *
 * @param 平移-固定框前景 Y
 * @parent ----外框----
 * @desc 修正校对前景的位置用，y轴方向平移，单位像素。
 * @default 0
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		GSH (Gauge_Simple_Hud)
//		临时全局变量	DrillUp.g_GSH_xxx
//		临时局部变量	this._drill_GSH_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^3)*o(贴图处理)  每帧
//		性能测试因素	UI管理层
//		性能测试消耗	12.52ms
//		最坏情况		开了大量生命框，并且开了大量其他参数条相关的框，计算量会非常大。
//		备注			暂无
//
//插件记录：
//		★大体框架与功能如下：
//			简单生命框：
//				->结构
//					->生命条
//					->魔法条
//					->固定框背景
//					->固定框前景
//				->插件指令控制
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.【镜头兼容】该插件的漂浮数字如果放在 下层、中层、上层、图片层 ，需要对其进行相关的镜头缩放控制。
//
//		★其它说明细节：
//			1.漂浮文字与 缓冲数字物体 不一样，不需要长期存储显示，所以也长用于短期的数字显示。
//			2.移动镜头时，漂浮数字会被移走，因为漂浮数字只在最开始时锁定地图位置，并不绑定于地图。
//
//		★存在的问题：
//			暂无
//
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_GaugeSimpleHud = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_GaugeSimpleHud');
	
	
	//==============================
	// * 变量获取 - 生命框
	//				（~struct~DrillGSHStyle）
	//==============================
	DrillUp.drill_GSH_initParam = function( dataFrom ) {
		var data = {};
		// > 参数值
		data['autoHide'] = String( dataFrom["生命值为零后框是否消失"] || "false") === "true";
		data['hpValue_type'] = String( dataFrom["生命值-绑定类型"] || "领队角色的生命值");
		data['hpValue_variable'] = Number( dataFrom["生命值-变量"] || 0);
		data['mpValue_type'] = String( dataFrom["魔法值-绑定类型"] || "领队角色的魔法值");
		data['mpValue_variable'] = Number( dataFrom["魔法值-变量"] || 0);
		// > 段上限
		data['hpLevel_type'] = String( dataFrom["生命段上限-绑定类型"] || "固定值");
		data['hpLevel_max'] = Number( dataFrom["生命段上限-固定值"] || 100);
		data['hpLevel_variable'] = Number( dataFrom["生命段上限-变量"] || 0);
		data['mpLevel_type'] = String( dataFrom["魔法段上限-绑定类型"] || "固定值");
		data['mpLevel_max'] = Number( dataFrom["魔法段上限-固定值"] || 100);
		data['mpLevel_variable'] = Number( dataFrom["魔法段上限-变量"] || 0);
		// > 层级
		data['bind_char'] = 0;
		data['bind_map'] = 0;
		data['x'] = Number( dataFrom["平移-位置 X"] || 0);
		data['y'] = Number( dataFrom["平移-位置 Y"] || 0);
		data['layer_index'] = String( dataFrom["地图层级"] || "图片层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		// > 参数条
		data['hp_meter_enable'] = String( dataFrom["生命-是否显示参数条"] || "true") === "true";
		data['hp_meter_id'] = Number( dataFrom["生命-参数条样式"] || 0 );
		data['hp_meter_x'] = Number( dataFrom["生命-平移-参数条 X"] || 0 );
		data['hp_meter_y'] = Number( dataFrom["生命-平移-参数条 Y"] || 0 );
		data['mp_meter_enable'] = String( dataFrom["魔法-是否显示参数条"] || "true") === "true";
		data['mp_meter_id'] = Number( dataFrom["魔法-参数条样式"] || 0 );
		data['mp_meter_x'] = Number( dataFrom["魔法-平移-参数条 X"] || 0 );
		data['mp_meter_y'] = Number( dataFrom["魔法-平移-参数条 Y"] || 0 );
		// > 外框
		data['background_src'] = String( dataFrom["资源-固定框背景"] || "" );
		data['background_x'] = Number( dataFrom["平移-固定框背景 X"] || 0 );
		data['background_y'] = Number( dataFrom["平移-固定框背景 Y"] || 0 );
		data['foreground_src'] = String( dataFrom["资源-固定框前景"] || "" );
		data['foreground_x'] = Number( dataFrom["平移-固定框前景 X"] || 0 );
		data['foreground_y'] = Number( dataFrom["平移-固定框前景 Y"] || 0 );
		return data;
	}
	
	
	/*-----------------生命框集合------------------*/
	DrillUp.g_GSH_button_length = 20;
	DrillUp.g_GSH_button = [];
	for (var i = 0; i < DrillUp.g_GSH_button_length; i++) {
		if( DrillUp.parameters["生命框-" + String(i+1) ] != undefined &&
			DrillUp.parameters["生命框-" + String(i+1) ] != "" ){
			DrillUp.g_GSH_button[i] = JSON.parse(DrillUp.parameters["生命框-" + String(i+1) ]);
			DrillUp.g_GSH_button[i] = DrillUp.drill_GSH_initParam( DrillUp.g_GSH_button[i] );
			DrillUp.g_GSH_button[i]['id'] = i+1;
			DrillUp.g_GSH_button[i]['inited'] = true;
		}else{
			DrillUp.g_GSH_button[i] = DrillUp.drill_GSH_initParam( {} );
			DrillUp.g_GSH_button[i]['id'] = i+1;
			DrillUp.g_GSH_button[i]['inited'] = false;
		}
	}


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfGaugeMeter ){
	
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MapUi = function(filename) {
    return this.loadBitmap('img/Map__ui/', filename, 0, true);
};
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_GSH_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_GSH_pluginCommand.call(this, command, args);
	if(command === ">地图简单生命框"){
		
		/*-----------------去除绑定------------------*/
		if( args.length == 2 ){		
			if( type == "去除全部生命框绑定" ){	
				for( var i=0; i < $gameSystem._drill_GSH_dataTank.length; i++ ){
					$gameSystem._drill_GSH_dataTank[ i ]['bind_char'] = 0;
					$gameSystem._drill_GSH_dataTank[ i ]['bind_map'] = 0;
				}
			}
		}
		if( args.length == 4 ){		
			var temp1 = String(args[1]);
			var type = String(args[3]);
			temp1 = temp1.replace("生命框[","");
			temp1 = temp1.replace("]","");
			temp1 = Number(temp1) - 1;
			if( type == "去除绑定" ){	
				$gameSystem._drill_GSH_dataTank[ temp1 ]['bind_char'] = 0;
				$gameSystem._drill_GSH_dataTank[ temp1 ]['bind_map'] = 0;
			}
		}
		
		/*-----------------绑定到------------------*/
		if( args.length == 6 ){		
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			temp1 = temp1.replace("生命框[","");
			temp1 = temp1.replace("]","");
			temp1 = Number(temp1) - 1;
			
			if( type == "绑定到" ){		//>地图简单生命框 : 生命框[1] : 绑定到 : 玩家
				if( temp2.indexOf("事件变量[") != -1 ){
					temp2 = temp2.replace("事件变量[","");
					temp2 = temp2.replace("]","");
					var e_id = $gameVariables.value(Number(temp2));
					if( $gameMap.drill_GSH_isEventExist( e_id ) == false ){ return; }
					$gameSystem._drill_GSH_dataTank[ temp1 ]['bind_char'] = e_id;
					$gameSystem._drill_GSH_dataTank[ temp1 ]['bind_map'] = this._mapId;
				}
				if( temp2.indexOf("事件[") != -1 ){
					temp2 = temp2.replace("事件[","");
					temp2 = temp2.replace("]","");
					var e_id = Number(temp2);
					if( $gameMap.drill_GSH_isEventExist( e_id ) == false ){ return; }
					$gameSystem._drill_GSH_dataTank[ temp1 ]['bind_char'] = e_id;
					$gameSystem._drill_GSH_dataTank[ temp1 ]['bind_map'] = this._mapId;
				}
				if( temp2 == "本事件" ){
					$gameSystem._drill_GSH_dataTank[ temp1 ]['bind_char'] = this._eventId;
					$gameSystem._drill_GSH_dataTank[ temp1 ]['bind_map'] = this._mapId;
				}
				if( temp2 == "玩家" ){
					$gameSystem._drill_GSH_dataTank[ temp1 ]['bind_char'] = -2;
					$gameSystem._drill_GSH_dataTank[ temp1 ]['bind_map'] = 0;
				}
			}
			
			if( type == "修改平移" ){	
				var temp_arr = temp2.split(/[,，]/);
				if( temp_arr.length >= 2 ){
					$gameSystem._drill_GSH_dataTank[ temp1 ]['x'] = Number(temp_arr[0]);
					$gameSystem._drill_GSH_dataTank[ temp1 ]['y'] = Number(temp_arr[1]);
				}
			}
			if( type == "修改生命值-绑定类型" ){	
				$gameSystem._drill_GSH_dataTank[ temp1 ]['hpValue_type'] = temp2;
			}
			if( type == "修改生命值-变量" ){	
				$gameSystem._drill_GSH_dataTank[ temp1 ]['hpValue_variable'] = Number(temp2);
			}
			if( type == "修改魔法值-绑定类型" ){	
				$gameSystem._drill_GSH_dataTank[ temp1 ]['mpValue_type'] = temp2;
			}
			if( type == "修改魔法值-变量" ){	
				$gameSystem._drill_GSH_dataTank[ temp1 ]['mpValue_variable'] = Number(temp2);
			}
			
			if( type == "修改生命段上限-绑定类型" ){	
				$gameSystem._drill_GSH_dataTank[ temp1 ]['hpLevel_type'] = temp2;
			}
			if( type == "修改生命段上限-固定值" ){	
				$gameSystem._drill_GSH_dataTank[ temp1 ]['hpLevel_max'] = Number(temp2);
			}
			if( type == "修改生命段上限-变量" ){	
				$gameSystem._drill_GSH_dataTank[ temp1 ]['hpLevel_variable'] = Number(temp2);
			}
			if( type == "修改魔法段上限-绑定类型" ){	
				$gameSystem._drill_GSH_dataTank[ temp1 ]['mpLevel_type'] = temp2;
			}
			if( type == "修改魔法段上限-固定值" ){	
				$gameSystem._drill_GSH_dataTank[ temp1 ]['mpLevel_max'] = Number(temp2);
			}
			if( type == "修改魔法段上限-变量" ){	
				$gameSystem._drill_GSH_dataTank[ temp1 ]['mpLevel_variable'] = Number(temp2);
			}
		}
	};
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_GSH_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_GaugeSimpleHud.js 地图UI - 简单生命框】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 存储数据初始化
//=============================================================================
var _drill_GSH_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_drill_GSH_sys_initialize.call(this);
	
	this._drill_GSH_dataTank = [];			//生命框数据容器
	for(var i = 0; i< DrillUp.g_GSH_button.length ;i++){
		var temp_data = DrillUp.g_GSH_button[i];
		this._drill_GSH_dataTank[i] = JSON.parse(JSON.stringify( temp_data ));	//深拷贝数据
	}
}


//=============================================================================
// ** 地图层级
//=============================================================================
//==============================
// ** 下层
//==============================
var _drill_GSH_layer_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	_drill_GSH_layer_createParallax.call(this);		//rmmv远景 < 下层 < rmmv图块
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// ** 中层
//==============================
var _drill_GSH_layer_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_GSH_layer_createTilemap.call(this);		//rmmv图块 < 中层 < rmmv玩家
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// ** 上层
//==============================
var _drill_GSH_layer_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_GSH_layer_createDestination.call(this);	//rmmv鼠标目的地 < 上层 < rmmv天气
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// ** 图片层
//==============================
var _drill_GSH_layer_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_GSH_layer_createPictures.call(this);		//rmmv图片 < 图片层 < rmmv对话框
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// ** 最顶层
//==============================
var _drill_GSH_layer_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_GSH_layer_createAllWindows.call(this);	//rmmv对话框 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// ** 层级排序
//==============================
Scene_Map.prototype.drill_GSH_sortByZIndex = function() {
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};

//=============================================================================
// ** 地图界面
//=============================================================================
//==============================
// * 地图 - 初始化
//==============================
var _drill_GSH_map_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {	
	_drill_GSH_map_initialize.call(this);
	this._drill_GSH_spriteTank = [];		//生命框容器
};
//==============================
// * 地图 - 创建
//==============================
var _drill_GSH_layer_createAllWindows2 = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_GSH_layer_createAllWindows2.call(this);
	this.drill_GSH_create();				//创建生命框
}
//==============================
// * 帧刷新 - 创建生命框
//==============================
Scene_Map.prototype.drill_GSH_create = function() {
	for( var i = 0; i < $gameSystem._drill_GSH_dataTank.length; i++ ){
		var temp_data = $gameSystem._drill_GSH_dataTank[i];
		if( temp_data['inited'] == false ){ continue; }
		
		var temp_sprite = new Drill_GSH_LifeSprite( temp_data );
		
		this._drill_GSH_spriteTank.push( temp_sprite );
		if( temp_sprite._drill_data['layer_index'] == "下层" ){
			this._spriteset._drill_mapDownArea.addChild(temp_sprite);
		}
		if( temp_sprite._drill_data['layer_index'] == "中层" ){
			this._spriteset._drill_mapCenterArea.addChild(temp_sprite);
		}
		if( temp_sprite._drill_data['layer_index'] == "上层" ){
			this._spriteset._drill_mapUpArea.addChild(temp_sprite);
		}
		if( temp_sprite._drill_data['layer_index'] == "图片层" ){
			this._spriteset._drill_mapPicArea.addChild(temp_sprite);
		}
		if( temp_sprite._drill_data['layer_index'] == "最顶层" ){
			this._drill_SenceTopArea.addChild(temp_sprite);
		}
	}
}


//=============================================================================
// ** 简单生命框【Drill_GSH_LifeSprite】
// 
// 			说明：	进入地图界面后，全创建。
//=============================================================================
//==============================
// * 简单生命框 - 定义
//==============================
function Drill_GSH_LifeSprite() {
    this.initialize.apply(this, arguments);
}
Drill_GSH_LifeSprite.prototype = Object.create(Sprite_Base.prototype);
Drill_GSH_LifeSprite.prototype.constructor = Drill_GSH_LifeSprite;
//==============================
// * 简单生命框 - 初始化
//==============================
Drill_GSH_LifeSprite.prototype.initialize = function( data ) {
	Sprite_Base.prototype.initialize.call(this);
	this._drill_data = data;
	
	this.drill_initSprite();	//初始化对象
};
//==============================
// * 简单生命框 - 帧刷新
//==============================
Drill_GSH_LifeSprite.prototype.update = function() {
	Sprite_Base.prototype.update.call(this);
	
	this.drill_updateSprite();			//帧刷新对象
};
//==============================
// * 简单生命框 - 判断 - 绑定玩家
//==============================
Drill_GSH_LifeSprite.prototype.drill_GSH_isBindingPlayer = function() {
	var data = this._drill_data;
	return data['bind_char'] == -2 ;
};
//==============================
// * 简单生命框 - 判断 - 绑定事件
//==============================
Drill_GSH_LifeSprite.prototype.drill_GSH_isBindingEvent = function() {
	var data = this._drill_data;
	return data['bind_char'] > 0 && data['bind_map'] > 0 ;
};
//==============================
// * 初始化 - 对象
//==============================
Drill_GSH_LifeSprite.prototype.drill_initSprite = function() {
	var data = this._drill_data;
	
	// > 私有对象初始化
	this._drill_cur_time = 0;			//当前时间
	this._drill_isBinding_dead = false;	//死亡标记
	
	// > 自身属性初始化
	this.x = data['x'];
	this.y = data['y'];
	this.opacity = 255;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.visible = data['visible'];
	this.zIndex = data['zIndex'];		//图片层级
	
	this.drill_createMeter();			//创建参数条
};
//==============================
// * 创建 - 参数条
//==============================
Drill_GSH_LifeSprite.prototype.drill_createMeter = function() {
	var data = this._drill_data;
	
	// > 固定框背景
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.load_MapUi( data['background_src'] );
	temp_sprite.x = data['background_x'];
	temp_sprite.y = data['background_y'];
	this.addChild(temp_sprite);
	this._drill_background_sprite = temp_sprite;
	
	// > 生命条 贴图初始化
	if( data['hp_meter_enable'] == true &&	//（不显示，则不创建）
		data['hp_meter_id'] > 0 ){
	
		var hp_meter_id = data['hp_meter_id'];
		this._drill_hp_meterData = DrillUp.g_COGM_list[ hp_meter_id -1 ];
		this._drill_hp_meterData['level_max'] = data['hpLevel_max'];				//段上限
		this._drill_hp_meterData['x'] = data['hp_meter_x'];							//x
		this._drill_hp_meterData['y'] = data['hp_meter_y'];							//y
		this._drill_hp_meterData['anchor_x'] = 0.0;									//中心锚点x
		this._drill_hp_meterData['anchor_y'] = 0.0;									//中心锚点y
		this._drill_hp_meterData['filling_enable'] = false;							//关闭加满动画
		
		var temp_sprite = new Drill_COGM_MeterSprite( this._drill_hp_meterData );
		this.addChild( temp_sprite );
		this._drill_hpSprite = temp_sprite;
	}
	
	// > 魔法条 贴图初始化
	if( data['mp_meter_enable'] == true &&	//（不显示，则不创建）
		data['mp_meter_id'] > 0 ){
			
		var mp_meter_id = this._drill_data['mp_meter_id'];
		this._drill_mp_meterData = DrillUp.g_COGM_list[ mp_meter_id -1 ];
		this._drill_mp_meterData['level_max'] = data['mpLevel_max'];				//段上限
		this._drill_mp_meterData['x'] = data['mp_meter_x'];							//x
		this._drill_mp_meterData['y'] = data['mp_meter_y'];							//y
		this._drill_mp_meterData['anchor_x'] = 0.0;									//中心锚点x
		this._drill_mp_meterData['anchor_y'] = 0.0;									//中心锚点y
		this._drill_mp_meterData['filling_enable'] = false;							//关闭加满动画
		
		var temp_sprite = new Drill_COGM_MeterSprite( this._drill_mp_meterData );
		this.addChild( temp_sprite );
		this._drill_mpSprite = temp_sprite;
	}
	
	// > 固定框前景
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.load_MapUi( data['foreground_src']  );
	temp_sprite.x = data['foreground_x'];
	temp_sprite.y = data['foreground_y'];
	this.addChild(temp_sprite);
	this._drill_foreground_sprite = temp_sprite;
};
//==============================
// * 帧刷新对象
//==============================
Drill_GSH_LifeSprite.prototype.drill_updateSprite = function() {
	
	this._drill_cur_time += 1;
	this.drill_updateVisible();			//显示控制
	this.drill_updatePosition();		//镜头与位置
	this.drill_updateValue();			//刷新值
}
//==============================
// * 帧刷新 - 显示控制
//==============================
Drill_GSH_LifeSprite.prototype.drill_updateVisible = function() {
	var data = this._drill_data;
	
	// > 未绑定，不显示
	if( this.drill_GSH_isBindingPlayer() == false && 
		this.drill_GSH_isBindingEvent()  == false ){ 
		this.visible = false;
		return;  }
	
	// > 自动消失 符合条件时，不显示
	if( data['autoHide'] == true && this._drill_isBinding_dead == true ){
		this.visible = false;
		return;
	}
	
	this.visible = true;
}
//==============================
// * 帧刷新 - 镜头与位置
//==============================
Drill_GSH_LifeSprite.prototype.drill_updatePosition = function() {
	var data = this._drill_data;
	
	// > 绑定到事件/玩家
	if( this.drill_GSH_isBindingPlayer() ){
		
		var ev = $gamePlayer;
		if( ev == undefined ){ return; }
		var xx = ev.screenX();
		var yy = ev.screenY();
		xx += data['x'];	//（偏移的位置）
		yy += data['y'] - 48;
	}else if( this.drill_GSH_isBindingEvent() ){
		
		var ev = $gameMap.event( data['bind_char'] );
		if( ev == undefined ){ return; }
		var xx = ev.screenX();
		var yy = ev.screenY();
		xx += data['x'];	//（偏移的位置）
		yy += data['y'] - 48;
	}else{
		return;
	}
	
	// > 根据背景资源居中
	if( this._drill_background_sprite.bitmap != null ){
		xx -= this._drill_background_sprite.bitmap.width *0.5;
		yy -= this._drill_background_sprite.bitmap.height *0.5;		
		
	}else if( this._drill_foreground_sprite.bitmap != null ){
		xx -= this._drill_foreground_sprite.bitmap.width *0.5;
		yy -= this._drill_foreground_sprite.bitmap.height *0.5;		
	}
	
	// > 地图镜头修正
	if( Imported.Drill_LayerCamera && 
		data['layer_index'] == "图片层" ){
		xx = $gameSystem.drill_LCa_cameraToMapX( xx );
		yy = $gameSystem.drill_LCa_cameraToMapY( yy );
		this.scale.x = 1.00 / $gameSystem.drill_LCa_curScaleX();
		this.scale.y = 1.00 / $gameSystem.drill_LCa_curScaleY();
	}
	
	this.x = Math.floor(xx);
	this.y = Math.floor(yy);
}
//==============================
// * 帧刷新 - 刷新值
//==============================
Drill_GSH_LifeSprite.prototype.drill_updateValue = function() {
	var data = this._drill_data;
	var members = $gameParty.members();
	if( members.length == 0 ){ return; }
	if( this.drill_GSH_isBindingPlayer() == false && 
		this.drill_GSH_isBindingEvent()  == false ){ return;  }
		
	// > 生命 - 值
	if( this._drill_hpSprite ){
		var hp_value = 0;
		if( data['hpValue_type'] == "领队角色的生命值" ){ hp_value = members[0]._hp; }
		if( data['hpValue_type'] == "变量" ){ hp_value = $gameVariables.value( data['hpValue_variable'] ); }
		if( hp_value > 0 ){
			this._drill_isBinding_dead = false;
		}else{
			this._drill_isBinding_dead = true;
		}
		this._drill_hpSprite.drill_COGM_reflashValue( hp_value );
	}
	
	// > 魔法 - 值
	if( this._drill_mpSprite ){
		var mp_value = 0;
		if( data['mpValue_type'] == "领队角色的魔法值" ){ mp_value = members[0]._mp; }
		if( data['mpValue_type'] == "变量" ){ mp_value = $gameVariables.value( data['mpValue_variable'] ); }
		this._drill_mpSprite.drill_COGM_reflashValue( mp_value );
	}
	
	// > 生命 - 段上限
	if( this._drill_hpSprite ){
		var hp_level_max = 0;
		if( data['hpLevel_type'] == "领队角色的生命上限" ){ hp_level_max = members[0].mhp; }
		if( data['hpLevel_type'] == "变量" ){ hp_level_max = $gameVariables.value( data['hpLevel_variable'] ); }
		if( data['hpLevel_type'] == "固定值" ){ hp_level_max = data['hpLevel_max']; }
		this._drill_hpSprite.drill_COGM_setLevelMax( hp_level_max );
	}
	
	// > 生命 - 段上限
	if( this._drill_mpSprite ){
		var mp_level_max = 0;
		if( data['mpLevel_type'] == "领队角色的魔法上限" ){ mp_level_max = members[0].mmp; }
		if( data['mpLevel_type'] == "变量" ){ mp_level_max = $gameVariables.value( data['mpLevel_variable'] ); }
		if( data['mpLevel_type'] == "固定值" ){ mp_level_max = data['mpLevel_max']; }
		this._drill_mpSprite.drill_COGM_setLevelMax( mp_level_max );
	}
}



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_GaugeSimpleHud = false;
		alert(
			"【Drill_GaugeSimpleHud.js 地图UI - 简单生命框】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfGaugeMeter 系统-参数条核心"
		);
}

