
const pidusage = require('pidusage');

module.exports = class MemorySampler {
	
    ms = 5;
	samples = new Set();
    
    #process = null;
	#timer = null;

    constructor(childProcess) {
        this.#process = childProcess
    }

    async sample() {
        try {
            const stats = await pidusage(this.#process.pid);
            this.samples.add(stats.memory);
        } catch (err) { }
	}
	start() {
		this.#timer = setInterval(() => {
			this.sample();
		}, this.ms);
	}
	stop() {
		clearInterval(this.#timer);
	}
}
