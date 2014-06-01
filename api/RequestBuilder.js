/*
	Weibo Relation Robot
	
	@id        pw.futa.WeiboRelationRobot.apiutils.client
	@author    Naoki Rinmous <sukareki@gmail.com>
	
	This software is written under the MIT licence.
*/

var Buffer      = require('buffer');
var http        = require('http');
var https       = require('https');
var Q           = require('q');
var querystring = require('querystring');
var Url         = require('url');

var RequestBuilder = function (token, appkey) {
	this.token = token;
	this.appkey = appkey;
};

RequestBuilder.prototype.performRequest = function (method, target, parameters) {
	var deferred = Q.defer();
	
	var url = Url.parse(target), data;
	
	var options = {
		host: url.host,
		path: url.pathname
	};
	
	var client = url.protocol === 'https:' ? https : http; // 通過URL的頭部協議來決定使用HTTP或HTTPS客戶機
	
	// 根據請求方法準備請求參數 (追加access_token)
	if (this.token) {
		parameters.access_token = this.token;
		parameters.source = this.appkey;
		if (parameters && method === 'GET') {
			options.path += '?' + querystring.stringify(parameters);
		} else {
			options.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
			options.headers['Content-Length'] = Buffer.byteLength(parameters);
		}
	}
	
	// 發送請求
	var respbody = '';
	var q = client.request(options, function (resp) {
		resp.on('data', function (chunk) {
			respbody += chunk;
		});
		resp.on('end', function () {
			try {
				// 處理伺服器回饋 (JSON解析)
				var pack = JSON.parse(respbody);
				deferred.resolve(pack);
			} catch(error) {
				deferred.reject(error);
			}
		});
	});
	
	// 回應異常
	q.on('error', function (error) {
		deferred.reject(error);
	});
	
	// 發送POST資料
	if (parameters && method === 'POST') {
		q.write(data);
	}
	
	q.end();
	
	return deferred.promise;
};

module.exports = RequestBuilder;
