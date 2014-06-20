/*
 * This populates the options form with as many
 * text input fields as the user indicates in the 
 * number input field.
 */
function showOptions() {
  var options = document.getElementById("options");
  var numOptions = document.getElementById("numOptions").value;

  // clear form
  while (options.hasChildNodes()) {
    options.removeChild(options.lastChild);
  }
  // add option entry fields to form
  for (var i = 0; i < numOptions; i++) {
    var label = document.createElement("label");
    var textField = document.createElement("input");
    label.innerHTML = "".concat("Option ", i+1, ": ");
    textField.setAttribute("type", "text");    
    options.appendChild(label);
    options.appendChild(textField);
    options.appendChild(document.createElement("br"));
  }

  // show "Make Decision" button
  document.getElementById("makeDecision").style.display = "inline";
}

/*
 * This randomly selects one of the options that the user 
 * has entered and displays it at the bottom of the page.
 */
function makeDecision() {
  var options = document.getElementById("options");
  var numOptions = document.getElementById("numOptions").value;
  var choice = 0;
  var answer = "";
  
  // calculate answer
  choice = Math.floor( Math.random() * ++numOptions );
  answer = options.elements[choice].value;

  document.getElementById("answer").innerHTML = answer;
}
