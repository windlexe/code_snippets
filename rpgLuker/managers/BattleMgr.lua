local BattleMgr = {}

local state2action = {
	battlestart = self.updateBattleStart,
	turnstart = self.updateTurnStart,
	action = self.updateAction,
	turnend = self.updateTurnEnd,
	battleend = self.updateBattleEnd
}
function BattleMgr:update()
	local action = self.state2action[self.state]
	action(self)
end


function BattleMgr:startBattle()
	self.state = 'battlestart'
end

