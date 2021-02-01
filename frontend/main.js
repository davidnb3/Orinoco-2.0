function makeRequest() {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open('GET', "http://localhost:3000/api/teddies");
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

async function showItems() {
  try {
    const promiseRequest = makeRequest();
    const promiseResponse = await promiseRequest;
    addItemImages(promiseResponse);
    addItemNames(promiseResponse);
    addItemPrices(promiseResponse);
    addItemDescription(promiseResponse);
    addItemLinks(promiseResponse);
  } catch (error) {
    
  }
};

showItems();

function addItemImages(response) {
  const images = document.querySelectorAll('.card-img-top');
  for (let i in response) {
      let imgSrc = response[i].imageUrl;
      images[i].setAttribute('src', imgSrc);
  }
}

function addItemNames(response) {
  const names = document.querySelectorAll('.item-name');
  for (let i in response) {
      names[i].textContent = response[i].name;
  }

}

function addItemPrices(response) {
  const prices = document.querySelectorAll('.item-price');
  for (let i in response) {
      prices[i].textContent = '$' + response[i].price / 100;
  }
}

function addItemDescription(response) {
  const descriptions = document.querySelectorAll('.card-text');
  for (let i in response) {
      descriptions[i].textContent = response[i].description;
  } 
}

function addItemLinks(response) {
  const imageLinks = document.querySelectorAll('.image-link');
  const nameLinks = document.querySelectorAll('.name-link');
  for (let i in response) {
      imageLinks[i].setAttribute('href', 'product.html?id=' + response[i]._id)
      nameLinks[i].setAttribute('href', 'product.html?id=' + response[i]._id)
  }
}

