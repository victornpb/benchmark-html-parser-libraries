const fs = require('fs');
const path = require('path');
const fg = require('fast-glob');
const summary = require('summary');
const ProgressBar = require('progress');

process.on('uncaughtException', crashed);
process.on('unhandledRejection', crashed);
function crashed(error) {
	console.error(error);
	process.exit(1);
}

process.on('message', start);
async function start(task) {

	const memory = {
		baseLine: 0,
		afterImport: 0,
		samples: [],
		end: 0,
	};

	memory.baseLine = process.memoryUsage();

	// load lib
	const parser = require(task.jsModule);
	// end load lib

	memory.afterImport = process.memoryUsage();

	// find input files
	const inputFiles = await fg('files/*.html', { dot: true });

	const bar = new ProgressBar('[:bar] :current / :total', {
		total: inputFiles.length,
		complete: '=',
		incomplete: ' ',
		width: 50
	});

	const times = [];
	for (const input of inputFiles) {

		// read input
		const content = await fs.promises.readFile(input, 'utf8');

		// before
		const tic = process.hrtime();

		// parse
		parser(content, () => { });

		// after
		const toc = process.hrtime(tic);
		times.push(toc);

		bar.tick();
	}

	// done
	const stat = summary(times.map(t => {
		return t[0] * 1e3 + t[1] / 1e6;
	}));

	// result
	process.send({
		mean: stat.mean(),
		sd: stat.sd(),
	});

	process.exit(0);
}