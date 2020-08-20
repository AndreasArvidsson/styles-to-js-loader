const path = require("path");
const loaderUtils = require("loader-utils");
const dirPaths = __dirname.split("/");

const loader = () => { };

loader.pitch = request => {
    const styles = loaderUtils.stringifyRequest(
        this,
        `!${path.join(__dirname, "./styles.js")}`
    );
    const content = loaderUtils.stringifyRequest(
        this,
        `!!${request}`
    );
    const name = getName(request);
    return `require(${styles}).default.add("${name}", require(${content}));`;
};

module.exports = loader;

function getName(request) {
    //Remove loader info. After ! is the file path.
    request = request.substring(request.lastIndexOf("!") + 1);
    //Remove common parent dirs.
    const paths = request.split("/");
    let i = 0;
    while (dirPaths[i] === paths[i]) {
        ++i;
    }
    return paths.slice(i).join("/");
}