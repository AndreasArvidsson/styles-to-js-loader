const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (env, argv) => {

    console.debug("----------------------------")
    console.debug(" ", argv.bundle, " | ", argv.mode);
    console.debug("----------------------------\n")

    const res = {
        entry: "REPLACE",
        output: {
            path: path.resolve(__dirname, "dist")
        },
        externals: {
            path: "path",
            "loader-utils": "loaderUtils"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ["@babel/preset-env"],
                            }
                        },
                        {
                            loader: "eslint-loader",
                            options: {
                                configFile: "./eslintrc.js"
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        path.resolve(__dirname, "src/index.js"),
                        "css-loader"
                    ]
                },
                {
                    test: /\.html$/,
                    loader: "html-loader"
                }
            ]
        },
        plugins: []
    };

    if (argv.bundle === "dist") {
        res.entry = {
            "styles-to-js-loader": path.resolve(__dirname, "src/index.js"),
            "styles": path.resolve(__dirname, "src/styles.js"),
        };
        res.output.filename = argv.mode === "production"
            ? "[name].min.js"
            : "[name].js"
        res.output.libraryTarget = "umd";
        res.devtool = "source-map";
    }
    else {
        res.entry = path.resolve(__dirname, "test/test.js");
        res.plugins.push(
            new HtmlWebPackPlugin({
                template: "test/test.html"
            })
        );
    }

    return res;
};