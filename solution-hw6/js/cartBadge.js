// Initialize cart count.
let cartItemCount = 0;

/**
 * Function to update cart count each time adds or delete an item.
 */
function updateCartBadge() {
    countLocalStorage();
    const cartBadge = document.querySelector('.cart-badge');
    cartBadge.textContent = cartItemCount;
}

/**
 * Function to count items in the cart according to current local storage.
 */
function countLocalStorage() {
    const storageArrayString = localStorage.getItem("storedItems");
    const tmpCart = JSON.parse(storageArrayString);
    
    cartItemCount = 0
    for (const rollData of tmpCart) {
        cartItemCount++;
    }
}

updateCartBadge();