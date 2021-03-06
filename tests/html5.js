const Parser = require('html5').SAXParser;

module.exports = async function (html) {
	var parser = new Parser();
	var noop = function() {};
	parser.contentHandler = {
		startDocument: noop,
		endDocument: noop,
		startElement: noop,
		endElement: noop,
		characters: noop
	};
	return parser.parse(html);
};
