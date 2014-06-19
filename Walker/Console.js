/* jslint node: true */

var colors = require('colors');
var moment = require('moment');

var Console = function (module_name) {
	this.m = module_name;
};

Console.prototype.generate = function (m, level, content) {
	return moment().format('YYYY-MM-DD HH:MM:SS') + ' ' + level + ' <' + m + '> ' + content;
};

Console.prototype.debug = function (content) {
	console.log(this.generate(this.m, 'DEBUG'.cyan, content));
};

Console.prototype.info = function (content) {
	console.info(this.generate(this.m, 'INFO'.green, content));
};

Console.prototype.warn = function (content) {
	console.warn(this.generate(this.m, 'WARN'.yellow, content));
};

Console.prototype.error = function (content) {
	console.error(this.generate(this.m, 'ERROR'.red, content));
};

module.exports = Console;
