const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = function (html, callback) {
    const dom = new JSDOM(html, {url:'http://example.com'});
    callback(null);
}