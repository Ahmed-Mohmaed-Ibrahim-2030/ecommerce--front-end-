let xhr = new XMLHttpRequest();
xhr.open('GET', "./assets/js/wishlist.json", true);
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        // console.log(data.products);
        console.log(localStorage.wishlist.split(","))
        for (let i in data.products) {
            if (localStorage.wishlist.split(",").indexOf(data.products[i].id + "") > -1) { document.getElementById("products").appendChild((createCard(data.products[i]))); }

        }

    }

}
xhr.send();
//this function create card take an object as aparameter and return card object
function createCard(product) {

    let card = document.createElement('div');
    card.classList.add("card");
    //card.setAttribute("id",`product_${product.id}` );
    let imgCard = document.createElement('div');

    let img = document.createElement('img');
    img.src = product.img;
    imgCard.appendChild(img);
    card.appendChild(imgCard);
    let cardData = document.createElement('div');
    let ratePrice = document.createElement('div');
    ratePrice.classList.add("price-rate");
    console.log(product.rating);
    ratePrice.appendChild(rate(product.rating));
    let price = document.createElement('div');
    price.innerHTML = `<strong>${product.price}$</strong>`;
    ratePrice.appendChild(price);
    cardData.appendChild(ratePrice);
    let productName = document.createElement('div');
    productName.style.margin = "5px ";
    let productdesc = document.createElement('p');
    // productdesc.style.fontSize = ".7rem";
    // console.log(product.name.split('').length);
    productdesc.innerHTML = `${product.discription.length>45?product.discription.substring(0,45)+"...":product.discription}`;
    productName.innerHTML = `<strong>${product.name.length>25?product.name.substring(0,25)+"...":product.name}</strong>`;
    productName.style.width = "100%";
    productName.style.height = "20px";
    productName.style.textOverflow = "none";
    cardData.appendChild(productName);
    cardData.appendChild(productdesc);
    let remove = document.createElement('div');
    let rembtn = document.createElement('a');
    let x = document.createElement('i');
    x.classList.add("fa-solid", "fa-xmark");
    let cart = document.createElement('i');
    cart.classList.add("fa-solid", "fa-cart-shopping");
    rembtn.appendChild(x);
    rembtn.appendChild(document.createTextNode(" remove"));
    // rembtn.removeEventListener("click", function(e) {
    //     e.target.children[0].classList.toggle("fa-solid");
    //     e.target.children[0].classList.toggle("fa-xmark");
    //     e.target.children[0].classList.toggle("black");
    //       })
    rembtn.classList.add("rembtn");
    rembtn.addEventListener("click", function(e) {
        if (localStorage.wishlist && localStorage.wishlist.split(",").indexOf(product.id + "") > -1) {
            localStorage.wishlist = localStorage.wishlist.replaceAll(product.id + ",", "")
        }
        e.target.parentElement.parentElement.parentElement.remove();
        console.log("rembtn.classList.toggle")
    });
    remove.appendChild(rembtn);
    console.log(remove);
    cardData.appendChild(remove);
    let addtocart = document.createElement('div');
    let cartbtn = document.createElement('a');


    cartbtn.appendChild(cart);
    cartbtn.classList.add("cartbtn");
    cartbtn.appendChild(document.createTextNode(' Add to Cart'));
    addtocart.appendChild(cartbtn);
    cardData.appendChild(addtocart);
    card.appendChild(cardData);
    //     return `<div className="card">
    // <div className="img-crad">
    //   <img src=${product.img} alt="" />
    // </div>
    // <div className="crad-data">
    //   <div className="rate-price">
    //   ${rate(product.rating)}
    //   </div>
    //   <div>
    //   ${product.price}
    //   </div>
    //   <div className="product-name">
    //     <strong>
    //     ${product.name}
    //     </strong>
    //   </div>
    //   <div className="wishlist">
    //     <button onclick="wishlist(event)">
    //       <i className="fa-regular fa-heart" /> wishlist
    //     </button>
    //   </div>
    //   <div className="add-to-cart">
    //     <button>
    //       <i className="fa-solid fa-cart-shopping" /> Add To Cart
    //     </button>
    //   </div>
    // </div></div>
    // `;

    return card;
}

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
//document.getElementById("mainBody").appendChild(rate(4));