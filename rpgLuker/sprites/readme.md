core.Sprite
	SprBase
		Character
		Battler
			Actor
			Enemy
		StateOverlay
		Weapon
		Balloon
	Button
	Animation
	Damage
	StateIcon
	Picture
	Timer
	Destination

	Spriteset_Base
		Spriteset_Map
		Spriteset_Battle


SprBase : Sprite
	.animSprites[]
	.effectTarget = self
	.hiding = false
	:show()
	:hide()
	:update()
	:updateVisible()
	:updateAnimSprites()
	:startAnimation(anim, mirror, delay)
	:isPlaying()

Button : Sprite
	.touching = F
	.coldFrame
	.hotFrame
	.clickHandler
	:update()
	:updateFrame()
	:processTouch()
	:setHotFrame()
	:setColdFrame()
	:setClickHandler(method)
	:isActive()

Character : SprBase
	:__ctor(chara)
	.chara
	.balloonDuration
	.tilesetId
	.upperBody
	.lowerBody
	:setChara(chara)
	:update()
	:updateBitmap()
	:isTile()
	:updateFrame()
	:updateFrame_Tile()
	:updateFrame_Chara()
	:updatePosition()
	:updateAnimation()
	:updateOther()
	:setupAnim()
	:setupBalloon()
	:startBalloon()
	:updateBalloon()
	:endBalloon()

Battler : SprBase
	.battler
	.damages[]
	.home : Point
	.offset : Point
	.targetOffset : Point
	.moveDuration
	:setBattler(b)
	:setHome(x, y)
	:update()
	:updateMain()
	:updateAnim()
	:updateDamagePopup()
	:updateEffection()
	:updateFrame()
	:updateMove()
	:updatePosition()
	:setupAnim()
	:setupDamagePopup()
	:startMove()
	:onMoveEnd()
	:isMoving()

Actor : Battler
	MOTIONS = {
		walk:     { index: 0,  loop: true  },
		wait:     { index: 1,  loop: true  },
		chant:    { index: 2,  loop: true  },
		guard:    { index: 3,  loop: true  },
		damage:   { index: 4,  loop: false },
		evade:    { index: 5,  loop: false },
		thrust:   { index: 6,  loop: false },
		swing:    { index: 7,  loop: false },
		missile:  { index: 8,  loop: false },
		skill:    { index: 9,  loop: false },
		spell:    { index: 10, loop: false },
		item:     { index: 11, loop: false },
		escape:   { index: 12, loop: true  },
		victory:  { index: 13, loop: true  },
		dying:    { index: 14, loop: true  },
		abnormal: { index: 15, loop: true  },
		sleep:    { index: 16, loop: true  },
		dead:     { index: 17, loop: true  }	}
	:__ctor(battler)
	:init()
	.battlerName
	.motion
	.motionCount
	.pattern
	:createShadowSprite()
	:createWeaponSprite()
	:createMainSprite()
	:createStateSprite()
	.mainSprite = Sprite()
	.shadowSprite = Sprite()
	.weaponSprite = Sprite_Weapon()
	.stateSprite = Sprite_State()
	:setBattler(b)
	:moveToStartPosition()
	:update()
	:updateMotion()
	:updateShadow()
	:updateMain()
	:setupMotion()
	:startMotion(motionType)
	:setupWeaponAnim()
	:updateFrame()
	:updateMove()
	:refreshMotion()

Enemy : Battler
	.enemy
	.appeared = F
	.battlerName
	.battlerHue
	.effectType
	.effectDuration
	.shake
	:createStateIconSprite()
	.stateIconSprite : Sprite_StateIcon
	:setBattler(b)
	:update()
	:updateEffect()
	:updateStateSprite()
	:updateFrame()
	:updatePosition()
	:setupEffect()
	:startEffect(effectType)
	:startAppear()
	:startDisappear()
	:UpdateEffect()

