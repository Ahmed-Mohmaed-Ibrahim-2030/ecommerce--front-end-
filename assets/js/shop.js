var data
var persentedProducts = [];
let currentPag = 0;
sessionStorage.productID = 1;
let xhr = new XMLHttpRequest();
xhr.open('GET', "store-demo-data.json", true);
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
        persentedProducts = data.products;
        pagination(persentedProducts);
        if (document.getElementById("pagination").children.length >= 1) {
            document.getElementById("pagination").children[0].children[1].classList.add("pag-active");
            document.getElementById("pagination").children[0].children[0].disabled = true;
        }
        document.getElementById("span-result").innerHTML = persentedProducts.length > 0 ? persentedProducts.length + "result found" : "no result nound";

    }

}
xhr.send();
//this function create card take an object as aparameter and return card object
function searchChange(e) {
    // e.target.style.backgroundColor = "red";
    document.getElementById("products").innerHTML = null;
    persentedProducts = [];
    for (let i in data.products) {
        //  console.log(data.products[i].name.includes(e.target.value), data.products[i].name, e.target.value);
        if (data.products[i].name.toLowerCase().includes(e.target.value.toLowerCase())) {
            persentedProducts.push(data.products[i])
                // document.getElementById("products").appendChild((createCard(data.products[i])));
        }

    }
    pagination(persentedProducts);


    document.getElementById("span-result").innerHTML = persentedProducts.length > 0 ? persentedProducts.length + " result found" : "no  result found";
}


