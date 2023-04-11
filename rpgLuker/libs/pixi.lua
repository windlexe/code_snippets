Buffer
FrameBuffer
Shader
Texture

VertexArrayObject

--------------------------------------------------------------------

tilemap
--------------------------------------------------------------------
Transform = Class()
function Transform:__ctor(parent)
	self.parent = parent

	self.position = Vector(0,0)
	self.worldPos = Vector(0,0)
	self.rotation = 0
	self.scale = Vector(1,1)
	self.pivot = Vector(0,0)
end
function Transform:update()
	local p = self.position
	local wp = self.worldPos
	local pp = self.parent.worldPos

	wp.x = wp.x + self.rotation

end

DisplayObject = Class()
function DisplayObject:__ctor()
	self.transform = Transform()
	self.visible = true
end

----------------------------------------------------------------
Container = Class(DisplayObject)

function Container:__ctor()
	self.children = {}
end

function Container:addChild(child)
	if child.parent then
		child.parent:removeChild(child)
	end

	child.parent = self
	tinsert(self.children, child)
end

function Container:removeChild(child)
	local idx = table.indexOf(self.children, child)
	if not idx then
		return
	end
	return self:removeChildAt(idx)
end

function Container:removeChildAt(idx)
	local child = self.children[idx]
	child.parent = nil
	tremove(self.children, idx)
	return child
end

function Container:getChild(index)
	return self.children[index]
end

function Container:updateTransform()
	for i, child in ipairs(self.children) do
		if child.visible then
			child:updateTransform()
		end
	end
end

function Container:destroy()
	for i, child in ipairs(self.children) do
		child:destroy()
	end
end

function Container:process(fn, filter)
	for i, child in ipairs(self.children) do
		if not filter or filter(child) then
			fn(child)
		end
	end
end

