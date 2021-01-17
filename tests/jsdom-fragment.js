const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = async function (html) {
    const dom = JSDOM.fragment(html, { url: 'http://example.com' });
    return dom;
}