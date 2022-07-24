let address;
let storeStandards;

loadStoreStandards();
loadAddress();

async function loadAddress() {
    await getAddress(1, "");
    let addressList = document.querySelector('.list-of-address')
    addressList.innerHTML = address;
    let updateAddressList = document.querySelector('.update-of-address')
    updateAddressList.innerHTML = address;
}
async function getAddress(selectId, isDisabled) {
    address = `<select name="addressId" placeholder="addressId"  id="address" ${isDisabled}>`;
    // get address 
    let rawData = await fetch('/api/address');
    let addresses = await rawData.json();

    for (let { id, street, streetNumber, zipcode, city, country }
        of addresses) {
        var add = street + "," + streetNumber + "," + zipcode + "," + city + "," + country;
        if (selectId == id) {
            address += `
             <option value=${id} selected>${add}</option>
            `;
        } else {
            address += `
            <option value=${id}>${add}</option>
           `;
        }

    }
}
// Load store from database and display
getStores();

async function loadStoreStandards() {
    await getStoreStandards(1, "");
    let storeStandardsList = document.querySelector('.list-of-storeStandards')
    storeStandardsList.innerHTML = storeStandards;
    let updateStoreStandardsList = document.querySelector('.update-of-storeStandards')
    updateStoreStandardsList.innerHTML = storeStandards;
}
async function getStoreStandards(selectId, isDisabled) {
    storeStandards = `<select name="storeStandardsId" placeholder="storeStandardsId"  id="storeStandardsId"  ${isDisabled}>`;
    // get address 
    let rawData = await fetch('/api/storeStandards');
    let listStoreStandards = await rawData.json();

    for (let { id, name, email, contact }
        of listStoreStandards) {
        var add = name + "," + email + "," + contact;
        if (selectId == id) {
            storeStandards += `
             <option value=${id} selected>${add}</option>
            `;
        } else {
            storeStandards += `
            <option value=${id}>${add}</option>
           `;
        }

    }
}
// Load store from database and display
getStoreStandards();


// Fetch a list of all store
async function getStores() {
    let rawData = await fetch('/api/stores');
    let stores = await rawData.json();
    let html = `<table id="all_stores_list" class="table">
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>address</th>
      <th>StoreStandards</th>
      <th>Warehouse</th> 
      <th>Edit</th>
      <th>Delete</th>
    </tr>`;
    for (let { id, name, addressId, storeStandardsId, isWarehouse }
        of stores) {
        await getAddress(addressId, "disabled");
        await getStoreStandards(storeStandardsId, "disabled");
        html += `
        <tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${address}</td>
        <td>${storeStandards}</td>
        <td>${isWarehouse}</td>
        <td><button onclick="updateStores(${id})" class="edit-stores-button  btn-warning" id ="edit-stores-${id}">Edit</button></td>
        <td><button onclick="deleteStores(${id})" class="delete-stores-button btn-danger" id = "delete-stores-${id}">Delete</button></td>
        </tr>
    `;
    }
    html += '</table>'
    let storesList = document.querySelector('.list-of-stores')
    storesList.innerHTML = html;
    // when we have fetched a list  scroll to the top of th screen
    window.scrollTo(0, 0, );
}

// Show form on button click

function addStores() {
    document.querySelector('.change-stores-form').style.display = 'none';
    document.querySelector('.add-stores-form').style.display = 'block';
    //document.querySelector('.add-store-button').style.display = 'none';
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
        // Non-generic code, speficic for the add person form
        form.style.display = 'none';
        document.querySelector('.add-store-button').style.display = 'block';
        document.querySelector('.change-stores-form').style.display = 'none';

        // Now get all persons again from the db
        await getStores();
    });
});


// React on click on delete button
function deleteStores(id) {
    if (confirm("Are you want to delete selected store?")) {
        let idToDelete = id;
        fetch('/api/stores/' + idToDelete, {
            method: 'DELETE'
        });
        getStores();
    }
}
// React on click on change button
// populate the change form with the correct item

async function updateStores(id) {
    document.querySelector('.add-stores-form').style.display = 'none';
    let idToChange = id;
    // get the data to change
    let rawResult = await fetch('/api/stores/' + idToChange);
    let result = await rawResult.json();
    // fill and show the change forms base on the result/data
    let changeForm = document.querySelector('.change-stores-form');
    // add the correct route / action to the form
    changeForm.setAttribute('action', '/api/stores/' + result.id);
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