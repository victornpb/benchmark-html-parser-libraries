
const pidusage = require('pidusage');

module.exports = class MemorySampler {
	
    ms = 10;
	samples = new Set();
    
    #process = null;
	#timer = null;
	#running = false;

    constructor(childProcess) {
		this.#process = childProcess
		childProcess.on('close', () => this.stop());
    }

    async sample() {
        try {
			const stats = await pidusage(this.#process.pid);
			if(stats.memory) this.samples.add({ t: Date.now(), bytes: stats.memory });
        } catch (err) { }
	}
	start() {
		this.#running = true;
		this.loop();
	}
	loop() {
		this.#timer = setTimeout(async () => {
			this.#timer = null;
			await this.sample();
			if (this.#running) this.loop();
		}, this.ms);
	}
	stop() {
		this.#running = false;
		if (this.#timer) {
			clearTimeout(this.#timer);
			this.#timer = null;
		}
	}
}
