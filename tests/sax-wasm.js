let fs, path;
let parser, options, _SaxEventType, _SAXParser;
module.exports = {
	async setup() {
		fs = require('fs');
		path = require('path');
		let { SaxEventType, SAXParser } = require('sax-wasm');
		_SaxEventType = SaxEventType;
		_SAXParser = SAXParser;

		// Get the path to the WebAssembly binary and load it
		const saxPath = require.resolve('sax-wasm/lib/sax-wasm.wasm');
		const saxWasmBuffer = fs.readFileSync(saxPath);

		// Instantiate
		options = {highWaterMark: 32 * 1024}; // 32k chunks
		parser = new SAXParser(SaxEventType.Attribute | SaxEventType.OpenTag, options);

		// Instantiate and prepare the wasm for parsing
		await parser.prepareWasm(saxWasmBuffer);
	},
	parse(html, file) {
		return new Promise((resolve, reject) => {

			parser.eventHandler = (event, data) => {
				if (event === _SaxEventType.Attribute) {
					// process attribute
				} else {
					// process open tag
				}
			};
	
			const readable = fs.createReadStream(file, options);
			readable.on('data', (chunk) => {
				parser.write(chunk);
			});
			readable.on('end', () => { parser.end(); resolve(); });
		});
	},
};