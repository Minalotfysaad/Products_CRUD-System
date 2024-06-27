//Global Variables
var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var productImageInput = document.getElementById("productImage");
var searchInput = document.getElementById("searchInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var cancelUpdateBtn = document.getElementById("cancelUpdateBtn");
var updatedIndex;
var deletedIndex;

var productsContainer = [];
if (localStorage.getItem("products") !== null) {
    productsContainer = JSON.parse(localStorage.getItem("products"));
    displayProducts();
}
// Functions
function addProduct() {
    if (
        validateInputs(productNameInput) &&
        validateInputs(productPriceInput) &&
        validateInputs(productCategoryInput) &&
        validateInputs(productDescInput) &&
        validateImage(productImageInput)
    ) {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            description: productDescInput.value,
            image: `imgs/Products/${productImageInput.files[0]?.name}`,
        };
        productsContainer.push(product);
        displayProducts();
        localStorage.setItem("products", JSON.stringify(productsContainer));
        clearForm();
    } else {
        return false;
    }
}
function clearForm() {
    productNameInput.value = null;
    productNameInput.classList.remove("is-invalid", "is-valid");
    productNameInput.nextElementSibling.classList.add("d-none");
    productPriceInput.value = null;
    productPriceInput.classList.remove("is-invalid", "is-valid");
    productPriceInput.nextElementSibling.classList.add("d-none");
    productCategoryInput.value = null;
    productCategoryInput.classList.remove("is-invalid", "is-valid");
    productCategoryInput.nextElementSibling.classList.add("d-none");
    productDescInput.value = null;
    productDescInput.classList.remove("is-invalid", "is-valid");
    productDescInput.nextElementSibling.classList.add("d-none");
    productImageInput.value = null;
    productImageInput.classList.remove("is-invalid", "is-valid");
    productImageInput.nextElementSibling.classList.add("d-none");
}
function displayProducts() {
    var cartoona = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        cartoona += `<div class="col-md-3">
                <div class="product d-flex flex-column justify-content-center align-content-center">
                    <div class="image d-flex justify-content-center align-content-center mb-3">
                        <img class="d-block w-100" src="${productsContainer[i].image}" alt="">
                    </div>
                    <div class="details text-center">
                        <h5>${productsContainer[i].name}</h5>
                        <p>${productsContainer[i].description}</p>
                        <h6>${productsContainer[i].price} EGP</h6>
                        <h6>${productsContainer[i].category}</h6>
                    </div>
                    <div class="buttons d-flex justify-content-center align-content-center">
                        <button onclick="setFormForUpdate(${i})" class="btn btn-outline-warning btn-sm w-50 my-2">Update <i class="fas fa-pen ms-1"></i> </button>
                        <button onclick="openDeleteModal(${i})" class="btn btn-outline-danger btn-sm w-50 my-2 mx-2">Delete <i class="fas fa-trash-alt ms-1"></i></button>
                    </div>
                </div>
            </div>`;
    }
    document.getElementById("rowData").innerHTML = cartoona;
}
function openDeleteModal(index) {
    deletedIndex = index;
    var myModalEl = document.getElementById("cancelDeleteModal");
    var modal = new bootstrap.Modal(myModalEl);
    modal.show();
}
function deleteProduct() {
    productsContainer.splice(deletedIndex, 1);
    displayProducts();
    localStorage.setItem("products", JSON.stringify(productsContainer));
    // Close the modal after deletion
    var myModalEl = document.getElementById("cancelDeleteModal");
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
}
function searchProducts() {
    var term = searchInput.value;
    var cartoona = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        if (
            productsContainer[i].name.toLowerCase().includes(term.toLowerCase())
        ) {
            cartoona += `<div class="col-md-3">
            <div class="product d-flex flex-column justify-content-center align-content-center">
                <div class="image d-flex justify-content-center align-content-center mb-3">
                    <img class="d-block w-100" src="${productsContainer[i].image}" alt="">
                </div>
                <div class="details text-center">
                    <h5>${productsContainer[i].name}</h5>
                    <p>${productsContainer[i].description}</p>
                    <h6>${productsContainer[i].price} EGP</h6>
                    <h6>${productsContainer[i].category}</h6>
                </div>
                <div class="buttons d-flex justify-content-center align-content-center">
                    <button onclick="setFormForUpdate(${i})" class="btn btn-outline-warning btn-sm w-50 my-2">Update <i class="fas fa-pen ms-1"></i> </button>
                    <button onclick="openDeleteModal(${i})" class="btn btn-outline-danger btn-sm w-50 my-2 mx-2">Delete <i class="fas fa-trash-alt ms-1"></i></button>
                </div>
            </div>
        </div>`;
        }
    }
    document.getElementById("rowData").innerHTML = cartoona;
}
function setFormForUpdate(i) {
    clearForm();
    updatedIndex = i;
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    cancelUpdateBtn.classList.remove("d-none");
    productNameInput.value = productsContainer[updatedIndex].name;
    productPriceInput.value = productsContainer[updatedIndex].price;
    productCategoryInput.value = productsContainer[updatedIndex].category;
    productDescInput.value = productsContainer[updatedIndex].description;
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}
function updateProduct() {
    if (
        validateInputs(productNameInput) &&
        validateInputs(productPriceInput) &&
        validateInputs(productCategoryInput) &&
        validateInputs(productDescInput) &&
        validateImage(productImageInput)
    ) {
        productsContainer[updatedIndex].name = productNameInput.value;
        productsContainer[updatedIndex].price = productPriceInput.value;
        productsContainer[updatedIndex].category = productCategoryInput.value;
        productsContainer[updatedIndex].description = productDescInput.value;
        productsContainer[
            updatedIndex
        ].image = `imgs/Products/${productImageInput.files[0]?.name}`;
        displayProducts();
        localStorage.setItem("products", JSON.stringify(productsContainer));
        clearForm();
        addBtn.classList.remove("d-none");
        updateBtn.classList.add("d-none");
        cancelUpdateBtn.classList.add("d-none");
    } else {
        return false;
    }
}
function cancelUpdate() {
    clearForm();
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    cancelUpdateBtn.classList.add("d-none");
}
function validateInputs(element) {
    var regex = {
        productName: /^[a-zA-Z0-9\s]{6,}$/,
        productPrice: /^[0-9]+$/,
        productCategory: /^(Mobile|Laptop|Tv)$/,
        productDesc: /^[\w\s]{10,}$/,
    };
    if (regex[element.id].test(element.value) == true) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.add("d-none");
        return true;
    } else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        element.nextElementSibling.classList.remove("d-none");
        return false;
    }
}
function validateImage(element) {
    if (element.files[0] == undefined) {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        element.nextElementSibling.classList.remove("d-none");
        return false;
    } else if (
        element.files[0].type == "image/jpeg" ||
        element.files[0].type == "image/png" ||
        element.files[0].type == "image/gif" ||
        element.files[0].type == "image/webp"
    ) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.add("d-none");
        return true;
    } else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        element.nextElementSibling.classList.remove("d-none");
        return false;
    }
}
