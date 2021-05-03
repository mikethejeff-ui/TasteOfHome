let carts = document.querySelectorAll('.add-cart');

let product = [
    {
        name: "Nestle Cerevita",
        tag: "Corn&Wheat",
        price: 25,
        InCart: 0

    },
    {
        name: "Nestle Cerevita",
        tag: "Corn&Banana",
        price: 25,
        InCart: 0
    },
    {
        name: "Nestle Cerevita",
        tag: "Corn,Cocoa&Wheat",
        price: 30,
        InCart: 0
    },
    {
        name: "Nestle Cerelac",
        tag: "Wheat",
        price: 30,
        InCart: 0
    },
    {
        name: "Mazoe Orange",
        tag: "orange Crush",
        price: 25,
        InCart: 0

    },
    {
        name: "Mazoe BlackBerry",
        tag: "BlackBerry",
        price: 25,
        InCart: 0
    },
    {
        name: "Mazoe Creamsoda",
        tag: "Creamsoda",
        price: 20,
        InCart: 0
    },
    {
        name: "Mazoe Peach",
        tag: "Peach",
        price: 20,
        InCart: 0
    },
    {
        name: "Mazoe Rasberry",
        tag: "Rasberry",
        price: 15,
        InCart: 0

    },
    {
        name: "Roibos Freshpak",
        tag: "Freshpak",
        price: 15,
        InCart: 0
    },
    {
        name: "Ryco Beef",
        tag: "Ryco Beef",
        price: 2,
        InCart: 0
    },
    {
        name: "Ryco Chicken",
        tag: "Ryco Chicken",
        price: 2,
        InCart: 0
    },
    {
        name: "Jiggies Beef 20gx20",
        tag: "jiggies Beef",
        price: 2,
        InCart: 0

    },
    {
        name: "Jiggies Tomato 20gx20",
        tag: "Jiggies TOMATO",
        price: 5,
        InCart: 0
    },
    {
        name: "Jiggies Redish 20gx20",
        tag: "JIGGIES-REDISH",
        price: 5,
        InCart: 0
    },
    {
        name: "Colored Maputi",
        tag: "C,Maputi",
        price: 5,
        InCart: 0
    },
    {
        name: "Dried Kapenta",
        tag: "matemba",
        price: 30,
        InCart: 0
    },
    {
        name: "Apricotes",
        tag: "Apricotes",
        price: 20,
        InCart: 0
    },
    {
        name: "Spuds SeaSalt & BlackPaper",
        tag: "spuds-ss&bp",
        price: 5,
        InCart: 0
    },
    {
        name: "Maputi",
        tag: "maputi",
        price: 2,
        InCart: 0
    }

];

for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(product[i]);
        totalCost(product[i])
    })

}

function onloadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.num-num').textContent = productNumbers;
    }

}

function cartNumbers(product) {
let productNumbers = localStorage.getItem('cartNumbers');
    

    productNumbers = parseInt(productNumbers);
  
    if( productNumbers ){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.num-num').textContent = productNumbers + 1;

    }else{
        
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.num-num').textContent = 1;
    }

    setItems(product);

}

function setItems(product) {
    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems); 
    console.log("My cartItems are", cartItems);

    if(cartItems != null){

        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].InCart +=1;
    } else {
        product.InCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }


    localStorage.setItem("productInCart", JSON.stringify
    (cartItems));
}

function totalCost(product) {
    // console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost );

    if(cartCost != null) {
       cartCost = parseInt(cartCost);
       localStorage.setItem("totalCost", cartCost +
       product.price);
    }else{
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart(){
    let cartItems = localStorage.getItem("productInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
  if( cartItems && productContainer ) {
      productContainer.innerHTML = '';
      Object.values(cartItems).map(item => {
        productContainer.innerHTML += `
        <div class="product">
            <ion-icon name="close-outline"></ion-icon>
            <img src"./images/${item.tag}.jpg">
            <span>${item.name}</span>
        </div>
        <div class="price">${item.price},00 PLN</div>
        <div class="quantity">
            <ion-icon class="decrease "
            name="chevron-back-outline"></ion-icon>
            <span>${item.InCart}</Span>
            <ion-icon class="increase"
            name="chevron-forward-outline"></ion-icon>
        </div>
        <div class="total">
            ${item.InCart * item.price},00 PLN
        </div>
            `;

    });


 productContainer.innerHTML += `
    <div class="basketTotalContainer">
      <h4 class="BasketTotalTitle">
          Basket Total
      </h4>
      <h4 class="basketTotal">
          :${cartCost},00 PLN
      </h4>
    `;

  }
}

onloadCartNumbers();
displayCart();