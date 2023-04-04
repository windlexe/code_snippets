local StorageMgr = {}

function StorageMgr:load(storeId)
end

function StorageMgr:save(storeId, data)
end

function StorageMgr:exists(storeId)
end


local LocalStorageMgr = Class(StorageMgr)

function LocalStorageMgr:localFilePath(storeId)
	if storeId == -1 then
		return 'config.sav'
	elseif storeId == -2 then
		return 'global.sav'
	end
	local name = string.format('file%s.sav', storeId)
	return name
end

function LocalStorageMgr:load(storeId)
end

function LocalStorageMgr:save(storeId, data)
	local data = string.tobase64(data)
	local filename = self:localFilePath(storeId)
	local file = IO.open(filename, 'w+')
	file:write(data)
end

function LocalStorageMgr:exists(storeId)
end

function LocalStorageMgr:remove(storeId)
end
