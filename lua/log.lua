local Log = {}

local sformat = string.format
local LDebug = 1
local LInfo = 2
local LWarning = 3
local LAlert = 4
local LError = 5

function Log.output(level, msg)
	if level < Log.recordLevel then
        return
    end
    if console then
        write(color[level])
        write(msg)
        print(color[0])
    end
    if file then
        file.write(msg)
        file.write('\n')
    end
end


function Log.Debug(msg)
    Log.output(LDebug, msg)
end

function Log.Debugf(fmt, ...)
	return Log.Debug(sformat(fmt, ...))
end

function Log.Warning(msg)
    Log.output(LWarning, msg)
end

function Log.Alert(msg)
    Log.output(LAlert, msg)
end

function Log.Error(msg)
    Log.output(LError, msg)
    error(msg)
end
function Log.Errorf(fmt, ...)
    Log.Error(sformat(fmt, ...))
end
function Log.Assert(exp, msg)
    if exp then
        return exp
    end
    Log.Error(msg)
    return exp
end
function Log.Assertf(exp, fmt, ...)
    if exp then return exp end
    Log.Errorf(fmt, ...)
    return exp
end

return Log
