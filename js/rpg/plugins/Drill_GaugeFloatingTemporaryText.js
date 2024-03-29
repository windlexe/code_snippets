//=============================================================================
// Drill_GaugeFloatingTemporaryText.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        地图UI - 临时漂浮文字
 * @author Drill_up
 * 
 * @Drill_LE_param "临时漂浮样式-%d"
 * @Drill_LE_parentKey "---样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_GFTT_style_length"
 * 
 * @Drill_LE_param "临时漂浮弹道-%d"
 * @Drill_LE_parentKey "---弹道组%d至%d---"
 * @Drill_LE_var "DrillUp.g_GFTT_ballistics_length"
 * 
 * @help  
 * =============================================================================
 * +++ Drill_GaugeFloatingTemporaryText +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在地图界面快速生成临时的漂浮文字。
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
 *   (1.漂浮文字是一个基于 参数数字核心 样式的贴图，具体数字配置方式
 *      可以去看看参数数字核心。
 *   (2.你可以将漂浮文字放置在地图层级的 下层、中层、上层、图片层、
 *      最顶层 中。
 *   (3.漂浮文字只是临时性的贴图，不建议设计为长期滞留的文字，
 *      刷菜单、刷地图都可以刷掉漂浮文字。
 * 弹道：
 *   (1.漂浮文字的弹道支持情况如下：
 *        极坐标模式    √
 *        直角坐标模式  √
 *        轨道锚点模式  √
 *        两点式        x
 *   (2.单个漂浮文字的轨迹完全可以通过弹道设置进行设计。
 *      具体配置方式可以看看 "1.系统 > 关于弹道.docx"。
 * 设计：
 *   (1.你可以添加一些简单的字符串，用来表示 "生命+10" 这些漂浮文字。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 创建
 * 你可以通过插件指令控制永久漂浮内容集合：
 * 
 * 插件指令：>地图临时漂浮文字 : 临时对象 : 初始化 : 样式[1] : 弹道[1]
 * 插件指令：>地图临时漂浮文字 : 临时对象 : 修改内容文本 : 文本[一段文字]
 * 插件指令：>地图临时漂浮文字 : 临时对象 : 修改内容文本 : 字符串[1]
 * 
 * 插件指令：>地图临时漂浮文字 : 临时对象 : 创建 : 位置[100,200] : 持续时间[20]
 * 插件指令：>地图临时漂浮文字 : 临时对象 : 创建 : 位置变量[25,26] : 持续时间[20]
 * 插件指令：>地图临时漂浮文字 : 临时对象 : 创建 : 相对位置[-100,0] : 持续时间[20]
 * 插件指令：>地图临时漂浮文字 : 临时对象 : 创建 : 相对位置变量[25,26] : 持续时间[20]
 * 插件指令：>地图临时漂浮文字 : 临时对象 : 创建 : 玩家 : 持续时间[20]
 * 插件指令：>地图临时漂浮文字 : 临时对象 : 创建 : 本事件 : 持续时间[20]
 * 插件指令：>地图临时漂浮文字 : 临时对象 : 创建 : 鼠标位置 : 持续时间[20]
 * 插件指令：>地图临时漂浮文字 : 临时对象 : 创建 : 事件[10] : 持续时间[20]
 * 插件指令：>地图临时漂浮文字 : 临时对象 : 创建 : 事件变量[21] : 持续时间[20]
 * 
 * 1.临时漂浮文字可以在很多位置创建。
 *   但是注意，切换菜单或离开地图都会清掉漂浮文字。
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
 * 测试方法：   在UI管理层连续创建10个左右的临时飘浮文字。
 * 测试结果1：  200个事件的地图中，平均消耗为：【21.15ms】
 *              100个事件的地图中，平均消耗为：【14.34ms】
 *              50个事件的地图中，平均消耗为：【10.25ms】
 * 测试结果2：  创建飘浮文字一小段时间内，平均消耗为：【25.47ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.注意，由于飘浮文字是实时创建的，创建时会在短时间内产生较高的
 *   消耗。创建后消耗便趋于稳定。
 * 3.所以你需要尽量少在同一帧时间内创造大量飘浮文字，可能会卡。
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
 * @param 临时漂浮样式-1
 * @parent ---样式组 1至20---
 * @type struct<DrillGFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-2
 * @parent ---样式组 1至20---
 * @type struct<DrillGFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-3
 * @parent ---样式组 1至20---
 * @type struct<DrillGFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-4
 * @parent ---样式组 1至20---
 * @type struct<DrillGFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-5
 * @parent ---样式组 1至20---
 * @type struct<DrillGFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-6
 * @parent ---样式组 1至20---
 * @type struct<DrillGFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-7
 * @parent ---样式组 1至20---
 * @type struct<DrillGFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-8
 * @parent ---样式组 1至20---
 * @type struct<DrillGFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-9
 * @parent ---样式组 1至20---
 * @type struct<DrillGFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-10
 * @parent ---样式组 1至20---
 * @type struct<DrillGFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-11
 * @parent ---样式组 1至20---
 * @type struct<DrillGFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-12
 * @parent ---样式组 1至20---
 * @type struct<DrillGFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-13
 * @parent ---样式组 1至20---
 * @type struct<DrillGFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-14
 * @parent ---样式组 1至20---
 * @type struct<DrillGFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-15
 * @parent ---样式组 1至20---
 * @type struct<DrillGFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-16
 * @parent ---样式组 1至20---
 * @type struct<DrillGFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-17
 * @parent ---样式组 1至20---
 * @type struct<DrillGFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-18
 * @parent ---样式组 1至20---
 * @type struct<DrillGFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-19
 * @parent ---样式组 1至20---
 * @type struct<DrillGFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮样式-20
 * @parent ---样式组 1至20---
 * @type struct<DrillGFTTStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 *
 * @param ---弹道组 1至20---
 * @default 
 * 
 * @param 临时漂浮弹道-1
 * @parent ---弹道组 1至20---
 * @type struct<DrillGFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-2
 * @parent ---弹道组 1至20---
 * @type struct<DrillGFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-3
 * @parent ---弹道组 1至20---
 * @type struct<DrillGFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-4
 * @parent ---弹道组 1至20---
 * @type struct<DrillGFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-5
 * @parent ---弹道组 1至20---
 * @type struct<DrillGFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-6
 * @parent ---弹道组 1至20---
 * @type struct<DrillGFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-7
 * @parent ---弹道组 1至20---
 * @type struct<DrillGFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-8
 * @parent ---弹道组 1至20---
 * @type struct<DrillGFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-9
 * @parent ---弹道组 1至20---
 * @type struct<DrillGFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-10
 * @parent ---弹道组 1至20---
 * @type struct<DrillGFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-11
 * @parent ---弹道组 1至20---
 * @type struct<DrillGFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-12
 * @parent ---弹道组 1至20---
 * @type struct<DrillGFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-13
 * @parent ---弹道组 1至20---
 * @type struct<DrillGFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-14
 * @parent ---弹道组 1至20---
 * @type struct<DrillGFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-15
 * @parent ---弹道组 1至20---
 * @type struct<DrillGFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-16
 * @parent ---弹道组 1至20---
 * @type struct<DrillGFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-17
 * @parent ---弹道组 1至20---
 * @type struct<DrillGFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-18
 * @parent ---弹道组 1至20---
 * @type struct<DrillGFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-19
 * @parent ---弹道组 1至20---
 * @type struct<DrillGFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 临时漂浮弹道-20
 * @parent ---弹道组 1至20---
 * @type struct<DrillGFTTBallistic>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * 
 */
/*~struct~DrillGFTTStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的临时漂浮样式==
 * 
 * 
 * @param --常规--
 * @default 
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
 * @default 相对于地图
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
 * @default 80
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
/*~struct~DrillGFTTBallistic:
 *
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的临时漂浮弹道==
 *
 * 
 * @param 开始移动前延迟时间
 * @type number
 * @min 0
 * @desc 漂浮文字开始移动前的延迟时间，单位帧。（1秒60帧）
 * @default 0
 * 
 * @param 移动结束后等待时间
 * @type number
 * @min 0
 * @desc 漂浮文字移动结束后的等待时间，单位帧。（1秒60帧）
 * @default 0
 *
 *  
 * @param 透明度模式
 * @type select
 * @option 匀速消失
 * @value 匀速消失
 * @option 等一半时间后匀速消失
 * @value 等一半时间后匀速消失
 * @option 先显现后消失
 * @value 先显现后消失
 * @desc 漂浮文字的消失方式。
 * @default 匀速消失
 *
 * 
 * @param 移动模式
 * @type select
 * @option 直角坐标模式
 * @value 直角坐标模式
 * @option 极坐标模式
 * @value 极坐标模式
 * @option 轨道锚点模式
 * @value 轨道锚点模式
 * @desc 描述漂浮文字运动的模式。
 * @default 极坐标模式
 * 
 * @param ---极坐标模式---
 * @desc 
 *
 * @param 速度类型
 * @parent ---极坐标模式---
 * @type select
 * @option 只初速度
 * @value 只初速度
 * @option 初速度+波动量
 * @value 初速度+波动量
 * @option 初速度+波动量+加速度
 * @value 初速度+波动量+加速度
 * @option 初速度+波动量+加速度+最大最小
 * @value 初速度+波动量+加速度+最大最小
 * @option 路程计算公式
 * @value 路程计算公式
 * @desc 描述漂浮文字速度的模式。
 * @default 只初速度
 * 
 * @param 初速度
 * @parent 速度类型
 * @desc 漂浮文字的基本速度，单位 像素/帧。
 * @default 1.0
 * 
 * @param 速度随机波动量
 * @parent 速度类型
 * @desc 漂浮文字速度上下随机浮动的量，单位 像素/帧。
 * @default 2.0
 * 
 * @param 加速度
 * @parent 速度类型
 * @desc 漂浮文字的加速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param 最大速度
 * @parent 速度类型
 * @desc 漂浮文字的最大速度，单位 像素/帧。
 * @default 99.0
 * 
 * @param 最小速度
 * @parent 速度类型
 * @desc 漂浮文字的最小速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param 路程计算公式
 * @parent 速度类型
 * @type note
 * @desc 漂浮文字的路程计算公式。可使用 变量和常量 来设计公式，具体看看文档 "1.系统 > 关于弹道.docx"介绍。
 * @default "return 0.0"
 * 
 * @param 方向类型
 * @parent ---极坐标模式---
 * @type select
 * @option 固定方向
 * @value 固定方向
 * @option 四周扩散(线性)
 * @value 四周扩散(线性)
 * @option 四周扩散(随机)
 * @value 四周扩散(随机)
 * @option 四周扩散(抖动)
 * @value 四周扩散(抖动)
 * @option 扇形范围方向(线性)
 * @value 扇形范围方向(线性)
 * @option 扇形范围方向(随机)
 * @value 扇形范围方向(随机)
 * @option 方向计算公式
 * @value 方向计算公式
 * @desc 描述漂浮文字速度的模式。
 * @default 四周扩散(线性)
 * 
 * @param 固定方向
 * @parent 方向类型
 * @desc 类型为固定方向时，漂浮文字固定方向的角度值。
 * @default 90.0
 * 
 * @param 扇形朝向
 * @parent 方向类型
 * @desc 类型为扇形范围方向时，扇形的朝向角度。
 * @default 45.0
 * 
 * @param 扇形角度
 * @parent 方向类型
 * @desc 类型为扇形范围方向时，扇形弧的角度数。
 * @default 90.0
 * 
 * @param 方向计算公式
 * @parent 方向类型
 * @type note
 * @desc 漂浮文字的方向计算公式。可使用 变量和常量 来设计公式，具体看看文档 "1.系统 > 关于弹道.docx"介绍。
 * @default "return 0.0"
 * 
 * @param ---直角坐标模式---
 * @desc 
 * 
 * @param 直角坐标整体旋转
 * @parent ---直角坐标模式---
 * @desc 将下面设计好的xy公式，进行整体旋转，单位角度。
 * @default 0.0
 *
 * @param X轴速度类型
 * @parent ---直角坐标模式---
 * @type select
 * @option 只初速度
 * @value 只初速度
 * @option 初速度+波动量
 * @value 初速度+波动量
 * @option 初速度+波动量+加速度
 * @value 初速度+波动量+加速度
 * @option 初速度+波动量+加速度+最大最小
 * @value 初速度+波动量+加速度+最大最小
 * @option 路程计算公式
 * @value 路程计算公式
 * @desc 描述漂浮文字速度的模式。
 * @default 只初速度
 * 
 * @param X轴初速度
 * @parent X轴速度类型
 * @desc 漂浮文字的基本速度，单位 像素/帧。
 * @default 1.0
 * 
 * @param X轴速度随机波动量
 * @parent X轴速度类型
 * @desc 漂浮文字速度上下随机浮动的量，单位 像素/帧。
 * @default 2.0
 * 
 * @param X轴加速度
 * @parent X轴速度类型
 * @desc 漂浮文字的加速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param X轴最大速度
 * @parent X轴速度类型
 * @desc 漂浮文字的最大速度，单位 像素/帧。
 * @default 99.0
 * 
 * @param X轴最小速度
 * @parent X轴速度类型
 * @desc 漂浮文字的最小速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param X轴路程计算公式
 * @parent X轴速度类型
 * @type note
 * @desc 漂浮文字的路程计算公式。可使用 变量和常量 来设计公式，具体看看文档 "1.系统 > 关于弹道.docx"介绍。
 * @default "return 0.0"
 *
 * @param Y轴速度类型
 * @parent ---直角坐标模式---
 * @type select
 * @option 只初速度
 * @value 只初速度
 * @option 初速度+波动量
 * @value 初速度+波动量
 * @option 初速度+波动量+加速度
 * @value 初速度+波动量+加速度
 * @option 初速度+波动量+加速度+最大最小
 * @value 初速度+波动量+加速度+最大最小
 * @option 路程计算公式
 * @value 路程计算公式
 * @desc 描述漂浮文字速度的模式。
 * @default 只初速度
 * 
 * @param Y轴初速度
 * @parent Y轴速度类型
 * @desc 漂浮文字的基本速度，单位 像素/帧。
 * @default 1.0
 * 
 * @param Y轴速度随机波动量
 * @parent Y轴速度类型
 * @desc 漂浮文字速度上下随机浮动的量，单位 像素/帧。
 * @default 2.0
 * 
 * @param Y轴加速度
 * @parent Y轴速度类型
 * @desc 漂浮文字的加速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param Y轴最大速度
 * @parent Y轴速度类型
 * @desc 漂浮文字的最大速度，单位 像素/帧。
 * @default 99.0
 * 
 * @param Y轴最小速度
 * @parent Y轴速度类型
 * @desc 漂浮文字的最小速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param Y轴路程计算公式
 * @parent Y轴速度类型
 * @type note
 * @desc 漂浮文字的路程计算公式。可使用 变量和常量 来设计公式，具体看看文档 "1.系统 > 关于弹道.docx"介绍。
 * @default "return 0.0"
 * 
 * 
 * @param ---轨道锚点模式---
 * @desc 
 * 
 * @param 轨道锚点整体旋转
 * @parent ---轨道锚点模式---
 * @desc 将下面设计好的锚点，进行整体旋转，单位角度。
 * @default 0.0
 * 
 * @param 锚点列表
 * @parent ---轨道锚点模式---
 * @desc 锚点列表。
 * @default (0,0),(100,0)
 *
 * @param 轨道速度类型
 * @parent ---轨道锚点模式---
 * @type select
 * @option 只初速度
 * @value 只初速度
 * @option 初速度+波动量
 * @value 初速度+波动量
 * @option 初速度+波动量+加速度
 * @value 初速度+波动量+加速度
 * @option 初速度+波动量+加速度+最大最小
 * @value 初速度+波动量+加速度+最大最小
 * @option 路程计算公式
 * @value 路程计算公式
 * @desc 描述子弹速度的模式。
 * @default 只初速度
 * 
 * @param 轨道初速度
 * @parent 轨道速度类型
 * @desc 子弹的基本速度，单位 像素/帧。
 * @default 1.0
 * 
 * @param 轨道速度随机波动量
 * @parent 轨道速度类型
 * @desc 子弹速度上下随机浮动的量，单位 像素/帧。
 * @default 2.0
 * 
 * @param 轨道加速度
 * @parent 轨道速度类型
 * @desc 子弹的加速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param 轨道最大速度
 * @parent 轨道速度类型
 * @desc 子弹的最大速度，单位 像素/帧。
 * @default 99.0
 * 
 * @param 轨道最小速度
 * @parent 轨道速度类型
 * @desc 子弹的最小速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param 轨道路程计算公式
 * @parent 轨道速度类型
 * @type note
 * @desc 子弹的路程计算公式。可使用 变量和常量 来设计公式，具体看看文档 "1.系统 > 关于弹道.docx"介绍。
 * @default "return 0.0"
 * 
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		GFTT (Gauge_Floating_Temporary_Text)
//		临时全局变量	DrillUp.g_GFTT_xxx
//		临时局部变量	this._drill_GFTT_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2)*o(贴图处理)  每帧
//		性能测试因素	UI管理层测试
//		性能测试消耗	7.34ms（drill_updatePosition） 10.25ms（update）
//		最坏情况		使用临时漂浮文字添加了大量窗口。
//		备注			调用插件指令时，卡，但是实际测的时候，发现并不卡，可以推断是创建时性能消耗导致。
//
//插件记录：
//		★大体框架与功能如下：
//			漂浮参数数字：
//				->结构
//					->窗口字符
//					->文本域自适应
//					->弹道核心（绑定移动）
//					->透明度类型设置
//				->插件指令添加
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.【镜头兼容】该插件的漂浮文字如果放在 下层、中层、上层、图片层 ，需要对其进行相关的镜头缩放控制。
//			3.这里的漂浮文字都是临时的，可以切菜单刷掉。
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
　　Imported.Drill_GaugeFloatingTemporaryText = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_GaugeFloatingTemporaryText');
	
	
	//==============================
	// * 变量获取 - 临时漂浮样式
	//				（~struct~DrillGFTTStyle）
	//==============================
	DrillUp.drill_GFTT_initContext = function( dataFrom ) {
		var data = {};
		// > 常规
		if( dataFrom["默认内容文本"] != undefined && 
			dataFrom["默认内容文本"] != "" ){
			data['context'] = JSON.parse( dataFrom["默认内容文本"] );
		}else{
			data['context'] = "";
		}
		// > 层级
		data['window_benchmark'] = String( dataFrom["UI基准"] || "相对于镜头");
		data['window_map_layer'] = String( dataFrom["地图层级"] || "");
		data['window_map_zIndex'] = Number( dataFrom["地图图片层级"] || 10);
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
	//==============================
	// * 变量获取 - 弹道样式
	//				（~struct~DrillGFTTBallistic）
	//==============================
	DrillUp.drill_GFTT_initBallistics = function( dataFrom ) {
		var data = {};
		
		// > 透明度（opacity）
		data['opacity_type'] = String( dataFrom["透明度模式"] || "等一半时间后匀速消失" );
		
		// > 移动（movement）
		data['movementNum'] = 1;
		data['movementTime'] = 20;
		data['movementDelay'] = Number( dataFrom["开始移动前延迟时间"] || 0);
		data['movementEndDelay'] = Number( dataFrom["移动结束后等待时间"] || 0);
		data['movementMode'] = String( dataFrom["移动模式"] || "极坐标模式" );
		//   极坐标（polar）
		data['polarSpeedType'] = String( dataFrom["速度类型"] || "只初速度" );
		data['polarSpeedBase'] = Number( dataFrom["初速度"] || 0.0);
		data['polarSpeedRandom'] = Number( dataFrom["速度随机波动量"] || 0.0);
		data['polarSpeedInc'] = Number( dataFrom["加速度"] || 0);
		data['polarSpeedMax'] = Number( dataFrom["最大速度"] || 0);
		data['polarSpeedMin'] = Number( dataFrom["最小速度"] || 0);
		var temp_str = String( dataFrom["路程计算公式"] || "\"return 0\"" );
		temp_str = temp_str.substring(1,temp_str.length-1);
		temp_str = temp_str.replace(/\\n/g,"\n");
		temp_str = temp_str.replace(/\\\\/g,"\\");
		data['polarDistanceFormula'] = temp_str;
		data['polarDirType'] = String( dataFrom["方向类型"] || "只初速度" );
		data['polarDirFixed'] = Number( dataFrom["固定方向"] || 0);
		data['polarDirSectorFace'] = Number( dataFrom["扇形朝向"] || 0);
		data['polarDirSectorDegree'] = Number( dataFrom["扇形角度"] || 0);
		temp_str = String( dataFrom["方向计算公式"] || "\"return 0\"" );
		temp_str = temp_str.substring(1,temp_str.length-1);
		temp_str = temp_str.replace(/\\n/g,"\n");
		temp_str = temp_str.replace(/\\\\/g,"\\");
		data['polarDirFormula'] = temp_str;
		//   直角坐标（cartesian）
		data['cartRotation'] = Number( dataFrom["直角坐标整体旋转"] || 0.0);
		data['cartXSpeedType'] = String( dataFrom["X轴速度类型"] || "只初速度" );
		data['cartXSpeedBase'] = Number( dataFrom["X轴初速度"] || 0.0);
		data['cartXSpeedRandom'] = Number( dataFrom["X轴速度随机波动量"] || 0.0);
		data['cartXSpeedInc'] = Number( dataFrom["X轴加速度"] || 0);
		data['cartXSpeedMax'] = Number( dataFrom["X轴最大速度"] || 0);
		data['cartXSpeedMin'] = Number( dataFrom["X轴最小速度"] || 0);
		temp_str = String( dataFrom["X轴路程计算公式"] || "return 0" );
		temp_str = temp_str.substring(1,temp_str.length-1);
		temp_str = temp_str.replace(/\\n/g,"\n");
		temp_str = temp_str.replace(/\\\\/g,"\\");
		data['cartXDistanceFormula'] = temp_str;
		data['cartYSpeedType'] = String( dataFrom["Y轴速度类型"] || "只初速度" );
		data['cartYSpeedBase'] = Number( dataFrom["Y轴初速度"] || 0.0);
		data['cartYSpeedRandom'] = Number( dataFrom["Y轴速度随机波动量"] || 0.0);
		data['cartYSpeedInc'] = Number( dataFrom["Y轴加速度"] || 0);
		data['cartYSpeedMax'] = Number( dataFrom["Y轴最大速度"] || 0);
		data['cartYSpeedMin'] = Number( dataFrom["Y轴最小速度"] || 0);
		temp_str = String( dataFrom["Y轴路程计算公式"] || "return 0" );
		temp_str = temp_str.substring(1,temp_str.length-1);
		temp_str = temp_str.replace(/\\n/g,"\n");
		temp_str = temp_str.replace(/\\\\/g,"\\");
		data['cartYDistanceFormula'] = temp_str;
		//   轨道锚点（track）
		data['trackRotation'] = Number( dataFrom["轨道锚点整体旋转"] || 0.0);
		var temp_str = String( dataFrom["锚点列表"] || "" );
		data['trackPointTank'] = DrillUp.drill_COBa_convertStringToPointList( temp_str );
		data['trackSpeedType'] = String( dataFrom["轨道速度类型"] || "只初速度" );
		data['trackSpeedBase'] = Number( dataFrom["轨道初速度"] || 0.0);
		data['trackSpeedRandom'] = Number( dataFrom["轨道速度随机波动量"] || 0.0);
		data['trackSpeedInc'] = Number( dataFrom["轨道加速度"] || 0);
		data['trackSpeedMax'] = Number( dataFrom["轨道最大速度"] || 0);
		data['trackSpeedMin'] = Number( dataFrom["轨道最小速度"] || 0);
		var temp_str = String( dataFrom["轨道路程计算公式"] || "\"return 0\"" );
		temp_str = temp_str.substring(1,temp_str.length-1);
		temp_str = temp_str.replace(/\\n/g,"\n");
		temp_str = temp_str.replace(/\\\\/g,"\\");
		//   两点式（twoPoint）（关闭）
		return data;
	}
	
	
	/*-----------------临时漂浮样式集合------------------*/
	DrillUp.g_GFTT_style_length = 20;
	DrillUp.g_GFTT_style = [];
	for( var i = 0; i < DrillUp.g_GFTT_style_length; i++ ){
		if( DrillUp.parameters["临时漂浮样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["临时漂浮样式-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["临时漂浮样式-" + String(i+1) ]);
			DrillUp.g_GFTT_style[i] = DrillUp.drill_GFTT_initContext( temp );
		}else{
			DrillUp.g_GFTT_style[i] = DrillUp.drill_GFTT_initContext( {} );
		}
	}
	
	/*-----------------临时漂浮弹道------------------*/
	DrillUp.g_GFTT_ballistics_length = 20;
	DrillUp.g_GFTT_ballistics = [];
	for( var i = 0; i < DrillUp.g_GFTT_ballistics_length; i++ ){
		if( DrillUp.parameters["临时漂浮弹道-" + String(i+1) ] != undefined &&
			DrillUp.parameters["临时漂浮弹道-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["临时漂浮弹道-" + String(i+1) ]);
			DrillUp.g_GFTT_ballistics[i] = DrillUp.drill_GFTT_initBallistics( temp );
		}else{
			DrillUp.g_GFTT_ballistics[i] = DrillUp.drill_GFTT_initBallistics( {} );
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
var _drill_GFTT_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_GFTT_pluginCommand.call(this, command, args);
	if(command === ">地图临时漂浮文字"){
		
		/*-----------------初始化------------------*/
		if( args.length == 8 ){	
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( unit == "临时对象" && type == "初始化" ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1)-1;
				temp2 = temp2.replace("弹道[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2)-1;
				$gameTemp.drill_GFTT_setBuffer( temp1, temp2 );
			}
		}
		if( args.length == 6 ){	
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( unit == "临时对象" && type == "修改内容文本" ){
				
				if( temp1.indexOf("字符串[") != -1 ){
					temp1 = temp1.replace("字符串[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameStrings.value( Number(temp1) );
					$gameTemp.drill_GFTT_setBufferContext( temp1 );
					
				}else if( temp1.indexOf("文本[") != -1 ){
					temp1 = temp1.replace("文本[","");
					temp1 = temp1.replace(/\]$/,"");	//（去掉末尾的]）
					$gameTemp.drill_GFTT_setBufferContext( temp1 );
				}
			}
		}
		
		/*-----------------创建------------------*/
		if( args.length == 8 ){	
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( unit == "临时对象" && type == "创建" ){
				
				var pos = null;
				var tw = $gameMap.tileWidth();
				var th = $gameMap.tileHeight();
				if( temp1.indexOf("相对位置变量[") != -1 ){
					temp1 = temp1.replace("相对位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(",");
					pos = [ $gameVariables.value(Number(temp1[0])), 
							$gameVariables.value(Number(temp1[1])) ];
					
				}else if( temp1.indexOf("相对位置[") != -1 ){
					temp1 = temp1.replace("相对位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(",");
					pos = [ Number(temp1[0]), 
							Number(temp1[1]) ];
					
				}else if( temp1.indexOf("位置变量[") != -1 ){
					temp1 = temp1.replace("位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(",");
					pos = [ $gameVariables.value(Number(temp1[0])), 
							$gameVariables.value(Number(temp1[1])) ];
				}
				else if( temp1.indexOf("位置[") != -1 ){
					temp1 = temp1.replace("位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(",");
					pos = [ Number(temp1[0]), 
							Number(temp1[1]) ];
				}
				else if( temp1 == "本事件" ){
					var e = $gameMap.event( this._eventId );
					var e_pos = [ e._realX, e._realY ];
					pos = [ Math.round( $gameMap.adjustX( e_pos[0] ) * tw + tw*0.5 ), 
							Math.round( $gameMap.adjustY( e_pos[1] ) * th + th*0.5 ) ];
				}
				else if( temp1 == "玩家" ){
					var e_pos = [ $gamePlayer._realX, $gamePlayer._realY ];
					pos = [ Math.round( $gameMap.adjustX( e_pos[0] ) * tw + tw*0.5 ), 
							Math.round( $gameMap.adjustY( e_pos[1] ) * th + th*0.5 ) ];
				}
				else if( temp1 == "鼠标位置" ){
					pos = [ _drill_mouse_x, _drill_mouse_y ];
				}
				else if( temp1.indexOf("事件变量[") != -1 ){
					temp1 = temp1.replace("事件变量[","");
					temp1 = temp1.replace("]","");
					var e_id = $gameVariables.value(Number(temp1));
					if( $gameMap.drill_GFTT_isEventExist( e_id ) == false ){ return; }
					var e = $gameMap.event( e_id );
					var e_pos = [ e._realX, e._realY ];
					pos = [ Math.round( $gameMap.adjustX( e_pos[0] ) * tw + tw*0.5 ), 
							Math.round( $gameMap.adjustY( e_pos[1] ) * th + th*0.5 ) ];
				}
				else if( temp1.indexOf("事件[") != -1 ){
					temp1 = temp1.replace("事件[","");
					temp1 = temp1.replace("]","");
					var e_id = Number(temp1);
					if( $gameMap.drill_GFTT_isEventExist( e_id ) == false ){ return; }
					var e = $gameMap.event( e_id );
					var e_pos = [ e._realX, e._realY ];
					pos = [ Math.round( $gameMap.adjustX( e_pos[0] ) * tw + tw*0.5 ), 
							Math.round( $gameMap.adjustY( e_pos[1] ) * th + th*0.5 ) ];
				}
				
				if( pos != null ){
					temp2 = temp2.replace("持续时间[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					$gameTemp.drill_GFTT_create( pos, temp2 );
				}
			}
		}
		
		
	};
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_GFTT_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_GaugeFloatingTemporaryText.js 地图UI - 临时漂浮文字】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 缓冲数据
//=============================================================================
//==============================
// ** 缓冲数据 - 初始化
//==============================
var _drill_GFTT_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_GFTT_temp_initialize.call(this);
	
	this._drill_GFTT_commandBuffer = null;		//临时对象
	this._drill_GFTT_commandSeq = [];			//漂浮文字容器
};
//==============================
// ** 缓冲数据 - 设置临时对象
//==============================
Game_Temp.prototype.drill_GFTT_setBuffer = function( style_id, ballistics_id ){
	
	var s_data = JSON.parse(JSON.stringify( DrillUp.g_GFTT_style[ style_id ] ));			//深拷贝
	var b_data = JSON.parse(JSON.stringify( DrillUp.g_GFTT_ballistics[ ballistics_id ] ));	//深拷贝
	
	var data = {};
	data['s_data'] = s_data;
	data['b_data'] = b_data;
	this._drill_GFTT_commandBuffer = data;
};
//==============================
// ** 缓冲数据 - 修改内容文本
//==============================
Game_Temp.prototype.drill_GFTT_setBufferContext = function( context ){
	this._drill_GFTT_commandBuffer['s_data']['context'] = context;
};
//==============================
// ** 缓冲数据 - 创建
//==============================
Game_Temp.prototype.drill_GFTT_create = function( pos, time ){
	var data = this._drill_GFTT_commandBuffer;
	if( data == undefined ){ return; }
	
	data['b_data']['movementNum'] = 1;						//对象数量
	data['b_data']['movementTime'] = time;					//时长
	data['b_data']['temp_org_x'] = pos[0];
	data['b_data']['temp_org_y'] = pos[1];
	
	this._drill_GFTT_commandSeq.push( data );
};


//=============================================================================
// ** 地图层级
//=============================================================================
//==============================
// ** 下层
//==============================
var _drill_GFTT_layer_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	_drill_GFTT_layer_createParallax.call(this);		//rmmv远景 < 下层 < rmmv图块
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// ** 中层
//==============================
var _drill_GFTT_layer_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_GFTT_layer_createTilemap.call(this);		//rmmv图块 < 中层 < rmmv玩家
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// ** 上层
//==============================
var _drill_GFTT_layer_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_GFTT_layer_createDestination.call(this);	//rmmv鼠标目的地 < 上层 < rmmv天气
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// ** 图片层
//==============================
var _drill_GFTT_layer_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_GFTT_layer_createPictures.call(this);		//rmmv图片 < 图片层 < rmmv对话框
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// ** 最顶层
//==============================
var _drill_GFTT_layer_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_GFTT_layer_createAllWindows.call(this);	//rmmv对话框 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// ** 层级排序
//==============================
Scene_Map.prototype.drill_GFTT_sortByZIndex = function() {
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
var _drill_GFTT_map_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {	
	_drill_GFTT_map_initialize.call(this);
	this._drill_GFTT_windowTank = [];
};
//==============================
// * 地图 - 帧刷新
//==============================
var _drill_GFTT_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_GFTT_map_update.call(this);
	if( this.isActive() ){
		this.drill_GFTT_updateWindowAddChild();			//插件指令建立贴图
		this.drill_GFTT_updateWindowDelete();			//贴图删除
	}
};
//==============================
// * 帧刷新 - 插件指令设置贴图
//==============================
Scene_Map.prototype.drill_GFTT_updateWindowAddChild = function() {
	for( var i = $gameTemp._drill_GFTT_commandSeq.length-1; i >= 0; i-- ){
		var temp_data = $gameTemp._drill_GFTT_commandSeq[i];
		if( temp_data == undefined ){ continue; }
		
		// > 层级初始化
		var s_data = temp_data['s_data'];
		var b_data = temp_data['b_data'];
		var temp_window = new Drill_GFTT_Window( s_data, b_data );
		temp_window.zIndex = s_data['window_map_zIndex'];
		this._drill_GFTT_windowTank.push( temp_window );
		
		// > 层级初始化
		if( s_data['window_map_layer'] == "下层" ){
			this._spriteset._drill_mapDownArea.addChild(temp_window);
		}
		if( s_data['window_map_layer'] == "中层" ){
			this._spriteset._drill_mapCenterArea.addChild(temp_window);
		}
		if( s_data['window_map_layer'] == "上层" ){
			this._spriteset._drill_mapUpArea.addChild(temp_window);
		}
		if( s_data['window_map_layer'] == "图片层" ){
			this._spriteset._drill_mapPicArea.addChild(temp_window);
		}
		if( s_data['window_map_layer'] == "最顶层" ){
			this._drill_SenceTopArea.addChild(temp_window);
		}
		this.drill_GFTT_sortByZIndex();
		
		$gameTemp._drill_GFTT_commandSeq.splice( i, 1 );
	}
}
//==============================
// * 帧刷新 - 贴图删除
//==============================
Scene_Map.prototype.drill_GFTT_updateWindowDelete = function() {
	for( var i = this._drill_GFTT_windowTank.length-1; i >= 0; i-- ){
		var temp_window = this._drill_GFTT_windowTank[i];
		if( temp_window.drill_isDead() ){
			
			// > 从层中去除
			this._spriteset._drill_mapDownArea.removeChild( temp_window );
			this._spriteset._drill_mapCenterArea.removeChild( temp_window );
			this._spriteset._drill_mapUpArea.removeChild( temp_window );
			this._spriteset._drill_mapPicArea.removeChild( temp_window );
			this._drill_SenceTopArea.removeChild( temp_window );
			
			// > 从容器中去除
			this._drill_GFTT_windowTank.splice( i, 1 );
		}
	}
}


//=============================================================================
// ** 漂浮文字窗口【Drill_GFTT_Window】
//			
//			索引：	无
//			来源：	继承于Window_Base
//			实例：	Scene_Map下的 _drill_GFTT_window 成员
//			应用：	暂无 
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
function Drill_GFTT_Window() {
    this.initialize.apply(this, arguments);
};
Drill_GFTT_Window.prototype = Object.create(Window_Base.prototype);
Drill_GFTT_Window.prototype.constructor = Drill_GFTT_Window;
//==============================
// * 漂浮文字窗口 - 初始化
//==============================
Drill_GFTT_Window.prototype.initialize = function( s_data, b_data ){
	this._drill_style_data = s_data;			//样式数据（直接传指针）
	this._drill_ballistics_data = b_data;		//弹道数据（直接传指针）
	
    Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
	
	this.drill_initData();				//初始化数据
	this.drill_initSprite();			//初始化对象
	
	this.drill_refreshMessageFromData();	//刷新内容
};
//==============================
// * 漂浮文字窗口 - 帧刷新
//==============================
Drill_GFTT_Window.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	
	this._drill_time += 1;
	this.drill_updatePosition();		//帧刷新 - 位置
}
//==============================
// * 漂浮文字窗口 - 窗口属性
//==============================
Drill_GFTT_Window.prototype.lineHeight = function(){ return this._drill_style_data['window_lineheight']; };			//窗口行间距
Drill_GFTT_Window.prototype.standardPadding = function(){ return this._drill_style_data['window_padding']; };			//窗口内边距
Drill_GFTT_Window.prototype.standardFontSize = function(){ return this._drill_style_data['window_fontsize']; };		//窗口字体大小
//==============================
// * 漂浮文字窗口 - 持续时间
//==============================
Drill_GFTT_Window.prototype.drill_isDead = function() {
	var b_data = this._drill_ballistics_data;
	return this._drill_time > (b_data['movementDelay'] + b_data['movementTime'] + b_data['movementEndDelay']);
};
//==============================
// * 初始化 - 数据
//==============================
Drill_GFTT_Window.prototype.drill_initData = function() {
	var s_data = this._drill_style_data;
	var b_data = this._drill_ballistics_data;
	
	// > 皮肤设置
	this._drill_window_sys_bitmap = ImageManager.loadSystem( s_data['window_sys_src'] );
	this._drill_window_pic_bitmap = ImageManager.loadSystem( s_data['window_pic_src'] );
	
	
	// > 私有属性初始化
	this.x = 0;
	this.y = Graphics.boxHeight*2;
	this._drill_time = 0;
	this._drill_width = 0;
	this._drill_height = 0;
	
	this._drill_anchor_x = 0;			//中心锚点x
	this._drill_anchor_y = 0;			//中心锚点y
	if( s_data['window_anchor'] == "右上角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 0.0; }
	if( s_data['window_anchor'] == "正中心" ){ this._drill_anchor_x = 0.5; this._drill_anchor_y = 0.5; }
	if( s_data['window_anchor'] == "左下角" ){ this._drill_anchor_x = 0.0; this._drill_anchor_y = 1.0; }
	if( s_data['window_anchor'] == "右下角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 1.0; }
	
	// > UI基准初始位置
	this._drill_orgPos_x = $gameMap.adjustX(0);
	this._drill_orgPos_y = $gameMap.adjustY(0);
	
	// > 移动弹道初始化
	$gameTemp.drill_COBa_setBallisticsMove( b_data );												//弹道核心 - 坐标初始化
	$gameTemp.drill_COBa_preBallisticsMove( this, 0 , b_data['temp_org_x'], b_data['temp_org_y'] );	//弹道核心 - 推演
	
	// > 透明度弹道初始化
	var org_opacity = 255;
	var o_time = b_data['movementDelay'] + b_data['movementTime'] + b_data['movementEndDelay'];
	var o_data = {};
	o_data['opacityNum'] = 1;											//对象数量
	if( b_data['opacity_type'] == "匀速消失" ){
		o_data['opacityMode'] = "目标值模式";								//移动模式
		o_data['targetType'] = "匀速变化";									//目标值模式 - 类型（匀速变化/弹性变化/…）
		o_data['targetDifference'] = 0 - org_opacity;						//目标值模式 - 距离差值
		o_data['opacityTime'] = o_time;	
		o_data['opacityDelay'] = 0;		
		o_data['opacityEndDelay'] = 0;	
	}
	if( b_data['opacity_type'] == "等一半时间后匀速消失" ){
		o_data['opacityMode'] = "目标值模式";								//移动模式
		o_data['targetType'] = "匀速变化";									//目标值模式 - 类型（匀速变化/弹性变化/…）
		o_data['targetDifference'] = 0 - org_opacity;						//目标值模式 - 距离差值
		o_data['opacityTime'] = o_time * 0.5;	
		o_data['opacityDelay'] = o_time * 0.5;		
		o_data['opacityEndDelay'] = 0;	
	}
	if( b_data['opacity_type'] == "先显现后消失" ){
		o_data['opacityMode'] = "时间锚点模式";			
		o_data['opacityTime'] = o_time;		
		o_data['anchorPointTank'] = [];	
		o_data['anchorPointTank'].push( {'t':0,'o':0} );		//（四分之一时间显现，而后四分之一消失）
		o_data['anchorPointTank'].push( {'t':25,'o':255} );		
		o_data['anchorPointTank'].push( {'t':75,'o':255} );		
		o_data['anchorPointTank'].push( {'t':100,'o':0} );		
	}
	
	// > 弹道（透明度）
	$gameTemp.drill_COBa_setBallisticsOpacity( o_data );							//弹道核心 - 透明度初始化
	$gameTemp.drill_COBa_preBallisticsOpacity( this, 0 , org_opacity );			
	
}
//==============================
// * 初始化 - 对象
//==============================
Drill_GFTT_Window.prototype.drill_initSprite = function() {
	this.drill_createBackground();		//创建背景
	this.drill_sortBottomByZIndex();	//底层层级排序
	
	// > 窗口属性
	this.createContents();
    this.contents.clear();
}
//==============================
// * 创建 - 背景
//==============================
Drill_GFTT_Window.prototype.drill_createBackground = function() {
	var s_data = this._drill_style_data;
	this._drill_background = new Sprite();
	
	// > 图层顺序处理
	this._drill_background.zIndex = 1;
	this._windowBackSprite.zIndex = 2;
	this._windowFrameSprite.zIndex = 3;
	
	// > 信息框布局
	if( s_data['window_type'] == "默认窗口皮肤" ){
		
		// > 透明度
		this.opacity = s_data['window_opacity'];
		this._drill_background.opacity = s_data['window_opacity'];
		this._windowBackSprite.opacity = s_data['window_opacity'];
		this._windowFrameSprite.opacity = s_data['window_opacity'];
		
		
	}else if( s_data['window_type'] == "自定义窗口皮肤" ){
		
		// > 皮肤设置
		this.windowskin = this._drill_window_sys_bitmap;
		
		// > 透明度
		this._drill_background.opacity = s_data['window_opacity'];
		this._windowBackSprite.opacity = s_data['window_opacity'];
		this._windowFrameSprite.opacity = s_data['window_opacity'];
		
		
	}else if( s_data['window_type'] == "自定义背景图片" ){
		
		// > bimap建立
		this._drill_background.bitmap = this._drill_window_pic_bitmap;
		this._drill_background.x = s_data['window_pic_x'];
		this._drill_background.y = s_data['window_pic_y'];
		
		// > 透明度
		this._drill_background.opacity = s_data['window_opacity'];
		this._windowBackSprite.opacity = 0;
		this._windowFrameSprite.opacity = 0;
		
		
	}else if( s_data['window_type'] == "黑底背景" ){
		
		// > bimap建立
		//（需延迟设置，见后面）
		
		// > 透明度
		this._drill_background.opacity = s_data['window_opacity'];
		this._windowBackSprite.opacity = 0;
		this._windowFrameSprite.opacity = 0;
	}
	
	this._windowSpriteContainer.addChild(this._drill_background);	//（ _windowSpriteContainer 为窗口的最底层贴图）
}
//==============================
// ** 底层层级排序
//==============================
Drill_GFTT_Window.prototype.drill_sortBottomByZIndex = function() {
   this._windowSpriteContainer.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
};


//==============================
// * 帧刷新 - 位置
//==============================
Drill_GFTT_Window.prototype.drill_updatePosition = function() {
	var s_data = this._drill_style_data;
	var b_data = this._drill_ballistics_data;
	if( this['_drill_COBa_x'].length == 0 ){ return; }
		
	// > 根据轨迹进行播放
	var time = this._drill_time;
	if( time < 0 ){ time = 0; }
	if( time > this['_drill_COBa_x'].length-1 ){
		time = this['_drill_COBa_x'].length-1;
	}
	var xx = this['_drill_COBa_x'][ time ];		//播放弹道轨迹
	var yy = this['_drill_COBa_y'][ time ];
	var oo = this['_drill_COBa_opacity'][ time ];
	
	// > UI基准偏移（相对于地图）
	if( s_data['window_benchmark'] == "相对于地图" ){
		var pos_x = $gameMap.adjustX(0);
		var pos_y = $gameMap.adjustY(0);
		xx += $gameMap.deltaX( pos_x, this._drill_orgPos_x ) * $gameMap.tileWidth();
		yy += $gameMap.deltaY( pos_y, this._drill_orgPos_y ) * $gameMap.tileHeight();
	}
	
	// > 地图镜头修正（处于下层/中层/上层/图片层，需要一起缩放）
	if( Imported.Drill_LayerCamera && 			
		s_data['window_map_layer'] != "最顶层" ){
		xx = $gameSystem.drill_LCa_cameraToMapX( xx );
		yy = $gameSystem.drill_LCa_cameraToMapY( yy );
		this.scale.x = 1.00 / $gameSystem.drill_LCa_curScaleX();
		this.scale.y = 1.00 / $gameSystem.drill_LCa_curScaleY();
	}
	
	// > 窗口的锚点
	xx -= this._drill_width * this._drill_anchor_x;
	yy -= this._drill_height * this._drill_anchor_y;
	
	this.x = xx;
	this.y = yy;
	this.contentsOpacity = oo;
}
//==============================
// * 激活 - 刷新内容
//==============================
Drill_GFTT_Window.prototype.drill_refreshMessageFromData = function(){
	var s_data = this._drill_style_data;
	this.drill_refreshMessage( s_data['context'].split("\n") );
}
//==============================
// * 激活 - 刷新内容
//==============================
Drill_GFTT_Window.prototype.drill_refreshMessage = function( context_list ){
	var s_data = this._drill_style_data;
	var b_data = this._drill_ballistics_data;
	if( context_list.length == 0 ){ return; }
	
	// > 窗口高宽 - 计算
	var options = {};
	options['convertEnabled'] = false;
	options['autoLineheight'] = s_data['window_autoLineheight'];
	options['lineheight'] = s_data['window_lineheight'];
	this.drill_COWA_DTLE_calculateHeightAndWidth( context_list, options );		//（窗口辅助核心）
	// > 窗口高宽 - 赋值
	var ww = 0;
	var hh = 0;
	for( var i=0; i < this.drill_COWA_widthList.length; i++ ){ if( ww < this.drill_COWA_widthList[i] ){ ww = this.drill_COWA_widthList[i]; } }
	for( var i=0; i < this.drill_COWA_heightList.length; i++ ){ hh += this.drill_COWA_heightList[i]; }
	ww += this.standardPadding() * 2;
	hh += this.standardPadding() * 2;
	ww += s_data['window_ex_width'] || 0;		//（附加高宽）
	hh += s_data['window_ex_height'] || 0;
	this._drill_width = ww;
	this._drill_height = hh;
	this.width = this._drill_width;
	this.height = this._drill_height;
	
	
	// > 绘制内容
	this.drill_COWA_drawTextListEx( context_list, options );
	
	
	if( s_data['window_type'] == "黑底背景" ){
		this._drill_background_BlackBitmap = new Bitmap(this._drill_width, this._drill_height);
		this._drill_background_BlackBitmap.fillRect(0, 0 , this._drill_width, this._drill_height, "#000000");	//（背景黑框）
		this._drill_background.bitmap = this._drill_background_BlackBitmap;
	}
	
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_GaugeFloatingTemporaryText = false;
		alert(
			"【Drill_GaugeFloatingTemporaryText.js 地图UI - 漂浮参数数字】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfBallistics 系统-弹道核心" + 
			"\n- Drill_CoreOfWindowAuxiliary 系统-窗口辅助核心"
		);
}

