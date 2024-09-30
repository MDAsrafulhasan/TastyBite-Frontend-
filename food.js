const loadandDisplayCategory = () => {
    fetch("https://tastybite.onrender.com/fooditem/category/")
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            data.forEach((category) => {
                const parent = document.getElementById("category");
                const p = document.createElement("p");
                p.classList.add("category-name");
                p.classList.add("col-2");
                p.innerHTML = `
                <p onclick="loadFoods('${category?.name}')">${category?.name}</p>
                `;
                parent.appendChild(p);
            });
        });
};

const loadFoods = (searchValue) => {
    document.getElementById("AllFood").innerHTML = "";
    // console.log(searchValue);
    fetch(`https://tastybite.onrender.com/fooditem/foods/?search=${searchValue ? searchValue : ""}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            // console.log(data.length);
            if (data.length > 0) {
                document.getElementById("nodata").style.display = "none";
                displayAllFoods(data);
            }
            else {
                document.getElementById("AllFood").innerHTML = "";
                document.getElementById("nodata").style.display = "block";
                document.getElementById("nodata").style.display = "flex";
                document.getElementById("nodata").style.justifyContent = "center";
            }
        });
};

const displayAllFoods = (foods) => {
    // console.log(foods);
    foods.forEach((food) => {
        const parent = document.getElementById("AllFood");
        const div = document.createElement("div");
        div.classList.add("food-cart");

        const price = parseInt(food?.price, 10);
        const discount = parseInt(food?.discount, 10);

        const discountSection = food?.discount > 0
            ? `<h5 class="discounted-price"><span class="taka">৳</span> ${price}</h5>  <span class="discount fs-6 m-lg-2"> ${discount}% OFF</span>
            <h5 class="amount_price"><span class="taka">৳</span> ${food?.discounted_price}</h5>`
            : `<h5 class="amount_price"><span class="taka discounted-price">৳</span> ${price}</h5>`;


        div.innerHTML = `
        <img class="food-img" src="${food?.image}" alt="">
            <h5 style="font-weight: bold;">${food?.name}</h5>
            <h6>${food?.description.slice(0, 30)}...</h6>
            <p>
            ${food?.category?.map((item) => {
            return `<button class="category-button">${item}</button>`
        })}
            </p>
            <hr>
            ${discountSection}
            <div class="d-flex justify-content-around">
                <button id="search-button"><a class="anchor-tag" href="Food_details.html?fooditemId=${food?.id}">Details</a></button>
                <button id="search-button" onclick="Addcart(${food?.id})">Add to cart</button>
            </div>
        `;
        parent.appendChild(div);
    });
};

const handleSearch = () => {
    const searchValue = document.getElementById("search").value;
    // console.log(searchValue);
    loadFoods(searchValue);
};

const Addcart = (foodId) => {
    // console.log("Add kor cart");
    const user_id = localStorage.getItem("user_id");
    console.log(user_id);
    console.log(foodId);

    fetch(`https://tastybite.onrender.com/customer/list/?user_id=${user_id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data[0].id);

            const customerId = data[0].id;

            const info = {
                customer: customerId,
                fooditem: foodId,
                quantity: 1,
            };

            fetch("https://tastybite.onrender.com/carts/cartitems/",
                {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(info),
                }
            )
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    alert("Food added successfully to cart!");
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        })
        .catch((error) => {
            console.error('Error fetching customer:', error);
        });
}



loadFoods();
loadandDisplayCategory();