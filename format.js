String.prototype.format = function() {
	//So I wrote this because I didn't like that there wasn't a printf equivalent in javascript that didn't require some third party library.
	//This doesn't handle commas currently and as the length of numbers change it shifts slightly to the left.
	//A space is required for more than one argument. Example: '%20 %5 %10.2'
	var pattern = /(\%[0-9]*\,*\.*[0-9]*)/g; // Example pattern: %20.20
	var _s = this;
	var _formats = [];
	var _formatted = [];
	var _object = { start: 0, end: 0 };
	
	//This searches through the string looking for the pattern, 
	//then creates an object that stores the start and end position of the pattern
	while(match = pattern.exec(_s)){  
		var a = Object.create(_object); 
		a.start = pattern.lastIndex - match[0].length;
		a.end = pattern.lastIndex - 1;
		_formats.push(a);
	}
	
	for (var y in arguments){
		var _arg = arguments[y];
		var _sub = _s.substring(_formats[y].start, _formats[y].end+1);
		_sub = _sub.split(/[\%\.]/);
		if (typeof _arg === "number" && _sub[2] != undefined) { 
			_arg = _arg.toFixed(parseInt(_sub[2])); 
		}
		else if (typeof _arg === "number") { 
			_arg = _arg.toFixed(0);
		}
		_arg = _arg.toString();
		_pre = _arg.indexOf(".");
		if (_pre === -1) { 
			while (_arg.length < (parseInt(_sub[1]) + _pre + 1)) { _arg = " "+_arg; }
		}
		else { 
			_pre = _arg.substring(_pre+1, _arg.length).length; 
			while (_arg.length < (parseInt(_sub[1]) + _pre + 1)) { _arg = " "+_arg; }
		}
		_formatted.push(_arg);
	}
	
	_string = _s.split(" ")
	newString = "";
	counter = 0;
	for (x in _string) {
		if (_string[x].includes('%')){
			newString += _formatted[counter] + " ";
			counter++;
		}
		else {
			newString += _string[x] + " ";
		}
	}
	return newString;
}

module.exports = String.prototype.format;