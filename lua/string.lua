local split_fmt = '[^%s]*'

function string.split(str, spe)
	local ret = {}
    local pt = sformat(split_fmt, spe)
    string.gsub(str, pt, function (s)
    	tinsert(ret, s)
    end)
    return ret
    -- todo: 多个分隔符连接在一起，不能识别成空数据
    -- 如‘a,,c’ => {a,c} 而不是 ｛a,nil,c}
end