Animation : Sprite
	.target
	.animation
	.mirror = F
	.delay = 0
	.rate = 4
	.duration = 0
	.hidingDuration = 0
	.bitmap1
	.bitmap2
	.duplicated = F
	.z = 8
	:setup(target, anim, mirror, delay)
	:remove()
	:update()
	:updateMain()
	:updateFrame()
	:createSprites()
	:createCellSprites()
	:updateAllCellSprites()
	:updateCellSprite()
	:startHiding()

Damage : Sprite
	.duration = 90
	.flashColor = Color(0,0,0,0)
	.flashDuration = 0
	.damageBitmap
	:setup(target)
	:createMiss()
	:createDigits(style, value)
	:update()
	:updateFlash()
	:updateOpacity()

StateIcon : Sprite
	::iconWidth = 32
	::iconHeight = 32
	:.battler
	.iconIdx
	.animCount
	.animIdx
	:update()
	:updateIcon()
	:updateFrame()

StateOverlay : SprBase
	.battler
	.overlayIdx
	.animCount
	.pattern
	:setup()
	:update()
	:updatePattern()
	:updateFrame()

Weapon: SprBase
	.weaponImageId
	.animCount
	.pattern
	:setup()
	:update()
	:updateFrame()
	:updatePattern()
	:isPlaying()

Balloon : SprBase
	.balloonId
	.duration
	:setup(ballonId)
	:update()
	:updateFrame()
	:isPlaying()

Picture : Sprite
	.picId
	.picName
	:update()
	:updateOrigin()
	:updatePosition()
	:updateScale()
	:updateTone()
	:updateOther()

Timer : Sprite
	.seconds = 0
	:update()
	:redraw()
	:updatePosition()
	:updateVisibility()

Spriteset_Base : Sprite
	:__ctor()
	.tone = [0,0,0,0]
	.opaque = T
	:createLowerLayer()
		:createBaseSprite()
		.baseSprite = Sprite()
		.blackScreen = ScreenSprite()
	:createToneChanger()
		.toneSprite = ToneSprite()
	:createUpperLayer()
		:createPictures()
		.picContainer = Sprite()
		:createTimer()
		.timerSprite = Sprite_Timer()
		:createScreenSprites()
		.flashingSprite = ScreenSprite()
		.fadeSprite = ScreenSprite()
	:update()
		:updateScreenSprites()
		:updateToneChanger()
		:updatePosition()

Spriteset_Map : Spriteset_Base
	:createLowerLayer()
		:createParallax()
			.parallax = TilingSprite()
		:createTilemap()
			.tilemap = Tilemap()
			:loadTileset()
				.tileset
		:createCharacters()
			.charaSprites[] : Sprite_Chara
				event, vehicle, follower, player
		:craeteShadow()
			.shadowSprite : Sprite

		:createDestination()
			.destinationSprite : Sprite_Destination
		:createWeather()
			.weather : Weather
	:update()
		:updateTileset()
		:updateParallax()
		:updateTilemap()
		:updateShadow()
		:updateWeather()

Spriteset_Battle : Spriteset_Base
	.battlebackLocated = F
	:createLowerLayer()
		:createBackground()
			.bgSprite = Sprite()
		:createBattleField()
			.battleField = Sprite()
		:createBattleback()
			.back1Sprite = TilingSprite()
			.back2Sprite = TilingSprite()
		:createEnemies()
			.enemySprites[] : Sprite_Enemy
		:createActors()
			.actorSprites[] : Sprite_Actor
	:update()
		:updateActors()
		:updateBattleback()
	:isAnimPlaying()
	:isEffecting()
	:isAnyoneMoving()
	:isBusy()
	:terrainBattleback1Name = {
		Grassland,
		ship,
		Wasteland,
		DirtField,
		Desert,
		Lava1,
		Lava2,
		SnowField,
		Clouds,
		PosionSwamp }
	:terrainBattleback2Name = {
		Grassland,
		ship,
		Forest,
		Cliff,
		Wasteland,
		Desert,
		Lava,
		Clouds,
		PosionSwamp,
	}






























	