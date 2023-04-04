local ImageMgr = {
	imgTypes = {
		Animation = "animations",
		BattleBack1 = "battle_back1",
		BattleBack2 = "battle_back2",
		Enemy = "enemies",
		Chara = "characters",
		Face = "faces",
		Pic = "pictures",
		SV_Actor = 'sv_actors',
		SV_Enemy = 'sv_enemies',
		System = 'system',
		Tileset = 'tilesets',
		Title = 'titles',
	}
}

function ImageMgr:loadImage(filename)
end

function ImageMgr:load(imageType, name)
	local strType = self.imgTypes[imageType]
	local filename = string.format('img/%s/%s', strType, name)
	if this.imageCache:get(filename) then
		return this.imageCache[filename]
	end
	self:loadFile(filename)
end

function ImageMgr:clear()
end
