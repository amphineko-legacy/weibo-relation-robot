/*
	Weibo Relation Robot
	
	@id        pw.futa.WeiboRelationRobot.main
	@author    Naoki Rinmous <sukareki@gmail.com>
	
	This software is written under the MIT licence.
*/

/* jslint node: true */

var APIGate      = require('./APIGate');
var fs           = require('fs');
var RequestQueue = require('./RequestUtils/RequestQueue');

var config = JSON.parse(fs.readFileSync('Config.json', 'utf-8'));

var rqueue = new RequestQueue(config.appkey, config.token);

rqueue.queueRequest(APIGate.getUserInfo('理子饼干', function (error, ret) {
	console.log(ret);
}));
