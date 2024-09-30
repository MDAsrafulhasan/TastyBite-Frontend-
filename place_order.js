const LoadPlaceOrder = () =>{
    const user_id = localStorage.getItem('user_id');
    // console.log(user_id);
    fetch(`https://tastybite.onrender.com/carts/cart/?user_id=${user_id}`)
     .then(res => res.json())
     .then(data => displaycarts(data));
}

const displaycarts=(carts) =>{
    console.log(carts);
    let hasOrder = false;
    const parent = document.getElementById("tbody");
    carts.forEach((cartitems) => {
        if(!cartitems?.ordered)
        {
            hasOrder = true;
            // console.log(cartitems?.customer);
            // console.log(cartitems.items[0].fooditem.name);
            // console.log(cartitems?.id)
            cartitems?.items.forEach((item) => {
                const tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${item?.fooditem.name}</td>
            <td>${item?.fooditem.price}</td>
            <td>${item?.fooditem.discount}%</td>
            <td>${item?.fooditem.discounted_price}</td>
            <td>${item?.quantity}</td>
            <td>${item?.price}</td>
            <td><button class="remove-btn" onclick="removeCartItem(${item?.id})">Remove</button></td>
            `;

            parent.appendChild(tr);
            });
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td colspan="5" style="font-weight: bold;">Total Price</td>
                    <td style="font-weight: bold;">${cartitems?.total_price}</td>`;
            parent.appendChild(tr);
            
            // const tr = document.createElement("tr");
            // tr.innerHTML = `
            // <td>${cartitems.items[0].fooditem.name}</td>
            // <td>${cartitems.items[0].fooditem.price}</td>`;

            // parent.appendChild(tr);
        }
    })
    if (!hasOrder) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td colspan="7" style="text-align: center; font-weight: bold;">Please Do Some Order</td>`;
        parent.appendChild(tr);
    }
};

const removeCartItem = (foodId) => {
    console.log(foodId);

    fetch(`https://tastybite.onrender.com/carts/cartitems/${foodId}/`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => {
        if (response.status === 204) {
            console.log("Item removed successfully");
            window.location.href = "/place_order.html";
        } else {
            return response.json();
        }
    })
    .then(data => {
        if (data && data.error) {
            console.error("Error:", data.error);
        }
    })
    .catch(error => {
        console.error("Network error:", error);
    });
};
// const removeCartItem = (foodId) => {
//     console.log(foodId);

//     fetch(`https://tastybite.onrender.com/carts/cartitems/${foodId}`,{
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//         console.log("Item removed");
//         LoadPlaceOrder();
//     })
//     console.log("hhhhhhh");
// };
LoadPlaceOrder();