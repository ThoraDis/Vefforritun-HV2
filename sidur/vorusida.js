    document.addEventListener('DOMContentLoaded', function () {
    
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const productId = url.searchParams.get('id');

    console.log(productId);
    
    
    const apiUrl = `https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products/${productId}`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`virkaði ekki, status: ${response.status}`);
        }
        return response.json();
      })
      .then(product => {
        
        const productContainer = document.querySelector(".product-details");

      const productDiv = document.createElement("div");
      productDiv.className = "product";

      productDiv.innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.image}" alt="${product.title}">
        <p>Verð: ${product.price} kr.</p>
        <p>Flokkur: ${product.category_title}</p>
        <p>${product.description}</p>
      `;

      productContainer.appendChild(productDiv);


      
      fetch(`https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products?limit=3&category=${product.category_title}`)
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
                  const productLink = document.createElement("a");
                  productLink.href = `vorusida.html?id=${product.id}`;

                  const productDiv = document.createElement("div");
                  productDiv.className = "box";

                  productDiv.innerHTML = `
                      <img src="${product.image}" alt="Product Image">
                      <h3>${product.title}</h3>
                      <p>${product.price} kr.-</p>
                      <p>${product.category_title || 'N/A'}</p>
                  `;

                  productLink.appendChild(productDiv);
                  productContainer.appendChild(productLink);
              });
          } else {
              console.error(data);
          }
      })
      .catch(error => {
          console.error('Error fetching related products:', error);
      });
})
.catch(error => {
  console.error("Error fetching product data:", error);
});
});


