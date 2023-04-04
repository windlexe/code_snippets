----------------------------------------------------

----------------------------------------------------


-----------------------------------------------------
delegate = class ()

function delegate:__ctor()
end

function delegate:__call(...)
	for i, fn in ipairs(self.fn_list) do
        fn(...)
    end
end

function delegate:add(fn)
    tinsert(self.fn_list, fn)
end

function test1()
	local a = delegate()
    local fa = function (...)
        print('fa', ...)
    end
    a:add(fa)
    a()
end


