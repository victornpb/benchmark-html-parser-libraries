const parse = require("html-dom-parser");

module.exports = async function (html) {
	return parse(html);
};
