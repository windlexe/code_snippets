/*:
 * @target MZ
 * @plugindesc Item Crafting System
 * (Version 1.1.1)
 * @author Coelocanth
 * @url https://rpgmaker.net/engines/rmmz/utilities/259/
 * @help
 * 
 * This plugin implements a recipe based item crafting system.
 * In a recipe based crafting system, if you have the recipe and the
 * ingredients, you can craft the item.
 * This is different from an experimental crafting system where the
 * player chooses the ingredients and gets some kind of result.
 * 
 * Crafting and Breakdown:
 * With crafting, you choose an item from the recipe list.
 * The ingredients are consumed, and you get a new item.
 * 
 * With breakdown, you choose an item from the party inventory.
 * The item is consumed, and you get new items.
 * 
 * The craft and breakdown recipes are independent - you can't unbake a cake
 * to get eggs, sugar and flour back. (unless that's in your game!)
 * 
 * Items which can be crafted have their recipes specified by notes in the
 * database.
 * 
 * note tags starting with "craft" refer to the crafting recipe, and
 * "craft break" refers to the breakdown recipe.
 * 
 * Ingredients:
 *  - An ingredient is consumed by the crafting recipe
 *  - An ingredient is produced by the breakdown recipe
 *  - Crafting is not allowed with missing ingredients
 *  - If you don't specify any ingredient note tags, the item is not
 *    craftable and will not show up in the crafting menu.
 * 
 * <craft armor:id:amount>
 * <craft item:id:amount>
 * <craft weapon:id:amount>
 * 
 * <craft break armor:id:amount>
 * <craft break item:id:amount>
 * <craft break weapon:id:amount>
 * 
 * The "id" parameter refers to the ID in the database
 * The "amount" parameter refers to the number of items required.
 * You can omit the amount, in which case it defaults to one item.
 * 
 * Costs:
 *  - A cost is consumed by both the crafting and breakdown recipes.
 *  - It is useful where crafting is a shop service in your game
 *  - If you don't specify a cost, the crafting is free.
 * 
 * <craft gold:amount>
 * <craft break gold:amount>
 * 
 * Requirements:
 *  - Requirements are not consumed by the recipe, but you need to have them
 *  - A "tool" needs to be an item in the party inventory,
 *    e.g. needle / hammer & anvil / 3d printer
 *  - A "recipe" also needs to be in the party inventory, and differs from
 *    tools in that the item will not be listed at all unless you have the
 *    recipe.
 *  - A "switch" works like a recipe, hiding the item unless the switch is on.
 *    This is mostly useful for different kinds of shop.
 *  - key items or hidden items are a good choice for tools and recipes, but
 *    any item can be used.
 *  - If you don't add any requirement note tags for the database item, it
 *    will always show up in the crafting menu.
 * 
 * <craft recipe:id>
 * <craft switch:id>
 * <craft tool:id>
 * 
 * Yield:
 *  - Normally a recipe creates one item.
 *  - The "yield" keyword lets you change the number of items created
 *  - For breakdown, "yield" is the number of items broken at once, which is
 *    wrong language but is symmetric.
 * 
 * <craft yield:count>
 * <craft break yield:count>
 * 
 * Flavour Text:
 *  - If you want to add extra text to the recipe, use these tags.
 *  - The text is drawn at the bottom of the recipe
 *  - You can use text codes to change colour, insert names etc. like "show text"
 * 
 * <craft text>
 * Your flavour text here
 * </craft text>
 * <craft break text>
 * Your flavour text here,
 * can use multiple lines.
 * </craft break text>
 * 
 * How to let players use crafting:
 * 
 * The first option is to have crafting available from the main menu. This
 * is configured through the plugin parameters.
 * The plugin command "changeMenuAccess" can be used to change availability
 * of the crafting command from an event.
 * This type of gameplay allows the player to craft items anywhere in the game.
 * 
 * An alternative option is to launch crafting from events.
 * To do this, use the "openCraftingScene" / "openBreakdownScene" plugin command.
 * By setting switches or adding key items to inventory beforehand, you
 * can make different recipes available in different places.
 * This type of gameplay is good to restrict the player to crafting at
 * specific workstations (alchemy lab, forge, etc), or to make crafting
 * a shop service operated by NPCs.
 * 
 * @param menuCommandCrafting
 * @text Crafting menu command
 * @type struct<MenuCommand>
 * @default {"show":"true","enable":"true","text":"Crafting"}
 * 
 * @param menuCommandBreakdown
 * @text Breakdown menu command
 * @type struct<MenuCommand>
 * @default {"show":"false","enable":"true","text":"Breakdown"}
 * 
 * @param textCustomize
 * @text Text Customization / Localization
 * 
 * @param textIngredients
 * @parent textCustomize
 * @text "Ingredients" label
 * @default Ingredients:
 * 
 * @param textResults
 * @parent textCustomize
 * @text "Results" label
 * @default Results:
 * 
 * @param textTools
 * @parent textCustomize
 * @text "Tools" label
 * @default Tools:
 * 
 * @param textPrice
 * @parent textCustomize
 * @text "Price" label
 * @default Price:
 * 
 * @param textNotes
 * @parent textCustomize
 * @text "Notes" label
 * @default Notes:
 * 
 * @param logWindow
 * @text Log Window
 * 
 * @param logWindowLines
 * @parent logWindow
 * @text Visible Lines
 * @desc Number of items to show at once in the log window
 * @type number
 * @default 4
 * 
 * @param logWindowDisplayTime
 * @parent logWindow
 * @text Display Time
 * @desc Number of frames to display each item in the log
 * @type number
 * @default 60
 * 
 * @param logWindowFadeTime
 * @parent logWindow
 * @text Fade Time
 * @desc Number of frames to fade out the top item before removing it
 * @default 30
 * 
 * @param logWindowForCrafting
 * @parent logWindow
 * @text For Crafting
 * @desc Show the log window when you create an item with Crafting
 * @type boolean
 * @default true
 * 
 * @param logWindowForBreakdown
 * @parent logWindow
 * @text For Breakdown
 * @desc Show the log window when you destroy an item with Breakdown
 * @type boolean
 * @default true
 * 
 * @command openCraftingScene
 * @text Open Crafting Scene
 * @desc Open the crafting menu, for example from a shop or workstation
 *
 * 
 * @command openBreakdownScene
 * @text Open Breakdown Scene
 * @desc Open the breakdown menu, for example from a shop or workstation
 * 
 * 
 * @command changeMenuAccess
 * @text Change Menu Access
 * @desc Change availability of crafting via the menu
 *
 * @arg type
 * @text Scene Type
 * @type select
 * @option Crafting
 * @value menuCommandCrafting
 * @option Breakdown
 * @value menuCommandBreakdown
 * 
 * @arg show
 * @text Show
 * @desc Show the command in the main menu
 * @type boolean
 * @on shown
 * @off hidden
 * @default true
 * 
 * @arg enable
 * @text Enable
 * @type boolean
 * @desc Enable the command in the main menu
 * @on enabled
 * @off disabled
 * @default true
 * 
*/

