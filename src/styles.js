const field = "_jsStylesLoaderCustomStyles";

if (!window[field]) {
    window[field] = {
        list: [],
        map: {}
    };
}

const obj = window[field];

export default {

    add: function (name, styles) {
        if (typeof styles === "string") {
            styles = [["", styles, ""]];
        }
        else if (styles.__esModule) {
            styles = styles.default;
        }
        for (let i = 0; i < styles.length; ++i) {
            obj.list.push(styles[i][1])
            obj.map[name] = styles[i][1];
        }
    },

    get: function () {
        const style = document.createElement("style");
        style.innerHTML = obj.list.join("\n");
        return style;
    },

    find: function (name, callback) {
        for (let i in obj.map) {
            if (i.indexOf(name) > -1) {
                const style = document.createElement("style");
                style.innerHTML = callback ? callback(obj.map[i]) : obj.map[i];
                return style;
            }
        }
        return null;
    }

};