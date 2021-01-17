const sax = require("sax");

module.exports = async function (htm) {
	var parser = sax.parser(false);

	parser.onend = callback;
	parser.onerror = callback;
	parser.write(html);
	parser.close();
};
