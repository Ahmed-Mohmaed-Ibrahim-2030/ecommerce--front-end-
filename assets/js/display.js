var allData = new XMLHttpRequest();
let product;
allData.open("GET", "./assets/js/store-demo-data.json");

allData.send();

allData.addEventListener("readystatechange", function() {

    if (allData.readyState == 4 && allData.status == 200) {

        dataObj = JSON.parse(allData.response).products;

        displayDetalis();

    }

})

// var washList = document.getElementById("heart");

// function colorHeart(){

//         washList.classList.toggle("red");
//         washList.classList.toggle("fa-solid");
//         washList.classList.toggle("fa-regular");

// }

function displayDetalis() {

    for (i = 0; i < dataObj.length; i++) {

        if (sessionStorage.getItem("productID") == dataObj[i].id) {
            product = dataObj[i];
            strDetails = `
        <section id="leftSection">
        <img src="${dataObj[i].img}" alt="">
        </section>
        <section id="rightSection">
            <h3>${dataObj[i].name}</h3>
            <p>By : <span>${dataObj[i].brand}</span></p>
            <p>${dataObj[i].price} $</p>
            <p>Avilable : <span>${dataObj[i].available}</span></p>
            <p>${dataObj[i].discription}</p>
            <h5><i class="fa-solid fa-cart-shopping" style="margin-right: 15px "></i> Free Shipping</h5>
            <h5><i class="fa-solid fa-dollar-sign"  style="margin-right: 25px ; margin-left:5px; margin-bottom:50px"></i>EMI options available</h5>
            <div>
                <p>colors : </p>
                <ul>
                    <li style="color: red;">${dataObj[i].colors[0]}</li>
                    <li style="color: purple;">${dataObj[i].colors[1]}</li>
                    <li style="color: green;">${dataObj[i].colors[2]}</li>
                </ul>
            </div>
        </section>
        <aside>
        <a id="addtocart" onclick="addToCart(event)" ><i class="fa-solid fa-cart-shopping" style="margin-right: 15px "></i>Add To Cart</a>
        <a id="wishlist" onclick="wishlist(event)" ><i  class="fa-heart fa-regular" style="margin-right: 15px" id="heart"></i>Wishlist</a>
        </aside>
        <article>
            <div>
            <i class="fa-solid fa-archway" style="font-size:36px ; color:#7367F0; line-height:0 ;margin-bottom: 50px"></i>
                <h2>100% Original</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
            <div>
                <i class="fa-solid fa-clock" style="font-size:36px ; color:#7367F0; line-height:0 ;margin-bottom: 50px"></i>
                <h2>10 Day Replacement</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
            <div>
                <i class="fa-solid fa-shield" style="font-size:36px ; color:#7367F0; line-height:0 ;margin-bottom: 50px"></i>
                <h2>1 Year Warranty</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
        </article>
    `

            document.getElementById("divDetails").innerHTML = strDetails;
            // localStorage.removeItem("id");
        } else {
            continue
        }
    }
}

var washList = document.getElementById("heart");

function colorHeart() {

    washList.classList.toggle("red");
    washList.classList.toggle("fa-solid");
    washList.classList.toggle("fa-regular");


}
//console.log(document.getElementById("addtocart"));

function addToCart(e) {
    e.preventDefault();
    if (localStorage.cart && localStorage.cart.split(",").indexOf(product.id + "") > -1) {
        localStorage.cart = localStorage.cart.replaceAll(product.id + ",", "")
    } else {
        localStorage.cart = localStorage.cart ? localStorage.cart + product.id + "," : product.id + ",";
    }

}
window.onload = function() {
    var hart = document.getElementById("heart");
    console.log(hart);
    hart.classList.add("fa-regular", "fa-heart");
    if (localStorage.wishlist && localStorage.wishlist.split(",").indexOf(product.id + "") > -1) {
        hart.classList.remove("fa-regular")
        hart.classList.add("fa-solid", "red");
    }
}

function wishlist(e) {
    e.preventDefault();
    e.target.children[0].classList.toggle("fa-solid");
    e.target.children[0].classList.toggle("fa-regular");
    e.target.children[0].classList.toggle("red");
    if (localStorage.wishlist && localStorage.wishlist.split(",").indexOf(product.id + "") > -1) {
        localStorage.wishlist = localStorage.wishlist.replaceAll(product.id + ",", "")
    } else {
        localStorage.wishlist = localStorage.wishlist ? localStorage.wishlist + product.id + "," : product.id + ",";
    }
}