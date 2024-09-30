const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("fooditemId");
    // console.log(param);
    fetch(`https://tastybite.onrender.com/fooditem/foods/${param}/`)
        .then(res => res.json())
        .then(data => displayDetails(data));

    fetch(`https://tastybite.onrender.com/customer/review/?food_item_id=${param}`)
        .then(res => res.json())
        .then(data => displayReview(data));
}

const displayDetails = (food) => {
    // console.log(food);
    const param = new URLSearchParams(window.location.search).get("fooditemId");
    const parent = document.getElementById("Full-details");
    const div = document.createElement("div");
    div.classList.add("food-details-container");

    const price = parseInt(food?.price, 10);
    const discount = parseInt(food?.discount, 10);

    const discountSection = food?.discount > 0
        ? `<h5 class="discounted-price"><span class="taka">৳</span> ${price}</h5>  <span class="discount fs-6 m-lg-2"> ${discount}% OFF</span>
            <h5 class="amount_price"><span class="taka">৳</span> ${food?.discounted_price}</h5>`
        : `<h5 class="amount_price"><span class="taka discounted-price">৳</span> ${price}</h5>`;


    div.innerHTML = `
            <div>
                <img class="food-detail-img" src=${food?.image} alt="">
            </div>
            <div class="food-details-info">
                <h3 style="font-weight: bold;">${food?.name}</h3>
                <p class="detail-description">${food?.description}</p>
                <p>
            ${food?.category?.map((item) => {
        return `<button class="category-button">${item}</button>`
    })}
                </p>
                ${discountSection}
                <button id="search-button" onclick="Addcart(${param})">Add to Cart</button>
            </div>
    `;
    parent.appendChild(div);

};

const displayReview = (reviews) => {
    console.log(reviews);
    // const parent = document.createElement("Food-review");
    reviews.forEach((review) => {
        const parent = document.getElementById("Food-review");
        const div = document.createElement("div");
        div.classList.add("review-card");
        div.innerHTML = `
        <img src=${review.customer.image} alt="">
                    <h4>${review.customer.user}</h4>
                    <h6>${review.rating}</h6>
                    <p>${review.comment}</p>
        `;
        parent.appendChild(div);
    });
};


// const submitReview = (event) => {
//     event.preventDefault();
//     const userId = localStorage.getItem('user_id');
//     const rating = document.getElementById("rating").value;
//     const comment = document.getElementById("comment").value;
//     const foodItemId = new URLSearchParams(window.location.search).get("fooditemId");
//     console.log(rating, comment,foodItemId);

//     fetch(`https://tastybite.onrender.com/customer/list/?user_id=${userId}`)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data[0].id);

//             const customerId = data[0].id;


//             fetch("https://tastybite.onrender.com/customer/review/", {
//                 method: "POST",
//                 headers: {
//                     "content-type": "application/json",
//                     // "Authorization": `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({
//                     rating: rating,
//                     comment: comment,
//                     customer: customerId,
//                     food_item: foodItemId,
//                 }),
//             })
//                 .then(res => res.json())
//                 .then(data => {
//                     alert("Review submitted successfully!");
//                     console.log(data);
//                 })
//                 .catch(error => {
//                     alert("Please wait until the order completes");
//                     console.error("Error:", error);
//                 });

//         });

// };



const submitReview = (event) => {
    event.preventDefault();
    const userId = localStorage.getItem('user_id');
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;
    const foodItemId = new URLSearchParams(window.location.search).get("fooditemId");
    console.log(rating, comment,foodItemId);

    fetch("https://tastybite.onrender.com/customer/review/", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            // "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            rating: rating,
            comment: comment,
            customer: userId,
            food_item: foodItemId,
        }),
    })
        .then(res => res.json())
        .then(data => {
            alert("Review submitted successfully!");
            console.log(data);
        })
        .catch(error => {
            alert("Please wait until the order completes");
            console.error("Error:", error);
        });
};

getparams();



// const displayReview = (reviews) => {     // try to do some different
//     console.log(reviews.length);
//     // parent.innerHTML='';
//     if(reviews.length>0){
//         reviews.forEach((review) =>{
//             const parent = document.createElement("Food-review");
//             // const parent = document.getElementById("Food-review");
//             const div = document.createElement("div");
//             div.classList.add("review-card");
//             div.innerHTML = `
//             <img src=${review.customer.image} alt="">
//                         <h4>${review.customer.user}</h4>
//                         <h6>${review.rating}</h6>
//                         <p>${review.comment}</p>
//             `;
//             parent.appendChild(div);
//         });
//     }
//     else{
//         const parent = document.getElementById("Food-review-nodata");
//         const div = document.createElement("div");
//         div.innerHTML = `<p>No Review </p>`
//         parent.appendChild(div);
//     }
// };

