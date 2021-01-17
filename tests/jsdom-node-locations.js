const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = async function (html) {
    const dom = JSDOM.fragment(html, {includeNodeLocations:true, url:'http://example.com'});
}