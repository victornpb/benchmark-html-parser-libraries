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

function hrtime2ms([s, ns]) { return s * 1000 + ns / 1000000; }

process.on('message', start);
async function start(task) {

	const ram = {};

	ram['baseline'] = process.memoryUsage();
	let tRequire = process.hrtime();
	
	// load lib
	const parser = require(task.jsModule);
	// end load lib

	tRequire = hrtime2ms(process.hrtime(tRequire));
	ram['required'] = process.memoryUsage();

	const bar = new ProgressBar(':current / :total [:bar]', {
		total: task.inputFiles.length,
		complete: '#',
		incomplete: '_',
		width: 50,
	});

	const times = [];
	const ramRuns = [];
	for (const input of task.inputFiles) {

		// read input
		const content = await fs.promises.readFile(input, 'utf8');

		// before
		ramRuns.push(process.memoryUsage().rss);
		let t = process.hrtime();

		// execute the actual thing
		await parser(content, () => { });

		// after
		t = hrtime2ms(process.hrtime(t));
		times.push(t);
		ramRuns.push(process.memoryUsage().rss);

		bar.tick();
	}

	ram['final'] = process.memoryUsage();

	// done
	const statTiming = summary(times);
	const statRam = summary(ramRuns);

	// result
	process.send({
		timming: {
			startup: tRequire,
			min: statTiming.min(),
			mean: statTiming.mean(),
			max: statTiming.max(),
			sd: statTiming.sd(),
		},
		ram: {
			...ram,
			min: statRam.min(),
			mean: statRam.mean(),
			max: statRam.max(),
			sd: statRam.sd(),
		},
	});

	process.exit(0);
}
