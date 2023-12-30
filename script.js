// VARIABLES: 
var cssRgb = document.querySelector("h3"); 						//show rgb
var cssHex = document.querySelector("h4"); 						//show hexcode
var cssHsl = document.querySelector("h5"); 						//show hsl
var color1 = document.querySelector(".color1"); 				//colorinput left
var color2 = document.querySelector(".color2"); 				//colorinput right
var body = document.getElementById("gradient"); 				//body
var random1 = document.querySelector(".r1")						//random btn left
var random2 = document.querySelector(".r2")						//random btn right
var complementaryBtn = document.querySelector(".complemantary") //complemantary color btn
var contrastingBtn = document.querySelector(".contrasted")		//contrasted color btn


function setGradient() {
    body.style.background = "linear-gradient(to right, " 
    + color1.value 
    + ", " 
    + color2.value 
    + ")";


     // Display RGB value
    cssRgb.textContent = body.style.background + ";";

    // Display Hex value
    cssHex.textContent = "linear-gradient(to right, " + color1.value + " - " + color2.value + ";";

    // Calculate and display HSL value
    var hslColor1 = getHslFormat(color1.value);
    var hslColor2 = getHslFormat(color2.value);
    cssHsl.textContent = "linear-gradient(to right, " + hslColor1 + " - " + hslColor2 + ";";
}






	// Generate random hex code for color input

function generateRandomHex() {

		var hexCode = "#";
  	var hexValues = "0123456789abcdef";

  	for (var i = 0; i < 6; i++) {
    			hexCode += hexValues[(Math.floor(Math.random() * hexValues.length))];
  	}

  	return hexCode;
}


// Convertion function (This bit with help from chatGPT)

// Function to get HSL format from a hex color code
function getHslFormat(hex) {
    // Remove the '#' from the beginning of the hex code
    hex = hex.slice(1);

    // Convert hex to RGB
    var r = parseInt(hex.substring(0, 2), 16) / 255;
    var g = parseInt(hex.substring(2, 4), 16) / 255;
    var b = parseInt(hex.substring(4, 6), 16) / 255;

    // Find the minimum and maximum values
    var cMin = Math.min(r, g, b);
    var cMax = Math.max(r, g, b);

    // Calculate lightness
    var l = (cMin + cMax) / 2;

    // Calculate saturation
    var delta = cMax - cMin;
    var s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Calculate hue
    var h;
    if (delta === 0) {
        h = 0;
    } else if (cMax === r) {
        h = ((g - b) / delta) % 6;
    } else if (cMax === g) {
        h = (b - r) / delta + 2;
    } else {
        h = (r - g) / delta + 4;
    }

    // Ensure hue is positive and convert it to degrees
    h = Math.round((h * 60 + 360) % 360);

    // Format HSL string
    return "HSL(" + h + ", " + (s * 100) + "%, " + (l * 100) + "%)";
}



	// Adjust in realtime the background color

color1.addEventListener("input", setGradient);

color2.addEventListener("input", setGradient);

	
	// Randomly generates new colors for background

random1.addEventListener("click", function() {
  // Generate a random hex color for color1
  var randomColor1 = generateRandomHex();


  // Set the value of color1 and update the background gradient

  color1.value = randomColor1;
	setGradient();


});
	
random2.addEventListener("click", function() {
	// Generate a random hex color for color2
  var randomColor2 = generateRandomHex();

  // Set the value of color2 and update the background gradient
  color2.value = randomColor2;
	setGradient();
});

		
// shows currents css background on first page load
setGradient();
