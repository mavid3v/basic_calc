# JavaScript Calculator – Technical Documentation

---

## 📌 Overview

This project is a simple calculator using JavaScript and Object-Oriented Programming (OOP). It manages all internal state through a `Calculator` class and updates the display dynamically using the DOM.

---

## 🔧 Core Class: `Calculator`

### 🔹 Constructor
```js
constructor(displayElement)
````

Initializes internal state:

* `displayElement`: the DOM element used for output
* `currentOperand`, `previousOperand`, `operation`

---

### 🔹 Key Methods

#### `appendNumber(number)`

Adds a digit to `currentOperand`.

#### `chooseOperation(operation)`

Stores `currentOperand` as `previousOperand`, and sets the operator.

#### `compute()`

Performs the calculation and updates `currentOperand` with the result.

#### `percent()`

Converts current input to a percentage (divides by 100).

#### `deleteLast()`

Smart delete logic:

* Removes last digit from current operand
* Removes operator without touching the previous number

#### `clear()`

Resets the calculator to default state.

#### `updateDisplay()`

Rebuilds the display content using current state.

#### `evaluateManualInput(inputStr)`

Parses string typed in contenteditable area and calculates result using `eval()`.

---

## 🧠 DOM Events

### Button Binding

All buttons with `.btn` class are mapped by `data-action` or `data-number`.
Example:

```html
<button class="btn" data-action="add">+</button>
```

### Keyboard Binding

```js
document.addEventListener('keydown', (e) => { ... });
```

Supported keys:

* Numbers `0–9`
* Operators: `+`, `-`, `/`, `*`, `%`
* `Enter`: evaluates expression
* `Backspace`: clears all
* `Delete`: deletes one digit or operator

---

## 🧪 Editable Display

The `#display` element is `contenteditable`:

```html
<div id="display" contenteditable="true">0</div>
```

Users can:

* Click and type expressions
* Paste cleaned expressions (with auto-sanitization)
* Move cursor to modify any part of the expression

Paste is restricted to safe characters:

```js
text.replace(/[^0-9+\-*/%.]/g, '');
```

---

## 📦 Extending Functionality

You can easily add:

* Dark/light mode toggle with icons
* Calculation history
* Sound or animation feedback
* Scientific operations (`√`, `^`, `log`, etc.)

---

## 🔐 Notes

* Expression parsing uses `eval()` in `evaluateManualInput()`
  👉 You can replace this with a secure parser like [math.js](https://mathjs.org) for safety in production apps.

---

## 📬 Author

Muawia Rehman – Programmer and Cybersecurity Expert
Feel free to reach out or contribute.

```
