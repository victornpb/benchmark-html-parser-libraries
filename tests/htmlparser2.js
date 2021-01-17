const Parser = require("htmlparser2").Parser;

module.exports = function (html) {
	return new Promise((resolve, reject) => {

		const parser = new Parser({
			onend: () => { resolve() },
			onerror: () => { reject() },
		});
		parser.end(html);

	});
};
