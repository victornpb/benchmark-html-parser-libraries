const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = async function (htm) {
    const dom = JSDOM.fragment(html, {url:'http://example.com'});
}