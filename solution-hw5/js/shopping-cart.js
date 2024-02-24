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
// new Roll objects and add to cart set.
function addNewCard(rollType, rollGlazing, packSize, rollPrice) {
    const rollcard = new Roll(rollType, rollGlazing, packSize, rollPrice);

    const rollInfo = rolls[rollType];
    rollcard.rollImageURL = "../assets/products/" + rollInfo.imageFile;
    rollcard.calculatedPrice = parseFloat(calculatePrice(rollcard)).toFixed(2);
    console.log(typeof rollcard.calculatedPrice);
    rollcard.element = null;
    
    rollcardSet.add(rollcard);
    return rollcard;
}

addNewCard("Original", "Sugar milk", 1, 2.49);
addNewCard("Walnut", "Vanilla milk", 12, 3.49);
addNewCard("Raisin", "Sugar milk", 3, 2.99);
addNewCard("Apple", "Keep original", 3, 3.49);

// appends DOM elements to the shopping cart page.
for (const rollcard of rollcardSet) {
    createElement(rollcard);
}

// grab a reference to the notecard template and update
function createElement(rollcard) {
    const template = document.querySelector('#rollcart-template');
    const clone = template.content.cloneNode(true);
    rollcard.element = clone.querySelector('.rollcard');
  
    const rollcardListElement = document.querySelector('#rollcard-list');
    rollcardListElement.append(rollcard.element);

    updateElement(rollcard);
}

// update image, type, glazing, packsize in the page
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
// remove one knid of item
function deleteCard(rollcard) {
    // step1 remove element in HTML
    rollcard.element.remove();
    // step2 remove instance in set
    rollcardSet.delete(rollcard);
    // step3 update total price in cart
    sumPrice();
}

// calculate total price of the item daynamically
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

// update totoal price of the cart daynamically
function sumPrice() {
    let totalPrice = 0;
    for (const rollcard of rollcardSet) { 
        totalPrice += parseFloat(rollcard.calculatedPrice);
    }
    
    cartPrice.innerText = `$${totalPrice.toFixed(2)}`;

}

// load the cart price
sumPrice();