const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = function (html, callback) {
    const dom = JSDOM.fragment(html, {includeNodeLocations:true, url:'http://example.com'});
    callback(null);
}