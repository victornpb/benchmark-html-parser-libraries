const htmlparser = require('htmlparser');

module.exports = async function (html) {
	const handler = new htmlparser.DefaultHandler();
	const parser = new htmlparser.Parser(handler);
	return parser.parseComplete(html);
};
