function fetchProductDetails(productId) {
    const apiUrl = `https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products/${productId}`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`virkaði ekki, status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        displayProduct(data);
      })
      .catch(error => {
        console.error("Virkaði ekki:", error);
        displayError("Villa við að sækja vöru-upplýsingar");
      });
  }
  
  function displayProduct(product) {
    const mainContent = document.querySelector(".main");
  
    if (mainContent) {
      mainContent.innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.image}" alt="${product.title}">
        <p>Verð: ${product.price} kr.</p>
        <p>Flokkur: ${product.category_title}</p>
        <p>${product.description}</p>
      `;
    }
  }
