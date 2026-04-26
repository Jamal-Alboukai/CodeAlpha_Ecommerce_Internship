// ==========================================
// 1. APP STATE & HTML ELEMENTS
// ==========================================
const productList = document.getElementById('product-list');
const navLogin = document.getElementById('nav-login');
const navbar = document.getElementById('navbar');

// ==========================================
// 2. AUTHENTICATION STATE LOGIC
// ==========================================
// Check local storage for user data
const token = localStorage.getItem('token');
const userName = localStorage.getItem('userName');

// If a token exists, the user is logged in!
if (token && userName) {
    // Hide the login link
    if (navLogin) {
        navLogin.style.display = 'none';
    }
    
    // Create a Welcome message
    const welcomeMsg = document.createElement('span');
    welcomeMsg.textContent = `Hi, ${userName}`;
    welcomeMsg.style.color = '#f39c12'; // Make it orange
    welcomeMsg.style.marginLeft = '15px';
    welcomeMsg.style.fontWeight = 'bold';
    
    // Create a Logout link
    const logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.textContent = 'Logout';
    logoutLink.style.marginLeft = '15px';
    
    // Add Logout functionality
    logoutLink.addEventListener('click', (e) => {
        e.preventDefault(); // Stop link from jumping to top of page
        
        // Remove the data from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        
        // Refresh the page to reset the UI
        window.location.reload(); 
    });

    // Inject the new elements into the navbar
    if (navbar) {
        navbar.appendChild(welcomeMsg);
        navbar.appendChild(logoutLink);
    }
}

// ==========================================
// 3. SHOPPING CART LOGIC
// ==========================================
// Function to add a product to the cart
const addToCart = (product) => {
    // 1. Get the current cart from local storage. 
    // If it doesn't exist yet, start with an empty array []
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // 2. Check if the product is already in the cart
    const existingItem = cart.find(item => item._id === product._id);

    if (existingItem) {
        // If it's already in the cart, just increase the quantity
        existingItem.qty += 1;
    } else {
        // If it's new, add it to the cart array with a quantity of 1
        cart.push({ ...product, qty: 1 });
    }

    // 3. Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // 4. Give the user some visual feedback
    alert(`${product.name} has been added to your cart!`);
};

// ==========================================
// 4. PRODUCT FETCHING LOGIC
// ==========================================
// Function to fetch products from the backend API
const fetchProducts = async () => {
    try {
        // Send a GET request to our API
        const response = await fetch('http://localhost:5000/api/products');
        
        // Convert the response into JSON format
        const products = await response.json();

        // Clear the "Loading products..." text
        if (productList) {
            productList.innerHTML = '';

            // Loop through each product from the database
            products.forEach(product => {
                // Create a new HTML div for each product
                const productCard = document.createElement('div');
                productCard.className = 'card';
                
                // Inject the product details into the HTML
                productCard.innerHTML = `
                    <img src="${product.imageUrl}" alt="${product.name}" style="width:100%; max-height:200px; object-fit:cover;">
                    <h3>${product.name}</h3>
                    <p>Category: ${product.category || 'General'}</p>
                    <p><strong>$${product.price}</strong></p>
                    <button class="add-btn">Add to Cart</button> 
                `;
                
                // Find the specific button inside this product card and add a click listener
                const btn = productCard.querySelector('.add-btn');
                if (btn) {
                    btn.addEventListener('click', () => addToCart(product));
                }
                
                // Add the new product card to the screen
                productList.appendChild(productCard);
            });
        }

    } catch (error) {
        console.error('Error fetching products:', error);
        if (productList) {
            productList.innerHTML = '<p>Error loading products. Is the server running?</p>';
        }
    }
};

// Call the function as soon as the page loads
fetchProducts();