let products;
let stores;
loadProducts();

async function loadProducts(byName) {
    await getProducts(byName);
    let productsList = document.querySelector('.all-products')
    productsList.innerHTML = products;
    stores = `<select name="storeId" placeholder="storeId"  id="storeId">`;
    await getStores(byName);
    let storesList = document.querySelector('.all-stores')
    storesList.innerHTML = stores;

    stores = `<select name="selectedStoreId" id="selectedStoreId" onchange="getProductByStore()">`;
    await getStores(byName);
    let availableProductByStore = document.querySelector('.all-select-stores')
    availableProductByStore.innerHTML = stores;
}

async function getProductByStore() {
    await getProductByStoreId();
}

async function getProductByStoreId() {

    let storeId = document.getElementById('selectedStoreId').value;

    let rawData = await fetch('/api/storeProductsByStoreId/' + storeId);
    let storeProducts = await rawData.json();
    let html = `<table id="all_stores_list" class="table">
    <tr>
      <th>StoreName</th>
      <th>ProductName</th>
      <th>Quantity</th>
    </tr>`;
    for (let { productId, StoreId, quantity, storeName, productName }
        of storeProducts) {
        html += `
        <tr>
        <td>${storeName}</td>
        <td>${productName}</td>
        <td>${quantity}</td>
      </tr>
    `;
    }
    html += '</table>'
    let storesList = document.querySelector('.list-of-stores-products')
    storesList.innerHTML = html;
    // when we have fetched a list  scroll to the top of th screen
    window.scrollTo(0, 0, );
}

async function getProducts(selectId) {
    products = `<select name="productId" placeholder="productId"  id="productId">`;
    // get address 
    let rawData = await fetch('/api/products');
    let listProducts = await rawData.json();

    for (let { id, name }
        of listProducts) {
        if (selectId == id) {
            products += `
             <option value=${id} selected>${name}</option>
            `;
        } else {
            products += `
            <option value=${id}>${name}</option>
           `;
        }

    }
}

async function getStores(selectId) {
    // get address 
    let rawData = await fetch('/api/stores');
    let listStores = await rawData.json();

    for (let { id, name }
        of listStores) {
        if (selectId == id) {
            stores += `
             <option value=${id} selected>${name}</option>
            `;
        } else {
            stores += `
            <option value=${id}>${name}</option>
           `;
        }

    }
}
// Load products from database and display
getStoreProducts();

// Fetch a list of all store
async function getStoreProducts() {
    let rawData = await fetch('/api/storeProducts');
    let storeProducts = await rawData.json();
    let html = `<table id="all_stores_list" class="table">
    <tr>
      <th>StoreName</th>
      <th>ProductName</th>
      <th>Quantity</th>
    </tr>`;
    for (let { productId, StoreId, quantity, storeName, productName }
        of storeProducts) {
        html += `
        <tr>
        <td>${storeName}</td>
        <td>${productName}</td>
        <td>${quantity}</td>
      </tr>
    `;
    }
    html += '</table>'
    let storesList = document.querySelector('.list-of-stores-products')
    storesList.innerHTML = html;
    // when we have fetched a list  scroll to the top of th screen
    window.scrollTo(0, 0, );
}

// Show form on button click


function addStoreProduct() {
    document.querySelector('.change-store-product-form').style.display = 'none';
    document.querySelector('.add-store-product-form').style.display = 'block';
}


// Handle forms

$(document).ready(function() {
    document.body.addEventListener('submit', async event => {
        // Prevent default behavior (page reload)
        event.preventDefault();
        // Get info about the form
        let form = event.target;
        let route = form.getAttribute('action');
        let method = form.getAttribute('method');
        // Collect the data from the form
        // (does not work with check and radio boxes yet)
        let requestBody = {};
        for (let { name, value }
            of form.elements) {
            if (!name) { continue; }
            requestBody[name] = value;
        }
        // Send the data via our REST api
        let rawResult = await fetch(route, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });
        let result = await rawResult.json();
        console.log(result);
        // Empty the fields
        for (let element of form.elements) {
            if (!element.name) { continue; }
            element.value = '';
        }
        // Non-generic code, speficic for the add product form
        form.style.display = 'none';
        document.querySelector('.add-store-product-button').style.display = 'block';
        document.querySelector('.change-store-product-form').style.display = 'none';

        // Now get all product again from the db
        await getStoreProducts();
    });
});




// populate the change form with the correct item

async function updateProducts(id) {
    document.querySelector('.add-products-form').style.display = 'none';
    let idToChange = id;
    // get the data to change
    let rawResult = await fetch('/api/products/' + idToChange);
    let result = await rawResult.json();
    // fill and show the change forms base on the result/data
    let changeForm = document.querySelector('.change-products-form');
    // add the correct route / action to the form
    changeForm.setAttribute('action', '/api/products/' + result.id);
    // Fill the form with the data from the database
    for (let element of changeForm.elements) {
        if (!element.name) { continue; }
        element.value = result[element.name];
    }
    // show the form
    changeForm.style.display = "block";
    // scroll to the top of the page where the form is
    window.scrollTo(0, 0, );
}