// Create an empty cart set
const rollcardSet = new Set();

class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;
    }
}

const cartPrice = document.querySelector('#cart-price');

/* ------------------------------------------------------------------------- */

// Initialize the shopping cart.
/**
 * new Roll objects and add to cart set.
 */ 
function addNewCard(rollType, rollGlazing, packSize, rollPrice) {
    const rollcard = new Roll(rollType, rollGlazing, packSize, rollPrice);

    const rollInfo = rolls[rollType];
    rollcard.rollImageURL = "../assets/products/" + rollInfo.imageFile;
    rollcard.calculatedPrice = parseFloat(calculatePrice(rollcard)).toFixed(2);
    // console.log(typeof rollcard.calculatedPrice);
    rollcard.element = null;
    
    rollcardSet.add(rollcard);
    return rollcard;
}

/**
 * grab a reference to the rollcard template and update
 */ 
function createElement(rollcard) {
    const template = document.querySelector('#rollcart-template');
    const clone = template.content.cloneNode(true);
    rollcard.element = clone.querySelector('.rollcard');
  
    const rollcardListElement = document.querySelector('#rollcard-list');
    rollcardListElement.append(rollcard.element);

    updateElement(rollcard);
}

/**
 * update image, type, glazing, packsize in the page
 */ 
function updateElement(rollcard) {
    const rollImageElement = rollcard.element.querySelector('.card-url');
    const rollTypeElement = rollcard.element.querySelector('.card-title');
	const rollGlazingElement = rollcard.element.querySelector('.card-glaze');
	const packSizeElement = rollcard.element.querySelector('.card-size');
    const rollPriceElement = rollcard.element.querySelector('.card-price');
    const removeLink = rollcard.element.querySelector('.remove-link');

    // The correct picture for the roll.
    rollImageElement.src = rollcard.rollImageURL;
    // The name of the item.
    rollTypeElement.innerText = rollcard.type + " Cinnamon Roll";
    // The glazing for the item.
    rollGlazingElement.innerText = `Glazing: ${rollcard.glazing}`;
    // The pack size.
    packSizeElement.innerText = `Pack Size: ${rollcard.size}`;
    // The item price you calculate.
    rollPriceElement.innerText = `$${rollcard.calculatedPrice}`;
    // A “remove” link for the item.
    removeLink.addEventListener('click', () => {
        deleteCard(rollcard);
    });
}

/* ------------------------------------------------------------------------- */

// Update when click on the remove link.
/**
 * remove one knid of item
 */ 
function deleteCard(rollcard) {
    // step1 remove element in HTML
    rollcard.element.remove();
    // step2 remove instance in cart set
    rollcardSet.delete(rollcard);
    // step3 update total price in cart
    sumPrice();
    // step4 convert the updated cart to JSON, save it in the local storage
    saveToLocalStorage();
    // step5 print the current contents of the cart in local storage after saving
    console.log("Local Storage after Delete:", localStorage.getItem("storedItems"));
}

/**
 * calculate total price of the item daynamically
 */ 
function calculatePrice(rollcard) {
    let calculatedPrice = 0;
    // Retrieve the object at the index specified by the select's value
    let glazingToCompute = allGlazing[rollcard.glazing];
    let packSizeToCompute = allPackSize[rollcard.size];
    console.log(rollcard.size);
    
    // Compute total price and update the UI
    calculatedPrice = ((rollcard.basePrice + glazingToCompute) * packSizeToCompute).toFixed(2);
    return calculatedPrice;
}

/**
 * update totoal price of the cart daynamically
 */ 
function sumPrice() {
    let totalPrice = 0;
    for (const rollcard of rollcardSet) { 
        totalPrice += parseFloat(rollcard.calculatedPrice);
    }
    
    cartPrice.innerText = `$${totalPrice.toFixed(2)}`;

}

/* ------------------------------------------------------------------------- */

/**
 * Retrieve the cart from the local storage when the page loads.
 */
if (localStorage.getItem('storedItems') != null) {
    retrieveFromLocalStorage();
}

/**
 * Grabbing the cart data string and storing it as a variable.
 */ 
function retrieveFromLocalStorage() {
    let cart = [];
    console.log("Local Storage:", localStorage.getItem("storedItems"));
    const storageArrayString = localStorage.getItem("storedItems");
    cart = JSON.parse(storageArrayString);
    
    // update rollcard template according to local storage
    for (const rollData of cart) {
        const rollcard = addNewCard(rollData.type, rollData.glazing, rollData.size, rollData.basePrice);
        createElement(rollcard);
    }
}

/**
 * Convert the JavaScript array into a string of text.
 */
function saveToLocalStorage() {
    const storageArrayString = JSON.stringify(Array.from(rollcardSet));
    localStorage.setItem("storedItems", storageArrayString);
    
    // Update to cartbadge count.
    updateCartBadge();
}

// load the cart price
sumPrice();