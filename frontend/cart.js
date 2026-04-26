const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart-btn');

// 1. Get the cart from Local Storage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display the cart
const displayCart = () => {
    cartItemsContainer.innerHTML = ''; // Clear container first
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalElement.textContent = '0.00';
        return;
    }

    // 2. Loop through the cart and display items
    cart.forEach((item, index) => {
        // Calculate total price
        total += item.price * item.qty;

        const itemDiv = document.createElement('div');
        itemDiv.style.display = 'flex';
        itemDiv.style.justifyContent = 'space-between';
        itemDiv.style.alignItems = 'center';
        itemDiv.style.background = 'white';
        itemDiv.style.padding = '10px';
        itemDiv.style.marginBottom = '10px';
        itemDiv.style.borderRadius = '5px';
        itemDiv.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';

        itemDiv.innerHTML = `
            <div style="display: flex; alignItems: center; gap: 15px;">
                <img src="${item.imageUrl}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                <div>
                    <h4>${item.name}</h4>
                    <p>$${item.price} x ${item.qty}</p>
                </div>
            </div>
            <div>
                <strong>$${(item.price * item.qty).toFixed(2)}</strong>
            </div>
        `;
        
        cartItemsContainer.appendChild(itemDiv);
    });

    // 3. Update the total on the screen
    cartTotalElement.textContent = total.toFixed(2);
};

// 4. Handle Clear Cart Button
clearCartBtn.addEventListener('click', () => {
    localStorage.removeItem('cart'); // Delete from storage
    window.location.reload(); // Refresh the page to show empty cart
});

// Run the function when the page loads
displayCart();

// --- Auth State Logic (Keep navbar looking correct) ---
const navLogin = document.getElementById('nav-login');
const navbar = document.getElementById('navbar');
const token = localStorage.getItem('token');
const userName = localStorage.getItem('userName');

if (token && userName) {
    if (navLogin) navLogin.style.display = 'none';
    const welcomeMsg = document.createElement('span');
    welcomeMsg.textContent = `Hi, ${userName}`;
    welcomeMsg.style.color = '#f39c12';
    welcomeMsg.style.marginLeft = '15px';
    welcomeMsg.style.fontWeight = 'bold';
    
    const logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.textContent = 'Logout';
    logoutLink.style.marginLeft = '15px';
    
    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        window.location.reload(); 
    });

    if (navbar) {
        navbar.appendChild(welcomeMsg);
        navbar.appendChild(logoutLink);
    }
}
// ==========================================
// 5. CHECKOUT LOGIC
// ==========================================
const checkoutBtn = document.getElementById('checkout-btn');

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', async () => {
        // 1. Check if the cart is empty
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // 2. Check if the user is logged in (Do they have a token?)
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login to place an order.");
            window.location.href = 'login.html'; // Send them to login page
            return;
        }

        // 3. Format the cart items to match what our backend Order model expects
        const orderItems = cart.map(item => {
            return {
                name: item.name,
                qty: item.qty,
                price: item.price,
                product: item._id // The backend expects the product ID to be called 'product'
            };
        });

        // 4. Calculate the total price
        const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

        try {
            // 5. Send the POST request to the backend
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // <-- Handing the VIP wristband to the bouncer!
                },
                body: JSON.stringify({
                    orderItems: orderItems,
                    totalPrice: totalPrice
                })
            });

            const data = await response.json();

            // 6. Check if the order was successful
            if (response.ok) {
                alert(`Order placed successfully! Order ID: ${data._id}`);
                
                // Empty the cart because they just bought the items
                localStorage.removeItem('cart');
                
                // Refresh the page
                window.location.reload();
            } else {
                alert(`Error placing order: ${data.message}`);
            }

        } catch (error) {
            console.error("Checkout error:", error);
            alert("Something went wrong with the checkout.");
        }
    });
}