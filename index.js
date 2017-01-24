var http = require('http');
var express = require('express');
var path = require('path');
var gameList = require('./gameList');
var gameInfo = require('./gameInfo');
var app = express();

var server = http.createServer(app);
app.listen(3000);

app.use(express.static(path.join(__dirname + '/public')))
app.set('views' , './views');
app.set('view engine' , 'ejs');


//游戏列表页
app.get('/' , function(req , res){

	gameList.getGameList().then(function(json_list){
		
		res.render('index' , { title: '召唤师xpxpxxp9527' , data: json_list.game_list })

	})

})


//游戏详情
app.get('/gameInfo' , function(req , res){

	var game_id = req.query.game_id;

	gameInfo.getGameInfo(game_id).then(function(json_info){

		var g_info= {};
		var allInfo = json_info.player_game_list;
		g_info.teamWin = allInfo[0].team_win.player_champions;
		g_info.teamLose = allInfo[0].team_lose.player_champions;
		g_info.tiemStart = allInfo[0].start_timestamp;
		g_info.timeEnd = allInfo[0].end_timestamp;

		res.render('gameInfo' , { title: '召唤师xpxpxxp9527' , data: g_info })

	})

})

