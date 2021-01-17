const htmlparser2 = require('htmlparser2'),
    Parser = htmlparser2.Parser,
    Handler = htmlparser2.DomHandler;

module.exports = async function (html) {
  const handler = new Handler();
	const parser = new Parser(handler);
	return parser.parseComplete(html);
};
