/*:
@target MV MZ
@plugindesc 技能树配置
@author うなぎおおとろ/<译>公孖。狼
@url https://raw.githubusercontent.com/unagiootoro/RPGMZ/master/SkillTreeConfig.js

@help
[概要]
此为技能树导入插件。
通过SP学习技能激活构建好的技能树。

[使用方法]
■ 技能树的设定方法
技能树的构建、主要通过在「SkillTreeConfig.js」文件中编订。
基本设定思路为、首先设定每位角色的技能类型(比如剑法技能、魔法技能等)、
随后按照不同技能类型构架各自发展线路、逐步构架为技能树。
技能树的功能、可以使技能能够衍生升级系统(只有炎技Ⅰを习得后方能学习炎技Ⅱ)。

■ SP获取方式设定
想要学习技能、获取SP点数是必须的。
SP点数的获取方式有
・战斗结束后奖励获得
・等级提升时奖励获得
这两种形式可以被设定。

・战斗结束后获取SP点数的設定方法
在数据库敌人的备注栏
<battleEndGainSp: SP>
以上形式记载。

・等级提升时SP点数的获取方法設定
通过配置中「levelUpGainSp」项目进行设定。

■ 通过事件取得SP点数设定方法
通过脚本写入
skt_gainSp(角色ID, SP获取值)
对应角色可以获取相应SP点数。
例如、想要ID为1の角色取得5SP点数的话、
skt_gainSp(1, 5);
以上形式写入。

■ 分配累计取得的SP
写入skt_totalSp(角色ID, 累计SP存储点变量ID)、
可将该当角色迄今为止分配到的SP代入指定变量。
例如、欲将ID为1的角色累计SP代入变量ID2中、
写入skt_totalSp(1, 2);即可。

■ 技能洗点
通过脚本写入
skt_skillReset(角色ID);
已经习得的技能可以重置、归还SP点数。
例如、想要为ID为1的角色进行洗点的话、
skt_skillReset(1);
以上形式写入。

■ 技能树类型的有効/无効开关
通过脚本写入
skt_enableType(角色ID, "类型名");
以上形式为有効。

无効的话、
skt_disableType(角色ID, "类型名")
以上形式写入。

转换为无效的技能类型、在技能树标题一览中也将不再显示。

■ 技能类型的继承
满足特定条件后想要在某类型满条之外追加新的技能的情况下、可以使用「タイプの引継ぎ」。
例如、技能类型把「下位魔法」变更为「上位魔法」的场合、在预先登陆两类技能类型的基础上、
先将「上位魔法」無効化。之后再通过技能类型继承功能、促使「下位魔法」向「上位魔法」引导继承。

想要让技能类型继承、脚本写入
skt_migrationType(アクターID, "引継ぎ元タイプ名", "引継ぎ先タイプ名", リセット有無);
关于是否可以复位、也就是继承后、想要开放还原为原来的初始类型的功能、设定为true、
不需要的话、则设定为false。
例如、ID为1的角色、技能类型已经由「下位魔法」继承为「上位魔法」、需要复位洗点的话、
skt_migrationType(アクターID, "下位魔法", "上位魔法", true);
以上形式写入。

■ 在地图场景读取写入技能树
通过从地图读取技能树的各个技能的配置坐标、我们可以在某种程度上建立一个自由布局的技能树
ps这个功能可以设定的仅仅只有技能的坐标、技能之间的线需在插件中绘制。

・技能坐标的设定
地图上的事件中、进行设定。
例如、想要标入"炎技"的场合、在想要配置技能的坐标上做一个空事件、
事件的备注栏中写入
炎技
这样的话、标注"炎技"的对应事件的XY座標成为了该技能のXY座標被使用。

■ 脚本启动技能树
输入以下脚本
skt_open(角色ID);
既可查看指定角色的技能树。
*/

