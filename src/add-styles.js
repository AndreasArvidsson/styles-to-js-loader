const field = "_jsStylesLoaderCustomStyles";
if (!window[field]) {
    window[field] = [];
}
const list = window[field];

module.exports = function (name, styles) {
    if (typeof styles === "string") {
        styles = [["", styles, ""]];
    }
    else if (styles.__esModule) {
        styles = styles.default;
    }
    for (let i = 0; i < styles.length; ++i) {
        list.push({
            name: name,
            content: styles[i][1]
        });
    }
};