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

	global.gc();

	// load lib
	ram['baseline'] = process.memoryUsage();
	let tRequire = process.hrtime();
	
	const parser = require(task.jsModule);
	
	tRequire = hrtime2ms(process.hrtime(tRequire));
	ram['required'] = process.memoryUsage();
	// end load lib
	
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
		let r = await parser(content, () => { });

		// after
		t = hrtime2ms(process.hrtime(t));
		times.push(t);
		ramRuns.push(process.memoryUsage().rss);

		Object.assign({}, r); // Dummy work so the three is not GC before sampling memory
		r = null; // release
		
		bar.tick();
		
		global.gc();
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
