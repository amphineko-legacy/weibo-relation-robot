/*
	Weibo Relation Robot
	
	@id        pw.futa.WeiboRelationRobot.requtils.queue
	@author    Naoki Rinmous <sukareki@gmail.com>
	
	This software is written under the MIT licence.
*/

/* jslint node: true */

var RequestClient = require('./RequestClient');
var Q             = require('q');

var RequestQueue = function (ckey, ctoken) {
	this.client = new RequestClient(ctoken, ckey);
	this.queue = [];
	this.queueLock = false;
};

function performRequest() {
	var request = this.queue.shift();
	
	if (request) {
		this.client.performRequest(request).then(function (data) {
			if (!data.error) {
				request.promise.resolve(data);
			} else {
				request.promise.reject('api error: ' + data.error + ' (' + data.error_code + ')');
			}
		}, function (reject) {
			request.promise.reject(reject);
		});
	}
}

RequestQueue.prototype.queueRequest = function (request) {
	request.deferred = Q.defer();
	this.queue.push(request);
	if (!this.queueLock) {
		process.nextTick(performRequest.bind(this));
	}
};

RequestQueue.prototype.insertRequest = function (request) {
	request.deferred = Q.defer();
	this.queue.unshift(request);
	if (!this.queueLock) {
		process.nextTick(performRequest.bind(this));
	}
};

module.exports = RequestQueue;
