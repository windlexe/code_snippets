DataManager
ConfigManager
StorageManager
ImageManager
AudioManager
SoundManager
TextManager
SceneManager
BattleManager
PluginManager

SceneManager
	.scene
	.nextScene
	.stack[]
	.stopped
	.sceneStarted
	.exiting
	.previousScene
	.screenWidth
	.screenHeight
	.boxWidth
	.boxHeight
	.deltaTime = 1.0/60
	.accumulator = 0.0
	:run(scene)
	:init()
		:initGraphics()
		:initAudio()
		:initInput()
		:initPlugin()
	:update()
		:tickStart()
		:updateInput()
		:updateManagers()
		:updateMain()
			:updateScene()
		:tickEnd()
	:terminate()
	:onError()
	:onKeyDown()
	:goto(scene)
	:push(scene)
	:pop()
	:exit()
	:stop()
	:resume()


