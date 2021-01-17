const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = async function (htm) {
    const dom = JSDOM.fragment(html, {includeNodeLocations:true, url:'http://example.com'});
}