/*~struct~MenuCommand:
 *
 * @param show
 * @text Show
 * @type boolean
 * @desc Show the command in the main menu
 * @on shown
 * @off hidden
 * @default true
 * 
 * @param enable
 * @text Enable
 * @type boolean
 * @desc Enable the command in the main menu
 * @on enabled
 * @off disabled
 * @default true
 * 
 * @param text
 * @type string
 * @desc The name of the command in the main menu
 * @default Crafting
 * 
 */


var Imported = Imported || {};
Imported.CC_ItemCrafting = true;
var CC = CC || {};
CC.Craft = {};

CC.Craft._config = function () {
    const params = PluginManager.parameters("CC_ItemCrafting");
    const ret = {
        "menuCommandCrafting": JSON.parse(params["menuCommandCrafting"]),
        "menuCommandBreakdown": JSON.parse(params["menuCommandBreakdown"]),
        "textIngredients": params["textIngredients"],
        "textTools": params["textTools"],
        "textPrice": params["textPrice"],
        "textResults": params["textResults"],
        "textNotes": params["textNotes"],
        "logWindowLines": parseInt(params["logWindowLines"]),
        "logWindowDisplayTime": parseInt(params["logWindowDisplayTime"]),
        "logWindowFadeTime": parseInt(params["logWindowFadeTime"]),
        "logWindowForCrafting": params["logWindowForCrafting"] === "true",
        "logWindowForBreakdown": params["logWindowForBreakdown"] === "true",
    };

    //yuck, boolean params are strings
    ret["menuCommandBreakdown"]["enable"] = ret["menuCommandBreakdown"]["enable"] === "true";
    ret["menuCommandBreakdown"]["show"] = ret["menuCommandBreakdown"]["show"] === "true";
    ret["menuCommandCrafting"]["enable"] = ret["menuCommandCrafting"]["enable"] === "true";
    ret["menuCommandCrafting"]["show"] = ret["menuCommandCrafting"]["show"] === "true";

    //defaults to restore on new game
    ret["defaultMenuCommandBreakdown"] = Object.assign({}, ret["menuCommandBreakdown"]);
    ret["defaultMenuCommandCrafting"] = Object.assign({}, ret["menuCommandCrafting"]);
    return ret;
}();

