const libxml = require("libxmljs2");

module.exports = function (html, callback) {
	new libxml.parseHtmlString(html);
	callback(null);
};
