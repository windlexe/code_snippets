Utils
	NAME
	VERSION

CacheEntry
CacheMap
ImageCache
RequestQueue

Point : PIXI.Point
Rectangle
Bitmap
Graphics
Input
TouchInput
Sprite: PIXI.Sprite  : Container
	.texture
	.bitmap
	.frame = Rectangle()
	.blendColor = Color()
	.colorTone = Color()
	.context = nil
	.tintTexture = nil
	.spriteId = UID()
	.width = frame.width
	.height = frame.height
	:update()
	:move(x, y)
	:setFrame(x, y, w, h)
	:refresh()
	.visible
	.x
	.y
	.anchor = Point(0, 0)
	.scale = Point(1, 1)
	.rotation = 0
	&Container
		.children = {}
		.parent
		:addChild(child)
		:removeChild(child)

Tilemap : Container
	.margin
	.width
	.height
	.tileWidth
	.tileHeight
	.mapWidth
	.mapHeight
	.layerWidh
	.layerHeight
	.bitmaps[]
	.origin = Point()
	.flags[]
	.animCount = 0
	:createLayers()
	:paintAllTiles(startX, startY)
	:paintTiles(startX, startY, x, y)
	:drawTile(bitmap tileId, x, y)
	:drawNormalTile(bitmap, tileId, dx, dy)
	:drawAutoTile(bitmap, tileId, dx, dy)
	:drawTableEdge(bitmap, tileId, dx, dy)
	:drawShadow(bitmap, shadowBits, dx, dy)
	:readMapData(x, y, z)
	.TILE_ID_B      = 0;
	.TILE_ID_C      = 256;
	.TILE_ID_D      = 512;
	.TILE_ID_E      = 768;
	.TILE_ID_A5     = 1536;
	.TILE_ID_A1     = 2048;
	.TILE_ID_A2     = 2816;
	.TILE_ID_A3     = 4352;
	.TILE_ID_A4     = 5888;
	.TILE_ID_MAX    = 8192;
	:isVisibleTile(tileId)
	:isAutoTile(tileId)


ShaderTilemap : Tilemap

TilingSprite : PIXI.PictureTilingSprite

ScreenSprite : Container
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

WindowLayer : Container
	.width
	.height
	.translationMatrix
	.wndMask
	.wndRect

Weather : Container
ToneSprite : Container
Stage : Container

Decrypter
	.SIGNATURE = "5250474d56000000";
	.VER = "000301";
	.REMAIN = "0000000000";
	:decryptImg(url, bitmap)

ResourceHandler
	:createLoader
	:exists()
	:retry()