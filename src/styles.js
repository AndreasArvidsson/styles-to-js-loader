const field = "_jsStylesLoaderCustomStyles";
if (!window[field]) {
    window[field] = [];
}
const list = window[field];

export default {

    get: function () {
        const style = document.createElement("style");
        style.innerHTML = list.map(s => s.content).join("\n");
        return style;
    },

    find: function (name, callback) {
        const f = list.find(s => s.name.includes(name));
        if (f) {
            const style = document.createElement("style");
            style.innerHTML = callback ? callback(f.content) : f.content;
            return style;
        }
        return null;
    }

};