const loadSkillTreeConfig = () => {
return {
// =============================================================
// ●以下开始请自定义具体项目。
// =============================================================

// スキルツリーのタイプの設定を行います。
// skillTreeTypes: [ ～ ]の中にアクターの数だけタイプ設定を追加します。

// タイプ設定は、次の形式で設定します。
// { actorId: アクターのID, types: [タイプ情報1, タイプ情報2, ...] }

// タイプ情報は、次の形式で設定します。
// [タイプ種別, タイプ名, タイプの説明, タイプ有効/無効]
// タイプ種別...スキルの派生設定でタイプを識別するためのユニークな識別子を設定します。
// タイプ名...タイプ一覧のウィンドウに表示するタイプ名を設定します。
// タイプの説明...タイプ一覧のウィンドウに表示するタイプの説明を設定します。
// タイプ有効/無効...タイプを有効にする場合は、trueを、無効にする場合は、falseを指定します。
//                  この項目については、省略可能です。省略した場合、trueが指定されます。
skillTreeTypes: [
    {
        actorId: 1,
        types: [
            ["剣技", "剣技", "剣技を取得します。"],
            ["格闘技", "格闘技", "格闘技を取得します。"],
        ]
    },

    {
        actorId: 2,
        types: [
            ["剣技", "剣技", "剣技を取得します。"],
            ["格闘技", "格闘技", "格闘技を取得します。"],
        ]
    },

    {
        actorId: 3,
        types: [
            ["剣技", "剣技", "剣技を取得します。"],
            ["格闘技", "格闘技", "格闘技を取得します。"],
        ]
    },

    {
        actorId: 4,
        types: [
            ["剣技", "剣技", "剣技を取得します。"],
            ["格闘技", "格闘技", "格闘技を取得します。"],
        ]
    },

    {
        actorId: 5,
        types: [
            ["下位攻撃魔法", "攻撃魔法", "攻撃魔法を取得します。"],
            ["上位攻撃魔法", "攻撃魔法", "攻撃魔法を取得します。", false],
            ["回復魔法", "回復魔法", "回復魔法を取得します。"],
        ]
    },

    {
        actorId: 6,
        types: [
            ["下位攻撃魔法", "攻撃魔法", "攻撃魔法を取得します。"],
            ["上位攻撃魔法", "攻撃魔法", "攻撃魔法を取得します。", false],
            ["回復魔法", "回復魔法", "回復魔法を取得します。"],
        ]
    },

    {
        actorId: 7,
        types: [
            ["下位攻撃魔法", "攻撃魔法", "攻撃魔法を取得します。"],
            ["上位攻撃魔法", "攻撃魔法", "攻撃魔法を取得します。", false],
            ["回復魔法", "回復魔法", "回復魔法を取得します。"],
        ]
    },

    {
        actorId: 8,
        types: [
            ["下位攻撃魔法", "攻撃魔法", "攻撃魔法を取得します。"],
            ["上位攻撃魔法", "攻撃魔法", "攻撃魔法を取得します。", false],
            ["回復魔法", "回復魔法", "回復魔法を取得します。"],
        ]
    },
],

// スキルツリーのマップ読み込み設定を行います。
// 読み込むマップは以下の形式で指定します。
// skillTreeMapId: { skillTreeName1: mapID1, skillTreeName2: mapID2, ... }
// skillTreeName...スキルツリーのタイプ名を指定します。
// mapID...読み込むマップIDを指定します。0の場合は読み込みを行いません。
skillTreeMapId: {
    "下位攻撃魔法": 0,
    "上位攻撃魔法": 0,
    "回復魔法": 0,
    "剣技": 0,
    "格闘技": 0,
},

// 各スキルの情報を登録します。
// skillTreeInfo: [ ～ ]の中に登録するスキル数分のスキル情報の登録を行います。

// スキル情報の登録は次の形式で行います。
// [スキル名, スキルID, 必要SP, アイコン情報]
// スキル名...スキルツリーの派生設定でスキルを一意に識別するための識別子
//            識別子なので、実際のスキル名と一致していなくても問題はありません。
// スキルID...データベース上で該当するスキルのID
// 必要SP...スキルの習得に必要なSP
// アイコン情報については、アイコンを使用するか、任意の画像を使用するかに応じて次の形式で登録します。
//   アイコンを使用する場合 ["icon", iconIndex]
//   iconIndex...使用するアイコンのインデックス
//               iconIndexは省略可能です。省略した場合、スキルに設定されているアイコンが使用されます。
//   画像を使用する場合 ["img", fileName]
//   fileName...画像のファイル名。画像は、「img/pictures」フォルダにインポートしてください。
// なお、アイコン情報については省略可能です。省略した場合、["icon"]が適用されます。
skillTreeInfo: [
    // 剣技
    ["強撃", 172, 1, ["icon"]],
    ["薙ぎ払い", 173, 1, ["icon"]],
    ["連続攻撃", 174, 1, ["icon"]],
    ["気合い", 175, 1, ["icon"]],
    ["応急処置", 176, 1, ["icon"]],
    ["乙女の構え", 177, 1, ["icon"]],
    ["スピンクラッシュ", 178, 1, ["icon"]],

    // 格闘技
    ["足払い", 216, 1, ["icon"]],
    ["気孔術", 217, 1, ["icon"]],
    ["回し蹴り", 218, 1, ["icon"]],
    ["猛虎乱舞", 219, 1, ["icon"]],

    // 攻撃魔法
    ["ファイアⅠ", 99, 1, ["icon"]],
    ["ファイアⅡ", 100, 1, ["icon"]],
    ["ファイアⅢ", 101, 1, ["icon"]],

    ["フレイムⅠ", 103, 1, ["icon"]],
    ["フレイムⅡ", 104, 1, ["icon"]],
    ["フレイムⅢ", 105, 1, ["icon"]],

    ["アイスⅠ", 107, 1, ["icon"]],
    ["アイスⅡ", 108, 1, ["icon"]],
    ["アイスⅢ", 109, 1, ["icon"]],

    ["ブリザードⅠ", 111, 1, ["icon"]],
    ["ブリザードⅡ", 112, 1, ["icon"]],
    ["ブリザードⅢ", 113, 1, ["icon"]],

    ["サンダーⅠ", 115, 1, ["icon"]],
    ["サンダーⅡ", 116, 1, ["icon"]],
    ["サンダーⅢ", 117, 1, ["icon"]],

    ["スパークⅠ", 119, 1, ["icon"]],
    ["スパークⅡ", 120, 1, ["icon"]],
    ["スパークⅢ", 121, 1, ["icon"]],

    ["ニュークリアⅠ", 156, 1, ["icon"]],
    ["ニュークリアⅡ", 157, 1, ["icon"]],

    // 回復魔法
    ["ヒールⅠ", 52, 1, ["icon"]],
    ["ヒールⅡ", 53, 1, ["icon"]],
    ["ヒールⅢ", 54, 1, ["icon"]],

    ["リカバーⅠ", 56, 1, ["icon"]],
    ["リカバーⅡ", 57, 1, ["icon"]],
    ["リカバーⅢ", 58, 1, ["icon"]],

    ["キュアーⅠ", 60, 1, ["icon"]],
    ["キュアーⅡ", 61, 1, ["icon"]],
    ["キュアーⅢ", 62, 1, ["icon"]],

    ["レイズⅠ", 64, 1, ["icon"]],
    ["レイズⅡ", 65, 1, ["icon"]],
],

// スキルツリーの派生設定を行います。
// skillTreeDerivative: { ～ }の中にタイプ数分のスキルツリーの登録を行います。

// スキルツリーの派生設定は次のように行います。
// "タイプ名": [ [スキル1, [派生先スキル1, 派生先スキル2, ...]], [スキル2, [派生先スキル3, 派生先スキル4, ...] ]
// ※派生先スキルが存在しない終端スキルの場合、派生先スキルは省略可能です。
//
// 例えば、"様子を見る"と"連続攻撃"を取得すると、"２回攻撃"が取得できるようにするには、次の設定を行います。
// ["様子を見る", ["２回攻撃"]],
// ["連続攻撃", ["２回攻撃"]],
// ["２回攻撃"],
//
// また、"ヒール"を取得すると、"ファイア"と"スパーク"が取得できるようにするには、次の設定を行います。
// ["ヒール", ["ファイア"]],
// ["ヒール", ["スパーク"]],
// ["ファイア"],
// ["スパーク"],
skillTreeDerivative: {
    "剣技": [
        ["強撃", ["連続攻撃"]],
        ["薙ぎ払い", ["連続攻撃"]],
        ["気合い", ["応急処置"]],
        ["連続攻撃", ["乙女の構え"]],
        ["応急処置", ["スピンクラッシュ"]],
        ["乙女の構え", ["スピンクラッシュ"]],
        ["スピンクラッシュ"],
    ],

    "格闘技": [
        ["足払い", ["回し蹴り"]],
        ["気孔術", ["猛虎乱舞"]],
        ["回し蹴り", ["猛虎乱舞"]],
        ["猛虎乱舞"],
    ],

    "下位攻撃魔法": [
        ["ファイアⅠ", ["ファイアⅡ", "フレイムⅠ"]],
        ["ファイアⅡ", ["ファイアⅢ", "フレイムⅡ"]],
        ["フレイムⅠ", ["フレイムⅡ"]],
        ["ファイアⅢ"],
        ["フレイムⅡ"],

        ["アイスⅠ", ["アイスⅡ", "ブリザードⅠ"]],
        ["アイスⅡ", ["アイスⅢ", "ブリザードⅡ"]],
        ["ブリザードⅠ", ["ブリザードⅡ"]],
        ["アイスⅢ"],
        ["ブリザードⅡ"],

        ["サンダーⅠ", ["サンダーⅡ", "スパークⅠ"]],
        ["サンダーⅡ", ["サンダーⅢ", "スパークⅡ"]],
        ["スパークⅠ", ["スパークⅡ"]],
        ["サンダーⅢ"],
        ["スパークⅡ"],
    ],

    "上位攻撃魔法": [
        ["ファイアⅠ", ["ファイアⅡ", "フレイムⅠ"]],
        ["ファイアⅡ", ["ファイアⅢ", "フレイムⅡ"]],
        ["フレイムⅠ", ["フレイムⅡ"]],
        ["ファイアⅢ", ["フレイムⅢ"]],
        ["フレイムⅡ", ["フレイムⅢ"]],
        ["フレイムⅢ", ["ニュークリアⅠ"]],

        ["アイスⅠ", ["アイスⅡ", "ブリザードⅠ"]],
        ["アイスⅡ", ["アイスⅢ", "ブリザードⅡ"]],
        ["ブリザードⅠ", ["ブリザードⅡ"]],
        ["アイスⅢ", ["ブリザードⅢ"]],
        ["ブリザードⅡ", ["ブリザードⅢ"]],
        ["ブリザードⅢ", ["ニュークリアⅠ"]],

        ["サンダーⅠ", ["サンダーⅡ", "スパークⅠ"]],
        ["サンダーⅡ", ["サンダーⅢ", "スパークⅡ"]],
        ["スパークⅠ", ["スパークⅡ"]],
        ["サンダーⅢ", ["スパークⅢ"]],
        ["スパークⅡ", ["スパークⅢ"]],
        ["スパークⅢ", ["ニュークリアⅠ"]],

        ["ニュークリアⅠ", ["ニュークリアⅡ"]],
        ["ニュークリアⅡ"],
    ],

    "回復魔法": [
        ["キュアーⅠ", ["キュアーⅡ"]],
        ["キュアーⅡ", ["キュアーⅢ"]],
        ["キュアーⅢ", ["レイズⅠ"]],

        ["ヒールⅠ", ["ヒールⅡ", "リカバーⅠ"]],
        ["ヒールⅡ", ["ヒールⅢ"]],
        ["リカバーⅠ", ["リカバーⅡ"]],
        ["ヒールⅢ", ["リカバーⅢ"]],
        ["リカバーⅡ", ["リカバーⅢ"]],

        ["レイズⅠ", ["レイズⅡ"]],
        ["リカバーⅢ", ["レイズⅡ"]],
        ["レイズⅡ"],
    ],
},

// レベルアップによってSPを獲得する場合、レベルごとに得られるSP値を以下の形式で設定します。
// classId: 職業ID, default: デフォルト値, レベル: SP値, レベル: SP値, ...
// 下記の設定例では、レベル2では3SP取得、レベル3では4SP取得、それ以外のレベルでは5SPを獲得します。
levelUpGainSp: [
    {
        classId: 1,
        default: 5,
        2: 3,
        3: 4,
    },

    {
        classId: 2,
        default: 5,
        2: 3,
        3: 4,
    },

    {
        classId: 3,
        default: 5,
        2: 3,
        3: 4,
    },

    {
        classId: 4,
        default: 5,
        2: 3,
        3: 4,
    },

    {
        classId: 5,
        default: 5,
        2: 3,
        3: 4,
    },

    {
        classId: 6,
        default: 5,
        2: 3,
        3: 4,
    },

    {
        classId: 7,
        default: 5,
        2: 3,
        3: 4,
    },

    {
        classId: 8,
        default: 5,
        2: 3,
        3: 4,
    },
]
// =============================================================
// ●以上既为设定项目。
// =============================================================
};
};
