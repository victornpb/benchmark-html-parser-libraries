const fs = require('fs');
const path = require('path');
const fork = require('child_process').fork;
const fg = require('fast-glob');

const workerFile = path.join(__dirname, 'worker.js');

(async () => {

	const entries = await fg('libs/*.js', { dot: true });
	const libraries = entries.map(filePath => ({
		name: path.basename(filePath),
		jsModule: path.join(__dirname, filePath),
	}));

	const MAX_WIDTH = Math.max(...libraries.map(o=>o.name.length));

	for (const lib of libraries) {
		try {
			await new Promise((resolve, reject) => {

				const task = {
					name: lib.name,
					jsModule: lib.jsModule,
				};

				const worker = fork(workerFile);
				worker.send(task);
				worker.on('message', (stat) => {
					console.log(
						'\n%s: %s ms/file ± %s',
						task.name.padEnd(MAX_WIDTH),
						stat.mean.toPrecision(6),
						stat.sd.toPrecision(6)
					);
				});
				worker.on('close', err => err ? reject(err) : resolve());

			});
		}
		catch (err) {
			console.error('%s failed (exit code %d)', lib.name, err)
		}
	}

	console.log('END!');

})();

