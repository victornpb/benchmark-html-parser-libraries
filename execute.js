const fs = require('fs');
const path = require('path');
const fork = require('child_process').fork;
const fg = require('fast-glob');
const pidusage = require('pidusage');
const MemorySampler = require('./memorySampler');

const workerFile = path.join(__dirname, 'worker.js');

(async () => {

	const entries = await fg('libs/*.js', { dot: true });
	const libraries = entries.map(filePath => ({
		name: path.basename(filePath),
		jsModule: path.join(__dirname, filePath),
	}));

	// find input files
	const inputFiles = await fg('files/*.html', { dot: true });

	for (const lib of libraries) {
		console.log(`${lib.name}`);

		let ram;
		const task = {
			name: lib.name,
			jsModule: lib.jsModule,
			inputFiles,
			result: null,
			ram: null,
		};

		const onSpawn = (childProcess) => {
			ram = new MemorySampler(childProcess);
			ram.start();
		}

		try {
			task.result = await executeChildWorker(workerFile, task, onSpawn);
		}
		catch (err) {
			console.error('%s failed (exit code %d)', lib.name, err)
		}
	
		ram.stop();
		// task.ram = ram.samples;

		
		console.log(
			'[Timming] Startup: %sms\tStats: %s ms/file ± %s',
			task.result.timming.mean.toPrecision(6),
			task.result.timming.sd.toPrecision(6),
			task.result.timming.startup.toPrecision(6),
		);
		console.log(
			'[Memory] Min: %s mb, Mean: %s mb, Max: %s mb, SDT: %s mb, Baseline: %s mb, Required: %s mb, Final: %s mb',
			(task.result.ram.min/1E6).toPrecision(3),
			(task.result.ram.mean/1E6).toPrecision(3),
			(task.result.ram.max/1E6).toPrecision(3),
			(task.result.ram.sd/1E6).toPrecision(3),
			(task.result.ram.baseline/1E6).toPrecision(3),
			(task.result.ram.required/1E6).toPrecision(3),
			(task.result.ram.final/1E6).toPrecision(3),
		);
		console.log('');
	}

	console.log('END!');

})();


function executeChildWorker(workerFile, task, onSpawn) {
	return new Promise((resolve, reject) => {
		let result = null;
		const worker = fork(workerFile);

		if (onSpawn) onSpawn(worker);
		
		worker.on('close', err => err ? reject(err) : resolve(result));
		worker.on('message', (r) => {
			result = r;
		});
		worker.send(task);
	});
}