const libxml = require("libxmljs2");

module.exports = async function (html) {
	return new libxml.parseHtmlString(html);
};
