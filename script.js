var _ = require('lodash');


// VARIABLES: 
const cssRgb = document.querySelector("h3"); 						//show rgb
const cssHex = document.querySelector("h4"); 						//show hexcode
const cssHsl = document.querySelector("h5"); 						//show hsl


let color1 = document.querySelector(".color1"); 				//colorinput left
let color2 = document.querySelector(".color2"); 				//colorinput center
let color3 = document.querySelector(".color3"); 				//colorinput right
let body = document.getElementById("gradient"); 				//body
let random1 = document.querySelector(".r1")						//random btn left
let random2 = document.querySelector(".r2")						//random btn center
let random3 = document.querySelector(".r3")						//random btn right
// let complementaryBtn = document.querySelector(".complemantary") //complemantary color btn
// let contrastingBtn = document.querySelector(".contrasted")		//contrasted color btn


const setGradient = () => {
    body.style.background = "linear-gradient(to right, " 
    + color1.value 
    + ", " 
    + color2.value
    + ", "  
    + color3.value 
    + ")";


     // Display RGB value
    cssRgb.textContent = body.style.background + ";";

    // Display Hex value
    cssHex.textContent = "linear-gradient(to right, " 
                        + color1.value 
                        + " - "
                        + color2.value 
                        + " - " 
                        + color3.value 
                        + ";"
                        ;

    // Calculate and display HSL value
    const hslColor1 = getHslFormat(color1.value);
    const hslColor2 = getHslFormat(color2.value);
    const hslColor3 = getHslFormat(color3.value);
    cssHsl.textContent = "linear-gradient(to right, " 
                        + hslColor1 
                        + " - " 
                        + hslColor2 
                        + " - "
                        + hslColor3 
                        + ";"
                        ;
  }


	// Generate random hex code for color input

function generateRandomHex() {

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

color3.addEventListener("input", setGradient);

	
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

random3.addEventListener("click", () => {
	// Generate a random hex color for color3
  let randomColor3 = generateRandomHex();

  // Set the value of color3 and update the background gradient
  color3.value = randomColor3;
	setGradient();
});

const copyToClipboard = (text, element) => {
    navigator.clipboard.writeText(text).then(() => {
        element.classList.add("copied");
        setTimeout(() => {
            element.classList.remove("copied");
        }, 2000);
    }).catch(err => {
        console.error('Unable to copy to clipboard', err);
    });
};

// Event listeners for hover and click on h3, h4, h5
// cssRgb.addEventListener("mouseenter", () => {
//     cssRgb.textContent = "Click to copy";
   
// });

// cssHex.addEventListener("mouseenter", () => {
//     cssHex.textContent = "Click to copy";
    
// });

// cssHsl.addEventListener("mouseenter", () => {
//     cssHsl.textContent = "Click to copy";
    
// });

// cssRgb.addEventListener("mouseleave", () => {
//     cssRgb.textContent
// });

// cssHex.addEventListener("mouseleave", () => {
//     cssHex.textContent = "";
// });

// cssHsl.addEventListener("mouseleave", () => {
//     cssHsl.textContent = "";
// });

cssRgb.addEventListener("click", () => {
    copyToClipboard(cssRgb.textContent, cssRgb);
});

cssHex.addEventListener("click", () => {
    copyToClipboard(cssHex.textContent, cssHex);
});

cssHsl.addEventListener("click", () => {
    copyToClipboard(cssHsl.textContent, cssHsl);
});

// shows currents css background on first page load
setGradient();
