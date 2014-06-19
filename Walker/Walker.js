/*
	@id        pw.futa.weibobot.walker.main
	@author    Naoki Rinmous <sukareki@gmail.com>
	
	This software is written under the MIT licence.
*/

/* jslint node: true */

var Console         = new (require('./Console'))('Walker');
var EventEmitter    = require('events').EventEmitter;
var Parser          = require('./Parser');
var RequestBuilder  = require('./RequestBuilder');
var RequestClient   = require('./RequestClient');
var Storage         = require('../Storage');

var Walker = function (appkey, token) {
	this.client = new RequestClient(token, appkey);
	this.events = new EventEmitter();
};

function walk(name) {
	RequestBuilder.getUserInfoByName(this.client, name).then(function (user) {
		this.events.emit('walk', name);
		
		if (Storage.checkUserStatus(user.uid) == 'unknown') {
			this.events.emit('walk-new', user);
		}
			 
		this.events.emit('finish');
	}, function (reason) {
		this.events.emit('exception', reason);
		this.events.emit('finish');
	});
}

Walker.prototype.coldstart = function (uid) {
	walk.apply(this, [ '理子饼干' ]);
};

module.exports = Walker;