CC.Craft.cmdOpenCraftingScene = function (args) {
    SceneManager.push(Scene_Craft);
}

CC.Craft.cmdOpenBreakdownScene = function (args) {
    SceneManager.push(Scene_Breakdown);
}

CC.Craft.cmdChangeMenuAccess = function (args) {
    CC.Craft._enableSaving = true;
    CC.Craft._config[args.type].show = args.show === "true";
    CC.Craft._config[args.type].enable = args.enable === "true";
}

PluginManager.registerCommand("CC_ItemCrafting", "openCraftingScene", CC.Craft.cmdOpenCraftingScene);
PluginManager.registerCommand("CC_ItemCrafting", "openBreakdownScene", CC.Craft.cmdOpenBreakdownScene);
PluginManager.registerCommand("CC_ItemCrafting", "changeMenuAccess", CC.Craft.cmdChangeMenuAccess);

CC.Craft.DataManager_extractMetadata = DataManager.extractMetadata;
DataManager.extractMetadata = function (data) {
    CC.Craft.DataManager_extractMetadata.call(this, data);
    const re = /<craft\s+(?:(break)\s*)?([^:>]+):([^:>]+):?([^>]+)?>/gi;
    while (match = re.exec(data.note)) {
        const keyword = match[1] || "create";
        const type = match[2].toLowerCase();
        const id = parseInt(match[3]);
        const count = parseInt(match[4]) || 1;
        data.meta.cc_craft = data.meta.cc_craft || {};
        data.meta.cc_craft[keyword] = data.meta.cc_craft[keyword] || {
            "gold": 0,
            "parts": [],
            "recipe": [],
            "switch": [],
            "tool": [],
            "variable": [],
            "yield": 1
        };
        switch (type) {
            case "armor":
            case "item":
            case "weapon":
                data.meta.cc_craft[keyword].parts.push({ "type": type, "id": id, "count": count });
                break;
            case "gold":
                data.meta.cc_craft[keyword].gold += id; // no id so id is count
                break;
            case "recipe":
            case "tool":
            case "switch":
                data.meta.cc_craft[keyword][type].push(id);
                break;
            case "variable":
                data.meta.cc_craft[keyword].variable.push({ "id": id, "count": count });
                break;
            case "yield":
                data.meta.cc_craft[keyword].yield = id; // no id so id is count
                break;
            case "text":
                break;
        }
    }
    const reText = /<craft\s+(\S*)(\s*)text>(.*)<\/craft\s+\1\2text>/gis;
    while (match = reText.exec(data.note)) {
        const keyword = match[1] || "create";
        const text = match[3];
        if (text && data.meta.cc_craft && data.meta.cc_craft[keyword]) {
            data.meta.cc_craft[keyword].text = text.trim();
        }
    }
}

