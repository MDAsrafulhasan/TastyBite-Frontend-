const handleRegistration = (event) => {
  event.preventDefault();
  // console.log("kire");
  const username = getValue("username");
  const first_name = getValue("first_name");
  const last_name = getValue("last_name");
  const email = getValue("email");
  const contact_number = getValue("contuct_number");
  const address = getValue("address");
  const password = getValue("password");
  const confirm_password = getValue("password2");
  const image = document.getElementById("image").files[0];

  const data = new FormData();
  data.append("image", image);
  fetch("https://api.imgbb.com/1/upload?key=83fc93bc353ca9ec2b52e23efe6a2017", {     // using imgbb we can upload and save the image in database 
    method: "POST",
    body: data,
  })
    .then(res => res.json())
    .then(data => {
      const info = {
        username,
        first_name,
        last_name,
        email,
        password,
        confirm_password,
        contact_number,
        address,
        image: data.data.url,
      };

      if (password === confirm_password) {
        document.getElementById("error").innerText = "";
        if (
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            password
          )
        ) {
          console.log(info);

          fetch("https://tastybite.onrender.com/customer/register/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(info),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              alert("Registration Successful! Check your email");
            });

        } else {
          document.getElementById("error").innerText =
            "pass must contain eight characters, at least one letter, one number and one special character:";
        }
      } else {
        document.getElementById("error").innerText =
          "password and confirm password do not match";
        alert("password and confirm password do not match");
      }

    });

};


const handleLogin=(event)=>{
  event.preventDefault();
  const username = getValue("login-username");
  const password = getValue("login-password");
  // console.log(username,password);
  if(username,password){
    fetch("https://tastybite.onrender.com/customer/login/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data.token && data.user_id)
        {
          localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);
        window.location.href = "/food.html";
        }
      });
  }
};

const getValue = (id) => {
  // return document.getElementById(id).value;
  const value = document.getElementById(id).value;
  return value;
}





// withcout using imgbb. means without uploading this code is good


    // const info = {       
    //   username,
    //   first_name,
    //   last_name,
    //   email,
    //   password,
    //   confirm_password,
    //   contact_number,
    //   address,
    //   image: data.data.url,
    // };
  // console.log(info);


  // if (password === confirm_password) {
  //     document.getElementById("error").innerText = "";
  //     if (
  //       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
  //         password
  //       )
  //     ) {
  //     //   console.log(info);

  //       fetch("https://tastybite.onrender.com/customer/register/", {
  //         method: "POST",
  //         headers: { "content-type": "application/json" },
  //         body: JSON.stringify(info),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => console.log(data));



  //     } else {
  //       document.getElementById("error").innerText =
  //         "pass must contain eight characters, at least one letter, one number and one special character:";
  //     }
  //   } else {
  //     document.getElementById("error").innerText =
  //       "password and confirm password do not match";
  //     alert("password and confirm password do not match");
  //   }