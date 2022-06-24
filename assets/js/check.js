// let product = {
//     "id": 1,
//     "name": "Apple Watch Series 5",
//     "price": 339.99,
//     "rating": 4,
//     "img": "https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/1.3b312012.png",
//     "discription": "On Retina display that never sleeps, so it’s easy to see the time and other important information, without raising or tapping the display. New location features, from a built-in compass to current elevation, help users better navigate their day, while international emergency calling1 allows customers to call emergency services directly from Apple Watch in over 150 countries, even without iPhone nearby. Apple Watch Series 5 is available in a wider range of materials, including aluminium, stainless steel, ceramic and an all-new titanium.",
//     "brand": "apple",
//     "available": true,
//     "colors": ["red", "purple", "green"]
// };

var data
var persentedProducts = [];
let currentPag = 0;
let xhr = new XMLHttpRequest();
xhr.open('GET', "./assets/js/store-demo-data.json", true);
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        data = JSON.parse(xhr.responseText);
        // console.log(data.products);
        // for (let i in data.products) {

        //     document.getElementById("products").appendChild((createCard(data.products[i])));

        // }
        // data = data.(function(e, i, ar) {
        //     return ar.indexOf(e) == i;
        // })
        //      console.log("ahmed");
        // persentedProducts = data.products;
        // pagination(persentedProducts);
        // if (document.getElementById("pagination").children.length >= 1) {
        //     document.getElementById("pagination").children[0].children[1].classList.add("pag-active");
        //     document.getElementById("pagination").children[0].children[0].disabled = true;
        // }
        // document.getElementById("result").innerHTML = persentedProducts.length > 0 ? persentedProducts.length + "Result Found" : "NO  Result Found";
        for (let i of data.products) {
            console.log(localStorage.cart.split(",").indexOf(i.id.toString()) > -1)
            if (localStorage.cart.split(",").indexOf(i.id.toString()) > -1) {
                document.getElementById("products").appendChild(createCheckCard(i));
            }
        }
    }

}
xhr.send();

function rate(rate) {
    let rateData = document.createElement('div');



    for (let i = 0; i < 5; i++) {
        if (i < rate) {
            let solidStar = document.createElement("i");
            solidStar.classList.add("fa-solid", 'fa-star');
            solidStar.style.color = "#ff9f43";
            rateData.appendChild(solidStar);
        } else {
            let regulardStar = document.createElement("i");

            regulardStar.classList.add("fa-regular", "fa-star");

            regulardStar.style.color = "#b9b9c3";
            rateData.appendChild(regulardStar);
        }

    }
    return rateData;
}



function createCheckCard(product) {
    let card = document.createElement("div");
    let count = 1;
    card.classList.add("pro-card");
    card.innerHTML = `
    <div class="card-data">
      <div class="card-data-img">
        <img src="${product.img}" alt="" />
      </div>
      <div class="card-data-text">
        <h3 class="name">
          ${product.name}
        </h3>
        <p class="brand">
          By <span class="brand-span">${product.brand}</span>
        </p>
        <div class="rate">
        
        </div>
        <p class="availability">
          ${product.available}
        </p>
        <div class="quantity">
          Qty :
          <div> <button>-</button>
            <span>${count}</span>
            <button>+</button></div>
        </div>
        <p class="delev-date">
        Delivery by Mon, May 16
        </p>
        <p class="offer" >
        10% off 4 offers Available
        </p>
      </div>
    </div>
    <div class="card-options">
      <div class="price">$${product.price}</div>
      <div class="free">free shipping </div>
      <button class="remove"><i class="fa-solid fa-xmark"></i> Remove</button>
      <button class="wishlist"></button>
    </div>
  `;
    if (product.available == true) {
        card.children[0].children[1].children[3].innerHTML = "IN Stock";
        card.children[0].children[1].children[3].classList.add("offer");
    } else {
        card.children[0].children[1].children[3].innerHTML = "Not In Stock!";
        card.children[0].children[1].children[3].classList.add("red");
    };

    card.children[0].children[1].children[2].appendChild(rate(product.rating));
    card.children[0].children[1].children[4].childNodes[1].children[0].onclick = function() {
        card.children[0].children[1].children[4].childNodes[1].children[1].innerHTML = count > 1 ? --count : 1;
    }
    card.children[0].children[1].children[4].childNodes[1].children[2].onclick = function() {
        card.children[0].children[1].children[4].childNodes[1].children[1].innerHTML = ++count;
    }
    card.children[1].children[2].onclick = function() {
        document.getElementById("products").removeChild(card);
        if (localStorage.cart && localStorage.cart.split(",").indexOf(product.id + "") > -1) {
            localStorage.cart = localStorage.cart.replaceAll(product.id + ",", "")
        } else {
            localStorage.cart = localStorage.cart ? localStorage.cart + product.id + "," : product.id + ",";
        }
    }
    card.children[1].children[3].onclick = function() {
        //  document.getElementById("products").removeChild(card);
        card.children[1].children[3].children[0].classList.toggle("fa-solid");
        card.children[1].children[3].children[0].classList.toggle("fa-regular");
        card.children[1].children[3].children[0].classList.toggle("red");
        if (localStorage.wishlist && localStorage.wishlist.split(",").indexOf(product.id + "") > -1) {
            localStorage.wishlist = localStorage.wishlist.replaceAll(product.id + ",", "")
        } else {
            localStorage.wishlist = localStorage.wishlist ? localStorage.wishlist + product.id + "," : product.id + ",";
        }
    }
    return card;
}
//console.log(createCheckCard(product));
//document.getElementsByTagName("main")[0].appendChild(createCheckCard(product));
//document.querySelector(".pro-card .card-data .card-data-text .rate").appendChild();
window.onload = function() {
    if (document.getElementById("products").children.length > 0) {
        for (let i of document.getElementsByClassName("wishlist")) {
            console.log(i);
            let hart = document.createElement('i');
            hart.classList.add("fa-regular", "fa-heart");
            let cart = document.createElement('i');
            cart.classList.add("fa-solid", "fa-cart-shopping");
            i.appendChild(hart);
            i.appendChild(document.createTextNode(" Wishlist"));
        }
    }
}

function wishClick(e) {
    e.target.children[0].classList.toggle("fa-solid");
    e.target.children[0].classList.toggle("fa-regular");
    e.target.children[0].classList.toggle("red");
}
// wisbtn.addEventListener("click", function(e) {
//     e.target.children[0].classList.toggle("fa-solid");
//     e.target.children[0].classList.toggle("fa-regular");
//     e.target.children[0].classList.toggle("red");
// })
//wisbtn.classList.add("wisbtn");
//wishlist.appendChild(wisbtn);
// console.log(document.getElementsByTagName("main").innerHTML)
// console.log("hammm")