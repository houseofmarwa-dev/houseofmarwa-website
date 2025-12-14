let products=[];

fetch("products.json")
.then(res=>res.json())
.then(data=>{
    products=data;
    loadAdminTable();
});

// SWITCH TABS
function adminTab(x){
    document.getElementById("admin-prod").style.display="none";
    document.getElementById("admin-add").style.display="none";
    document.getElementById("admin-orders").style.display="none";
    document.getElementById("admin-"+x).style.display="block";
}

// LOAD TABLE
function loadAdminTable(){
    let t=document.getElementById("admin-table");
    t.innerHTML="<tr><th>Name</th><th>Price</th><th>Category</th></tr>";

    products.forEach(p=>{
        t.innerHTML+=`
        <tr>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>${p.category}</td>
        </tr>`;
    });
}

// ADD PRODUCT
function addProduct(){
    let name=document.getElementById("new-name").value;
    let price=document.getElementById("new-price").value;
    let cat=document.getElementById("new-cat").value;

    products.push({name,price,category:cat,image:"assets/products/default.jpg"});

    loadAdminTable();
    alert("Product Added!");
}
