const fs = require('fs');
const path = require('path');
const fork = require('child_process').fork;
const fg = require('fast-glob');
const pidusage = require('pidusage');
const MemorySampler = require('./memorySampler');

const workerFile = path.join(__dirname, 'worker.js');

module.exports = async () => {

	const results = [];
	
	// find input files
	const inputFiles = await fg('inputs/*.html', { cwd: path.join(__dirname, '..'), onlyFiles: true, absolute: true });

	// find tests
	const entries = await fg('tests/*.js', { cwd: path.join(__dirname, '..'), onlyFiles: true, absolute: true });
	const tests = entries.map(filePath => ({
		name: path.basename(filePath),
		jsModule: filePath,
	}));

	for (const test of tests) {
		console.log(`* ${test.name}`);

		let ram;
		const task = {
			name: test.name,
			jsModule: test.jsModule,
			inputFiles,
			result: null,
		};

		const onSpawn = (childProcess) => {
			ram = new MemorySampler(childProcess);
			ram.start();
		}

		try {
			task.result = await executeChildWorker(workerFile, task, onSpawn);
		}
		catch (err) {
			console.error('%s failed (exit code %d)', test.name, err);
			task.result = {};
		}
	
		ram.stop();
		
		
		console.log(
			'[RAM] Mean: %sMB/file ± %sMB\tMin: %sMB\tMax: %sMB\tSetup: %sMB\tInitial: %sMB\tFinal: %sMB',
			(task.result.ram.mean / 1E6).toPrecision(6),
			(task.result.ram.sd / 1E6).toPrecision(3),
			(task.result.ram.min / 1E6).toPrecision(3),
			(task.result.ram.max / 1E6).toPrecision(3),
			(task.result.ram.required.rss / 1E6).toPrecision(3),
			(task.result.ram.baseline.rss / 1E6).toPrecision(3),
			(task.result.ram.final.rss / 1E6).toPrecision(3),
		);
		console.log(
			'[CPU] Mean: %sms/file ± %sms\tMin: %sms\tMax: %sms\tStartup: %sms',
			task.result.timming.mean.toPrecision(6),
			task.result.timming.sd.toPrecision(3),
			task.result.timming.min.toPrecision(3),
			task.result.timming.max.toPrecision(3),
			task.result.timming.startup.toPrecision(6),
		);
		console.log('');

		// Graph memory usage
		// TODO:
		// ram.samples 

		results.push({
			name: task.name,
			result: task.result,
		});
	}


	return results;
};


function executeChildWorker(workerFile, task, onSpawn) {
	return new Promise((resolve, reject) => {
		let result = null;
		const worker = fork(workerFile, [], {
			execArgv: [ '--expose-gc' ],
		});

		if (onSpawn) onSpawn(worker);
		
		worker.on('close', err => err ? reject(err) : resolve(result));
		worker.on('message', (r) => {
			result = r;
		});
		worker.send(task);
	});
}