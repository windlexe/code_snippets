var Imported = Imported || {};
Imported.Anna_Radio = true;

var Anna = Anna || {};
Anna.Radio = Anna.Radio || {};
Anna.Radio.version = 1.2;

/*:
    @author AnnaMageis[CN]
    @target MV
    @plugindesc 创建广播电台，像真正的收音机一样在后台播放! [耀斑姬汉化]
    @help
_____________________________________________________________________________________
    Release Notes:
_____________________________________________________________________________________
    1.0:
    • Released Plugin

    1.1:
    • Fixed song unmuting once song changes.
    • Added simplified HUD to show Station 1 and current song.
    • Added initial volume changing section.

    1.2
    • Added second station.
    • Cleaned up code and did some renaming.
    • Removed HUD until it has support for multiple stations.
    • Added support for Common Events between songs.
_____________________________________________________________________________________
                    Instructions:
_____________________________________________________________________________________
    Notes:
    只需设置你的电台，使用OGG和M4A文件来播放音乐，就可以了!

    **循环的歌曲在当前的构建中不能很好地工作**
    **每站至少加载一首歌曲以避免出错**
_____________________________________________________________________________________
    Plugin Commands:
_____________________________________________________________________________________

    Radio play x 
    • 这将播放（取消静音）收音机（x=电台编号）

    Radio stop x
    • 这将停止（静音）收音机（x=电台编号）

    Personal Radio Switch
    • 游戏中的开关，允许无线电继续播放，而不考虑切换地图。关闭开关后，你仍然需要关闭无线电

_____________________________________________________________________________________

    @param RadioSetup
     @text 无线电设置

    @param GeneralSettings
     @text 基础设置
     @parent RadioSetup
 
    @param MuteOnMapChange
     @text 更改地图时静音
     @desc 更换地图时是否需要将收音机静音（除非地图被标记为收音机）
     @parent GeneralSettings
     @type boolean
     @default true
 
    @param PersonalRadioSwitch
     @text 个人电台开关
     @desc 当这个开关打开时，无论切换地图，收音机将始终播放
     @parent GeneralSettings
     @type switch
     @default 0
  
    @param Station1
     @text 第一个电台
     @type struct<Radio>
     @default {"Name":"Station 1","Volume":"1.0"}
  
    @param Station2
     @text 第二个电台
     @type struct<Radio>
     @default {"Name":"Station 2","Volume":"1.0"}
 
*/
/*~struct~Radio:

    @param Name
     @type string

    @param Volume
     @desc 该站的播放量（十进制表示%，即0.5=50%）
     @decimals 1
     @default 1.0

    @param Playlist
     @type file[]
     @dir audio/bgm/

    @param UseStationCE
     @name Use Common Event
     @desc 如果你想在歌曲之间运行一个公共事件
     @type boolean
     @default true

    @param StationCEID
     @text Common Event ID
     @desc 歌曲之间调用的公共事件的ID
     @type common_event
*/

    Anna.Radio.Params = PluginManager.parameters('Anna_Radio');

// Station 1 Setup
    Anna.Radio.struct1 = PluginManager.parameters('Anna_Radio')['Station1'];
    Anna.Radio.structParse1 = JSON.parse(Anna.Radio.struct1);
    Anna.Radio.station1Name = Anna.Radio.structParse1["Name"];
    Anna.Radio.station1Volume = Anna.Radio.structParse1["Volume"];
    Anna.Radio.station1Playlist = eval(Anna.Radio.structParse1["Playlist"]);
    Anna.Radio.station1Muted = true;
    Anna.Radio.UseStation1CE = Anna.Radio.structParse1["UseStationCE"];
    Anna.Radio.Station1CE = Anna.Radio.structParse1["StationCEID"];

