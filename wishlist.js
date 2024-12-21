const wishlistGrid = document.getElementById('wishlistGrid');
const wishlist = JSON.parse(localStorage.getItem('wishlistedProducts')) || [];

for (const productId of wishlist) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            const productCard = document.createElement('div');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" width="100" />
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            wishlistGrid.appendChild(productCard);
        })
        .catch(err => console.error('Error fetching product:', err));
}

function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cartProducts')) || [];
    if (!cart.some(item => item.id === productId)) {
        cart.push(productId);
        localStorage.setItem('cartProducts', JSON.stringify(cart));
        alert('Product added to cart!');
    } else {
        alert('Product is already in the cart!');
    }
}
