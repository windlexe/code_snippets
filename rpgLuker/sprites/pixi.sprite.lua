Sprite = class(Container)

function Sprite:__ctor(texture)
	self.texture = texture
	self.width = self.texture.width
	self.height = self.texture.height
	self.shader = nil

	self.scale = Vector(1,1)
	self.vertex = {}
end

