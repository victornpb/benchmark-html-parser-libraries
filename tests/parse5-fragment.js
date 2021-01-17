const parse5 = require('parse5');

module.exports = function(html, callback) {
	return parse5.parseFragment(html.toString());
};
