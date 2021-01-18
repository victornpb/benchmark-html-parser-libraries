const fs = require('fs');
const path = require('path');
const si = require('systeminformation');
const matrixToAsciiTable = require('asciitable.js');

var executor = require('./execute');

(async () => {

    // Run test
    const results = await executor();

    // HW Info
    const info = await PromiseAllProps({
        so: si.osInfo(),
        sw: si.versions('node,npm,v8'),
        sys: si.system(),
        cpu: si.cpu(),
        mem: si.mem(),
        gpu: si.graphics(),
    });
    const harwareSummary = `
        PC ${info.so.distro} ${info.so.codename} ${info.so.release} ${info.so.platform} ${info.so.arch} ${info.so.kernel}
        Node: ${info.sw.node} V8: ${info.sw.v8} NPM: ${info.sw.npm}
        ${info.sys.manufacturer} ${info.sys.model}
        CPU ${info.cpu.manufacturer} ${info.cpu.brand} ${info.cpu.speed}GHz ${info.cpu.physicalCores}C/${info.cpu.cores}T
        RAM ${info.mem.total / (1024 * 1024 * 1024)} GB
        GPU ${ info.gpu.controllers.map(g => `${g.vendor} ${g.model}  ${g.bus} ${g.vram} MB`).join(' / ') }`.replace(/^[ \t]+/gm,'');

    // Create Markdown
    const table = matrixToAsciiTable([
        ['^Library', '^ms/file (Mean)', '^Module Startup', '^RAM usage/file (Mean)', '^Min', '^Max', '^Baseline', '^Lib Overhead', '^Final'], //header
        null, //horizontal line
        ...results.map(r => ([
            `<${r.name}`,
            `>${r.result.timming.mean.toPrecision(6)}ms ±${r.result.timming.sd.toPrecision(6)}ms`,
            `>${r.result.timming.startup.toPrecision(6)}ms`,
            `>${(r.result.ram.mean / 1E6).toPrecision(3)}mb `,
            `>${(r.result.ram.min / 1E6).toPrecision(3)}mb ±${(r.result.ram.sd / 1E6).toPrecision(3)}mb`,
            `>${(r.result.ram.max / 1E6).toPrecision(3)}mb`,
            `>${(r.result.ram.baseline.rss / 1E6).toPrecision(3)}mb`,
            `>${((r.result.ram.required.rss-r.result.ram.baseline.rss) / 1E6).toPrecision(3)}mb`,
            `>${(r.result.ram.final.rss / 1E6).toPrecision(3)}mb`,
        ])),
    ]);
    const md = `
        # Results
        Latest: ${new Date().toISOString()}

        ${table}

        ----
        #### Environment Summary
        ${harwareSummary.replace(/^/gm,"> ")}
    `.replace(/^[ \t]+/gm, '');

    console.log(md);

    // Write result
    const fileName = `result_${new Date().toISOString().replace(/:/g, '-')}`;
    await fs.promises.writeFile(path.join(__dirname, '../results/', `${fileName}.md`), md, 'utf8'); // markdown
    await fs.promises.writeFile(path.join(__dirname, '../results/', `${fileName}.json`), JSON.stringify(results, null, '\t'), 'utf8'); // Raw JSON
    
    // Update Readme
    const readmePath = path.join(__dirname, '../', 'README.md');
    const readme = await fs.promises.readFile(readmePath, 'utf8');
    const newRead = readme.replace(/(<!--RESULTS-->)([\s\S]*)(<!--END-RESULTS-->)/, `$1\n${md}\n$3`)
    await fs.promises.writeFile(readmePath, newRead, 'utf8');
})();

async function PromiseAllProps(object) {
    const values = await Promise.all(Object.values(object));
    Object.keys(object).forEach((key, i) => object[key] = values[i]);
    return object;
}
