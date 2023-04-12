Core:
	Player
	Sprite
    	AnimSprite
    	Tile
    	Chara
        	Enemy
            Actor
        Widget
        	Window
            Button
            	ComboButton
            Text
            InputText
            ScrollPanel
```mermaid
graph LR
A[avatar]
A-->B(role 主角)
B-->BA(模块:timer/avatar/attr/buff/rune/skill/summon/item)
A-->C(monster 怪物/boss)
C-->CA(模块:timer/avatar/attr/buff/skill/summon)
A-->D(robot 机器人)
D-->DA(模块:timer/avatar/attr/buff/skill/rune/summon)
A-->E(summon 召唤物)
E-->EA(模块:timer/avatar/attr/buff/skill/summon)
A-->F(bullet 子弹)
F-->FA(模块:timer/avatar/buff)
A-->G(其它avatar)
G-->GA(npc)
G-->GB(portal 传送门)
G-->GC(actionobj)
```
