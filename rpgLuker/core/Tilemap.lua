Tilemap = class()

function Tilemap:__ctor()
	self.mapWidth = width
    self.mapHeight = height
    self.cellEdge = 32
    self.cellPerRegion = 32
	self.regionEdge = self.cellEdge * self.cellPerRegion
end

function Tilemap:init()
    self.layers = {}
	self:addLayer()
end

function Tilemap:loadData(mapId)
end
function Tilemap:saveData(mapId)
end

function Tilemap: