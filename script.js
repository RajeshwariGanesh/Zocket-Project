const fileInput = document.getElementById('fileInput');
const imageContainer = document.getElementById('imageContainer');
const borderColorPicker = document.getElementById('borderColorPicker');
const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const textContainer = document.getElementById('textContainer');
const colorDisplay = document.getElementById('colorDisplay');

const selectedColors = []; // Array to store selected colors

fileInput.addEventListener('change', function(event) {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    const reader = new FileReader();
    reader.onload = function() {
      const imageUrl = reader.result;
      imageContainer.style.backgroundImage = `url(${imageUrl})`;
    };
    reader.readAsDataURL(selectedFile);
  }
});

borderColorPicker.addEventListener('input', function(event) {
  const newColor = event.target.value;

  // Apply border color
  imageContainer.style.borderColor = newColor;

  // Update color display
  updateColorDisplay(newColor);
});

// Update text content when text inputs change
box1.addEventListener('input', updateTextContent);
box2.addEventListener('input', updateTextContent);

function updateTextContent() {
  const adContent = box1.value;
  const cta = box2.value;

  textContainer.innerHTML = `<p>${adContent}</p><p>${cta}</p>`;
}

// Function to update the color display
function updateColorDisplay(newColor) {
  colorDisplay.innerHTML = ''; // Clear previous color circles

  // Create and append circle elements for each selected color
  for (let i = 0; i < selectedColors.length; i++) {
    const colorCircle = createColorCircle(selectedColors[i]);
    colorDisplay.appendChild(colorCircle);
  }

  // Add a new circle for the new color
  const newColorCircle = createColorCircle(newColor);
  colorDisplay.appendChild(newColorCircle);

  // Add the new color to the selected colors array
  selectedColors.push(newColor);

  // Remove the first circle if there are more than 5 circles
  if (selectedColors.length > 5) {
    colorDisplay.removeChild(colorDisplay.childNodes[0]);
    selectedColors.shift();
  }
}

// Function to create a color circle element
function createColorCircle(color) {
  const colorCircle = document.createElement('button');
  colorCircle.classList.add('colorCircle');
  colorCircle.style.backgroundColor = color;
  colorCircle.addEventListener('click', function() {
    imageContainer.style.borderColor = color;
  });
  return colorCircle;
}










