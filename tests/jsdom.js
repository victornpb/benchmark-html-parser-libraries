const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = async function (html) {
    const dom = new JSDOM(html, { url: 'http://example.com' });
    return dom;
}