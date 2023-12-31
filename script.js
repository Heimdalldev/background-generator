var _ = require('lodash');


const array = [1,2,3,4,5,6,7,8];
console.log('answer:', _.without(array, 3))

// VARIABLES: 
const cssRgb = document.querySelector("h3"); 						//show rgb
const cssHex = document.querySelector("h4"); 						//show hexcode
const cssHsl = document.querySelector("h5"); 						//show hsl


let color1 = document.querySelector(".color1"); 				//colorinput left
let color2 = document.querySelector(".color2"); 				//colorinput right
let body = document.getElementById("gradient"); 				//body
let random1 = document.querySelector(".r1")						//random btn left
let random2 = document.querySelector(".r2")						//random btn right
let complementaryBtn = document.querySelector(".complemantary") //complemantary color btn
let contrastingBtn = document.querySelector(".contrasted")		//contrasted color btn


const setGradient = () => {
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
    const hslColor1 = getHslFormat(color1.value);
    const hslColor2 = getHslFormat(color2.value);
    cssHsl.textContent = "linear-gradient(to right, " + hslColor1 + " - " + hslColor2 + ";";
}


	// Generate random hex code for color input

const generateRandomHex = () => {

		let hexCode = "#";
  	const hexValues = "0123456789abcdef";

  	for (let i = 0; i < 6; i++) {
    			hexCode += hexValues[(Math.floor(Math.random() * hexValues.length))];
  	}

  	return hexCode;
}


// Convertion function (This bit with help from chatGPT)

// Function to get HSL format from a hex color code
const getHslFormat = (hex) => {
    // Remove the '#' from the beginning of the hex code
    hex = hex.slice(1);

    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b =  parseInt(hex.substring(4, 6), 16) / 255;

    // Find the minimum and maximum values
   const cMin = Math.min(r, g, b);
   const cMax = Math.max(r, g, b);

    // Calculate lightness
   const l = (cMin + cMax) / 2;

    // Calculate saturation
const delta = cMax - cMin;
const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Calculate hue
    let h;
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
    const roundedH = Math.round((h * 60 + 360) % 360);
    const roundedS = Math.round(s * 100);
    const roundedL = Math.round(l * 100);

    // Format HSL string
    return `HSL ${roundedH}, ${roundedS}%, ${roundedL}%`;
}



	// Adjust in realtime the background color

color1.addEventListener("input", setGradient);

color2.addEventListener("input", setGradient);

	
	// Randomly generates new colors for background

random1.addEventListener("click", () => {
  // Generate a random hex color for color1
  let randomColor1 = generateRandomHex();


  // Set the value of color1 and update the background gradient

  color1.value = randomColor1;
	setGradient();


});
	
random2.addEventListener("click", () => {
	// Generate a random hex color for color2
  let randomColor2 = generateRandomHex();

  // Set the value of color2 and update the background gradient
  color2.value = randomColor2;
	setGradient();
});

		
// shows currents css background on first page load
setGradient();
