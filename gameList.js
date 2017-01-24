var http = require('http');
var Promise = require('bluebird');

function getGameList(){

	return new Promise(function(resolve , reject){

		http.get('http://api.lolbox.duowan.com/api/v2/player/dx18/75787178/game_recent/' , function(res){

			var size = 0;
			var chunks = [];

			res.on('data' , function(chunk){

				size += chunk.length;
				chunks.push(chunk);

			})

			res.on('end' , function(){

				var rst = {};
				var temp = [];

				var _data = Buffer.concat(chunks , size);

				gList = JSON.parse(_data.toString());

				resolve(gList);

			})

		}).on('error' , function(e){

			console.log('错误消息：' + 'e.message')

		})

	})

}

exports.getGameList = getGameList;
