/*
	@id        pw.futa.weibobot.walker.reqbuilder
	@author    Naoki Rinmous <sukareki@gmail.com>
	
	This software is written under the MIT licence.
*/

/* jslint node: true */

var Q = require('q');

function getUserInfoByName(client, name, callback) {
	var deferred = Q.defer();
	
	client.performRequest({
		method: 'GET',
		target: 'https://api.weibo.com/2/users/show.json',
		param: {
			screen_name: name
		}
	}).then(function (data) {
		if (!data.error) {
			deferred.resolve(data);
		} else {
			deferred.reject('api: [' + data.error_code + '] ' + data.error);
		}
	}, function (reason) {
		deferred.reject(reason);
	});
	
	return deferred.promise;
}

module.exports = {
	getUserInfoByName: getUserInfoByName
};
