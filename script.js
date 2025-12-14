function scrollToSection(id){
    document.getElementById(id).scrollIntoView({behavior:"smooth"});
}

// LOAD PRODUCTS
fetch("products.json")
.then(res=>res.json())
.then(data=>{
    let box = document.getElementById("product-list");
    box.innerHTML="";
    data.forEach(p=>{
        box.innerHTML += `
        <div class="product-card">
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
        </div>`;
    });
});
