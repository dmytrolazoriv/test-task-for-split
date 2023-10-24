// Popup start
let popupBg = document.querySelector('.popup__bg'); // Popup window background
let popup = document.querySelector('.popup'); // Window itself
let openPopupButtons = document.querySelectorAll('.copyright__content'); // Buttons to show the window
let closePopupButton = document.querySelector('.popup__close-button'); // Button to hide window

function showPopup() {
    // Delay in milliseconds (1000 milliseconds = 1 seconds)
    const delayInSeconds = parseInt(popup.getAttribute('data-popup-delay'), 10);
    const delayInMilliseconds = delayInSeconds * 1000; // Convert seconds to milliseconds
    const showOnceSetting = popup.getAttribute('data-show-once') === "true";
    console.log(showOnceSetting);

    if (showOnceSetting) {
        if (!localStorage.getItem('popupShown')) {
            setTimeout(() => {
                popupBg.classList.add('active');
                popup.classList.add('active'); // Add the 'active' class to the popup
                // Mark the popup as shown in local storage
                localStorage.setItem('popupShown', 'true');
            }, delayInMilliseconds);
        }
    } else {
        // alert("false");
        setTimeout(() => {
            popupBg.classList.add('active');
            // popupBg.classList.remove('show-once-hidden');
            popup.classList.add('active'); // Add the 'active' class to the popup
            // Mark the popup as shown in local storage
            localStorage.removeItem('popupShown');
            // localStorage.getItem('popupShown');
        }, delayInMilliseconds);
    }
}

// Call the function to show the popup when the page is loaded
window.addEventListener('load', showPopup);

// openPopupButtons.forEach((button) => { // Loop through all the buttons
//     button.addEventListener('click', (e) => { // For each we attach an event handler to the click
//         e.preventDefault();
//         popupBg.classList.add('active'); // Adding the 'active' class for the background
//         popup.classList.add('active'); // And for the window
//     })
// });

// closePopupButton.addEventListener('click',() => { // Add handler on a cross
//     popupBg.classList.remove('active'); // Removing active class from the background
//     popup.classList.remove('active'); // And from the window
// });

document.addEventListener('click', (e) => { // Attach handler to the entire document
    if(e.target === popupBg) { // If the target of the click is
        popupBg.classList.remove('active'); // Removing the active class from the background
        popup.classList.remove('active'); // And from the window
    }
});
// Popup end

// Ajax API for cart start
const addToCartButton = document.querySelector('#addAllToCartButton');
addToCartButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const addToCartForms = document.querySelectorAll('.product-add-to-cart-form');
    const items = [];

    addToCartForms.forEach(form => {
        const productId = form.querySelector('input[name="id"]').value;
        const quantity = form.querySelector('input[name="quantity"]').value;

        items.push({
            id: productId,
            quantity: quantity
        });
    });

    const cartData = {
        items: items
    };

    await fetch("/cart/add.js", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
    });

    // Fetch the updated cart
    const response = await fetch("/cart.json");
    const cart = await response.json();

    document.querySelectorAll(".cart-count-bubble").forEach(element => {
        element.textContent = cart.item_count;
    });
});
// Ajax API for cart end