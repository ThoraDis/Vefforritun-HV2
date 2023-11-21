    
    function performSearch() {
      const searchInput = document.getElementById('input');
      const query = searchInput.value.trim();

     
      fetchData(query);

     
      history.pushState({ query }, '', `?search=${encodeURIComponent(query)}`);
    }

  
    function fetchData(searchQuery) { 
      const productContainer = document.querySelector('.boxes');

     
      fetch(`https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products?search=${searchQuery}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          
          productContainer.innerHTML = '';

          if (data && Array.isArray(data.items) && data.items.length > 0) {
            
            data.items.forEach(product => {
              const productDiv = document.createElement("div");
              productDiv.className = "box";
              productDiv.innerHTML = `
                <img src="${product.image}" alt="Product Image">
                <h3>${product.title}</h3>
                <p>${product.price} kr.-</p>
                <p>${product.category_title || 'N/A'}</p>
              `;
              productContainer.appendChild(productDiv);
            });
          } else {
            
            productContainer.innerHTML = '<p>Engar niðurstöður</p>';
          }
        })
        .catch(error => {
          console.error('Villa að ná í gögn:', error);
        });
    }

    
function restoreSearch() {
  const searchInput = document.getElementById('input');
  const query = getSearch();

  searchInput.value = query;
  fetchData(query);

  if (query) {
      fetchData(query);
  } else {
      
      fetchData('');
  }
}


function getSearch() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get('search') || '';
}


document.addEventListener('DOMContentLoaded', restoreSearch);


window.addEventListener('popstate', function (event) {
  location.reload();
});