// Station 2 Setup
    Anna.Radio.struct2 = PluginManager.parameters('Anna_Radio')['Station2'];
    Anna.Radio.structParse2 = JSON.parse(Anna.Radio.struct2);
    Anna.Radio.station2Name = Anna.Radio.structParse2["Name"];
    Anna.Radio.station2Volume = Anna.Radio.structParse2["Volume"];
    Anna.Radio.station2Playlist = eval(Anna.Radio.structParse2["Playlist"]);
    Anna.Radio.station2Muted = true;
    Anna.Radio.UseStation2CE = Anna.Radio.structParse2["UseStationCE"];
    Anna.Radio.Station2CE = Anna.Radio.structParse2["StationCEID"];

    Anna.Radio.personalRadioSwitch = Number(Anna.Radio.Params['PersonalRadioSwitch'] || 1);
    Anna.Radio.mapChangeMute = Anna.Radio.Params['MuteOnMapChange'] || true;

    AudioManager._bgmBuffers = [];
    Anna.Radio.Initialized = false;

    Anna.Radio.initialize = function(){
        if (!Anna.Radio.Initialized){
        // Station 1 Initialize
            Anna.Radio.station1PlaylistIndex = 0;
            Anna.Radio.radioStation1Playing = Anna.Radio.station1Playlist[Anna.Radio.station1PlaylistIndex];
            AudioManager._bgmBuffers[1] = AudioManager.createBuffer('bgm', Anna.Radio.radioStation1Playing);
            AudioManager._bgmBuffers[1].volume = 0;
            Anna.Radio.PlaySong1();
        
        // Station 2 Initialize
            Anna.Radio.station2PlaylistIndex = 0;
            Anna.Radio.radioStation2Playing = Anna.Radio.station2Playlist[Anna.Radio.station2PlaylistIndex];
            AudioManager._bgmBuffers[2] = AudioManager.createBuffer('bgm', Anna.Radio.radioStation2Playing);
            AudioManager._bgmBuffers[2].volume = 0;
            Anna.Radio.PlaySong2();

            Anna.Radio.Initialized = true;     
        };
    };

    Anna.Radio.OnMapLoaded = Scene_Map.prototype.onMapLoaded;              
    Scene_Map.prototype.onMapLoaded = function(){
        if ($gamePlayer.isTransferring()){   
            if (Anna.Radio.mapChangeMute && Anna.Radio.Initialized && !$gameSwitches.value(Anna.Radio.personalRadioSwitch)){AudioManager._bgmBuffers[1].volume = 0; Anna.Radio.station1Muted = true;};
            if (Anna.Radio.mapChangeMute && Anna.Radio.Initialized && !$gameSwitches.value(Anna.Radio.personalRadioSwitch)){AudioManager._bgmBuffers[2].volume = 0; Anna.Radio.station2Muted = true;};
        };
        Anna.Radio.OnMapLoaded.call(this);
    };

// Station 1 Functions
//______________________________________________________________________________
    Anna.Radio.GetSongPos1 = function(){
        if (AudioManager._bgmBuffers[1]._buffer != null && AudioManager._bgmBuffers[1].isPlaying()){var position1 = (AudioManager._bgmBuffers[1].seek() / AudioManager._bgmBuffers[1]._totalTime); return Number.isFinite(position1) ? position1 : 0.0;};
    };

    Anna.Radio.ChangeSong1 = function(){
        Anna.Radio.StopSong1(); Anna.Radio.UpdateSong1(); Anna.Radio.LoadSong1(); Anna.Radio.PlaySong1();
    };

    Anna.Radio.StopSong1 = function(){
        AudioManager._bgmBuffers[1].clear();
    };

    Anna.Radio.UpdateSong1 = function(){
        if(Anna.Radio.station1PlaylistIndex < (Anna.Radio.station1Playlist.length - 1)){Anna.Radio.station1PlaylistIndex += 1;} else {Anna.Radio.station1PlaylistIndex = 0;};
        Anna.Radio.radioStation1Playing = Anna.Radio.station1Playlist[Anna.Radio.station1PlaylistIndex];
    };

    Anna.Radio.LoadSong1 = function(){
        AudioManager._bgmBuffers[1] = AudioManager.createBuffer('bgm', Anna.Radio.radioStation1Playing);
        switch (Anna.Radio.station1Muted){case true: AudioManager._bgmBuffers[1].volume = 0; break; case false: AudioManager._bgmBuffers[1].volume = Anna.Radio.station1Volume; break;};
        Anna.Radio.Station1CommonEvent();
    };

    Anna.Radio.PlaySong1 = function(){
        AudioManager._bgmBuffers[1].play(true, 0);
    };

    Anna.Radio.Station1CommonEvent = function(){
        if(Anna.Radio.UseStation1CE){$gameTemp.reserveCommonEvent(Anna.Radio.Station1CE);};
    };

