/*
	@id        pw.futa.weibobot.walker.reqclient
	@author    Naoki Rinmous <sukareki@gmail.com>
	
	This software is written under the MIT licence.
*/

/* jslint node: true */

var Buffer      = require('buffer');
var http        = require('http');
var https       = require('https');
var Q           = require('q');
var querystring = require('querystring');
var Url         = require('url');

var RequestClient = function (token, appkey) {
	this.token = token;
	this.appkey = appkey;
};

RequestClient.prototype.performRequest = function (request) {
	return this.performRequest2(request.method, request.target, request.param);
};

RequestClient.prototype.performRequest2 = function (method, target, parameters) {
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
				var pack = JSON.parse(respbody);
				deferred.resolve(pack);
			} catch(error) {
				deferred.reject('json: ' + error);
			}
		});
	});
	
	// 回應異常
	q.on('error', function (error) {
		deferred.reject('network: ' + error);
	});
	
	// 發送POST資料
	if (parameters && method === 'POST') {
		q.write(data);
	}
	
	q.end();
	
	return deferred.promise;
};

module.exports = RequestClient;
