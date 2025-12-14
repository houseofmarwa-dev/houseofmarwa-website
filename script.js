// PAGE SWITCH
function showPage(id){
    document.querySelectorAll(".page").forEach(p => p.style.display="none");
    document.getElementById(id).style.display="block";
}

// PRODUCTS
let products=[];

fetch("products.json")
.then(res=>res.json())
.then(data=>{
    products=data;
    renderProducts();
});

// RENDER PRODUCTS
function renderProducts(){
    let box=document.getElementById("product-list");
    box.innerHTML="";
    products.forEach((p,i)=>{
        box.innerHTML+=`
        <div class="card ${p.category}">
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button class="primary" onclick="addToCart(${i})">Add to Cart</button>
        </div>`;
    });
}

// FILTER
function filterProducts(cat,btn){
    document.querySelectorAll(".filters button").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".card").forEach(c=>{
        c.style.display = (cat==="all" || c.classList.contains(cat)) ? "block" : "none";
    });
}

// CART
let cart = JSON.parse(localStorage.getItem("cart")||"[]");

function addToCart(i){
    cart.push(products[i]);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

document.getElementById("cart").onclick=()=>{
    let c=document.getElementById("cart-items");
    c.innerHTML="";
    cart.forEach(item=>{
        c.innerHTML+=`<div class="cart-item">${item.name} - ₹${item.price}</div>`;
    });
};

// LOGIN
function fakeLogin(){
    alert("Logged In Successfully");
    showPage("home");
}

// ADMIN LOGIN
function adminLogin(){
    let u=document.getElementById("admin-user").value;
    let p=document.getElementById("admin-pass").value;

    if(u==="admin" && p==="123"){
        window.location="admin.html";
    }else alert("Invalid Admin Credentials");
}
