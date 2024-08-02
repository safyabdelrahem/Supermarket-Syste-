var productNameInput = document.getElementById('ProductName');
var productPriceInput = document.getElementById('ProductPrice');
var productCategoryInput = document.getElementById('ProductCategory');
var productDescraptionInput = document.getElementById('ProductDescribtion');
var addButtonInput = document.getElementById('addButton');
var inputs = document.getElementsByClassName('form-control');
var products;
var updateIndex = -1;

if (localStorage.getItem('ourProducts') != null) {
    products = JSON.parse(localStorage.getItem('ourProducts'));
    displayProduct();
} else {
    products = [];
}

addButtonInput.onclick = function() {
    if (updateIndex === -1) {
        addProduct();
    } else {
        saveUpdatedProduct();
    }
    displayProduct();
    clearProduct();
};

function addProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescraptionInput.value
    };
    products.push(product);
    localStorage.setItem('ourProducts', JSON.stringify(products));
}

function displayProduct() {
    var trs = '';
    for (var i = 0; i < products.length; i++) {
        trs += `<tr><td>${i + 1}</td>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].description}</td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>  
            <td><button onclick="prepareUpdateProduct(${i})" class="btn btn-warning">Update</button></td>
        </tr>`;
    }
    document.getElementById('tableBody').innerHTML = trs;
}

function clearProduct() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    updateIndex = -1;
    addButtonInput.innerHTML = "Add Product";
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('ourProducts', JSON.stringify(products));
    displayProduct();
}

function prepareUpdateProduct(index) {
    productNameInput.value = products[index].name;
    productPriceInput.value = products[index].price;
    productCategoryInput.value = products[index].category;
    productDescraptionInput.value = products[index].description;
    updateIndex = index;
    addButtonInput.innerHTML = "Save Changes";
}

function saveUpdatedProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescraptionInput.value
    };
    products[updateIndex] = product;
    localStorage.setItem('ourProducts', JSON.stringify(products));
    updateIndex = -1;
    addButtonInput.innerHTML = "Add Product";
}

function searchProduct(term) {
    var trs = '';
    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(term.toLowerCase())) {
            trs += `<tr><td>${i + 1}</td>
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].category}</td>
                <td>${products[i].description}</td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>  
                <td><button onclick="prepareUpdateProduct(${i})" class="btn btn-warning">Update</button></td>
            </tr>`;
        }
    }
    document.getElementById('tableBody').innerHTML = trs;
}
