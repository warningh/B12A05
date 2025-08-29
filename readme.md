1. What is the difference between *getElementById, getElementsByClassName, and querySelector / querySelectorAll*?

ANSWER:

1. getElementById → 1 element by ID

2. getElementsByClassName → multiple elements (live HTMLCollection)

3. querySelector → 1 element by CSS selector

4. querySelectorAll → multiple elements (static NodeList)





2. How do you *create and insert a new element into the DOM*?
ANSWER:
1. appendChild() → adds inside at the end.

2. prepend() → adds inside at the beginning.

3. before() / after() → insert before or after an element.

4. replaceWith() → replace an element.





3. What is *Event Bubbling* and how does it work?
ANSWER:
HTML
<div id="parent">
  <button id="child">Click Me</button>
</div>







4. What is *Event Delegation* in JavaScript? Why is it useful?

ANSWER:


JS
document.getElementById("parent").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    console.log("Button clicked:", e.target.textContent);
  }
});





5. What is the difference between *preventDefault() and stopPropagation()* methods?

ANSWER:

1. preventDefault() → stops default browser behavior.

2. stopPropagation() → stops event bubbling to parents.