//=============================================================================
// Drill_GaugeFloatingPermanentText.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        地图UI - 永久漂浮文字
 * @author Drill_up
 * 
 * @Drill_LE_param "永久漂浮样式-%d"
 * @Drill_LE_parentKey "---样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_GFPT_style_length"
 * 
 * @help  
 * =============================================================================
 * +++ Drill_GaugeFloatingPermanentText +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在地图界面生成并控制永久存在的漂浮文字。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件必须基于核心。
 * 基于：
 *   - Drill_CoreOfBallistics       系统 - 弹道核心★★v1.7及以上★★
 *   - Drill_CoreOfWindowAuxiliary  系统 - 窗口辅助核心
 * 可扩展：
 *   - Drill_CoreOfString           系统 - 字符串核心
 *     可以在漂浮文字中，绑定并显示自定义的字符串。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于地图的各个层级。
 * 2.更多详细内容，去看看文档 "13.UI > 关于漂浮文字.docx"。
 * 细节：
 *   (1.你可以将漂浮文字放置在地图层级的 下层、中层、上层、图片层、
 *      最顶层 中。
 *   (2.漂浮文字支持所有窗口字符，比如：
 *       \c[n] 变颜色    \i[n] 显示图标    \{\} 字体变大变小
 *       \V[n] 显示变量  \N[n] 显示角色名  \G 显示货币单位
 *      其他窗口字符可见插件 对话框-消息核心 的说明，
 *      或者去看看文档 "15.对话框 > 关于窗口字符.docx"。
 * 弹道：
 *   (1.漂浮文字的弹道支持情况如下：
 *        极坐标模式    x
 *        直角坐标模式  x
 *        轨道锚点模式  x
 *        两点式        √
 *   (2.永久漂浮文字移动时，必须设置移动到指定的点位置。
 * 设计：
 *   (1.由于这类漂浮文字是可以长期存在的对象，你可以设置成某种提示性标语。
 *      或者任务清单提示、无边框的属性参数面板等。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 创建
 * 你可以通过插件指令控制临时漂浮内容集合：
 * 
 * 插件指令：>地图永久漂浮文字 : 漂浮文字[1] : 创建 : 样式[1]
 * 插件指令：>地图永久漂浮文字 : 漂浮文字[1] : 清除
 * 插件指令：>地图永久漂浮文字 : 漂浮文字[1] : 刷新内容文本
 * 插件指令：>地图永久漂浮文字 : 漂浮文字[1] : 修改内容文本 : 文本[这是一段文字]
 * 插件指令：>地图永久漂浮文字 : 漂浮文字[1] : 修改内容文本 : 字符串[1]
 * 
 * 1.创建漂浮文字后，将永久存在，且能被存入存档中。
 * 2.注意，如果你的内容文本中含有变量值\v[21]，显示后将不会自动刷新值。
 *   你需要手动刷新内容文本，显示的变量值才会变化。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 移动
 * 你可以通过插件指令控制临时漂浮内容集合：
 * 
 * 插件指令：>地图永久漂浮文字 : 漂浮文字[1] : 瞬间移动 : 位置[100,200]
 * 插件指令：>地图永久漂浮文字 : 漂浮文字[1] : 匀速移动 : 位置[100,200] : 时间[20]
 * 插件指令：>地图永久漂浮文字 : 漂浮文字[1] : 增减速移动 : 位置[100,200] : 时间[20]
 * 插件指令：>地图永久漂浮文字 : 漂浮文字[1] : 弹性移动 : 位置[100,200] : 时间[20]
 * 插件指令：>地图永久漂浮文字 : 漂浮文字[1] : 抛物线移动 : 位置[100,200] : 时间[20]
 * 
 * 插件指令：>地图永久漂浮文字 : 漂浮文字[1] : 匀速移动 : 位置[100,200] : 时间[20]
 * 插件指令：>地图永久漂浮文字 : 漂浮文字[1] : 匀速移动 : 位置变量[25,26] : 时间[20]
 * 插件指令：>地图永久漂浮文字 : 漂浮文字[1] : 匀速移动 : 相对位置[-100,0] : 时间[20]
 * 插件指令：>地图永久漂浮文字 : 漂浮文字[1] : 匀速移动 : 相对位置变量[25,26] : 时间[20]
 * 
 * 1.前半部分（匀速移动）和后半部分（相对位置[-100,0]）的参数可以随意组合。
 *   一共有5*4种组合方式。
 * 2.漂浮文字可以根据移动类型随意移动到指定位置，
 *   具体移动说明可以去看看 "1.系统 > 关于弹道.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 透明度变化
 * 你可以通过插件指令控制临时漂浮内容集合：
 * 
 * 插件指令：>地图永久漂浮文字 : 漂浮文字[1] : 瞬间变化 : 透明度[255]
 * 插件指令：>地图永久漂浮文字 : 漂浮文字[1] : 匀速变化 : 透明度[255] : 时间[20]
 * 插件指令：>地图永久漂浮文字 : 漂浮文字[1] : 增减速变化 : 透明度[255] : 时间[20]
 * 插件指令：>地图永久漂浮文字 : 漂浮文字[1] : 弹性变化 : 透明度[255] : 时间[20]
 * 
 * 1.注意，透明度变化 和 移动 用法相似，但是指令不一样，注意区分。
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
 * 时间复杂度： o(n^2)*o(贴图处理) 每帧
 * 测试方法：   在UI管理层建立5个漂浮文字。
 * 测试结果：   200个事件的地图中，平均消耗为：【23.18ms】
 *              100个事件的地图中，平均消耗为：【16.68ms】
 *               50个事件的地图中，平均消耗为：【11.26ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于永久飘浮文字是一个个创建的，且数量也固定，不多，所以
 *   相对消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 *
 *
 *
 *
 * @param ---样式组 1至20---
 * @default 
 * 
 * @param 永久漂浮样式-1
 * @parent ---样式组 1至20---
 * @type struct<DrillGFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-2
 * @parent ---样式组 1至20---
 * @type struct<DrillGFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-3
 * @parent ---样式组 1至20---
 * @type struct<DrillGFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-4
 * @parent ---样式组 1至20---
 * @type struct<DrillGFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-5
 * @parent ---样式组 1至20---
 * @type struct<DrillGFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-6
 * @parent ---样式组 1至20---
 * @type struct<DrillGFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-7
 * @parent ---样式组 1至20---
 * @type struct<DrillGFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-8
 * @parent ---样式组 1至20---
 * @type struct<DrillGFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-9
 * @parent ---样式组 1至20---
 * @type struct<DrillGFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-10
 * @parent ---样式组 1至20---
 * @type struct<DrillGFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-11
 * @parent ---样式组 1至20---
 * @type struct<DrillGFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-12
 * @parent ---样式组 1至20---
 * @type struct<DrillGFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-13
 * @parent ---样式组 1至20---
 * @type struct<DrillGFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-14
 * @parent ---样式组 1至20---
 * @type struct<DrillGFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-15
 * @parent ---样式组 1至20---
 * @type struct<DrillGFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-16
 * @parent ---样式组 1至20---
 * @type struct<DrillGFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-17
 * @parent ---样式组 1至20---
 * @type struct<DrillGFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-18
 * @parent ---样式组 1至20---
 * @type struct<DrillGFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-19
 * @parent ---样式组 1至20---
 * @type struct<DrillGFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * @param 永久漂浮样式-20
 * @parent ---样式组 1至20---
 * @type struct<DrillGFPTStyle>
 * @desc 漂浮文字的样式配置，本质上漂浮文字是一个窗口。
 * @default 
 * 
 * 
 */
/*~struct~DrillGFPTStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的永久漂浮样式==
 * 
 * 
 * @param --常规--
 * @default 
 *
 * @param 平移-漂浮文字 X
 * @parent --常规--
 * @desc 漂浮文字的初始x轴位置，0表示贴在最左边。
 * @default 400
 *
 * @param 平移-漂浮文字 Y
 * @parent --常规--
 * @desc 漂浮文字的初始y轴位置，0表示贴在最上面。
 * @default 300
 *
 * @param 漂浮文字透明度
 * @parent --常规--
 * @type number
 * @min 0
 * @max 255
 * @desc 漂浮文字的透明度，0为完全透明，255为完全不透明。
 * @default 255
 * 
 * @param 默认内容文本
 * @parent --常规--
 * @type note
 * @desc 漂浮文字默认绑定的内容。
 * @default "一段永久的漂浮文字"
 * 
 * 
 * @param --层级--
 * @default 
 *
 * @param UI基准
 * @parent --层级--
 * @type select
 * @option 相对于地图
 * @value 相对于地图
 * @option 相对于镜头
 * @value 相对于镜头
 * @desc 相对于镜头的漂浮文字，会与镜头位置保持一致。相对于地图的漂浮文字，会与地图坐标保持一致。
 * @default 相对于镜头
 *
 * @param 地图层级
 * @parent --层级--
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
 * @desc 窗口所在的地图层级位置，你需要以此来考虑分配ui遮挡关系。
 * @default 图片层
 *
 * @param 地图图片层级
 * @parent --层级--
 * @type number
 * @min 0
 * @desc 窗口在同一个地图层级时，先后排序的位置，0表示最后面。
 * @default 90
 * 
 * 
 * @param --窗口--
 * @default 
 * 
 * @param 布局模式
 * @parent --窗口--
 * @type select
 * @option 默认窗口皮肤
 * @value 默认窗口皮肤
 * @option 自定义窗口皮肤
 * @value 自定义窗口皮肤
 * @option 自定义背景图片
 * @value 自定义背景图片
 * @option 黑底背景
 * @value 黑底背景
 * @desc 窗口背景布局的模式。
 * @default 黑底背景
 *
 * @param 布局透明度
 * @parent 布局模式
 * @type number
 * @min 0
 * @max 255
 * @desc 布局的透明度，0为完全透明，255为完全不透明。
 * @default 0
 *
 * @param 资源-自定义窗口皮肤
 * @parent 布局模式
 * @desc 配置该资源，可以使得该窗口有与默认不同的系统窗口。
 * @default Window
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 资源-自定义背景图片
 * @parent 布局模式
 * @desc 背景图片布局的资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 平移-自定义背景图片 X
 * @parent 布局模式
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-自定义背景图片 Y
 * @parent 布局模式
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 窗口中心锚点
 * @parent --窗口--
 * @type select
 * @option 左上角
 * @value 左上角
 * @option 右上角
 * @value 右上角
 * @option 正中心
 * @value 正中心
 * @option 左下角
 * @value 左下角
 * @option 右下角
 * @value 右下角
 * @desc 窗口追随鼠标时，中心锚点的位置。
 * @default 左上角
 *
 * @param 窗口是否自适应行间距
 * @parent --窗口--
 * @type boolean
 * @on 自适应
 * @off 固定行间距
 * @desc true - 自适应，false - 固定行间距
 * @default true
 *
 * @param 窗口固定行间距
 * @parent 窗口是否自适应行间距
 * @type number
 * @min 1
 * @desc 如果你取消了自适应行间距，这里将使得每行的文字的行间距都是固定值。（rmmv默认：36）
 * @default 24
 *
 * @param 窗口内边距
 * @parent --窗口--
 * @type number
 * @min 0
 * @desc 窗口内容与窗口外框的内边距。（rmmv默认标准：18）
 * @default 10
 *
 * @param 窗口字体大小
 * @parent --窗口--
 * @type number
 * @min 1
 * @desc 窗口的字体大小。注意图标无法根据字体大小变化。（rmmv默认标准：28）
 * @default 22
 *
 * @param 窗口附加宽度
 * @parent --窗口--
 * @desc 在当前自适应的基础上，再额外增加的宽度。可为负数。
 * @default 0
 *
 * @param 窗口附加高度
 * @parent --窗口--
 * @desc 在当前自适应的基础上，再额外增加的高度。可为负数。
 * @default 0
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		GFPT (Gauge_Floating_Text)
//		临时全局变量	DrillUp.g_GFPT_xxx
//		临时局部变量	this._drill_GFPT_xxx
//		存储数据变量	$gameSystem._drill_GFPT_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2)*o(贴图处理)  每帧
//		性能测试因素	UI管理层测试
//		性能测试消耗	8.97ms、11.26ms（drill_GFPT_updateDataMoving）
//		最坏情况		配置大量永久漂浮文字。
//		备注			由于数量不多，消耗稳定。
//
//插件记录：
//		★大体框架与功能如下：
//			漂浮参数数字：
//				->结构
//					->窗口字符
//					->文本域自适应
//					->弹道核心（插件指令）
//					->弹道透明度控制
//				->插件指令
//					->创建
//					->移动
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.【镜头兼容】该插件的漂浮文字如果放在 下层、中层、上层、图片层 ，需要对其进行相关的镜头缩放控制。
//			3.漂浮文字的全部数据，都存储在 $gameSystem 中。
//	
//		★其它说明细节：
//			1.注意，图片层以下时，移动镜头时，漂浮文字会被移走，
//			  因为漂浮文字只在最开始时锁定地图位置，并不绑定于地图。
//
//		★存在的问题：
//			暂无
//
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_GaugeFloatingPermanentText = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_GaugeFloatingPermanentText');
	
	
	//==============================
	// * 变量获取 - 永久漂浮样式
	//				（~struct~DrillGFPTStyle）
	//==============================
	DrillUp.drill_GFPT_initContext = function( dataFrom ) {
		var data = {};
		// > 常规
		data['x'] = Number( dataFrom["平移-漂浮文字 X"] || 400);
		data['y'] = Number( dataFrom["平移-漂浮文字 Y"] || 300);
		data['opacity'] = Number( dataFrom["漂浮文字透明度"] || 255);
		if( dataFrom["默认内容文本"] != undefined && 
			dataFrom["默认内容文本"] != "" ){
			data['context'] = JSON.parse( dataFrom["默认内容文本"] );
		}else{
			data['context'] = "";
		}
		// > 层级
		data['window_benchmark'] = String( dataFrom["UI基准"] || "相对于镜头");
		data['window_map_layer'] = String( dataFrom["地图层级"] || "");
		data['window_map_zIndex'] = Number( dataFrom["地图图片层级"] || 22);
		// > 窗口
		data['window_type'] = String( dataFrom["布局模式"] || "黑底背景");
		data['window_opacity'] = Number( dataFrom["布局透明度"] || 0);
		data['window_sys_src'] = String( dataFrom["资源-自定义窗口皮肤"] || "");
		data['window_pic_src'] = String( dataFrom["资源-自定义背景图片"] || "");
		data['window_pic_x'] = Number( dataFrom["平移-自定义背景图片 X"] || 0);
		data['window_pic_y'] = Number( dataFrom["平移-自定义背景图片 Y"] || 0);
		data['window_anchor'] = String( dataFrom["窗口中心锚点"] || "左上角" );
		data['window_autoLineheight'] = String(dataFrom["窗口是否自适应行间距"] || "true") === "true";	
		data['window_lineheight'] = Number(dataFrom["窗口固定行间距"] || 28);
		data['window_padding'] = Number( dataFrom["窗口内边距"] || 18);
		data['window_fontsize'] = Number( dataFrom["窗口字体大小"] || 22);
		data['window_ex_width'] = Number( dataFrom["窗口附加宽度"] || 0);
		data['window_ex_height'] = Number( dataFrom["窗口附加高度"] || 0);
		return data;
	}
	
	
	/*-----------------永久漂浮样式集合------------------*/
	DrillUp.g_GFPT_style_length = 20;
	DrillUp.g_GFPT_style = [];
	for( var i = 0; i < DrillUp.g_GFPT_style_length; i++ ){
		if( DrillUp.parameters["永久漂浮样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["永久漂浮样式-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["永久漂浮样式-" + String(i+1) ]);
			DrillUp.g_GFPT_style[i] = DrillUp.drill_GFPT_initContext( temp );
			DrillUp.g_GFPT_style[i]['inited'] = true;
		}else{
			DrillUp.g_GFPT_style[i] = DrillUp.drill_GFPT_initContext( {} );
			DrillUp.g_GFPT_style[i]['inited'] = false;
		}
	}



//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics &&
	Imported.Drill_CoreOfWindowAuxiliary ){
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_GFPT_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_GFPT_pluginCommand.call(this, command, args);
	if(command === ">地图永久漂浮文字"){
		
		/*-----------------对象获取------------------*/
		var text_id = null;
		if(args.length >= 2){	
			text_id = String(args[1]);
			text_id = text_id.replace("漂浮文字[","");
			text_id = text_id.replace("]","");
			text_id = Number(text_id);
		}
		
		/*-----------------创建------------------*/
		if( text_id != null && args.length == 6 ){	
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "创建" ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) -1;
				$gameSystem.drill_GFPT_create( text_id, temp1 );
			}	
		}
		if( text_id != null && args.length == 4 ){	
			var type = String(args[3]);
			if( type == "清除" ){
				$gameSystem.drill_GFPT_remove( text_id );
			}	
		}
		
		/*-----------------修改内容文本------------------*/
		if( text_id != null && args.length == 4 ){	
			var type = String(args[3]);
			if( type == "刷新内容文本" ){
				if( $gameTemp._drill_GFPT_windowTank[ text_id ] != null ){
					$gameTemp._drill_GFPT_windowTank[ text_id ].drill_refreshMessageFromData();
				}
			}	
		}
		if( text_id != null && args.length == 6 ){	
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "修改内容文本" ){
				if( $gameSystem._drill_GFPT_dataTank[ text_id ] == undefined ){ return; }
				
				if( temp1.indexOf("文本[") != -1 ){
					temp1 = temp1.replace("文本[","");
					temp1 = temp1.replace(/\]$/,"");	//（去掉末尾的]）
					
					$gameSystem._drill_GFPT_dataTank[ text_id ]['context'] = temp1;
					if( $gameTemp._drill_GFPT_windowTank[ text_id ] != null ){
						$gameTemp._drill_GFPT_windowTank[ text_id ].drill_refreshMessageFromData();
					}
					
				}else if( temp1.indexOf("字符串[") != -1 ){
					temp1 = temp1.replace("字符串[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameStrings.value( Number(temp1) );
					
					$gameSystem._drill_GFPT_dataTank[ text_id ]['context'] = temp1;
					if( $gameTemp._drill_GFPT_windowTank[ text_id ] != null ){
						$gameTemp._drill_GFPT_windowTank[ text_id ].drill_refreshMessageFromData();
					}
				}
			}
		}
		
		/*-----------------移动方式------------------*/
		if( text_id != null && args.length >= 6 ){	
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7] || "1");
			if( type == "瞬间移动" || type == "匀速移动" || type == "增减速移动" || type == "弹性移动" || type == "抛物线移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				
				var data = $gameSystem._drill_GFPT_dataTank[ text_id ];
				if( data == undefined ){ return; } 
				var pos = [];
				if( temp1.indexOf("相对位置变量[") != -1 ){
					temp1 = temp1.replace("相对位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(",");
					pos = [ $gameVariables.value(Number(temp1[0])), 
							$gameVariables.value(Number(temp1[1])) ];
					var m_data = {
						"x": data['x'] + Number(pos[0]),
						"y": data['y'] + Number(pos[1]),
						"time":temp2,
						"type":type,
					}
					$gameSystem.drill_GFPT_moveTo( text_id, m_data );
					
				}else if( temp1.indexOf("相对位置[") != -1 ){
					temp1 = temp1.replace("相对位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(",");
					pos = [ Number(temp1[0]), 
							Number(temp1[1]) ];
					var m_data = {
						"x": data['x'] + Number(pos[0]),
						"y": data['y'] + Number(pos[1]),
						"time":temp2,
						"type":type,
					}
					$gameSystem.drill_GFPT_moveTo( text_id, m_data );
					
				}else if( temp1.indexOf("位置变量[") != -1 ){
					temp1 = temp1.replace("位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(",");
					pos = [ $gameVariables.value(Number(temp1[0])), 
							$gameVariables.value(Number(temp1[1])) ];
					var m_data = {
						"x":Number(pos[0]),
						"y":Number(pos[1]),
						"time":temp2,
						"type":type,
					}
					$gameSystem.drill_GFPT_moveTo( text_id, m_data );
				}
				else if( temp1.indexOf("位置[") != -1 ){
					temp1 = temp1.replace("位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(",");
					pos = [ Number(temp1[0]), 
							Number(temp1[1]) ];
					var m_data = {
						"x":Number(pos[0]),
						"y":Number(pos[1]),
						"time":temp2,
						"type":type,
					}
					$gameSystem.drill_GFPT_moveTo( text_id, m_data );
				}
			}
		}
		
		/*-----------------透明度------------------*/
		if( text_id != null && args.length >= 6 ){	
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7] || "1");
			if( type == "瞬间变化" || type == "匀速变化" || type == "增减速变化" || type == "弹性变化" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				
				var data = $gameSystem._drill_GFPT_dataTank[ text_id ];
				if( data == undefined ){ return; } 
				var pos = [];
				if( temp1.indexOf("透明度[") != -1 ){
					temp1 = temp1.replace("透明度[","");
					temp1 = temp1.replace("]","");
					var o_data = {
						"opacity":Number(temp1),
						"time":temp2,
						"type":type,
					}
					$gameSystem.drill_GFPT_opacityTo( text_id, o_data );
				}
			}
		}
	};
};


//=============================================================================
// ** 存储变量
//=============================================================================
//==============================
// ** 存储变量 - 初始化
//==============================
var _drill_GFPT_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_GFPT_sys_initialize.call(this);
	
	this._drill_GFPT_dataTank = [];					//漂浮文字数据总容器
	this._drill_GFPT_dataTank_moveBuffer = [];		//漂浮文字变化容器
	this._drill_GFPT_dataTank_opacityBuffer = [];	//漂浮文字变化容器
};	
//==============================
// ** 存储变量 - 创建
//==============================
Game_System.prototype.drill_GFPT_create = function( slot_id, style_id ){
	if( $gameTemp._drill_GFPT_dataTank_state[ slot_id ] == "binded" ||
		$gameTemp._drill_GFPT_dataTank_state[ slot_id ] == "remove" ){		//（还没来得及删的情况）
		$gameTemp._drill_GFPT_dataTank_state[ slot_id ] = "rebuild";
	}else{
		$gameTemp._drill_GFPT_dataTank_state[ slot_id ] = null;
	}
	
	// > 数据
	this._drill_GFPT_dataTank[ slot_id ] = JSON.parse(JSON.stringify( DrillUp.g_GFPT_style[ style_id ] ));		//深拷贝

	// > 私有数据
	this._drill_GFPT_dataTank[ slot_id ]['m_cur_time'] = 0;				//当前时间（移动）
	this._drill_GFPT_dataTank[ slot_id ]['m_tar_time'] = 0;				//目标事件
	this._drill_GFPT_dataTank[ slot_id ]['o_cur_time'] = 0;				//当前时间（透明度）
	this._drill_GFPT_dataTank[ slot_id ]['o_tar_time'] = 0;				//目标事件
	this._drill_GFPT_dataTank[ slot_id ]['_drill_COBa_x'] = [];			//弹道位置列表x
	this._drill_GFPT_dataTank[ slot_id ]['_drill_COBa_y'] = [];			//弹道位置列表y
	this._drill_GFPT_dataTank[ slot_id ]['_drill_COBa_opacity'] = [];	//弹道透明度列表
};
//==============================
// ** 存储变量 - 清除
//==============================
Game_System.prototype.drill_GFPT_remove = function( slot_id, style_id ){
	$gameTemp._drill_GFPT_dataTank_state[ slot_id ] = "remove";		//（并非瞬间删除，而是需要等一帧）
};
//==============================
// * 位置 - 移动设置
//==============================
Game_System.prototype.drill_GFPT_moveTo = function( slot_id, m_data ){
	var data = this._drill_GFPT_dataTank[ slot_id ];
	if( data == undefined ){	//（如果还没来得及创建，则放入变化容器中）
		this._drill_GFPT_dataTank_moveBuffer[ slot_id ] = m_data;
	}
	data['m_cur_time'] = 0;
	data['m_tar_time'] = m_data["time"];
	
	//   移动（movement）
	m_data['movementNum'] = 1;									//对象数量
	m_data['movementTime'] = m_data["time"];					//时长
	m_data['movementMode'] = "两点式";							//移动模式
	//   两点式（twoPoint）
	m_data['twoPointType'] = m_data["type"];					//两点式 - 类型（匀速移动/弹性移动/…）
	m_data['twoPointDifferenceX'] = m_data["x"] - data['x'];	//两点式 - 距离差值x
	m_data['twoPointDifferenceY'] = m_data["y"] - data['y'];	//两点式 - 距离差值y
	
	// > 弹道（坐标）
	$gameTemp.drill_COBa_setBallisticsMove( m_data );								//弹道核心 - 坐标初始化
	$gameTemp.drill_COBa_preBallisticsMove( data, 0 , data['x'], data['y'] );		//弹道核心 - 推演
	
};
//==============================
// * 位置 - 透明度设置
//==============================
Game_System.prototype.drill_GFPT_opacityTo = function( slot_id, o_data ){
	var data = this._drill_GFPT_dataTank[ slot_id ];
	if( data == undefined ){	//（如果还没来得及创建，则放入变化容器中）
		this._drill_GFPT_dataTank_opacityBuffer[ slot_id ] = o_data;
	}
	data['o_cur_time'] = 0;
	data['o_tar_time'] = o_data["time"];
	
	//   透明度（opacity）
	o_data['opacityNum'] = 1;									//对象数量
	o_data['opacityTime'] = o_data["time"];						//时长
	o_data['opacityMode'] = "目标值模式";						//移动模式
	//   目标值模式（target）
	o_data['targetType'] = o_data["type"];								//目标值模式 - 类型（匀速变化/弹性变化/…）
	o_data['targetDifference'] = o_data["opacity"] - data['opacity'];	//目标值模式 - 距离差值
	
	// > 弹道（透明度）
	$gameTemp.drill_COBa_setBallisticsOpacity( o_data );							//弹道核心 - 透明度初始化
	$gameTemp.drill_COBa_preBallisticsOpacity( data, 0 , data['opacity'] );			//弹道核心 - 推演
	
};


