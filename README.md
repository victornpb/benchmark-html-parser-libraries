# Benchmark HTML Parser Libraries
A Benchmark of javascript libraries for parsing HTML (CPU/RAM)
  

# Results

[List of result](./results)

<!--RESULTS-->
Date: `2021-01-18T02:11:10.739Z`

|         Library          |    ms/file (Mean)     | Module Startup  | RAM usage/file (Mean)  |   Max   | Baseline  | Lib Overhead  |  Final  |
|--------------------------|-----------------------|-----------------|------------------------|---------|-----------|---------------|---------|
| html-dom-parser.js       |  33.2033ms ±13.8262ms |       6.91519ms |         47.7mb ±3.84mb |  52.6mb |    26.9mb |       0.528mb |  51.1mb |
| html-parser.js           |  26.8357ms ±19.2313ms |       1.32041ms |         64.2mb ±10.6mb |  72.5mb |    27.1mb |      0.0451mb |  71.9mb |
| html5.js                 |  105.922ms ±132.487ms |       20.3751ms |         74.7mb ±5.64mb |  78.7mb |    27.2mb |        2.46mb |  77.5mb |
| html5parser.js           |  2.73461ms ±2.98759ms |       3.96024ms |         52.9mb ±5.31mb |  60.3mb |    27.1mb |       0.217mb |  55.0mb |
| htmlparser.js            |  25.6437ms ±134.514ms |       1.39437ms |         52.1mb ±5.75mb |  57.0mb |    27.2mb |      0.0614mb |  56.1mb |
| htmlparser2-dom.js       |  32.2644ms ±13.3380ms |       20.0872ms |         50.2mb ±3.72mb |  53.1mb |    26.7mb |        2.09mb |  52.3mb |
| htmlparser2.js           |  28.6575ms ±12.2881ms |       21.0901ms |         46.8mb ±2.99mb |  49.6mb |    27.6mb |        2.17mb |  48.8mb |
| jsdom-fragment.js        |  115.795ms ±51.9257ms |       460.669ms |          106mb ±5.84mb |   132mb |    26.6mb |        40.3mb |   106mb |
| jsdom-node-locations.js  |  116.234ms ±52.4790ms |       468.767ms |          107mb ±5.91mb |   132mb |    27.3mb |        38.5mb |   105mb |
| jsdom.js                 |  140.728ms ±57.9824ms |       474.715ms |          114mb ±6.83mb |   137mb |    26.9mb |        39.1mb |   114mb |
| libxmljs.js              |  4.33489ms ±2.87268ms |       5.71935ms |         42.5mb ±3.25mb |  47.6mb |    27.0mb |       0.381mb |  45.2mb |
| neutron-html5parser.js   |  3.75264ms ±2.23807ms |       1.23059ms |         48.8mb ±7.00mb |  54.8mb |    27.4mb |      0.0532mb |  53.9mb |
| parse5-fragment.js       |  35.3542ms ±12.5957ms |       14.8845ms |         59.9mb ±6.65mb |  72.4mb |    27.2mb |        1.32mb |  60.6mb |
| parse5.js                |  35.5855ms ±12.9262ms |       14.2463ms |         61.5mb ±7.81mb |  73.3mb |    26.8mb |        1.30mb |  63.8mb |
| sax.js                   |  71.9269ms ±33.4140ms |       2.01226ms |         69.9mb ±7.17mb |  75.2mb |    26.9mb |       0.127mb |  74.2mb |

----

#### Device summary

> Node: `14.15.1` V8: `8.4.371.19-node.17` NPM: `6.14.8`
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
