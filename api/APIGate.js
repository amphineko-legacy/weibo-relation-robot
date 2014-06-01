/*
	Weibo Relation Robot
	
	@id        pw.futa.WeiboRelationRobot.apiutils.delegate
	@author    Naoki Rinmous <sukareki@gmail.com>
	
	This software is written under the MIT licence.
*/


var Q              = require('q');
var RequestBuilder = require('./RequestBuilder');


function getUserInfo(reqbuilder, name) {
	var deferred = Q.defer();
	
	reqbuilder.performRequest('GET', 'https://api.weibo.com/2/users/show.json', {
		screen_name: name.substr(1, name.length - 1)
	}).then(function (data) {
		if (data.id) {
			deferred.resolve(data);
		} else {
			console.log(data);
			deferred.reject('invalid data');
		}
	}, function (reject) {
		deferred.reject(reject);
	});
	
	return deferred.promise;
}


function getUserTimelineLatest(reqbuilder, uid, count) {
	var deferred = Q.defer();
	
	var counter = 0, data = [], last = 0;
	
	var iter = function () {
		var next = count - counter;
		if (next > 100) {
			next = 100;
		}
		
		getUserTimelineEx(reqbuilder, uid, last, next).then(function (chunk) {
			if (chunk.statuses) {
				counter += next;
				data = data.concat(chunk.statuses);
				if (counter < count) {
					last = chunk.statuses[chunk.statuses.length - 1].id;
					iter();
				} else {
					deferred.resolve(data);
				}
			} else {
				deferred.reject(chunk);
			}
		}, function (reject) {
			deferred.reject(reject);
		});
	};
	
	iter();
	
	return deferred.promise;
}

function getUserTimelineEx(reqbuilder, uid, since, count) {
	return reqbuilder.performRequest('GET', 'https://api.weibo.com/2/statuses/user_timeline.json', {
		uid: uid,
		since_id: since,
		count: count
	});
}

	/*
		Demo: Read someone's timeline
	
		getUserTimelineLatest(new RequestBuilder('522cd87d59c4ba445caae2c62b2d2824', '2323547071'), 1941998575, 105).then(function (data) {
			console.log(data.length);
		}, function (error) {
			console.error('!-- Error');
			console.error(error);
		});
	*/


/* Read Following */

function getUserBilateral(reqbuilder, uid, count, page) {
	var deferred = Q.defer();
	
	reqbuilder.performRequest('GET', 'https://api.weibo.com/2/friendships/friends/bilateral.json', {
		uid: uid,
		page: page,
		count: count
	}).then(function (data) {
		if (data.users) {
			deferred.resolve(data.users);
		} else {
			deferred.reject('invalid response');
		}
	}, function (reject) {
		deferred.reject(reject);
	});
	
	return deferred.promise;
}


module.exports = {
	getUserInfo: getUserInfo,
	getUserTimelineLatest: getUserTimelineLatest,
	getUserBilateral: getUserBilateral
};

