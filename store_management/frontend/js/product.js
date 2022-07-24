// Load products from database and display
getProducts();
// Fetch a list of all product
async function getProducts() {
    let rawData = await fetch('/api/products');
    let products = await rawData.json();
    let html = `<table id="all_products_list" class="table">
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Description</th>
      <th>price</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>`;
    for (let { id, name, description, price, image }
        of products) {
        html += `
        <tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${description}</td>
        <td>${price}</td>
        <td><button onclick="updateProduct(${id})" class="edit-product-button  btn-warning" id ="edit-product-${id}">Edit</button></td>
        <td><button onclick="deleteProduct(${id})" class="delete-product-button btn-danger" id = "delete-product-${id}">Delete</button></td>
        </tr>
    `;
    }
    html += '</table>'
    let productList = document.querySelector('.list-of-products')
    productList.innerHTML = html;
    // when we have fetched a list  scroll to the top of th screen
    window.scrollTo(0, 0, );
}

// Show form on button click

function addProduct() {
    document.querySelector('.change-product-form').style.display = 'none';
    document.querySelector('.add-product-form').style.display = 'block';
    //document.querySelector('.add-product-button').style.display = 'none';
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
        document.querySelector('.add-product-button').style.display = 'block';
        document.querySelector('.change-product-form').style.display = 'none';

        // Now get all product again from the db
        await getProducts();
    });
});


// React on click on delete button
function deleteProduct(id) {
    if (confirm("Are you want to delete selected product?")) {
        let idToDelete = id;
        fetch('/api/products/' + idToDelete, {
            method: 'DELETE'
        });
        getProducts();
    }
}
// React on click on change button
// populate the change form with the correct item

function updateProduct(id) {
    document.querySelector('.add-product-form').style.display = 'none';
    document.body.addEventListener('click', async event => {
        let idToChange = id;
        // get the data to change
        let rawResult = await fetch('/api/products/' + idToChange);
        let result = await rawResult.json();
        // fill and show the change forms base on the result/data
        let changeForm = document.querySelector('.change-product-form');
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
    });
}