// Station 2 Functions
//______________________________________________________________________________

    Anna.Radio.GetSongPos2 = function(){
        if (AudioManager._bgmBuffers[2]._buffer != null && AudioManager._bgmBuffers[2].isPlaying()){var position2 = (AudioManager._bgmBuffers[2].seek() / AudioManager._bgmBuffers[2]._totalTime); return Number.isFinite(position2) ? position2 : 0.0;};
    };

    Anna.Radio.ChangeSong2 = function(){
        Anna.Radio.StopSong2();  Anna.Radio.UpdateSong2(); Anna.Radio.LoadSong2(); Anna.Radio.PlaySong2();
    };

    Anna.Radio.StopSong2 = function(){
        AudioManager._bgmBuffers[2].clear();
    };

    Anna.Radio.UpdateSong2 = function(){
        if(Anna.Radio.station2PlaylistIndex < (Anna.Radio.station2Playlist.length - 1)){Anna.Radio.station2PlaylistIndex += 1;} else {Anna.Radio.station2PlaylistIndex = 0;};
        Anna.Radio.radioStation2Playing = Anna.Radio.station2Playlist[Anna.Radio.station2PlaylistIndex];
    };

    Anna.Radio.LoadSong2 = function(){
        AudioManager._bgmBuffers[2] = AudioManager.createBuffer('bgm', Anna.Radio.radioStation2Playing);
        switch (Anna.Radio.station2Muted){case true: AudioManager._bgmBuffers[2].volume = 0; break; case false: AudioManager._bgmBuffers[2].volume = Anna.Radio.station2Volume; break;};
        Anna.Radio.Station2CommonEvent();
    };

    Anna.Radio.PlaySong2 = function(){
        AudioManager._bgmBuffers[2].play(true, 0);
    };

    Anna.Radio.Station2CommonEvent = function(){
        if(Anna.Radio.UseStation2CE){$gameTemp.reserveCommonEvent(Anna.Radio.Station2CE);};
    };

//______________________________________________________________________________

    Anna.Radio.mapUpdate = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function(){
        Anna.Radio.mapUpdate.call(this);
        if(Anna.Radio.GetSongPos1() >= 0.99){Anna.Radio.ChangeSong1();};
        if(Anna.Radio.GetSongPos2() >= 0.99){Anna.Radio.ChangeSong2();};
    };

    Anna.Radio.pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args){
        Anna.Radio.pluginCommand.call(this, command, args);
    
        if (command === 'Radio'){
            switch (args[0].toLowerCase()){
                case 'play':
                    if (args[1] == 1){AudioManager._bgmBuffers[1].volume = Anna.Radio.station1Volume; Anna.Radio.station1Muted = false;};
                    if (args[1] == 2){AudioManager._bgmBuffers[2].volume = Anna.Radio.station2Volume; Anna.Radio.station2Muted = false;};   
                break;
                case 'stop':
                    if (args[1] == 1){AudioManager._bgmBuffers[1].volume = 0; Anna.Radio.station1Muted = true;};
                    if (args[1] == 2){AudioManager._bgmBuffers[2].volume = 0; Anna.Radio.station2Muted = true;};
                break;
                case 'fadeout': // audioBuffer.fadeOut(intSeconds);
                    if (args[1] == 1){AudioManager._bgmBuffers[1].fadeOut(args[2]); Anna.Radio.station1Muted = true;};
                    if (args[1] == 2){AudioManager._bgmBuffers[2].fadeOut(args[2]); Anna.Radio.station2Muted = true;};
                break;
                case 'fadein': // audioBuffer.fadeIn(intSeconds);
                    if (args[1] == 1){AudioManager._bgmBuffers[1].fadeIn(args[2]); Anna.Radio.station1Muted = false;};
                    if (args[1] == 2){AudioManager._bgmBuffers[2].fadeIn(args[2]); Anna.Radio.station2Muted = false;};
            };
        };
    };

Anna.Radio.initialize();