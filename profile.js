const loadProfile = () => {
    const user_id = localStorage.getItem("user_id");
    console.log(user_id);
    fetch(`https://tastybite.onrender.com/customer/list/?user_id=${user_id}`)
        .then(res => res.json())
        .then(data => displayProfile(data));


    fetch()
};

const displayProfile = (data) => {
    console.log(data);
    const parent = document.getElementById("profile-details");
    const div = document.createElement("div");
    div.classList.add("user-details");
    div.innerHTML = `
        <img class="profile-pic" src=${data[0].image} alt="">
            <h1>${data[0].user}</h1>
            <h4>${data[0].address}</h4>
            <h4>${data[0].contact_number}</h4>
    `;
    parent.appendChild(div);
}


const LoadOrderHistory = () => {
    const user_id = localStorage.getItem('user_id');
    // console.log(user_id);
    fetch(`https://tastybite.onrender.com/carts/cart/?user_id=${user_id}`)
        .then(res => res.json())
        .then(data => displayOrderHistory(data));
}

const displayOrderHistory = (carts) => {
    console.log(carts);
    const parent = document.getElementById("profile-tbody");
    if (carts.length >= 1) {
        carts.forEach((cartitems) => {
            if (cartitems?.ordered) {
                // console.log(cartitems?.customer);
                // console.log(cartitems.items[0].fooditem.name);

                cartitems?.items.forEach((item) => {
                    const tr = document.createElement("tr");


                    tr.innerHTML = `
                <td>${item?.fooditem.name}</td>
            <td>${item?.fooditem.price}</td>
            <td>${item?.fooditem.discount}%</td>
            <td>${item?.fooditem.discounted_price}</td>
            <td>${item?.quantity}</td>
            <td>${item?.price}</td>
                `;
                    parent.appendChild(tr);
                });

                // console.log(cartitems?.ordered)
                const tr = document.createElement("tr");
                tr.innerHTML = `
                <td colspan="5" style="font-weight: bold;">Complete Order</td>
                <td style="font-weight: bold; color:green;">${cartitems?.ordered ? 'DONE' : 'PENDING'}</td>`;
                parent.appendChild(tr);

                // const tr = document.createElement("tr");
                // tr.innerHTML = `
                // <td>${cartitems.items[0].fooditem.name}</td>
                // <td>${cartitems.items[0].fooditem.price}</td>`;
            }
        })
    }
    else {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td colspan="6" style="text-align: center; font-weight: bold;">No Order History Found</td>`;
        parent.appendChild(tr);
    }
}

loadProfile();
LoadOrderHistory();