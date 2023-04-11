TransformBase
	.localTransform : Matrix
	.worldTransform : Matrix
	.worldId = 0
	.parentId = 0
	:&updateLocalTransform()
	:&updateTransform(parentTransform)
TransformStatic : TransformBase

Transform : TransformBase
	.position : Point
	.scale : Point
	.rotation
	.pivot : Point
	:updateLocalTransform()
	:updateTransform(parentTransform)

DisplayObject
	.position : Point
	.transform : Transform
	.alpha = 1
	.visible = true
	.renderable = true
	.parent = nil
	.worldAlpha = 1
	.bounds
	:updateTransform()
	:toGlobal(position, point)
	:toLocal(position, form, point, skipUpdate)
	:render()
	:setParent(parent)
	:setTransform(position, scale, rotation, pivot)
	:destroy()

Container : DisplayObject
	.children[]
	:addChild(child)
	:removeChild(child)
	:getChild(idx)
	:addChildAt(child, idx)
	:removeChildAt(idx)
Graphics : Container
	.fillAlpha = 1
Sprite : Container
	.anchor : Point
	.texture : Texture
	.width
	.height
	.tint = 0xFFFFFF
	.shader
	.vertexData = Float32Array(8)
	.transformID = -1
	.textureID = -1
	:onTextureUpdate()
	:onAnchorUpdate()
	:destory()

Text : Sprite
	:__ctor(text, style)
	.text
	.style
	.font

AnimatedSprite : Sprite
	.textures[]
	.durations
	.autoUpdate = true
	.animSpeed = 1
	.loop = true
	.onComplete
	.onFrameChange
	.onLoop
	.currentTime
	.playing = false
	:play()
	:stop()
	:gotoAndStop(frameNumber)
	:gotoAndPlay(frameNumber)
	:update()
	:updateTexture()
	::fromFrames()
	::fromImages()
	:currentFrame

Mesh : Container
	.uvs[8]
	.vertices[]



Application
Resource
Shader
Loader
Matrix
	:__ctor(a, b, c, d, tx, ty)
	.a,b,c,d,tx,ty
	::fromArray(array)
	:toArray()
	:set(a,b,c,d,tx,ty)
	:apply(pos)
	:translate(x,y)
	:scale(x,y)
	:rotate(angle)

ParticleContainer : Container
	:__ctor(maxSize = 1500, properties, batchSiz = 16384)
	.properties = {
		scale = 1,
		position = Point
		rotation = angle
		uvs = ?
		alpha = ?
	}
	.maxSize
	.batchSize
	