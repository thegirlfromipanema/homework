document.body.onload = addRemoveButton;

var household = [];

// set validation for age
var age = document.getElementsByName("age");
var attr = {
  required: true,
  pattern: "[1-9][0-9]*"
};
for (var key in attr) {
  age[0].setAttribute(key, attr[key]);
}

// set validation for relationship
var relation = document.getElementsByName("rel");
relation[0].setAttribute("required", true);

// capture smoker's value and toggle it
var smoker = document.getElementsByName("smoker");
smoker[0].value = "No";
smoker[0].addEventListener("change", function() {
  smoker[0].value = smoker[0].checked ? "Yes" : "No";
});

// display JSON on debug class upon form submission
var form = document.querySelector("form");
form.addEventListener("submit", function(event) {
  debugDisplay();
  event.preventDefault();
})

// add new people into the growing household list
var addButton = document.querySelector(".add");
addButton.addEventListener("click", function(event) {
  // enforce the validation when add button is clicked
  checkValidation();
  household.push({
    age: age[0].value,
    relationship: relation[0].value,
    smoker: smoker[0].value
  });
  render();
  event.preventDefault();
});

// add a remove button that removes the last person from the household list
function addRemoveButton() {
  var removeButton = document.createElement("button");
  removeButton.innerHTML = "remove";
  removeButton.type = "button";

  // insert the newly created element and its content into the DOM
  var addButton = document.querySelector(".add");
  addButton.insertAdjacentElement("afterend", removeButton);

  // add the functionality to remove the last person
  removeButton.addEventListener("click", function(event) {
    household.pop();
    render();
    event.preventDefault();
  });
}

// function to display the serialized JSON in the provided "debug" DOM element
function debugDisplay() {
  let debug = document.querySelector(".debug");
  debug.style.display = 'block';
  debug.innerHTML = JSON.stringify(household, null, 2);
 }

// function to display the household list in the .household dom
function render() {
  var html = "";
  for (let i = 0; i < household.length; i++) {
    html += "<ul>" + "<li>" + " Age : " + household[i].age +
      "</li>" + "<li>" + " Relationship : " + household[i].relationship +
      "</li>" + "<li>" + " Smoker : " + household[i].smoker +
      "</li>" + "</ul>" + "<br />";
  }
  document.querySelector(".household").innerHTML = html;
}

// function to enforce age and relationship validation
function checkValidation() {
  var ageText = document.createElement("p");
  ageText.id = "validateAge";

  var relText = document.createElement("p");
  relText.id = "validateRel";

  if (!age[0].checkValidity()) {
    document.getElementById("validateAge").innerHTML = age[0].validationMessage;
  }
  if (!relation[0].checkValidity()) {
    document.getElementById("validateRel").innerHTML = relation[0].validationMessage;
  }
}
