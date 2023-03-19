local Date = require "date"
local Time = require "time"
local Extend = require "extend"
local Environ = require "environ"

local SECONDS_PER_DAY = 24*3600

local LogFile = class ()

function LogFile:__ctor(path, nae)
    self.path = path
    self.name = name
    self.file = nil
    self.next_day = 0
end

function LogFile:_try_open_file(filename, mode)
	local file = io.open(filename, mode)
	if file then return file end
	local dirs = Extend.str_split(filename, '/')
	local path = ""
	for i = 1, #dirs-1 do
		path = path ..dirs[i]
        -- os.execute会创建新的shell自进程，消耗非常巨大！！！
		-- os.execute("mkdir "..path)
        lfs.mkdir(path)
		path = path .. '/'
	end
	file = assert(io.open(filename, mode))
	return file
end

function LogFile:check_date()
	local now = Date.second()
	local tmp = Date.localtime(now)
	if not self.file or now >= self.next_day then
		if self.file then
			self.file:close()
			self.file = nil
		end
		local filename = string.format("%s/%4d%02d%02d/%s.log", self.path, tmp.year, tmp.month, tmp.day, self.name)
		self.file = assert(Extend.Io.open_file(filename, "a+"), filename)
		self.next_day = Date.begin_time(now + SECONDS_PER_DAY)
	end
	return string.format("[%4d-%02d-%02d %02d:%02d:%02d]", tmp.year, tmp.month, tmp.day, tmp.hour, tmp.min, tmp.sec)
end
function LogFile:write(msg)
	local szdate = self:check_date()
	--print(">>>", self.file, szdate..msg)
	self.file:write(szdate)
	self.file:write(msg)
	self.file:write("\n")
end
function LogFile:writef(fmt, ...)
	local msg = string.format(fmt, ...)
	self:write(msg)
end
function LogFile:close()
	self.file:close()
	self.file = nil
end
function LogFile:flush()
	if self.file then
		self.file:flush()
	end
end


return LogFile