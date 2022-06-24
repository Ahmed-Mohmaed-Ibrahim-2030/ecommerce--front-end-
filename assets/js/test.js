let req = new XMLHttpRequest();

req.open("GET","/Js/storeImg.json");

req.send();

req.addEventListener("readystatechange",function(){

    if( req.readyState == 4 && req.status == 200){

        dataObj = JSON.parse(req.response).products;

        displayItem();
        
    }
    
})

let str = "";

function displayItem(){

    for(i = 0 ; i < dataObj.length; i++){
        
        str += `
            <section id="leftSection">
            <img src="${dataObj[i].img}" onclick="displayDetails(${dataObj[i].id})" alt="">
            </section>
            
        `

        document.getElementById("mainDiv").innerHTML = str;
    }
}

let strDetails = "";

function displayDetails(id){

    localStorage.setItem("id",id)
    
    window.open("details.html","_self");
}
