Scene_Base : Stage
	Scene_Boot
	Scene_Title
	Scene_Map
	Scene_MenuBase
		Scene_Menu
		Scene_ItemBase
			Scene_Item
			Scene_Skill
		Scene_Equip
		Scene_Status
		Scene_Options
		Scene_File
			Scene_Save
			Scene_Load
		Scene_GameEnd
		Scene_Shop
		Scene_Name
		Scene_Debug
	Scene_Battle
	Scene_Gameover


Scene_Base : Stage
	.active
	.fadeSign
	.fadeDuration
	.fadeSprite
	:create
	:isActive
	:isReady
	:start
	:update()
		:updateFade()
		:updateChildren()
	:stop
	:terminate()
	:createWndLayer()
		.wndLayer = Window_WndLayer
	:addWnd(wnd)
	:startFadeIn()
	:startFadeOut()
	:updateFade()
	:popScene()
	:checkGameover()
	