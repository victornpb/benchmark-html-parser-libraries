const Parser = require("htmlparser2").Parser;

module.exports = async function (htm) {
	var parser = new Parser({
		onend: callback,
		onerror: callback
	});
	parser.end(html);
};
