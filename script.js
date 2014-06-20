/*
 * This populates the options form with as many
 * text input fields as the user indicates in the 
 * number input field.
 */
function showOptions() {
  var options = document.getElementById("options");
  var numOptions = document.getElementById("numOptions").value;
  var defaultSliderValue = 100.0 / numOptions

  // clear answer
  document.getElementById("answer").innerHTML = "";
  // clear form
  while (options.hasChildNodes()) {
    options.removeChild(options.lastChild);
  }
  // add option entry fields to form
  for (var i = 0; i < numOptions; i++) {
    var label = document.createElement("label");
    var textField = document.createElement("input");
    var slider = document.createElement("input");
    var sliderVal = document.createElement("span");
    // format label for alignment
    if (i < 9) {
      label.innerHTML = "".concat("&nbsp; Option ", i+1, ": ");  
    } else {
      label.innerHTML = "".concat("Option ", i+1, ": ");  
    }
    textField.setAttribute("type", "text");
    slider.setAttribute("type", "range");
    slider.setAttribute("min", "0");
    slider.setAttribute("max", "100");
    slider.setAttribute("value", defaultSliderValue);
    slider.setAttribute("oninput", defaultSliderValue);
    sliderVal.innerHTML = "".concat("&nbsp;", defaultSliderValue.toFixed(2), "%");
    options.appendChild(label);
    options.appendChild(textField);
    options.appendChild(slider);
    options.appendChild(sliderVal);

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
  choice = Math.floor( Math.random() * numOptions );
  answer = options.elements[parseInt(choice*2)].value;  // even fields are text
  // display answer                                              
  document.getElementById("answer").innerHTML = answer;
}

function adjustSliders() {
  // TBD
}