CC.Craft.DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function () {
    let contents = CC.Craft.DataManager_makeSaveContents.call(this);
    try {
        if (CC.Craft._enableSaving) {
            const data = CC.Craft.Utils.createSaveData();
            contents.CC = contents.CC || {};
            contents.CC.Craft = data;
        }
    } catch (error) {
        console.error(error);
    }
    return contents;
}

CC.Craft.DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function (contents) {
    CC.Craft.DataManager_extractSaveContents.call(this, contents);
    try {
        if (contents.CC && contents.CC.Craft) {
            CC.Craft.Utils.restoreSaveData(contents.CC.Craft);
        } else {
            CC.Craft.Utils.setupNewGame();
        }
    } catch (error) {
        console.error(error);
        CC.Craft.Utils.setupNewGame();
    }
}

CC.Craft.DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function () {
    CC.Craft.DataManager_setupNewGame.call(this, ...arguments);
    CC.Craft.Utils.setupNewGame();
}

CC.Craft.Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function () {
    CC.Craft.Window_MenuCommand_addOriginalCommands.call(this);
    this.addCraftingCommands();
}

Window_MenuCommand.prototype.addCraftingCommands = function () {
    for (const command of ["menuCommandCrafting", "menuCommandBreakdown"]) {
        if (CC.Craft._config[command].show) {
            this.addCommand(CC.Craft._config[command].text, command, CC.Craft._config[command].enable);
        }
    }
}

CC.Craft.Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function () {
    CC.Craft.Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("menuCommandCrafting", this.onCraftCommand.bind(this));
    this._commandWindow.setHandler("menuCommandBreakdown", this.onBreakdownCommand.bind(this));
}

Scene_Menu.prototype.onCraftCommand = function () {
    SceneManager.push(Scene_Craft);
}

Scene_Menu.prototype.onBreakdownCommand = function () {
    SceneManager.push(Scene_Breakdown);
}

class Craft_Utils {
    partToItem(part) {
        if (typeof (part) == "number") {
            return $dataItems[part];
        }
        let item = null;
        switch (part.type) {
            case "item": item = $dataItems[part.id]; break;
            case "armor": item = $dataArmors[part.id]; break;
            case "weapon": item = $dataWeapons[part.id]; break;
            default:
                return null;
        }
        return item;
    }

