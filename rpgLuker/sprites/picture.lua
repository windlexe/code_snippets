Picture = Class(Sprite)

function Picture:__ctor(picId)
	Sprite.__ctor(self)
	self.picId = picId
	self.picName = ''
	self.isPic = true
	self:update()
end

function Picture:update()
	Sprite.update(self)
	if self.visible then
		self.updateOrigin()
		self:updatePosition()
		self:updateScale()
		self:updateTone()
		self:updateOther()
	end
end

