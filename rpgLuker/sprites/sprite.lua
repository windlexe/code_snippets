Sprite = Class(Spr)

function Sprite:__ctor()
	self.visible = true
end

function Sprite:update()
end

function Sprite:show()
	self.visible = true
	self:updateVisibility()
end

function Sprite:hide()
	self.visible = false
	self:updateVisibility()
end

function Sprite:updateVisibility()
end

function Sprite:updateAnimation()
	if #self.animSpr <= 0 then return end
end

function Sprite:startAnim(anim, mirror, delay)
	local spr = Sprite_Animation()
	spr:setup(anim, mirror, delay)
	this.animSpr = spr
end
