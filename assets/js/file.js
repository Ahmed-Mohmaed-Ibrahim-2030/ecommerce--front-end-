let req = new XMLHttpRequest();

req.open("GET","store-demo-data.json");

req.send();

req.addEventListener("readystatechange",function(){

    if( req.readyState == 4 && req.status == 200){

        dataObj = JSON.parse(req.response).products;

        displayDetails();
        
    }
    
})

let str = "";

function displayDetails(id){

    for(i = 0 ; i < dataObj.length; i++){

        if(id == dataObj[i].id){

            str += `
            <section id="leftSection">
            <img src="${dataObj[i].img}" alt="">
            </section>
            <section id="rightSection">
                <h3>${dataObj[i].name}</h3>
                <p>By : <span>${dataObj[i].brand}</span></p>
                <p>${dataObj[i].price}</p>
                <p>Avilable : <span>${dataObj[i].available}</span></p>
                <p>${dataObj[i].discription}</p>
                <div>
                    <p>colors : </p>
                    <ul>
                        <li style="color: red;">${dataObj.colors}</li>
                        <li style="color: purple;">${dataObj.colors}</li>
                        <li style="color: green;">${dataObj.colors}</li>
                    </ul>
                </div>
            </section>
            <aside>
            <a href="#">View in Cart</a>
            <a href="#">Wishlist</a>
            </aside>
            <article>
                <div>
                    <h2>100% Original</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
                <div>
                    <h2>10 Day Replacement</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
                <div>
                    <h2>1 Year Warranty</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            </article>
        `

        document.getElementById("mainDiv").innerHTML = str;
        }
        else
        {
            continue;
        }
    }
    

}

