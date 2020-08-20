# styles-to-js-loader
Webpack loader to enables access to external styles from JavaScript

## Installation
`npm install styles-to-js-loader --save`

## Usage
In webpack config use the loader for your css/style files.
```js
 {
    rules: [
        {
            test: /\.css$/,
            use: [
                "styles-to-js-loader",
                "css-loader"
            ]
        }
    ]
}
```

Access styles in JavaScript.
```js
import styles from "styles-to-js-loader/styles";
styles.get() => <style>
```

Usefull to get external styles into a web component.
```js
import "./styles.css";
import styles from "styles-to-js-loader/styles";

class WC extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "closed" });
        shadow.appendChild(styles.get());
    }
}
```

### styles.find function
While `styles.get()` returns a style tag with all the styles for every imported style file the `styles.find()` function tries to find a single files content by its imported name. 
```js
styles.get(name: string, callback: function) => <style>
```

In the example below we fetch only the `owp.glyphicons` styles and then extract the font face to add to the header.
```js
//Add glyphicons fonts to header or else they wont be loaded.
document.head.appendChild(styles.find("owp.glyphicons", content => {
    const i = content.indexOf("@font-face");
    const i2 = content.indexOf("}", i) + 1;
    return content.substring(i, i2);
}));
```

