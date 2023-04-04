CacheEntry = Class()

function CacheEntry:__ctor(cache, key, value)
	self.cache = cache
	self.key = key
	self.value = value
	self.time = 0
end

function CacheEntry:free(byTTL)
end

-----------------------------------------------------------

CacheMap = {}

function CacheMap:get(key)
end
function CacheMap:set(key, value)
end

-----------------------------------------------------------

ImageCache = Class(CacheMap)
