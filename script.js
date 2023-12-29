// VARIABLES: 
var cssRgb = document.querySelector("h3"); 						//show rgb
var cssHex = document.querySelector("h4"); 						//show hexcode
var cssHsl = document.querySelector("h5"); 						//show hsl
var color1 = document.querySelector(".color1"); 				//colorinput left
var color2 = document.querySelector(".color2"); 				//colorinput right
var body = document.getElementById("gradient"); 				//body
var random1 = document.querySelector(".r1")						//random btn left
var random2 = document.querySelector(".r2")						//random btn right
var complimentaryBtn = document.querySelector(".complimantary") //complimantary color btn
var contrastingBtn = document.querySelector(".contrasted")		//contrasted color btn


// FUNCTIONS:


function source = document.querySelector("div.source");

source.addEventListener("copy", (event) => {
  const selection = document.getSelection();
  event.clipboardData.setData("text/plain", selection.toString().toUpperCase());
  event.preventDefault();
});


function copyToClipboard(element) {
    element.event.target = copy
}


	// Updates the background color based on color input elements

function setGradient() {
			body.style.background = "linear-gradient(to right, " 
			+ color1.value 
			+ ", " 
			+ color2.value 
			+ ")";

			//h3 element receives rgb color code for gradient. For users to copy.
			cssRgb.textContent = body.style.background + ";";
			cssHex.textContent = body.style.background + ";";
			cssHsl.textContent = body.style.background + ";";
}


	// Generate random hex code for color input

function generateRandomHex(colorInput) {

		var hexCode = "#";
  		var hexValues = "0123456789abcdef";

  		for (var i = 0; i < 6; i++) {
    			hexCode += hexValues[(Math.floor(Math.random() * hexValues.length))];
  		}

  		// Show hexcode in console. For easy Debugging.
    	console.log(hexCode);


        // Set the value of the provided color input
  		return hexCode;
}


	// Adjust in realtime the background color

color1.addEventListener("input", setGradient);

color2.addEventListener("input", setGradient);

	
	// Randomly generates new colors for background

random1.addEventListener("click", function() {
  // Generate a random hex color for color1
  var randomColor1 = generateRandomHex(color1);


  // Set the value of color1 and update the background gradient

  color1.value = randomColor1;
	setGradient();


});
	
random2.addEventListener("click", function() {
	// Generate a random hex color for color2
  var randomColor2 = generateRandomHex(color2);

  // Set the value of color2 and update the background gradient
  color2.value = randomColor2;
	setGradient();
});

		
// shows currents css background on first page load
setGradient();
