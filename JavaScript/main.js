var pNameInput = document.getElementById('productName');
var pPriceInput = document.getElementById('productPrice');
var pCatInput = document.getElementById('productCat');
var pDescInput = document.getElementById('productDesc');
var searchByNameInput = document.getElementById('searchByName');
var row = document.getElementById('row');
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');
var pIndexToUpdate = -1;
var pList = [];

if (localStorage.getItem('products') != null) {
    pList = JSON.parse(localStorage.getItem('products'));
    displayPList();
} else {
    pList = [];
}

function addProduct() { //onclick 
    if (pNameInput.value == '' || pPriceInput.value == '') {
        return;
    }

    var product = {
        name: pNameInput.value,
        price: pPriceInput.value,
        category: pCatInput.value,
        desc: pDescInput.value
    }

    pList.push(product); //saving product to list
    localStorage.setItem('products', JSON.stringify(pList));
    displayPList();
    clearInputs(); // Clear inputs after adding
    console.log(pList);
}

function clearInputs() { //onclick on clear button
    pNameInput.value = '';
    pCatInput.value = '';
    pPriceInput.value = '';
    pDescInput.value = '';
}

function displayProduct(p, index) {
    row.innerHTML += `<div class="col-md-4 col-lg-3 col-12 d-inline">
        <div class="inner d-flex justify-content-center align-items-start flex-column">
            <img src="imgs/product-img.jpg" class="w-100 rounded-5 mb-3" style="border:1px solid #BFB7A4;" alt="garden">
            <h2 class="h4 mt-3 cinzel">${p.name}</h2>    
            <span class="cinzel rounded px-2 mb-3" style="background-color: #636A51;">${p.category}</span>   
            <p class="cinzel">${p.desc}</p>
            <span class="cinzel fw-bold fs-4" style="color: rgb(191, 183, 164);">${p.price}EGP</span>       
            <button onclick="deleteProduct(${index})" class="btn w-100 custom-file-upload mt-3 cinzel fs-4">Delete</button>
            <button onclick='setupFormToUpdate(${index}); scrollToTop();' class="btn w-100 custom-file-upload mt-3 cinzel fs-4" style="color: #ADA479;">Update</button>
        </div>
    </div>`;


}

function displayPList() {
    row.innerHTML = '';
    for (var i = 0; i < pList.length; i++) {
        displayProduct(pList[i], i);
    }
}

function deleteProduct(index) {
    pList.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(pList)); // Update localStorage
    displayPList();
    console.log(pList);
}

// Initialize display
displayPList();

function updateProduct() { // Renamed to updateProduct for consistency
    if (pIndexToUpdate < 0) return;

    pList[pIndexToUpdate].name = pNameInput.value;
    pList[pIndexToUpdate].price = pPriceInput.value;
    pList[pIndexToUpdate].category = pCatInput.value;
    pList[pIndexToUpdate].desc = pDescInput.value;
    localStorage.setItem('products', JSON.stringify(pList));
    displayPList();
    clearInputs();
    addBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
    pIndexToUpdate = -1;
}

function setupFormToUpdate(index) {
    pIndexToUpdate = index;
    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
    pNameInput.value = pList[index].name;
    pPriceInput.value = pList[index].price;
    pCatInput.value = pList[index].category;
    pDescInput.value = pList[index].desc;
}

function inputValidation(inputId, regexKey, alertElementId) {
    
    var input = document.getElementById(inputId);
    
    var regex = {
        name: /^[A-Za-z]+\s[A-Za-z]|[A-Za-z][A-Za-z]$/,
        price: /^[1-9][0-9]*$/,
        category: /^[A-Za-z]+\s[A-Za-z]|[A-Za-z][A-Za-z]$/,
        desc: /.{3,}/
    };

    var isValid = regex[regexKey].test(input.value);

    input.classList.remove('is-valid', 'is-invalid');
    if (isValid) {
        input.classList.add('is-valid');
        document.getElementById(alertElementId).classList.replace('d-block', 'd-none');
    } else {
        input.classList.add('is-invalid');
        document.getElementById(alertElementId).classList.replace('d-none', 'd-block');
    }
}

function removeAlerts(){

    input.classList.remove('is-invalid', 'is-valid');
}

function searchByName() {

    document.getElementById('row').innerHTML = '';
    var term = searchByNameInput.value.toLowerCase();
    
    for (var i = 0; i < pList.length; i++) {
        var isIncluded = pList[i].name.toLowerCase().includes(term);
        if (isIncluded) {
            displayProduct(pList[i], i);
        }
    }
}



var imgInput = document.getElementById('imgInput');
function uploadImg(){

    console.log(imageInput.files[0]);
    URL.createObjectURL(imageInput.files[0]);
}

// var img = document.querySelector('.cursor img');

// img.style.position = 'absolute';

// document.addEventListener('mousemove', function(e) {
//     img.style.left = e.pageX + 'px';
//     img.style.top = e.pageY + 'px';
// });

// document.addEventListener('DOMContentLoaded', function() {
//     var addBtn = document.getElementById('addBtn');
//     var hoverElement = document.getElementById('hoverElement');
//     var starImages = hoverElement.querySelectorAll('img');

//     // Function to show star images
//     function showStarImages() {
//         starImages.forEach(function(img) {
//             img.style.display = 'block';
//         });
//     }

//     // Function to hide star images
//     function hideStarImages() {
//         starImages.forEach(function(img) {
//             img.style.display = 'none';
//         });
//     }

//     // Add event listeners for hover
//     hoverElement.addEventListener('mouseover', showStarImages);
//     hoverElement.addEventListener('mouseout', hideStarImages);

//     // Add event listener for add button click
//     addBtn.addEventListener('click', showStarImages);
// });

function scrollToTop() {

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function scrollToBottom() {
    
    if(document.getElementById('row').innerHTML !== ''){

       window.scrollTo({
        top: document.documentElement.scrollHeight, 
        behavior: 'smooth' 
    }); 
    }
    
}

