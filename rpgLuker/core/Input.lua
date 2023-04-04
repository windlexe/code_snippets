Input = {}

Input.KeyMap = {
    9: 'tab',       -- tab
    13: 'ok',       -- enter
    16: 'shift',    -- shift
    17: 'control',  -- control
    18: 'control',  -- alt
    27: 'escape',   -- escape
    32: 'ok',       -- space
    33: 'pageup',   -- pageup
    34: 'pagedown', -- pagedown
    37: 'left',     -- left arrow
    38: 'up',       -- up arrow
    39: 'right',    -- right arrow
    40: 'down',     -- down arrow
    45: 'escape',   -- insert
    81: 'pageup',   -- Q
    87: 'pagedown', -- W
    88: 'escape',   -- X
    90: 'ok',       -- Z
    96: 'escape',   -- numpad 0
    98: 'down',     -- numpad 2
    100: 'left',    -- numpad 4
    102: 'right',   -- numpad 6
    104: 'up',      -- numpad 8
    120: 'debug'    -- F9
}

Input.gamepadMapper = {
    0: 'ok',        -- A
    1: 'cancel',    -- B
    2: 'shift',     -- X
    3: 'menu',      -- Y
    4: 'pageup',    -- LB
    5: 'pagedown',  -- RB
    12: 'up',       -- D-pad up
    13: 'down',     -- D-pad down
    14: 'left',     -- D-pad left
    15: 'right',    -- D-pad right
};

function Input:update()
end

function Input:isPressDown(key)
end

function Input:onKeyDown(event)

end


----------------------------------------------------------------

TouchInput = {}

function TouchInput:update()
end

