# styles-to-js-loader
Webpack loader to enables access to css styles from JavaScript

## Installation
`npm install styles-to-js-loader --save`

## Usage
In webpack config use the loader for your css files.
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

Usefull to get external CSS styles into a web component.
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