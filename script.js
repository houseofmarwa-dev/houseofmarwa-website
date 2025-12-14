function loadCategory(category, elementId) {
    fetch("products.json")
        .then(res => res.json())
        .then(data => {
            let box = document.getElementById(elementId);
            box.innerHTML = "";

            data.filter(p => p.category === category)
                .forEach(p => {
                    box.innerHTML += `
                    <div class="product-card">
                        <img src="${p.image}">
                        <h3>${p.name}</h3>
                        <p>₹${p.price}</p>
                    </div>
                    `;
                });
        });
}
