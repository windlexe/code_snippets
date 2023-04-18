Battle = {
}



function Battle:createBattle(bf, fa, fb)
	self.battlefield = bf
	self.fa = fa
	self.fb = fb
	self.count = 0
end

function Battle:start()
	self:startBattle()
end

function Battle:startBattle()
	self.round = 0
	self.win = 0
end
function Battle:endBattle()
	self.state = 'stopped'
	if self.win == 0 then
		-- no winner
		self.result = 0
	elseif self.win == 1 then
		
	end
end

function Battle:startRound()
	self.round = self.round + 1
	self.roundRoleList = self:sortUnits()
	self.playIdx = 1
	if not self.playing then
		error('no players')
	end
end

function Battle:endRound()
	if self.round >= self.maxRound then
		self:endBattle()
	else
		self:startRound()
	end
end

function Battle:startTurn()
	self.playing = self.roundRoleList[self.playIdx]
	self.turnTime = 1
	self.state = 'playing'
	self.playing:startPlay()
end

function Battle:endTurn()
	self.state = 'running'
	self.playing:stopPlay()
	self.playIdx = self.playIdx + 1
	if self.playIdx > #self.roundRoleList then
		self:endRound()
	else
		self:startTurn()
	end
end

function Battle:onEvent(event)
	if event.type == ET_RoleDead then
		if self:checkWin() then
			self:endBattle()
		end
	end
end

function Battle:checkWin()

end

---- called by timer ------------------------------------------------------------
function Battle:update()
	if self.state == 'playing' then
		self:updatePlaying()
	end
end

function Battle:updatePlaying()
	self.turnTime = self.turnTime + 1
	if self.turnTime > self.maxTime then
		self:endTurn()
	end
end
