const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');

function makeRequest() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('GET', "http://localhost:3000/api/teddies/" + productId);
        request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if(request.status === 200 || request.status === 201) {
            resolve(JSON.parse(request.response));
            } else {
            reject('Sorry, something went wrong.');
            }
        }
        }
        request.send();
    });
  };

  async function showItem() {
    try {
      const promiseRequest = makeRequest();
      const promiseResponse = await promiseRequest;
      showItemImage(promiseResponse);
      showItemName(promiseResponse);
      showItemPrice(promiseResponse);
      showItemDescription(promiseResponse);
      showItemColors(promiseResponse);
      addToCart(promiseResponse);
    } catch (error) {
      
    }
  };

  showItem();

  function showItemImage(response) {
    const itemImage = document.querySelector('.card-img-top');
    let imgSrc = response.imageUrl;
    itemImage.setAttribute('src', imgSrc);
    itemImage.setAttribute('alt', response.name);
  }

  function showItemName(response) {
      const itemName = document.querySelector('.item-name');
      itemName.textContent = response.name;
  }

  function showItemPrice(response) {
      const itemPrice = document.querySelector('.item-price');
      itemPrice.textContent = '$' + response.price / 100;
  }

  function showItemDescription(response) {
      const itemDescription = document.querySelector('.item-description');
      itemDescription.textContent = response.description;
  }

  function showItemColors(response) {
      const formSelect = document.querySelector('.form-select');
      for (let i in response.colors) {
          const formOption = document.createElement('option');
          formOption.textContent = response.colors[i];
          formOption.setAttribute('value', response.colors[i]);
          formSelect.appendChild(formOption);
      }
  }


  function addToCart(response) {
    const addToCartBtn = document.querySelector('#addToCartBtn');
    addToCartBtn.addEventListener('click', () => {

    let color = document.querySelector('select').value;

        let product = {
            'image': response.imageUrl,
            'id': response._id,
            'name': response.name,
            'color': (color === 'Choose your color') ? 'Original Color' : color,  
            'price': response.price,
            'quantity': 1
        }

        addToLocalstorage(product);
    })
    }


  function addToLocalstorage(product) {
    let addedTeddies = JSON.parse(localStorage.getItem('addedTeddies'));
    // Create array if localstorage is empty
    if (addedTeddies == null) {
        let addedTeddies = [];
        addedTeddies.push(product);
        localStorage.setItem('addedTeddies', JSON.stringify(addedTeddies));
    }

    let checkId = false;
    for (let i in addedTeddies) {
        // Check if ID already present, if yes add 1 quantity
        if (addedTeddies[i].id === product.id) {
            addedTeddies[i].quantity += 1;
            localStorage.setItem('addedTeddies', JSON.stringify(addedTeddies));
            checkId = true;
        }
    }

    // If ID is not present, add new product to LS
    if (addedTeddies != null && checkId === false) {
        addedTeddies.push(product);
        localStorage.setItem('addedTeddies', JSON.stringify(addedTeddies));
    }
}