"use strict";
/*
* Restrictions
* ---
* In order to develop a standard for all modern websites,
* We do not take into account positive tabindex (which should be focusable).
* Avoid using tabindex with positive number.
*/
/**
 * @class Defines what's a focusable element.
 */
class FocusableElement {
    constructor() {
        /**
         * The list of the default focusable elements.
         * @type {Array<string>}
         */
        this.defaultFocusableHTMLElements = [
            "a",
            "button",
            "input",
            "textarea",
            "select",
            "summary" // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
        ];
        /**
         * The query selector of the focusable elements.
         * @type {string}
         */
        this.focusableQuerySelector = this.defaultFocusableHTMLElements.join(",") + ",[tabindex='0']";
        /**
         * The rules that must be respected by an element in order to be focusable.
         * Each rule needs to return `true` in order for the element to be considered as focusable.
         * @type {Array<Function>}
         */
        this.RULES = [
            (el) => (!this.hasStyle(el, "display", "none")),
            (el) => (!this.hasStyle(el, "visibility", "hidden")),
            (el) => (!el.hasAttribute("disabled")),
            (el) => (!el.hasAttribute("hidden")),
            (el) => (el.tagName == "input" ? el.type != "hidden" : true)
        ];
    }
    /**
     * Checks if an element has a specific CSS property and a specific value for this property.
     * @param {HTMLElement} el The HTML Element.
     * @param {string} property The name of the CSS property.
     * @param {string} value The value of the CSS property.
     * @returns {boolean} True if the element has this property & this value for this CSS property.
     */
    hasStyle(el, property, value) {
        const computed = window.getComputedStyle(el); // we must check in both CSS declaration & style attribute.
        return el.style[property] == value || computed.getPropertyValue(property) == value;
    }
    /**
     * Checks if an element is focusable.
     * @param {HTMLElement} el The HTML Element.
     * @returns {boolean} True if the element is focusable.
     */
    isFocusable(el) {
        for (let rule of this.RULES) {
            if (rule(el) === false) {
                return false;
            }
        }
        return true;
    }
    /**
     * Gets all the focusable elements.
     * @param {HTMLElement} parent The parent element. By default `document.body`.
     * @returns {Array<HTMLElement>} All the focusable children of an element.
     */
    getKeyboardFocusableElements(parent = document.body) {
        const children = Array.from(parent.querySelectorAll(this.focusableQuerySelector));
        return children.filter(el => this.isFocusable(el));
    }
}
window.FocusableElement = new FocusableElement();
