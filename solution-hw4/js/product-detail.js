// A list of price adaptations object based on user selections.
let allGlazing = {
    'Keep original': 0.00,
    'Sugar milk': 0.00,
    'Vanilla milk': 0.50,
    'Double chocolate': 1.50
};

let allPackSize = {
    1: 1,
    3: 3,
    6: 5,
    12: 10
};

// Create an empty cart array
let cart = [];

// Class definition for Roll
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

/* ------------------------------------------------------------------------- */

// Use the URL parameter to update page.
// step1 Parse URL paraameter to get roll type
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');
const rollInfo = rolls[rollType];

// step2 load product title, image
const productTitle = document.querySelector('#product-title');
const productImage = document.querySelector('#product-image');
productTitle.textContent = rollType + " Cinnamon Roll";
productImage.src = "../assets/products/" + rollInfo.imageFile;

// step3 Set initial price
const productBasePrice  = rollInfo.basePrice;


/* ------------------------------------------------------------------------- */

// Function to handle glazing change.
// When the page loads, find the select element.
let selectGlazing = document.querySelector('#glazingOptions');
let selectPackSize = document.querySelector('#packSizeOptions');
let glazingIndex;
let packSizeIndex;

// Create a dropdown menu and add options with loop.
function populateOptions() {
    for (let glazing in allGlazing) {
        // Create a new 'option' HTML element, set its attributes, 
        // and add it to the glazing select element.
        var option = document.createElement('option');
        option.text = glazing;
        option.value = glazing;
        glazingOptions.add(option);
    }

    for (let size in allPackSize) {
        // Create a new 'option' HTML element, set its attributes, 
        // and add it to the packsize select element.
        var option = document.createElement('option');
        option.text = size;
        option.value = size;
        packSizeOptions.add(option);
    }

    // set default value
    glazingIndex = 'Keep original';
    packSizeIndex = 1;
}

/**
 * Update select glazing for price adaptation
 * @param element the select element.
*/ 
function glazingChange(element) {
    // get value of selected glazing option
    glazingIndex = element.value;
    
    updatePrice();
}

/**
 * Update select glazing for price adaptation
 * @param element the select element.
*/ 
function packSizeChange(element) {
    // get value of selected pack prize option
    packSizeIndex = element.value;
    
    updatePrice();
}

/**
   * Updates the UI to display total price info.
   */
function updatePrice() {
    // Retrieve the object at the index specified by the select's value
    let glazingToCompute = allGlazing[glazingIndex];
    let packSizeToCompute = allPackSize[packSizeIndex];

    // Compute total price and update the UI
    let finalPrice = (productBasePrice + glazingToCompute) * packSizeToCompute;
    document.querySelector('.price').innerText = `$${finalPrice.toFixed(2)}`;
}
  
// Give a listener for the 'change' event, function running when 
// the selected option changes.
selectGlazing.addEventListener('change', glazingChange(this));
selectPackSize.addEventListener('change', packSizeChange(this));

// When the page loads, find the select element and default price.
populateOptions();
updatePrice();


/* ------------------------------------------------------------------------- */

// Function to handle add to cart button.
function addToCart() {
    // Create a new instance of the Roll class
    const newRoll = new Roll(
        rollType, 
        selectGlazing.value, 
        selectPackSize.value, 
        productBasePrice
    );
    cart.push(newRoll);
    console.log("Cart:", cart);
}

document.getElementById('add-to-cart-btn').addEventListener('click', addToCart);