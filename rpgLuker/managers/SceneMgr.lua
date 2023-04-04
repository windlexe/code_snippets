local SceneMgr = {}


function SceneMgr:run()
	self:init()
	self:update()
end

function SceneMgr:init()
	self:initGraphics()
	self:initAudio()
	self:initInput()
end

function SceneMgr:update()
	self:tickStart()
	self:updateManagers()
	self:updateMain()
	self:tickEnd()
end

function SceneMgr:updateMain()
	self:updateInput()
	self:updateScene()
end

function SceneMgr:updateScene()
	self.scene:update()
end
function SceneMgr:changeScene(scene)
end