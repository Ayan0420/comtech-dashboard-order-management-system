console.log(document);

// querySelector() is a method that can be used to select a scpecific element from our document.
console.log(document.querySelector("#txt-first-name"));

/**
 * Alternative methods we can use aside form querySelector() in retrieving elements.
 * document.getElementById("txt-first-name");
 * document.getElementByClassName();
 * document.getElementByTagName();
 */

//document.getElementById() - access an element similar to querySelector()
console.log(document.getElementById("txt-first-name"));

//document.getElementsByClassName("") - method return a collection of elements with a specified className/s.
//Also it returns an HTMLCollection and the property is read-only.
console.log(document.getElementsByClassName("txt-inputs"));


//document.getElementsByTagName("") - method return a collection of elements with a specified tagName/s.
//Also it returns an HTMLCollection and the property is read-only.
console.log(document.getElementsByTagName("input"));


const txtFirstName = document.querySelector('#txt-first-name');
const spanFullName = document.querySelector('#span-full-name');
console.log(txtFirstName);
console.log(spanFullName);

/**
 * Event: click, hover, keypress. keyup and others.
 * 
 * Event Listeners: 
 *      Allows us to let our users interact with our page. Each click or with each hover, there is an event which can trigger a function/task.
 * 
 * Syntax:
 *      selectedElement.addEventListener('event', function)
 */

//".innerHTML" - is a property of an element which considers all the children of the selected element as a string.
//".value" - the value contained in the selected element

// txtFirstName.addEventListener('keyup', (event) => {
//     spanFullName.innerHTML = txtFirstName.value
// })


/**
 * The "event" argument/parameter contains the information of the triggered event.
 * 
 * The "event.target" contains the element where the event happend.
 * 
 * The "event.target.value" gets the value of the input object (similar to the txtFirstName)
 */
txtFirstName.addEventListener('keyup', (event) => {
    console.log(event);
    console.log(event.target);
    console.log(event.target.value);
});

// Another way to write the code for event listener:
txtFirstName.addEventListener('keyup', printFirstName);

function printFirstName(event){
    spanFullName.innerHTML = txt.txtFirstName.value
};

const labelFirstName = document.querySelector("#label-first-name");
console.log(labelFirstName);

labelFirstName.addEventListener("click", (e) => {
    console.log(e)
    alert("You clicked the first name label.")
});



