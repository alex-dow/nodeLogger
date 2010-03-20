
var sys = require('sys');
var events = require('events');



// Base Class
function logQueue()
{
	events.EventEmitter.call(this);
	
	this.options = { };
}
sys.inherits(logQueue, events.EventEmitter);

logQueue.prototype.log = function(msg,level)
{
	var d = new Date;
	
	var packet = {
		
		ts: {
			year: d.getFullYear(),
			month: d.getMonth(),
			date: d.getDate(),
			hour: d.getHours(),
			min: d.getMinutes(),
			sec: d.getSeconds(),
			object: d
		},
		msg: msg,
		level: level
	};
	
	if (packet.ts.month < 10) packet.ts.month = "0" + packet.ts.month;
	if (packet.ts.date < 10) packet.ts.date = "0" + packet.ts.date;
	if (packet.ts.min < 10) packet.ts.min = "0" + packet.ts.min;
	if (packet.ts.sec < 10) packet.ts.sec = "0" + packet.ts.sec;
	
	this.emit("log" + level.substr(0,1).toUpperCase() + level.substr(1,level.length),packet);
	this.emit("logged",packet);
};
var logHandler = new logQueue;

logQueue.prototype.bindOptions = function(options)
{
	this.options = options;
};

exports.bindOptions = function(options)
{
	logHandler.bindOptions(options);
};

exports.factory = function(loggerCallbacks)
{
	var createdLogger = new logQueue;
	loggerCallback(createdLogger);
	return createdLogger;
};

exports.bindCallback = function(loggerCallback)
{
	loggerCallback(logHandler);
};

exports.bindLogger = function(logger)
{
	sys.puts(sys.inspect(logger));
	logHandler = logger;
};

exports.debug = function(msg)
{
	logHandler.log(msg,"debug");
};

exports.notice = function(msg)
{
	logHandler.log(msg,"notice");
};

exports.warning = function(msg)
{
	logHandler.log(msg,"warning");
};

exports.error = function(msg)
{
	logHandler.log(msg,"error");
};