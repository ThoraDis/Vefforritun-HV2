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

 /**
   * Ná í þrjár vörur frá sama flokki
   */

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




  }
