import "./styles.css";
import "./styles2.css";
import styles from "../src/styles";

class WC extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "closed" });

        shadow.appendChild(styles.get());

        const template = document.createElement("div");
        template.innerHTML = `
        <h1>Inside WC</h1>
        <div>Inside shadow</div>`;
        shadow.appendChild(template);
    }
}

window.customElements.define("wc-test", WC);

console.log("test.js");