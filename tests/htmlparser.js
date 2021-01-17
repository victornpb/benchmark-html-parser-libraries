const htmlparser = require('htmlparser');

module.exports = async function (html) {
	var handler = new htmlparser.DefaultHandler();
	var parser = new htmlparser.Parser(handler);
	parser.parseComplete(html);
};
