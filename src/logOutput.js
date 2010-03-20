
var sys = require('sys');
var logger = require('./logger');

logger.bindCallback(function(listener)
{
	listener.addListener("logged",function(packet)
	{
		var level = '';
		switch (packet.level)
		{
			case "debug":
				level = "DBG";
				break;
			case "notice":
				level = "NOT";
				break;
			case "warning":
				level = "WRN";
				break;
			case "error":
				level = "ERR";
				break;
		}
		
		var msg = "[" + packet.ts.year + "-" + packet.ts.month + "-" + packet.ts.date + " " + packet.ts.hour + ":" + packet.ts.min + ":" + packet.ts.sec + "] ";
		msg += "("+level+") ";
		msg += packet.msg;
		
		sys.puts(msg);
	});
});