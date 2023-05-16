# watch-file-change-and-run-callback-webpack-plugin

[![version][npm-img]][npm-url]
[![license][mit-img]][mit-url]
[![size][size-img]][size-url]
[![download][download-img]][download-url]

🚧 WIP Project

Compatible with Webpack `5` & `4`.


## Installation

```sh
yarn add watch-file-change-and-run-callback-webpack-plugin
```


## Usage

```js
new WatchFileAndRunCallbackWebpackPlugin({
  matchs: [
    {
      filePath: `${SRC_DIR}/styles/1.less`,
      callback: () => console.log('1'),
    },
    {
      filePath: `${SRC_DIR}/styles/2.less`,
      callback: () => console.log('2'),
    },
  ],
})
```


## License

MIT © [Jason Feng][author-url]

<!-- badges -->

[author-url]: https://github.com/SolidZORO


[mit-img]: https://img.shields.io/npm/l/watch-file-change-and-run-callback-webpack-plugin.svg?style=flat&colorA=000000&colorB=000000

[mit-url]: ./LICENSE


[npm-img]: https://img.shields.io/npm/v/watch-file-change-and-run-callback-webpack-plugin?style=flat&colorA=000000&colorB=000000

[npm-url]: https://www.npmjs.com/package/watch-file-change-and-run-callback-webpack-plugin


[size-img]: https://img.shields.io/bundlephobia/minzip/watch-file-change-and-run-callback-webpack-plugin?label=bundle&style=flat&colorA=000000&colorB=000000

[size-url]: https://www.npmjs.com/package/watch-file-change-and-run-callback-webpack-plugin


[download-img]: https://img.shields.io/npm/dt/watch-file-change-and-run-callback-webpack-plugin.svg?style=flat&colorA=000000&colorB=000000

[download-url]: https://www.npmjs.com/package/watch-file-change-and-run-callback-webpack-plugin


[build-img]: https://github.com/SolidZORO/watch-file-change-and-run-callback-webpack-plugin/workflows/badge.svg

[build-url]: https://github.com/SolidZORO/watch-file-change-and-run-callback-webpack-plugin/actions