function createCard(product) {
    //create div as card
    let card = document.createElement('div');
    //card.id = product.id;
    //add class card to div card
    card.classList.add("card");
    //card div for img 
    let imgCard = document.createElement('div');
    let imgLink = document.createElement("a");
    imgLink.href = "./details.html";
    //create img
    let img = document.createElement('img');
    //assign src by prodcut name
    img.src = product.img;
    imgLink.appendChild(img);
    imgLink.addEventListener("click", function(e) {
        sessionStorage.productID = product.id;
    })

    imgCard.appendChild(imgLink);
    card.appendChild(imgCard);
    let cardData = document.createElement('div');
    let ratePrice = document.createElement('div');
    ratePrice.classList.add("price-rate");
    // console.log(product.rating);
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
    let nameLink = document.createElement("a");
    nameLink.href = "./details.html";
    nameLink.appendChild(productName);
    nameLink.style.textDecoration = "none";
    nameLink.style.color = "#6e6b7b";
    nameLink.classList.add("name-link");
    nameLink.addEventListener("click", function(e) {
        sessionStorage.productID = product.id;
    })
    cardData.appendChild(nameLink);
    cardData.appendChild(productdesc);
    let wishlist = document.createElement('div');
    let wisbtn = document.createElement('a');
    let hart = document.createElement('i');

    hart.classList.add("fa-regular", "fa-heart");
    if (localStorage.wishlist && localStorage.wishlist.split(",").indexOf(product.id + "") > -1) {
        hart.classList.remove("fa-regular")
        hart.classList.add("fa-solid", "red");
    }
    let cart = document.createElement('i');
    cart.classList.add("fa-solid", "fa-cart-shopping");
    wisbtn.appendChild(hart);
    wisbtn.appendChild(document.createTextNode(" Wishlist"));
    wisbtn.addEventListener("click", function(e) {
        e.target.children[0].classList.toggle("fa-solid");
        e.target.children[0].classList.toggle("fa-regular");
        e.target.children[0].classList.toggle("red");
        //  console.log(localStorage.wishlist.split(""));
        // console.log(localStorage.wishlist.split(",").indexOf(product.id + ""))
        if (localStorage.wishlist && localStorage.wishlist.split(",").indexOf(product.id + "") > -1) {
            localStorage.wishlist = localStorage.wishlist.replaceAll(product.id + ",", "")
        } else {
            localStorage.wishlist = localStorage.wishlist ? localStorage.wishlist + product.id + "," : product.id + ",";
        }
    })
    wisbtn.classList.add("wisbtn");
    wishlist.appendChild(wisbtn);
    // console.log(wishlist);
    cardData.appendChild(wishlist);
    let addtocart = document.createElement('div');
    let cartbtn = document.createElement('a');


    cartbtn.appendChild(cart);
    cartbtn.classList.add("cartbtn");
    cartbtn.appendChild(document.createTextNode(' Add to Cart'));
    cartbtn.addEventListener("click", function(e) {
        if (localStorage.cart && localStorage.cart.split(",").indexOf(product.id + "") > -1) {
            localStorage.cart = localStorage.cart.replaceAll(product.id + ",", "")
        } else {
            localStorage.cart = localStorage.cart ? localStorage.cart + product.id + "," : product.id + ",";
        }
    })
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
//function return starts based on rating  
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
function pagination(data) {



    if (persentedProducts.length > 9 && document.getElementById("products").children.length < 1) {
        appch(data, 0);
        if (document.getElementById("pagination").children.length < 1)
            document.getElementById("pagination").appendChild(createButtons(Math.ceil(data.length / 9)));
    } else if (document.getElementById("products").children.length < 1) {
        document.getElementById("pagination").innerHTML = null;
        for (let i in data) {
            console.log(data[i]);
            document.getElementById("products").appendChild(createCard(data[i]));
        }
    }
}

function appch(data, start) {
    document.getElementById("products").innerHTML = null;

    for (let i = start; i < Math.min(start + 9, persentedProducts.length); i++) {
        //  console.log(data[i])
        document.getElementById("products").appendChild(createCard(data[i]));
    }


}

function createButtons(numberOfBtn) {
    let pagDiv = document.createElement("div");
    pagDiv.classList.add("pag-div");
    let btn0 = document.createElement("button");
    btn0.innerHTML = "<";
    btn0.href = "#";
    btn0.onclick = function(e) {
        Pagbtn(e);
    }
    btn0.setAttribute("data-pag", -1);
    pagDiv.appendChild(btn0);
    for (let i = 0; i < numberOfBtn; i++) {
        let btn0 = document.createElement("button");
        btn0.innerHTML = i + 1;
        btn0.href = "#";
        btn0.setAttribute("data-pag", i);
        btn0.onclick = function(e) {
            Pagbtn(e);
        }
        pagDiv.appendChild(btn0);
    }
    let btn1 = document.createElement("button");
    btn1.innerHTML = ">";
    btn1.href = "#";
    btn1.setAttribute("data-pag", 1.5);
    btn1.onclick = function(e) {
        Pagbtn(e);
    }
    pagDiv.appendChild(btn1);
    return pagDiv;

}


function Pagbtn(e) {
    if (e.target.getAttribute("data-pag") == -1) {
        document.getElementById("pagination").children[0].children[currentPag].click();

    } else if (e.target.getAttribute("data-pag") == 1.5) {
        console.log(currentPag);
        //  document.getElementById("pagination").children[0].children[0].disabled = false;
        console.log(currentPag == 0 ? currentPag + 2 : currentPag + 1);
        console.log(document.getElementById("pagination").children[0].children[currentPag == 0 ? ++currentPag + 1 : ++currentPag]);
        document.getElementById("pagination").children[0].children[currentPag == 0 ? ++currentPag + 1 : ++currentPag].click();
    } else if (e.target.getAttribute("data-pag") == 0) {

        document.getElementById("pagination").children[0].children[0].disabled = true;
        document.getElementById("pagination").children[0].children[document.getElementById("pagination").children[0].children.length - 1].disabled = false;
        appch(persentedProducts, e.target.getAttribute("data-pag") * 9)
        for (let i of document.getElementById("pagination").children[0].children) {
            i.classList.remove("pag-active");
        }
        e.target.classList.add("pag-active");
        currentPag = e.target.getAttribute("data-pag");

        // console.log(document.getElementById("pagination").children[0].children.length - 2)

    } else if (e.target.getAttribute("data-pag") == document.getElementById("pagination").children[0].children.length - 3) {
        //   console.log(e.target.getAttribute("data-pag") == 3);
        document.getElementById("pagination").children[0].children[document.getElementById("pagination").children[0].children.length - 1].disabled = true;
        document.getElementById("pagination").children[0].children[0].disabled = false;
        appch(persentedProducts, e.target.getAttribute("data-pag") * 9)
        for (let i of document.getElementById("pagination").children[0].children) {
            i.classList.remove("pag-active");
        }
        e.target.classList.add("pag-active");
        currentPag = e.target.getAttribute("data-pag");
    } else {

        document.getElementById("pagination").children[0].children[0].disabled = false;
        document.getElementById("pagination").children[0].children[document.getElementById("pagination").children[0].children.length - 1].disabled = false;
        appch(persentedProducts, e.target.getAttribute("data-pag") * 9)
        for (let i of document.getElementById("pagination").children[0].children) {
            i.classList.remove("pag-active");
        }
        e.target.classList.add("pag-active");
        currentPag = e.target.getAttribute("data-pag");
    }
}