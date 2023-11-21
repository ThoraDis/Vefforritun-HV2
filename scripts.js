document.addEventListener('DOMContentLoaded', function () {
    
    fetch('https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products?limit=6')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const productContainer = document.getElementsByClassName("boxes")[0];

            console.log(data);

            if (data && Array.isArray(data.items)) {
                data.items.forEach(product => {
                    
                    const productDiv = document.createElement("div");
                    productDiv.className = "box";

                    
                    const categoryName = product.category_title || 'N/A';

                    
                    productDiv.innerHTML = `
                        <img src="${product.image}" alt="Product Image">
                        <h3>${product.title}</h3>
                        <p>${product.price} kr.-</p>
                        <p>${categoryName}</p>
                    `;

                    
                    productContainer.appendChild(productDiv);
                });
            } else {
                console.error(data);
            }
        })
        .catch(error => {
            console.error('Villa að ná í gögn:', error);
        });
});