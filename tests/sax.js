const sax = require("sax");
const parser = sax.parser(false);

module.exports = function (html) {
	return new Promise((resolve, reject) => {
		parser.onend = resolve;
		parser.onerror = reject;
		parser.write(html);
		parser.close();
	});
};