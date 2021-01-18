# Benchmark HTML Parser Libraries
  Benchmark speed and RAM memory usage with real-life data
  

# Results

[List of result](./results)

<!--RESULTS-->
Date: `2021-01-18T01:06:51.486Z`

|         Library          |    ms/file (Mean)     | Module Startup  | RAM usage/file (Mean)  |       Min       |   Max   | Baseline  | Lib Overhead  |  Final  |
|——————————————————————————|———————————————————————|—————————————————|————————————————————————|—————————————————|—————————|———————————|———————————————|—————————|
| html-dom-parser.js       |  3.66293ms ±5.18961ms |       15.0504ms |                54.3mb  |  28.2mb ±5.28mb |  59.6mb |    26.1mb |        1.52mb |  59.0mb |
| html-parser.js           |  28.3092ms ±22.5138ms |       2.95917ms |                69.5mb  |  26.5mb ±11.1mb |  80.1mb |    25.7mb |       0.193mb |  78.6mb |
| html5.js                 |  107.381ms ±132.051ms |       28.7570ms |                86.0mb  |  29.9mb ±7.93mb |  94.8mb |    25.8mb |        3.56mb |  93.2mb |
| html5parser.js           |  2.59449ms ±2.97799ms |       5.39778ms |                69.8mb  |  27.3mb ±12.6mb |  80.4mb |    26.1mb |       0.688mb |  79.9mb |
| htmlparser.js            |  20.7506ms ±144.822ms |       2.79478ms |                67.0mb  |  26.8mb ±11.0mb |  77.4mb |    26.1mb |       0.143mb |  76.0mb |
| htmlparser2-dom.js       |  3.71553ms ±4.93791ms |       33.6729ms |                53.9mb  |  30.5mb ±5.29mb |  59.3mb |    25.9mb |        3.14mb |  58.5mb |
| htmlparser2.js           |  3.02205ms ±4.51494ms |       21.2533ms |                47.5mb  |  30.1mb ±2.97mb |  51.0mb |    25.9mb |        2.80mb |  47.7mb |
| jsdom-fragment.js        |  63.1727ms ±40.0527ms |       660.306ms |                 165mb  |  69.4mb ±18.5mb |   206mb |    26.1mb |        42.8mb |   169mb |
| jsdom-node-locations.js  |  62.4164ms ±40.0318ms |       503.559ms |                 164mb  |  68.2mb ±18.5mb |   206mb |    25.7mb |        42.0mb |   172mb |
| jsdom.js                 |  79.1646ms ±43.9830ms |       507.817ms |                 283mb  |   68.9mb ±115mb |   636mb |    25.8mb |        42.6mb |   636mb |
| libxmljs.js              |  4.86515ms ±4.45646ms |       11.3490ms |                57.6mb  |  27.5mb ±8.97mb |  74.5mb |    26.0mb |       0.901mb |  66.3mb |
| neutron-html5parser.js   |  2.78104ms ±1.58225ms |       2.61285ms |                50.2mb  |  26.8mb ±6.66mb |  57.2mb |    26.1mb |       0.123mb |  57.2mb |
| parse5-fragment.js       |  10.0359ms ±6.90621ms |       28.5133ms |                80.1mb  |  28.9mb ±9.54mb |  88.3mb |    25.8mb |        2.57mb |  81.4mb |
| parse5.js                |  9.63089ms ±6.75268ms |       17.7584ms |                82.6mb  |  28.9mb ±11.2mb |  92.0mb |    25.9mb |        2.48mb |  91.5mb |
| sax.js                   |  11.1202ms ±12.5577ms |       3.79250ms |                75.0mb  |  26.6mb ±12.4mb |  89.2mb |    25.7mb |       0.254mb |  88.9mb |

----
#### Device summary
> Node: 14.15.1 V8: 8.4.371.19-node.17 NPM: 6.14.8
> OS: Mac OS X macOS Catalina 10.15.7 darwin x64 19.6.0
> Device: Apple Inc. MacBookPro15,1 | CPU Intel® Core™ i7-8750H 2.20GHz 6C/12T | RAM 16 GB | GPU Intel Intel UHD Graphics 630  Built-In 1536 MB / AMD Radeon Pro 555X  PCIe 4096 MB

<!--END-RESULTS-->

----

# Running the benchmark

1. Clone the repository
2. Run:
	```sh
	npm install
	npm start
	```

## Attribution

Original HTML files from [@AndreasMadsen](https://github.com/AndreasMadsen/htmlparser-benchmark)