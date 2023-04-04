callback = class ()

function callback:parse_str_fn(path)
		-- process string function define
        local obj_path, fnname, bself = nil
        local tf = string.split(path, ':')
        assert(#tf <= 2, 'callback format error:'..fn)
        path = tf[1]
        if #tf == 2 then
            fnname = tf[2]
            self.bobj = true
        end
        local tf = string.split(path, '.')
        if not fnname then
            fnname = tf[#tf]
            tf[#tf] = nil
        end
        local obj = G
        for i = 1, #tf - 1 do
            local name = tf[i]
            if i == 1 then
				obj = assert(G[name])
            else
                obj = assert(obj[name])
            end
        end
		assert(type(obj) == 'table')
        assert(obj[fnname])
	return obj, fnname, bself
end
-- check: f, a.f, a:f, a.b.f, a.b:f
-- assert: nf, no.f, no:f, a.no.f, a.no:f, a.no, a:b:f

function callback:__ctor(fn, ...)
	if type(fn) == 'string' then
        self:parse_str_fn(fn)
    end
    self.fn = fn
    self.params = {...}

end

function callback:__call(...)
	assert(self.fn)
    local fn = self.fn
    local args = table.merge(self.param, {...})
	if type(fn) == 'string' then
        local obj, fnname, bself = self:parse_str_fn(fn)
        fn = assert(obj[fnname])
        if bself then
            tinsert(args, 1, obj)
        end
    end
    return fn(unpack(args))
end
function callback:safe_call(...)
	local ok, ret = xpcall(fn, bt, fn, unpack(args))
    if not ok then
        assert(ok, ret)
    end
    return ret
end


local function test_cb()
    local cb1 = callback(print,1,2,3)
    cb1()
    local cb2 = callback('print',1,2,3)
    cb2()
    local A = {}
    A.f = function(self,p1)
		print('A:F', p1)
    end
    local cb3 = callback(A.f, A)
    cb3(2)
	local cb = callback('A:f',1)
end
