Formation = class()

function Formation:__ctor(roles, buffs)
	self.roles = roles or {}
	self.buffs = buffs or {}
end

function Formation:addRole(role)
	tinsert(self.roles, role)
end
function Formation:getRoles()
	return self.roles
end

