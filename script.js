// 1. Get the cart from Local Storage (or initialize an empty array)
let cart = JSON.parse(localStorage.getItem('savore_cart')) || [];

// 2. Initialize cart count and menu filtering on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    const catButtons = document.querySelectorAll('.cat-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    // Display 'mains' category by default
    if (menuCards.length > 0) {
        menuCards.forEach(card => {
            if (card.getAttribute('data-category') === 'mains') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Category Buttons Click Event
    catButtons.forEach(button => {
        button.addEventListener('click', () => {
            catButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            menuCards.forEach(card => {
                if (card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Add to Cart Buttons Click Event (Menu Page)
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card's parent click event from triggering
            const card = e.target.closest('.menu-card');
            const itemName = card.querySelector('h3').innerText;
            const itemPriceText = card.querySelector('.price').innerText;
            const itemPrice = parseInt(itemPriceText.replace(/[^\d]/g, ''));
            const itemImage = card.querySelector('img').getAttribute('src');

            addToCart(itemName, itemPrice, itemImage);
        });
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('navLinks');
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});

// 3. Add an item to the cart
function addToCart(itemName, itemPrice, itemImage) {
    const newItem = {
        id: Date.now(),
        name: itemName,
        price: itemPrice,
        image: itemImage,
        quantity: 1
    };

    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(newItem);
    }

    saveCart();
    updateCartCount();
    alert(`"${itemName}" was added to your cart!`);
}

// 4. Save the cart to Local Storage
function saveCart() {
    localStorage.setItem('savore_cart', JSON.stringify(cart));
}

// 5. Update the cart item count badge in the navigation bar
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.innerText = totalItems;
    }
}

// 6. Clear the cart
function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
}