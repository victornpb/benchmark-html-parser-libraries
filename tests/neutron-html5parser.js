const HTMLtoDOM = require("neutron-html5parser")();

module.exports = async function (html) {
    function noop() { }
    return HTMLtoDOM.Parser(html, {
        start: noop,
        end: noop,
        chars: noop,
        comment: noop,
        doctype: noop
    });
};
