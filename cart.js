const cartGrid = document.getElementById('cartGrid');
const totalPriceElement = document.getElementById('totalPrice');
const cart = JSON.parse(localStorage.getItem('cartProducts')) || [];
let totalPrice = 0;

for (let i = 0; i < cart.length; i++) {
    const productId = cart[i];

    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            const productCard = document.createElement('div');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" width="100" />
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Description: ${product.description}</p>
                <p>Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
                <button onclick="removeFromCart(${product.id})">Remove from Cart</button>
            `;
            cartGrid.appendChild(productCard);
            totalPrice += product.price;
            totalPriceElement.textContent = totalPrice.toFixed(2);
        })
        .catch(err => console.error('Error fetching product:', err));
}

function removeFromCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cartProducts')) || [];
    const updatedCart = cart.filter(id => id !== productId);
    localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
    alert('Product removed from cart!');
    location.reload();
}

document.getElementById("checkoutButton").addEventListener("click", () => {
    if(confirm("Are you sure to checkout?")){
        setTimeout(() => {
            alert("Thanks for shopping!");
            localStorage.removeItem("cartProducts");
            cratGrid.innerHTML ='';
        }, 2000);
    }
});