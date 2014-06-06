/*
	Weibo Relation Robot
	
	@id        pw.futa.WeiboRelationRobot.apiutils.delegate
	@author    Naoki Rinmous <sukareki@gmail.com>
	
	This software is written under the MIT licence.
*/

/* jslint node: true */

var Q = require('q');

function getUserInfo(name, callback) {
	var deferred = Q.defer();
	
	deferred.promise.then(function (data) {
		if (data.screen_name === name) {
			callback(false, data);
		} else {
			callback(true, 'data: invalid struct');
		}
	}, function (reject) {
		callback(false, reject);
	});
	
	return {
		method: 'GET',
		target: 'https://api.weibo.com/2/users/show.json',
		param: {
			screen_name: name
		},
		promise: deferred
	};
}

module.exports = {
	getUserInfo: getUserInfo
};