//=============================================================================
// ** 地图层级
//=============================================================================
//==============================
// ** 下层
//==============================
var _drill_GFPT_layer_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	_drill_GFPT_layer_createParallax.call(this);		//rmmv远景 < 下层 < rmmv图块
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// ** 中层
//==============================
var _drill_GFPT_layer_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_GFPT_layer_createTilemap.call(this);		//rmmv图块 < 中层 < rmmv玩家
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// ** 上层
//==============================
var _drill_GFPT_layer_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_GFPT_layer_createDestination.call(this);	//rmmv鼠标目的地 < 上层 < rmmv天气
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// ** 图片层
//==============================
var _drill_GFPT_layer_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_GFPT_layer_createPictures.call(this);		//rmmv图片 < 图片层 < rmmv对话框
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// ** 最顶层
//==============================
var _drill_GFPT_layer_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_GFPT_layer_createAllWindows.call(this);	//rmmv对话框 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// ** 层级排序
//==============================
Scene_Map.prototype.drill_GFPT_sortByZIndex = function() {
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
// * 容器 - 初始化
//==============================
var _drill_GFPT_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_GFPT_temp_initialize.call(this);
	this._drill_GFPT_windowTank = [];
	this._drill_GFPT_dataTank_state = [];
	//this._drill_GFPT_needRefresh = true;
};
//==============================
// * 容器 - 创建时
//==============================
var _drill_GFPT_layer_createAllWindows2 = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_GFPT_layer_createAllWindows2.call(this);
	$gameTemp._drill_GFPT_windowTank = [];			//漂浮文字容器
	$gameTemp._drill_GFPT_dataTank_state = [];		//漂浮文字状态
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_GFPT_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_GFPT_gmap_setup.call( this,mapId );
	$gameTemp._drill_GFPT_windowTank = [];			//漂浮文字容器
	$gameTemp._drill_GFPT_dataTank_state = [];		//漂浮文字状态
};
//==============================
// * 地图 - 帧刷新
//==============================
var _drill_GFPT_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_GFPT_smap_update.call(this);
	this.drill_GFPT_updateSpriteDelete();			//帧刷新 - 贴图删除监听
	this.drill_GFPT_updateCommandCreate();			//帧刷新 - 贴图建立监听
	this.drill_GFPT_updateDataMoving();				//帧刷新 - 数据移动
	this.drill_GFPT_updateDataOpacity();			//帧刷新 - 数据透明度
};
//==============================
// * 帧刷新 - 贴图建立监听
//==============================
Scene_Map.prototype.drill_GFPT_updateCommandCreate = function() {
	for( var i = 0; i < $gameSystem._drill_GFPT_dataTank.length; i++ ){
		var data = $gameSystem._drill_GFPT_dataTank[i];
		if( data == undefined ){ continue; }
		if( data['inited'] == false ){ continue; }
		
		if( $gameTemp._drill_GFPT_dataTank_state[i] == undefined ){ 	//（根据状态判断创建情况）
			
			// > 创建
			$gameTemp._drill_GFPT_dataTank_state[i] = "binded";
			var temp_window = new Drill_GFPT_Window( data );
			temp_window.zIndex = data['window_map_zIndex'];
			$gameTemp._drill_GFPT_windowTank[i] = temp_window;
			
			// > 层级初始化
			if( data['window_map_layer'] == "下层" ){
				this._spriteset._drill_mapDownArea.addChild(temp_window);
			}
			if( data['window_map_layer'] == "中层" ){
				this._spriteset._drill_mapCenterArea.addChild(temp_window);
			}
			if( data['window_map_layer'] == "上层" ){
				this._spriteset._drill_mapUpArea.addChild(temp_window);
			}
			if( data['window_map_layer'] == "图片层" ){
				this._spriteset._drill_mapPicArea.addChild(temp_window);
			}
			if( data['window_map_layer'] == "最顶层" ){
				this._drill_SenceTopArea.addChild(temp_window);
			}
			this.drill_GFPT_sortByZIndex();
		}
	}
}
//==============================
// * 帧刷新 - 贴图删除监听
//==============================
Scene_Map.prototype.drill_GFPT_updateSpriteDelete = function() {
	for( var i = $gameTemp._drill_GFPT_windowTank.length-1; i >= 0; i-- ){
		var temp_sprite = $gameTemp._drill_GFPT_windowTank[i];
		
		// > 删除
		if( $gameTemp._drill_GFPT_dataTank_state[i] == "remove" ){
			$gameTemp._drill_GFPT_dataTank_state[i] = null;
			$gameSystem._drill_GFPT_dataTank[i] = null;				//（清除状态和数据）
		}
		// > 重建
		if( $gameTemp._drill_GFPT_dataTank_state[i] == "rebuild" ){
			$gameTemp._drill_GFPT_dataTank_state[i] = null;			//（只清状态）
		}
		
		// > 去除贴图
		if( $gameTemp._drill_GFPT_dataTank_state[i] == null ){
			if( temp_sprite == undefined ){ continue; }
			
			// > 从层中去除
			this._spriteset._drill_mapDownArea.removeChild(temp_sprite);
			this._spriteset._drill_mapCenterArea.removeChild(temp_sprite);
			this._spriteset._drill_mapUpArea.removeChild(temp_sprite);
			this._spriteset._drill_mapPicArea.removeChild(temp_sprite);
			this._drill_SenceTopArea.removeChild(temp_sprite);
			
			// > 从容器中去除
			$gameTemp._drill_GFPT_windowTank[i] = null;
		}
	}
}
//==============================
// * 帧刷新 - 数据移动
//
//			说明：	这里直接在数据中，对弹道位置进行操作，能被存储。
//==============================
Scene_Map.prototype.drill_GFPT_updateDataMoving = function() {
	for( var i = 0; i < $gameSystem._drill_GFPT_dataTank.length; i++ ){
		var data = $gameSystem._drill_GFPT_dataTank[i];
		if( data == undefined ){ continue; }
		if( data['inited'] == false ){ continue; }
		if( data['_drill_COBa_x'].length == 0 ){ continue; }
		
		// > 根据轨迹进行播放
		data['m_cur_time'] += 1;
		if( data['m_cur_time'] < 0 ){ data['m_cur_time'] = 0; }
		if( data['m_cur_time'] > data['_drill_COBa_x'].length-1 ){
			data['m_cur_time'] = data['_drill_COBa_x'].length-1;
		}
		var xx = data['_drill_COBa_x'][ data['m_cur_time'] ];		//播放弹道轨迹
		var yy = data['_drill_COBa_y'][ data['m_cur_time'] ];
		
		// > UI基准偏移（相对于地图）
		if( data['window_benchmark'] == "相对于地图" ){
			var pos_x = $gameMap.adjustX(0);
			var pos_y = $gameMap.adjustY(0);
			xx += $gameMap.deltaX( pos_x, this._drill_orgPos_x ) * $gameMap.tileWidth();
			yy += $gameMap.deltaY( pos_y, this._drill_orgPos_y ) * $gameMap.tileHeight();
		}
		
		// > 地图镜头修正（处于下层/中层/上层/图片层，需要一起缩放）
		if( Imported.Drill_LayerCamera && 			
			data['window_map_layer'] != "最顶层" ){
			xx = $gameSystem.drill_LCa_cameraToMapX( xx );
			yy = $gameSystem.drill_LCa_cameraToMapY( yy );
			this.scale.x = 1.00 / $gameSystem.drill_LCa_curScaleX();
			this.scale.y = 1.00 / $gameSystem.drill_LCa_curScaleY();
		}
		
		data['x'] = Math.floor(xx);
		data['y'] = Math.floor(yy);
	}
	
	// > 插件指令延迟缓冲
	for( var i = 0; i < $gameSystem._drill_GFPT_dataTank_moveBuffer.length; i++ ){
		var m_data = $gameSystem._drill_GFPT_dataTank_moveBuffer[i];
		if( m_data == undefined ){ continue; }
		var data = $gameSystem._drill_GFPT_dataTank[i];
		if( data == undefined ){ continue; }
		
		$gameSystem.drill_GFPT_moveTo( i, m_data );
		$gameSystem._drill_GFPT_dataTank_moveBuffer[i] = null;
	}
}
//==============================
// * 帧刷新 - 数据透明度
//
//			说明：	这里直接在数据中，对弹道透明度进行操作，能被存储。
//==============================
Scene_Map.prototype.drill_GFPT_updateDataOpacity = function() {
	for( var i = 0; i < $gameSystem._drill_GFPT_dataTank.length; i++ ){
		var data = $gameSystem._drill_GFPT_dataTank[i];
		if( data == undefined ){ continue; }
		if( data['inited'] == false ){ continue; }
		if( data['_drill_COBa_opacity'].length == 0 ){ continue; }
		
		// > 根据轨迹进行播放
		data['o_cur_time'] += 1;
		if( data['o_cur_time'] < 0 ){ data['o_cur_time'] = 0; }
		if( data['o_cur_time'] > data['_drill_COBa_opacity'].length-1 ){
			data['o_cur_time'] = data['_drill_COBa_opacity'].length-1;
		}
		var oo = data['_drill_COBa_opacity'][ data['o_cur_time'] ];	//播放弹道轨迹
		
		data['opacity'] = Math.floor(oo);
	}
	
	// > 插件指令延迟缓冲
	for( var i = 0; i < $gameSystem._drill_GFPT_dataTank_opacityBuffer.length; i++ ){
		var o_data = $gameSystem._drill_GFPT_dataTank_opacityBuffer[i];
		if( o_data == undefined ){ continue; }
		var data = $gameSystem._drill_GFPT_dataTank[i];
		if( data == undefined ){ continue; }
		
		$gameSystem.drill_GFPT_opacityTo( i, o_data );
		$gameSystem._drill_GFPT_dataTank_opacityBuffer[i] = null;
	}
}


