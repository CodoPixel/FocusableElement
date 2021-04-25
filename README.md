# FocusableElement

A JavaScript class that defines what's a focusable element. This program aims to simplify the rules of the digital accessibility recommendations about the keyboard navigation.

This is an independent project whose sources are my own personal knowledge and tests, at least for the moment. Therefore, if you think you can improve the project, then don't hesitate! For that, add an [issue](https://github.com/CodoPixel/FocusableElement/issues) or fork.

## What is a focusable element

We consider a focusable element as an interactive element which can get focus with the `Tab` key & be clickable with a key like `Enter` or `Space`.

## The default focusable elements

The default focusable elements of HTML are:

* `<a>`
* `<button>`
* `<input>`
* `<textarea>`
* `<select>`
* `<summary>`

Every clickable HTML element should be one of this tag in order to simplify the keyboard navigation.

Indeed, if you use a `<div>` instead of a `<button>` in which you attach an onclick event, then this event won't be triggered with the `Enter` key, contrary to a `<button>`.

Each tag is there for a specific purpose, and should be used correctly.

However, it's possible to give the focus to any other HTML element with an attribute: `tabindex`.

## tabindex

This attribute allows normal HTML elements to be focusable (or not). Nevertheless, this should not be used in parallel with a click event.

```html
<div tabindex="0">
    This div is focusable.
</div>
```

**Do not use a positive number**

Also, for an element to lose the ability to get the focus, do:

```html
<button tabindex="-1">
    I'm not focusable
</button>
```

... but it's still clickable, so not the best thing. For a button, use `disabled` to deactivate its normal behavior.

## Unfocusable elements

An element is unfocusable if it has:

* the attribute `tabindex='-1'`
* the attribute `disabled`
* the attribute `hidden`
* the attribute `type='hidden'` (only for `<input>`)
* the CSS property `display: none;`
* the CSS property `visibility: hidden;`

## License

MIT License.