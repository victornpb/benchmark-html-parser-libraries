const HTMLtoDOM = require("neutron-html5parser")();

module.exports = async function (htm) {
    var noop = function () {};
    HTMLtoDOM.Parser(html, {
        start: noop,
        end: noop,
        chars: noop,
        comment: noop,
        doctype: noop
    });
};
