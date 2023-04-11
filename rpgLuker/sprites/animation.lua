Animation = Class()

function Animation:__ctor()
	Sprite.__ctor(self)
	self:init()
end

function Animation:init()
	self.target = nil
	self.animation = nil
	self.mirror = false
	self.delay = 0
	self.rate = 4
	self.duration = 0
	self.z = 8
end

function Animation:setup(target, animation, mirror, delay)
	self.target = target
	self.animation = animation
	self.mirror = mirror
	self.delay = delay

	if self.animation then
		self:createSprites()
		self.rate = 4
		self.duration = #self.animation * self.rate + 1
	end

end
function Animation:createSprites()

end

function Animation:update()
	Sprite.update(self)
	self:updateMain()
end

function Animation:updateMain()
	if self.delay > 0 then
		self.delay = self.delay - 1
	else
		self.duration = self.duration - 1
		self:updatePosition()
		if self.duration % self.rate == 0 then
			self:updateFrame()
		end
	end
end

function Animation:updatePosition()
end

function Animation:updateFrame()

end

