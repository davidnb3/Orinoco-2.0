let cartItems = JSON.parse(localStorage.getItem('addedTeddies'));
let cartContent = document.getElementById('cartContent');

for (let i in cartItems) {
    let cartItem = document.createElement('tr');
    cartItem.setAttribute('id', cartItems[i].id);
    cartItem.classList.add('cart-item');

    showItemImage(i, cartItem);

    showItemName(i, cartItem);

    showItemColor(i, cartItem);

    showItemQuantity(i, cartItem);

    showItemPrice(i, cartItem);

    showRemoveButton(cartItem);

    cartContent.appendChild(cartItem);

    removeItem(i, cartItem);

    updatePrices(i);
    
}


function showRemoveButton(cartItem) {
    let removeIcon = document.createElement('i');
    removeIcon.classList.add('fa', 'fa-trash');
    let removeBtn = document.createElement('button');
    removeBtn.classList.add('btn', 'btn-sm', 'btn-danger', 'removeBtn');
    let removeCtn = document.createElement('td');
    removeCtn.classList.add('text-right');
    removeBtn.appendChild(removeIcon);
    removeCtn.appendChild(removeBtn);
    cartItem.appendChild(removeCtn);
}

function showItemPrice(i, cartItem) {
    let itemPrice = document.createElement('td');
    itemPrice.classList.add('text-right', 'item-price');
    itemPrice.textContent = '$ ' +  cartItems[i].price / 100;
    cartItem.appendChild(itemPrice);
}

function showItemQuantity(i, cartItem) {
    let inputCtn = document.createElement('td');
    let qtyInput = document.createElement('input');
    qtyInput.classList.add('form-control');
    qtyInput.setAttribute('type', 'text');
    qtyInput.setAttribute('value', cartItems[i].quantity);
    inputCtn.appendChild(qtyInput);
    cartItem.appendChild(inputCtn);
}

function showItemColor(i, cartItem) {
    let itemColor = document.createElement('td');
    itemColor.textContent = cartItems[i].color;
    cartItem.appendChild(itemColor);
}

function showItemName(i, cartItem) {
    let itemName = document.createElement('td');
    itemName.textContent = cartItems[i].name;
    cartItem.appendChild(itemName);
}

function showItemImage(i, cartItem) {
    let imageCtn = document.createElement('td');
    let itemImage = document.createElement('img');
    itemImage.setAttribute('src', cartItems[i].image);
    itemImage.setAttribute('alt', cartItems[i].name);
    itemImage.style.width = '50px';
    itemImage.style.height = '50px';
    imageCtn.appendChild(itemImage);
    cartItem.appendChild(imageCtn);
}

// Get total price from items in cart
function getTotalPrice() {
    let total = 0;
    for (let i in cartItems) {
        total += document.querySelectorAll('.form-control')[i].value * cartItems[i].price / 100;
    }
    return '$ ' + total;
}


function showTotalPrice() {
    let priceRow = document.createElement('tr')
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');
    td5.classList.add('text-right', 'total-price');
    td5.setAttribute('id', 'totalPrice');
    td4.textContent = 'Total:';
    td5.textContent = getTotalPrice();
    priceRow.appendChild(td1);
    priceRow.appendChild(td2);
    priceRow.appendChild(td3);
    priceRow.appendChild(td4);
    priceRow.appendChild(td5);
    priceRow.appendChild(td6);
    cartContent.appendChild(priceRow);
}

showTotalPrice();


// To remove item from cart
function removeItem(i, cartItem) {
    document.getElementsByClassName('removeBtn')[i].addEventListener('click', () => {
        // Get item id 
        let productId = cartItem.getAttribute('id');
        cartItem.remove();
        // Loop through cartItems to just remove itemcontainer with corresponding id
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].id == productId) {
                cartItems.splice(i, 1);
            };
        };
        // update localstorage
        localStorage.setItem('addedTeddies', JSON.stringify(cartItems));
        
        if (cartItems.length === 0) {
            localStorage.removeItem('addedTeddies');
        }

        document.getElementById('totalPrice').textContent = getTotalPrice();
    });
};


function updatePrices(i) {
    document.querySelectorAll('.form-control')[i].addEventListener('change' , () => {
        document.querySelector('#totalPrice').textContent = getTotalPrice();
        let quantityInput = document.querySelectorAll('.form-control')[i].value;
        let itemQuantity = parseInt(quantityInput);
        cartItems[i].quantity = itemQuantity;
        document.querySelectorAll('.item-price')[i].textContent = '$ ' + quantityInput * cartItems[i].price / 100;
        localStorage.setItem('addedTeddies', JSON.stringify(cartItems));
    })
}

