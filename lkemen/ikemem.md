AnimFrame
	.Time
    .Group,Number
    .X,Y
    .SrcAlpha,DstAlpha
    .H,V
    .EX
    :ctor()
    $ReadAnimFrame(line)
    :Clsn1()
    :Clsn2()

Animation
	.sff
    .spr
    .frames[] : AnimFrame
    .tile[4]
    .loopStart
    .interpolate {
        offset,
    	scale
        angle
        blend }
    .current
    .drawIdx
    .time {
        time,
        total,
        loop,
        nazo, }
    mask
    srcAlpha
    dstAlpha
    newFrame
    loopEnd
    scale : Vector2
    angle

```maid
Texture : u32

PalFxDef
PalFx : PalFxDef

SffHeader

Sprite
	.pal
    .Tex --> Texture
    .G,N
    .PalTex --> Texture
    $loadFromSff
    :draw(x,y,scale,pal,palFx)
Sff
	.header --> SffHeader
	.sprite <>--> Texture
    .palList
	:loadSff(filename, bChara)
    :getSprite(g,n)
AnimFrame
	.Time
	.G,N
    .X,Y
    .H,V
    .Alpha[2]
    .Ex

Animation
	.sff --> Sff
    .spr : Sprite
    .frames []--> AnimFrame
	.tile[4]
    .loopStart
    .loopEnd
    .drawIdx
    .current
    $ReadAnimation(sff, lines)
    :drawFrame
    :UpdateSprite
    :Action
    :Draw
AnimTable map[i32]--> Animation

SprData
	.anim : Animation
    .fx : palFx
    .alpha
    .angle
    .facing
DrawList []--> SprData
	:draw()
ShadowSprite : SprData
    :draw()

Anim
	.anim -> Animation
	.window[4]
    .x,y
    .scale
    :setPos()
    :Update()
    :Draw()

aimgImage
	.anim : Animation
    .pos
    .scale
    .angle

AfterImage
	.time
    .length
    .add[3]
    .mul[3]
    .alpha[2]
	.imgs[64] : aimgImage
    .imgIdx
    .reccount

Char
	.palfx : PalFx
	.anim --> Animation
    .curFrame -> AnimFrame
    .aimg -> AfterImage
	:setPos()
    :action
    :update()
    :tick
    :draw()

CharList
	.chars <>--> Char


Stage
	.name
    .bgm
    .displayname
    .author
    .sff : Sff
    .at : AnimationTable
	.bg[] : backGround
    .bgc : bgCtrl
    .bgct : bgTimeline
    	.
    .bga ; bgAction
    .sdw : stageShadow
    	.intensity
        .color
        .yscale
        .fadebgn
        .fadeend
    .p[2] : stagePlayer
    	.startX
        .startY
    :action
    :draw()
```