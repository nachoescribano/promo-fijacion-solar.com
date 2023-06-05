const { merge } = require("lodash");
const path = require("path");
// const filewatcherPlugin = require("filewatcher-webpack-plugin");
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WatchFileAndRunCallbackWebpackPlugin = require("watch-file-change-and-run-callback-webpack-plugin");
const { copyFileSync } = require("fs");
const { constrainedMemory } = require("process");
const { checkPrimeSync } = require("crypto");
const languanges = ["de", "en", "es", "fr", "pt", "it"];
let swiperCounter = {
  de: -1,
  en: -1,
  es: -1,
  fr: -1,
  pt: -1,
  it: -1,
};

// let langEs = require("./src/languages/es.json");
// let langEn = require("./src/languages/en.json");

// let commonsInfo = require("./src/commons.json");

// langEn = merge(commonsInfo, langEn);
// console.log(JSON.stringify(langEs));
function generateHandlerbarsPlugin(language) {
  return new HandlebarsPlugin({
    // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
    // entry: path.join(process.cwd(), "app", "src", "*.hbs"),
    entry: path.join(process.cwd(), "src", "templates", "*.hbs"),

    // output path and filename(s). This should lie within the webpacks output-folder
    // if ommited, the input filepath stripped of its extension will be used
    output: path.join(process.cwd(), "dist", `[name]-${language}.html`),
    // you can also add a [path] variable, which will emit the files with their relative path, like
    // output: path.join(process.cwd(), "build", [path], "[name].html"),

    // data passed to main hbs template: `main-template(data)`
    // data: require("./src/languages/es.json"),
    // or add it as filepath to rebuild data on change using webpack-dev-server
    data: path.join(__dirname, `src/languages/${language}.json`),
    // data: merge(commonsInfo, langEs),
    // globbed path to partials, where folder/filename is unique
    partials: [
      path.join(process.cwd(), "src", "partial-templates", "*", "*.hbs"),
    ],

    // register custom helpers. May be either a function or a glob-pattern
    // helpers: {
    //   nameOfHbsHelper: Function.prototype,
    //   projectHelpers: path.join(
    //     process.cwd(),
    //     "app",
    //     "helpers",
    //     "*.helper.js"
    //   ),
    // },
    helpers: {
      for: function (from, to, incr, block) {
        var accum = "";
        for (var i = from; i < to; i += incr) accum += block.fn(i);
        return accum;
      },
      math: function (lvalue, operator, rvalue, options) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);

        return {
          "+": lvalue + rvalue,
          "-": lvalue - rvalue,
          "*": lvalue * rvalue,
          "/": lvalue / rvalue,
          "%": lvalue % rvalue,
        }[operator];
      },
      ifEven: function (value) {
        return value % 2 === 0;
      },
      sumValues: function (value1, value2) {
        return value1 + value2;
      },
      convertObjectToString(object, option) {
        if (object) {
          return JSON.stringify(object);
        }
        return null;
      },
      replaceKey(key, text, value, option) {
        return text.replace(`{${key}}`, value);
      },
      initSwiperCounter(option) {
        swiperCounter[language] = -1;
      },
      swiperCounter(option) {
        swiperCounter[language] += 1;
        return swiperCounter[language];
      },

      getContentOfItemKey(index, array, key, option) {
        if (array[parseInt(index) - 1]) {
          return array[parseInt(index) - 1][key];
        }
        return null;
      },
      getContentOf(key, object, option) {
        if (object[key]) {
          return object[key];
        }
        return null;
      },
      ifEqual: function (v1, v2, options) {
        if (v1 === v2) {
          return options.fn(this);
        }
        return options.inverse(this);
      },
      ifFirst: function (v1, options) {
        if (v1 === 0) {
          return options.fn(this);
        }
        return options.inverse(this);
      },
      ifFirstFirst: function (v1, v2, options) {
        if (v1 === 0 && v2 === 0) {
          return options.fn(this);
        }
        return options.inverse(this);
      },
      ifMultipleOf: function (v1, v2, options) {
        if (v1 % v2 === 0) {
          return options.fn(this);
        }
        return options.inverse(this);
      },
      ifMultipleOfAndMore1: function (v1, v2, options) {
        const realV1 = v1 + 1;
        if (realV1 % v2 === 0 && realV1 > 1) {
          return options.fn(this);
        }
        return options.inverse(this);
      },

      ifTotalItemsMultipleOfAndMore1: function (v1, v2, options) {
        if (v1 && v2 && v1.length % v2 === 0 && v1.length > 0) {
          return options.fn(this);
        }
        return options.inverse(this);
      },

      ifLeftLessThan50: function (v1, options) {
        if (parseFloat(v1.split(";")[0].split(":")[1]) < 50) {
          return options.fn(this);
        }
        return options.inverse(this);
      },
      ifCond: function (v1, v2, options) {
        if (v1 === v2) {
          return options.fn(this);
        }
        return options.inverse(this);
      },
      ifExists: function (v1, options) {
        if (typeof v1 !== "undefined") {
          return options.inverse(this);
        }
        return options.fn(this);
      },
    },

    // hooks
    // getTargetFilepath: function (filepath, outputTemplate) {},
    // getPartialId: function (filePath) {}
    // onBeforeSetup: function (Handlebars) {},
    // onBeforeAddPartials: function (Handlebars, partialsMap) {},
    // onBeforeCompile: function (Handlebars, templateContent) {},
    // onBeforeRender: function (Handlebars, data, filename) {},
    // onBeforeSave: function (Handlebars, resultHtml, filename) {},
    // onDone: function (Handlebars, filename) {}
  });
}
const languangesPlugins = languanges.map((languange) =>
  generateHandlerbarsPlugin(languange)
);
new WatchFileAndRunCallbackWebpackPlugin({
  matchs: [
    {
      filePath: `./src/languages/es.json`,
      callback: () => console.log("LANG ES CHANGE"),
    },
    // {
    //   filePath: `${SRC_DIR}/styles/2.less`,
    //   callback: () => console.log("2"),
    // },
  ],
});

module.exports = {
  // mode: "development",
  // module: {
  //   rules: [
  //     {
  //       test: /\.html$/i,
  //       loader: "html-loader",
  //       options: {
  //         attributes: false,
  //       },
  //     },
  //   ],
  // },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    // compress: true,
    port: 9000,
  },
  watchOptions: {
    ignored: /node_modules/,
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(process.cwd(), "assets"),
          to: path.join(process.cwd(), "dist", "assets"),
        },
        {
          from: path.join(process.cwd(), "php"),
          to: path.join(process.cwd(), "dist"),
        },
      ],
    }),
    ...languangesPlugins,
    // new filewatcherPlugin({
    //   watchFileRegex: ["/src/languages/es.json"],
    //   onReadyCallback: () => console.log("Yo Im ready"),
    //   usePolling: false,
    //   ignored: "/node_modules/",
    // }),
  ],
};
