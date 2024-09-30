const handlelogOut = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    fetch("https://tastybite.onrender.com/customer/logout", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log("logout completed");
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        window.location.href = "/index.html";
      });
  };
  