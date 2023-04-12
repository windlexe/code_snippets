Battle = {}

function Battle:createBattle(bf, fa, fb)
	self.battlefield = bf
	self.fa = fa
	self.fb = fb
	self.count = 0
end

function Battle:startBattle()
	self.count = 1
end

function Battle:run()
	if not self:checkFinish() then
		-- a round

	else
		self:endBattle()
	end
end


