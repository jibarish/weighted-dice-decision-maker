/*
 * This populates the options form with as many input rows as the user indicates
 * in the number input field.  Each input row consists of a label displaying the
 * option number, a text field for a description of the option, a slider
 * to indicate preference level expressed as a percentage, and a label to hold
 * the value of the slider.
 */
function showOptions() {
  var options = document.getElementById("options");
  var numOptions = document.getElementById("numOptions").value;
  var defaultSliderValue = 50;  // sliders default to 50%

  // make sure input is a number
  if (isNaN(parseInt(numOptions))) {
    alert("You must enter a number.")
    return;
  }

  // clear answer
  document.getElementById("answer").innerHTML = "";
  // clear form
  while (options.hasChildNodes()) {
    options.removeChild(options.lastChild);
  }

  // add input rows to form
  for (var i = 0; i < numOptions; i++) {
  // build an input row
    // create row elements
    var label = document.createElement("label");
    var textField = document.createElement("input");
    var slider = document.createElement("input");
    var sliderVal = document.createElement("span");
    var blank = document.createElement("span");
    if (i < 9) { // format for alignment
      label.innerHTML = "".concat("&nbsp; Option ", i+1, ": ");  
    } else {
      label.innerHTML = "".concat("Option ", i+1, ": ");  
    }
    // set attributes of row elements
    textField.setAttribute("type", "text");
    textField.setAttribute("onkeypress", 
                           "return handleKeyPressTxtField(event)");
    slider.setAttribute("type", "range");
    slider.setAttribute("id", "".concat("s", i));
    slider.setAttribute("min", "0");
    slider.setAttribute("max", "100");
    slider.setAttribute("value", defaultSliderValue);
    slider.setAttribute("step", "1");
    slider.setAttribute("oninput", "adjustSliders(this.value, this.id)");
    sliderVal.setAttribute("id", "".concat("sl", i));
    sliderVal.innerHTML = "".concat("&nbsp;", "&nbsp;", 
                                    defaultSliderValue.toFixed(0), "%");
    blank.innerHTML = "&nbsp;";
    // add row to form one element at a time
    options.appendChild(label);
    options.appendChild(textField);
    options.appendChild(blank);
    options.appendChild(slider);
    options.appendChild(sliderVal);
    options.appendChild(document.createElement("br"));
  }

  // show "Make Decision" button
  document.getElementById("makeDecision").style.display = "inline";
}

/*
 * This calculates the relative weights of the options by taking each as a
 * percentage of the sum weight of all the sliders.  It then assigns each option
 * a subset of [0, 1) equal in size to its percentage, generates a random number
 * in [0, 1) and chooses the option in whose range the number falls.  The
 * corresponding option description is displayed at the bottom of the page.
 */
function makeDecision() {
  var options = document.getElementById("options");
  var numOptions = document.getElementById("numOptions").value;
  var choice = -1;  // bad value
  var answer = "";

  // calculate total weight
  var sum = 0;
  for (var i = 0; i < numOptions; i++) {
    sum += parseInt(document.getElementById("".concat("s", i)).value);
  }
  // calculate option weights as percentages of total
  var weights = [];
  for (var i = 0; i < numOptions; i++) {
    weights.push(parseInt(document.getElementById("".concat("s", 
                                                  i)).value) / parseFloat(sum));
  }
  // generate random number in range: [0, 1)
  var random = Math.random();
  // find which relative weight range the random number falls in
  var runningTotal = 0;
  for (var i = 0; i < numOptions; i++) {
    runningTotal += weights[i];
    if (random <= runningTotal) {
      choice = i;
      break;
    }
  }
  
  // map to answer (option description)
  answer = options.elements[parseInt(choice*2)].value;  // even fields are text
  // display answer                                              
  document.getElementById("answer").innerHTML = answer;
}

/*
 * This updates a slider's label as its value changes.
 */
function adjustSliders(currVal, currId) {
  var sliderValId = "".concat("sl", currId.slice(1));
  if (currVal < 10) { // format for alignment
    document.getElementById(sliderValId).innerHTML = "".concat("&nbsp;", 
               "&nbsp;", "&nbsp;", "&nbsp;", parseInt(currVal).toFixed(0), "%");
  } else if (currVal == 100) {
      document.getElementById(sliderValId).innerHTML = "".concat(
                                             parseInt(currVal).toFixed(0), "%");
  } else {
      document.getElementById(sliderValId).innerHTML = "".concat("&nbsp;", 
                                   "&nbsp;", parseInt(currVal).toFixed(0), "%");
  }
}

// handle key press in number entry field
function handleKeyPressNumField(event) {
        // if <Enter> call showOptions()
        if (event.which == 13 || event.keyCode == 13) {
            showOptions();
            return false;
        }
        return true;
    };

// handle key press in text entry field
function handleKeyPressTxtField(event) {
      // if <Enter> call makeDecision()
      if (event.which == 13 || event.keyCode == 13) {
          makeDecision()
          return false;
      }
      return true;
  };
