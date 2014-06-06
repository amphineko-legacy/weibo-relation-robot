/*
	Weibo Relation Robot
	
	@id        pw.futa.WeiboRelationRobot.authenticator
	@author    Naoki Rinmous <sukareki@gmail.com>
	
	This software is written under the MIT licence.
*/

/* jslint node: true */

var buffer      = require('buffer');
var https       = require('https');
var querystring = require('querystring');

var code = process.argv[2];

if (!code) {
	console.error('ERROR 請指明您在上一步獲得的Code');
}

var postform = querystring.stringify({
	client_id: '2323547071',
	client_secret: '16ed80cc77fea11f7f7e96eca178ada3',
	grant_type: 'authorization_code',
	redirect_uri: 'http://oauth.weico.cc',
	code: code
});

var options = {
	host: 'api.weibo.com',
	path: '/oauth2/access_token',
	headers: { },
	method: 'POST'
};

options.headers = {
	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
	'Content-Length': postform.length
};

var body = '';

var q = https.request(options, function (resp) {
	resp.on('data', function (chunk) {
		body += chunk;
	});
	resp.on('end', function () {
		try {
			var pack = JSON.parse(body);
			if (pack.access_token) {
				console.info('您的Access Token爲 ' + pack.access_token);
			} else {
				console.error('ERROR 獲取您的Access Token失敗');
				console.error(pack);
			}
		} catch(error) {
			console.error('ERROR 解析JSON時發生錯誤: [' + error + ']');
		}
	});
});

q.on('error', function (error) {
	console.error('ERROR 請求Access Token時遇到錯誤: [' + error + ']');
});

q.write(postform);

q.end();
