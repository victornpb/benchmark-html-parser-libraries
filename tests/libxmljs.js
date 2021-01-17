const libxml = require("libxmljs2");

module.exports = async function (html) {
	new libxml.parseHtmlString(html);
};
