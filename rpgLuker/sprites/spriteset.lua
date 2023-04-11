Spriteset = Class(Sprite)

function Spriteset:__ctor()
	-- self:createLowerLayer()
		self:createBaseSprite()
	-- self:createUpperLayer()
		self:createPicture()
		self:createTimer()
		self:createScreenSprites()
	self:update()
end

function Spriteset:update()
	Sprite.update(self)
end


----------------------------------------------------------------

Spriteset_Map = Class(Spriteset)

function Spriteset_Map:__ctor()
	self:createParallax()
	self:createTilemap()
	self:createCharacters()
	self:createShadow()
	self:createWeather()
end