    createSaveData() {
        try {
            let data = {
                "version": 100
            };
            // save command access
            for (const cmd of ["menuCommandBreakdown", "menuCommandCrafting"]) {
                data[cmd] = {};
                for (const att of ["enable", "show"]) {
                    data[cmd][att] = CC.Craft._config[cmd][att];
                }
            }
            return data;
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    restoreSaveData(data) {
        try {
            if (data.version >= 100) {
                for (const cmd of ["menuCommandBreakdown", "menuCommandCrafting"]) {
                    for (const att of ["enable", "show"]) {
                        CC.Craft._config[cmd][att] = data[cmd][att];
                    }
                }
                CC.Craft._enableSaving = true;
            }
        } catch (error) {
            console.error(error);
        }
    }

    setupNewGame() {
        let c = CC.Craft._config;
        c["menuCommandBreakdown"] = Object.assign({}, c["defaultMenuCommandBreakdown"]);
        c["menuCommandCrafting"] = Object.assign({}, c["defaultMenuCommandCrafting"]);
    }
}

CC.Craft.Utils = new Craft_Utils();

class Scene_CraftBase extends Scene_MenuBase {
    constructor() {
        super(...arguments);
        this._craft_type = null;
    }

    create() {
        super.create(...arguments);
        this.createHelpWindow();
        this.createCategoryWindow();
        this.createRecipeWindow();
        this.createIngredientWindow();
        this.createGoldWindow();
        this.createLogWindow();
        this._categoryWindow.setItemWindow(this._recipeWindow);
        this._recipeWindow.setIngredientWindow(this._ingredientWindow);
        this._ingredientWindow.setGoldWindow(this._goldWindow);
        if (!this._categoryWindow.needsSelection()) {
            this._categoryWindow.hide();
            this._categoryWindow.deactivate();
            this.onCategoryOk();
        }
        if (this.compat_VisuMZ_1_ItemsEquipsCore()) {
            this.onCategoryOk();
        }
    }

    compat_VisuMZ_1_ItemsEquipsCore() {
        return Imported.VisuMZ_1_ItemsEquipsCore &&
            this._categoryWindow.isUseModernControls();
    }

    createCategoryWindow() {
        const rect = this.categoryWindowRect();
        this._categoryWindow = new Window_ItemCategory(rect);
        this._categoryWindow.setHelpWindow(this._helpWindow);
        this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
        this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(this._categoryWindow);
    };

    categoryWindowLines() {
        // todo - with many categories, >1 line
        return 1;
    }

    categoryWindowRect() {
        const wx = 0;
        const wy = this.mainAreaTop();
        const ww = Graphics.boxWidth;
        const wh = this.calcWindowHeight(this.categoryWindowLines(), true);
        return new Rectangle(wx, wy, ww, wh);
    }

    createRecipeWindow() {
        const rect = this.recipeWindowRect();
        this._recipeWindow = new Window_Recipes(this._craft_type, rect);
        this._recipeWindow.open();
        this._recipeWindow.setHandler("ok", this.onRecipeOk.bind(this));
        this._recipeWindow.setHandler("cancel", this.onRecipeCancel.bind(this));
        this._recipeWindow.setHelpWindow(this._helpWindow);
        this.addWindow(this._recipeWindow);
    }

    recipeWindowRect() {
        let wx = 0;
        let wy = this.mainAreaTop();
        let ww = Graphics.boxWidth / 2;
        let wh = this.mainAreaHeight();
        if (this._categoryWindow.needsSelection()) {
            wy += this._categoryWindow.height;
            wh -= this._categoryWindow.height;
        }
        return new Rectangle(wx, wy, ww, wh);
    }

    createIngredientWindow() {
        const rect = this.ingredientWindowRect();
        this._ingredientWindow = new Window_Ingredients(this._craft_type, rect);
        this.addWindow(this._ingredientWindow);
    }

    ingredientWindowRect() {
        let wx = Graphics.boxWidth / 2;
        let wy = this.mainAreaTop();
        let ww = Graphics.boxWidth / 2;
        let wh = this.mainAreaHeight();
        if (this._categoryWindow.needsSelection()) {
            wy += this._categoryWindow.height;
            wh -= this._categoryWindow.height;
        }
        return new Rectangle(wx, wy, ww, wh);
    }

    createGoldWindow() {
        this._goldWindow = new Window_Gold(this.goldWindowRect());
        this._goldWindow.openness = 0;
        this.addWindow(this._goldWindow);
    }

    goldWindowLines() { return 1; }

    goldWindowRect() {
        const wx = Graphics.boxWidth * 3 / 4;
        const ww = Graphics.boxWidth / 4;
        const wh = this.calcWindowHeight(this.goldWindowLines(), true);
        const wy = this.mainAreaTop() + this.mainAreaHeight() - wh;
        return new Rectangle(wx, wy, ww, wh);
    }

    createLogWindow() {
        this._logWindow = new Window_CraftLog(this.logWindowRect());
        this._logWindow.openness = 0;
        this.addWindow(this._logWindow);
    }

    logWindowLines() { return CC.Craft._config.logWindowLines; }

    logWindowRect() {
        const wx = 0;
        const ww = Graphics.boxWidth / 2;
        const wh = this.calcWindowHeight(this.logWindowLines(), false);
        const wy = this.mainAreaTop() + this.mainAreaHeight() - wh;
        return new Rectangle(wx, wy, ww, wh);
    }

    onCategoryOk() {
        this._recipeWindow.activate();
    };

    onRecipeCancel() {
        if (this._categoryWindow.needsSelection() &&
            !this.compat_VisuMZ_1_ItemsEquipsCore()) {
            this._recipeWindow.deactivate();
            this._categoryWindow.activate();
        } else {
            this.popScene();
        }
    }

    onRecipeOk() {
        const item = this._recipeWindow.item();
        if (!item || !item.meta.cc_craft || !item.meta.cc_craft[this._craft_type]) {
            this._recipeWindow.activate();
            return;
        }
        const crafting = item.meta.cc_craft[this._craft_type];
        this.executeRecipe(item, crafting);
        this._recipeWindow.refresh();
        this._ingredientWindow.refresh();
        this._recipeWindow.activate();
    }

    executeRecipe(item, crafting) {
        //implement in subclass
    }
}

class Scene_Craft extends Scene_CraftBase {
    constructor() {
        super(...arguments);
        this._craft_type = "create";
    }

    executeRecipe(item, crafting) {
        $gameParty.loseGold(crafting.gold);
        for (const part of crafting.parts) {
            const item2 = CC.Craft.Utils.partToItem(part);
            $gameParty.loseItem(item2, part.count);
            if (CC.Craft._config.logWindowForCrafting) {
                this._logWindow.addLogEntry(item2, -part.count);
            }
        }
        $gameParty.gainItem(item, crafting.yield);
        if (CC.Craft._config.logWindowForCrafting) {
            this._logWindow.addLogEntry(item, crafting.yield);
        }
    }
}

class Scene_Breakdown extends Scene_Craft {
    constructor() {
        super(...arguments);
        this._craft_type = "break";
    }

    executeRecipe(item, crafting) {
        $gameParty.loseGold(crafting.gold);
        if (CC.Craft._config.logWindowForBreakdown) {
            this._logWindow.addLogEntry(item, -crafting.yield);
        }
        for (const part of crafting.parts) {
            const item2 = CC.Craft.Utils.partToItem(part);
            $gameParty.gainItem(item2, part.count);
            if (CC.Craft._config.logWindowForBreakdown) {
                this._logWindow.addLogEntry(item2, part.count);
            }
        }
        $gameParty.loseItem(item, crafting.yield);
    }
}

class Window_Recipes extends Window_ItemList {
    constructor(craft_type, ...args) {
        super(...args)
        this._craft_type = craft_type;
        this._data = [];
        this._ingredientWindow = null;
        this.refresh();
        this.select(0);
    }

    maxCols() {
        return 1;
    }

    makeItemList() {
        if (this._craft_type == "break") {
            super.makeItemList();
            this._data = this._data.filter(item => item && this.hasVisibleRecipe(item));
            return;
        }
        switch (this._category) {
            case "item":
                this._data = $dataItems.filter(item => item && item.itypeId === 1 && this.hasVisibleRecipe(item));
                break;
            case "weapon":
                this._data = $dataWeapons.filter(item => item && this.hasVisibleRecipe(item));
                break;
            case "armor":
                this._data = $dataArmors.filter(item => item && this.hasVisibleRecipe(item));
                break;
            case "keyItem":
                this._data = $dataItems.filter(item => item && item.itypeId === 2 && this.hasVisibleRecipe(item));
                break;
            default:
                // possible compatibility with other plugins that change item categories
                this._data = $dataItems.concat($dataArmors).concat($dataWeapons).filter(item => item && this.includes(item) && this.hasVisibleRecipe(item));
                break;
        }
    }

    update() {
        super.update();
        if (this._ingredientWindow) {
            this._ingredientWindow.setRecipe(this.item());
        }
    }

    setIngredientWindow(window) {
        this._ingredientWindow = window;
    }

    isEnabled(item) {
        if (!item || !item.meta.cc_craft || !item.meta.cc_craft[this._craft_type]) {
            return false;
        }
        const crafting = item.meta.cc_craft[this._craft_type];
        if (this._craft_type == "create" &&
            $gameParty.numItems(item) + crafting.yield > $gameParty.maxItems(item)) {
            // no space to carry more
            return false;
        }
        if ($gameParty.gold() < crafting.gold) return false;
        if (crafting.tool.some(tool => !this.hasRequiredItemId(tool))) {
            // missing tool
            return false;
        }
        if (this._craft_type == "create") {
            if (crafting.parts.some(part => !this.hasRequiredPart(part))) {
                // missing part
                return false;
            }
            return true;
        } else if (this._craft_type == "break") {
            // no further requirements
            return true;
        }
        return false;
    }

    hasVisibleRecipe(item) {
        if (!item || !item.meta.cc_craft || !item.meta.cc_craft[this._craft_type]) {
            return false;
        }
        const crafting = item.meta.cc_craft[this._craft_type];
        if (crafting.switch.some(sw => !$gameSwitches.value(sw))) {
            // at least one switch is off
            return false;
        }
        if (crafting.recipe.some(recipe => !this.hasRequiredItemId(recipe))) {
            // at least one recipe is missing
            return false;
        }
        return true;
    }

    hasRequiredPart(part) {
        const item = CC.Craft.Utils.partToItem(part);
        return $gameParty.numItems(item) >= part.count;
    }

    hasRequiredItemId(id) {
        const item = $dataItems[id];
        return $gameParty.numItems(item) > 0;
    }
}

class Window_Ingredients extends Window_Scrollable {
    constructor(craft_type, ...args) {
        super(...args);
        this._recipe = null;
        this._craft_type = craft_type;
    }

    setRecipe(item) {
        if (this._recipe != item) {
            this._recipe = item;
            this.refresh();
        }
    }

    setGoldWindow(window) {
        this._goldWindow = window;
    }

    drawItemWithCounts(part, x, y, width, numberWidth) {
        const item = CC.Craft.Utils.partToItem(part);
        if (!item) {
            console.warn("missing item in database for", part);
            return;
        }
        this.drawItemName(item, x, y, width - numberWidth);
        const have = $gameParty.numItems(item);
        if (have < part.count && this._craft_type == "create") {
            this.changeTextColor(ColorManager.powerDownColor());
        } else {
            this.resetTextColor();
        }
        this.drawText(`${have.toString().padStart(2)}/${part.count.toString().padStart(2)}`, x, y, width, "right");
    }

    refresh() {
        if (this.contents) {
            this.contents.clear();
            this.contentsBack.clear();
        } else {
            return;
        }
        if (!this._recipe || !this._recipe.meta.cc_craft || !this._recipe.meta.cc_craft[this._craft_type]) {
            this._goldWindow.close();
            return;
        }
        const crafting = this._recipe.meta.cc_craft[this._craft_type];
        const numberWidth = this.textWidth("00/00");
        const width = this.itemWidth();
        let x = 0;
        let y = 0;
        if (this._craft_type == "break" && crafting.yield != 1) {
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(CC.Craft._config["textIngredients"], x, y, width);
            y += this.lineHeight();
            this.resetTextColor();
            this.drawItemName(this._recipe, x, y, width - numberWidth);
            this.drawText(`${crafting.yield}`, x, y, width, "right");
            y += this.lineHeight();
        }
        if (crafting.parts.length > 0) {
            this.changeTextColor(ColorManager.systemColor());
            if (this._craft_type == "create") {
                this.drawText(CC.Craft._config["textIngredients"], x, y, width);
            } else {
                this.drawText(CC.Craft._config["textResults"], x, y, width);
            }
            this.resetTextColor();
            y += this.lineHeight();
        }
        for (const part of crafting.parts) {
            this.drawItemWithCounts(part, x, y, width, numberWidth);
            y += this.lineHeight();
        }
        if (crafting.tool.length > 0) {
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(CC.Craft._config["textTools"], x, y, width);
            this.resetTextColor();
            y += this.lineHeight();
        }
        for (const tool of crafting.tool) {
            const part = { "id": tool, "type": "item", "count": 1 };
            this.drawItemWithCounts(part, x, y, width, numberWidth);
            y += this.lineHeight();
        }
        if (crafting.gold > 0) {
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(CC.Craft._config["textPrice"], x, y, width);
            this.resetTextColor();
            this.drawCurrencyValue(crafting.gold, TextManager.currencyUnit, x, y, width);
            y += this.lineHeight();
            this._goldWindow.open();
        } else {
            this._goldWindow.close();
        }
        if (this._craft_type == "create" && crafting.yield != 1) {
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(CC.Craft._config["textResults"], x, y, width);
            y += this.lineHeight();
            this.resetTextColor();
            this.drawItemName(this._recipe, x, y, width - numberWidth);
            this.drawText(`${crafting.yield}`, x, y, width, "right");
            y += this.lineHeight();
        }
        if (crafting.text) {
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(CC.Craft._config["textNotes"], x, y, width);
            this.resetTextColor();
            y += this.lineHeight();
            this.drawTextEx(crafting.text, x, y, width);
        }
    }
}

class Window_CraftLog extends Window_Base {
    constructor(...args) {
        super(...args);
        this._log = [];
        this._showCount = 0;
    }

    addLogEntry(item, count) {
        this._log.push([item, count]);
    }

    update() {
        this.updateShouldOpen();
        super.update();
        if (this.isClosing() || this.isClosed()) {
            return;
        }
        this.updateShowCount();
    }

    updateShouldOpen() {
        if (this._log.length) {
            if (!this.isOpen() && !this.isOpening()) {
                this.open();
                this._showCount = CC.Craft._config.logWindowDisplayTime;
                this.refresh();
            }
        } else if (this.isOpen()) {
            this.close();
        }
    }

    updateShowCount() {
        this._showCount--;
        if (this._showCount <= 0) {
            this._log.shift();
            this._showCount = CC.Craft._config.logWindowDisplayTime;
            this.refresh();
        }
        else if (this._showCount < CC.Craft._config.logWindowFadeTime) {
            this.refresh();
        }
    }

    refresh() {
        this.contents.clear();
        let line = 0;
        const width = this.itemWidth();
        for (const entry of this._log) {
            const item = entry[0];
            const count = entry[1];
            if (line == 0 && this._showCount < 30) {
                this.contents.paintOpacity = Math.round(255 * this._showCount / CC.Craft._config.logWindowFadeTime);
            } else {
                this.changePaintOpacity(true);
            }
            this.drawItemName(item, 0, line * this.lineHeight(), width);
            if (count > 0) {
                this.changeTextColor(ColorManager.powerUpColor());
                this.drawText("+" + count, 0, line * this.lineHeight(), width, "right");
            } else {
                this.changeTextColor(ColorManager.powerDownColor());
                this.drawText(count, 0, line * this.lineHeight(), width, "right");
            }
            this.resetTextColor();
            line++;
            if (line >= this.maxVisibleLines()) {
                break;
            }
        }
    }

    maxVisibleLines() {
        return Math.floor(this.innerHeight / this.lineHeight());
    }
}