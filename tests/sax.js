const sax = require("sax");

module.exports = function (html) {
	return new Promise((resolve, reject) => {
		const parser = sax.parser(false);

		parser.onend = resolve;
		parser.onerror = reject;
		parser.write(html);
		parser.close();
	});
};
