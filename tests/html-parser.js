const htmlParser = require("html-parser");

module.exports = async function (html) {
	htmlParser.parse(html, {});

};
