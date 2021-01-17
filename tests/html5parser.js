const html5parser = require("html5parser");

module.exports = (html, callback) => {
  return html5parser.parse(html);
};
