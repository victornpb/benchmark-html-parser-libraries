const htmlParser = require("html-parser");

module.exports = async function (html) {
	return htmlParser.parse(html, {});
};
