document.getElementById('loadProducts').addEventListener('click', async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();

    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" width="100" />
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <p>Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
            <button onclick="addToWishlist(${product.id})">Wishlist</button>
        `;
        productGrid.appendChild(productCard);
    });
});

function addToWishlist(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlistedProducts')) || [];
    wishlist.push(productId);
    localStorage.setItem('wishlistedProducts', JSON.stringify(wishlist));
    alert('Product added to wishlist!');
}