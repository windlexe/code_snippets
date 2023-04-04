local json = require 'json'
local ResourceMgr = require 'ResourceMgr'

local DataManager = {}

DataManager._databaseFiles = {
	System = 'System.json',

	Classes = 'Classes.json',
	
	Actors = 'Actors.json',
	Enemies = 'Enemies.json',

	Animations = 'Animations.json',
	States = 'States.json',
	Skills = 'Skills.json',
	Items = 'Items.json',
	Weapons = 'Weapons.json',
	Armors = 'Armors.json',

	Tilesets = 'Tilesets.json',
	MapInfos = 'MapInfos.json',
	Events = 'Events.json',
}

function DataManager:loadData()
	for k,v in pairs(self._databaseFiles) do
		self:loadDataFile(k, v)
	end
	self:loadMapData()
end

function DataManager:loadDataFile(name, filename)
	local data = ResourceMgr:readFile('data/' .. filename)
	data = json.decode(data)
	self:onLoad(name, data)
end

function DataManager:loadMapData(mapId)
	local filename = string.format('Map%04d.json', mapId)
	self:loadDataFile('dataMap', filename)
end

function DataManager:onLoad(name, data)

end

function DataManager:newGame()
	self.gameSystem = GameSystem()
	self.gameActors = GameActors()
	self.gamePlayer = GamePlayer()
	self.gameMap = GameMap()
end


function DataManager:loadGlobalInfo()
end
function DataManager:saveGlobalInfo()
end

function DataManager:loadGame(saveId)
end
function DataManager:saveGame(saveId)
end

