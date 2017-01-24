var http = require('http');
var Promise = require('bluebird');

function getGameInfo(id){

	var url = 'http://api.lolbox.duowan.com/api/v2/player/dx18/75787178/game/' + id + '/'; 

	return new Promise(function(resolve , reject){

		http.get(url , function(res){

			var size = 0;
			var chunks = [];

			res.on('data' , function(chunk){

				size += chunk.length;

				chunks.push(chunk);

			})

			res.on('end' , function(){

				var _data = Buffer.concat(chunks , size);

				var gInfo = JSON.parse(_data.toString())

				resolve(gInfo);

			})

		})

	})

}


exports.getGameInfo = getGameInfo;