//=============================================================================
// ** 漂浮文字窗口【Drill_GFPT_Window】
//			
//			索引：	无
//			来源：	继承于Window_Base
//			实例：	Scene_Map下的 _drill_GFPT_window 成员
//			应用：	暂无 /
//			
//			作用域：	地图界面
//			主功能：	定义一个面板，能随时改变内容和高宽，用于描述事件内置信息。
//			子功能：
//						->贴图内容
//							->文本层
//							->背景
//								> 默认窗口皮肤
//								> 自定义窗口皮肤
//								> 自定义背景图片
//								> 黑底背景
//						->位置
//							> 跟随鼠标位置
//						->持续时间
//							->添加
//							->持续时间
//							->消失/显现方式
//				
//			说明：	> 
//=============================================================================
//==============================
// * 漂浮文字窗口 - 定义
//==============================
function Drill_GFPT_Window() {
    this.initialize.apply(this, arguments);
};
Drill_GFPT_Window.prototype = Object.create(Window_Base.prototype);
Drill_GFPT_Window.prototype.constructor = Drill_GFPT_Window;
//==============================
// * 漂浮文字窗口 - 初始化
//==============================
Drill_GFPT_Window.prototype.initialize = function( data ){
	this._drill_data = data;			//（直接传指针）
    Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
	
	this.drill_initData();				//初始化数据
	this.drill_initSprite();			//初始化对象
	
	this.drill_refreshMessageFromData();	//刷新初始内容
};
//==============================
// * 漂浮文字窗口 - 帧刷新
//==============================
Drill_GFPT_Window.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	
	this.drill_updatePosition();		//帧刷新 - 位置
}
//==============================
// * 漂浮文字窗口 - 窗口属性
//==============================
Drill_GFPT_Window.prototype.lineHeight = function(){ return this._drill_data['window_lineheight']; };			//窗口行间距
Drill_GFPT_Window.prototype.standardPadding = function(){ return this._drill_data['window_padding']; };			//窗口内边距
Drill_GFPT_Window.prototype.standardFontSize = function(){ return this._drill_data['window_fontsize']; };		//窗口字体大小
//==============================
// * 初始化 - 数据
//==============================
Drill_GFPT_Window.prototype.drill_initData = function() {
	var data = this._drill_data;
	
	// > 皮肤设置
	this._drill_window_sys_bitmap = ImageManager.loadSystem( data['window_sys_src'] );
	this._drill_window_pic_bitmap = ImageManager.loadSystem( data['window_pic_src'] );
	
	// > 私有属性初始化
	this.x = 0;
	this.y = Graphics.boxHeight*2;
	this._drill_width = 0;
	this._drill_height = 0;
	
	this._drill_anchor_x = 0;			//中心锚点x
	this._drill_anchor_y = 0;			//中心锚点y
	if( data['window_anchor'] == "右上角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 0.0; }
	if( data['window_anchor'] == "正中心" ){ this._drill_anchor_x = 0.5; this._drill_anchor_y = 0.5; }
	if( data['window_anchor'] == "左下角" ){ this._drill_anchor_x = 0.0; this._drill_anchor_y = 1.0; }
	if( data['window_anchor'] == "右下角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 1.0; }
	
	// > UI基准初始位置
	this._drill_orgPos_x = $gameMap.adjustX(0);
	this._drill_orgPos_y = $gameMap.adjustY(0);
}
//==============================
// * 初始化 - 对象
//==============================
Drill_GFPT_Window.prototype.drill_initSprite = function() {
	this.drill_createBackground();		//创建背景
	this.drill_sortBottomByZIndex();	//底层层级排序
	
	// > 窗口属性
	this.createContents();
    this.contents.clear();
}
//==============================
// * 创建 - 背景
//==============================
Drill_GFPT_Window.prototype.drill_createBackground = function() {
	var data = this._drill_data;
	this._drill_background = new Sprite();
	
	// > 图层顺序处理
	this._drill_background.zIndex = 1;
	this._windowBackSprite.zIndex = 2;
	this._windowFrameSprite.zIndex = 3;
	
	// > 信息框布局
	if( data['window_type'] == "默认窗口皮肤" ){
		
		// > 透明度
		this.opacity = data['window_opacity'];
		this._drill_background.opacity = data['window_opacity'];
		this._windowBackSprite.opacity = data['window_opacity'];
		this._windowFrameSprite.opacity = data['window_opacity'];
		
		
	}else if( data['window_type'] == "自定义窗口皮肤" ){
		
		// > 皮肤设置
		this.windowskin = this._drill_window_sys_bitmap;
		
		// > 透明度
		this._drill_background.opacity = data['window_opacity'];
		this._windowBackSprite.opacity = data['window_opacity'];
		this._windowFrameSprite.opacity = data['window_opacity'];
		
		
	}else if( data['window_type'] == "自定义背景图片" ){
		
		// > bimap建立
		this._drill_background.bitmap = this._drill_window_pic_bitmap;
		this._drill_background.x = data['window_pic_x'];
		this._drill_background.y = data['window_pic_y'];
		
		// > 透明度
		this._drill_background.opacity = data['window_opacity'];
		this._windowBackSprite.opacity = 0;
		this._windowFrameSprite.opacity = 0;
		
		
	}else if( data['window_type'] == "黑底背景" || data['window_type'] == "黑底布局" ){
		
		// > bimap建立
		//（需延迟设置，见后面）
		
		// > 透明度
		this._drill_background.opacity = data['window_opacity'];
		this._windowBackSprite.opacity = 0;
		this._windowFrameSprite.opacity = 0;
	}
	
	this._windowSpriteContainer.addChild(this._drill_background);	//（ _windowSpriteContainer 为窗口的最底层贴图）
}
//==============================
// ** 底层层级排序
//==============================
Drill_GFPT_Window.prototype.drill_sortBottomByZIndex = function() {
   this._windowSpriteContainer.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
};


//==============================
// * 位置 - 帧刷新
//==============================
Drill_GFPT_Window.prototype.drill_updatePosition = function() {
	var data = this._drill_data;
	
	var xx = data['x'];
	var yy = data['y'];
	xx -= this._drill_width * this._drill_anchor_x;		//（锚点偏移）
	yy -= this._drill_height * this._drill_anchor_y;
	this.x = xx;
	this.y = yy;
	
	var oo = data['opacity'];
	this.contentsOpacity = oo;
}

//==============================
// * 激活 - 刷新内容
//==============================
Drill_GFPT_Window.prototype.drill_refreshMessageFromData = function(){
	var data = this._drill_data;
	this.drill_refreshMessage( data['context'].split("\n") );
}
//==============================
// * 激活 - 刷新内容
//==============================
Drill_GFPT_Window.prototype.drill_refreshMessage = function( context_list ){
	var data = this._drill_data;
	if( context_list.length == 0 ){ return; }
	
	// > 窗口高宽 - 计算
	var options = {};
	options['convertEnabled'] = false;
	options['autoLineheight'] = data['window_autoLineheight'];
	options['lineheight'] = data['window_lineheight'];
	this.drill_COWA_DTLE_calculateHeightAndWidth( context_list, options );		//（窗口辅助核心）
	// > 窗口高宽 - 赋值
	var ww = 0;
	var hh = 0;
	for( var i=0; i < this.drill_COWA_widthList.length; i++ ){ if( ww < this.drill_COWA_widthList[i] ){ ww = this.drill_COWA_widthList[i]; } }
	for( var i=0; i < this.drill_COWA_heightList.length; i++ ){ hh += this.drill_COWA_heightList[i]; }
	ww += this.standardPadding() * 2;
	hh += this.standardPadding() * 2;
	ww += data['window_ex_width'] || 0;		//（附加高宽）
	hh += data['window_ex_height'] || 0;
	this._drill_width = ww;
	this._drill_height = hh;
	this.width = this._drill_width;
	this.height = this._drill_height;
	
	
	// > 绘制内容
	this.drill_COWA_drawTextListEx( context_list, options );
	
	
	if( data['window_type'] == "黑底背景" ){
		this._drill_background_BlackBitmap = new Bitmap(this._drill_width, this._drill_height);
		this._drill_background_BlackBitmap.fillRect(0, 0 , this._drill_width, this._drill_height, "#000000");	//（背景黑框）
		this._drill_background.bitmap = this._drill_background_BlackBitmap;
	}
	
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_GaugeFloatingPermanentText = false;
		alert(
			"【Drill_GaugeFloatingPermanentText.js 地图UI - 漂浮参数数字】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfBallistics 系统-弹道核心" + 
			"\n- Drill_CoreOfWindowAuxiliary 系统-窗口辅助核心"
		);
}

