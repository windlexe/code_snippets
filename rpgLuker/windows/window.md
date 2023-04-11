Window : Container
	.wndSkin = nil
	.width
	.height
	.openness
	.animCount
	.padding
	.margin
	.colorTone
	.wndSpriteContainer = Container()
	.wndBackSprite  = Sprite()
	.wndCursorSprite  = Sprite()
	.wndFrameSprite  = Sprite()
	.wndContentSprite  = Sprite()
	.wndArrowSprite  = Sprite()
	.wndPauseSprite  = Sprite()
	.origin: Point
	.active = true
	.opacity
	.backOpacity
	:update
	:move(x, y, w, h)
	.visible
	.x
	.y
	.children
	.parent
Window_Base : core.Window
	#iconWidth = 32
	#iconHeight = 32
	#faceWidth = 144
	#faceHeight = 144
	:loadWndSkin()
	:updatePadding
	:updateBackOpacity
	:updateTone()
	.opening = false
	.closing = false
	.dimmerSprite
	:update()
		:updateTone()
		:updateOpen()
		:updateClose()
		:updateBgDimmer()
	:isOpening()
	:isClosing()
	:show()
	:hide()
	:active()
	:deactive()
	