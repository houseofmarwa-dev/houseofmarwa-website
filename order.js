// Load cart from localStorage
let cartData = JSON.parse(localStorage.getItem("cart") || "[]");

// Calculate total
function calculateTotal() {
    return cartData.reduce((sum, p) => sum + Number(p.price), 0);
}

// Checkout event
function startCheckout() {

    let totalAmount = calculateTotal() * 100; // amount in paise

    // Razorpay Payment Options
    let options = {
        key: "rzp_test_xxxxxxxxx",  // YOUR KEY ID
        amount: totalAmount,
        currency: "INR",
        name: "House of Marwa",
        description: "Order Payment",
        image: "assets/logo.png",

        handler: function (response) {
            saveOrder(response.razorpay_payment_id);
            alert("Payment Successful!");
        },

        prefill: {
            name: "Customer",
            email: "test@example.com",
            contact: "9999999999"
        },

        theme: {
            color: "#FF8AD9"
        }
    };

    let rzp = new Razorpay(options);
    rzp.open();
}

// SAVE ORDER TO FIRESTORE
function saveOrder(paymentId) {

    let order = {
        items: cartData,
        total: calculateTotal(),
        paymentId: paymentId,
        timestamp: Date.now(),
        status: "Pending"
    };

    db.collection("orders")
      .add(order)
      .then(() => {
          console.log("Order saved");
          localStorage.removeItem("cart");
      });
}
