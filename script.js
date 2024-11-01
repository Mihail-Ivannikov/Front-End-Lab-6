function addUserToDom(data) {
    const users = document.getElementById("user-container");
  
    const image = document.createElement("img");
    image.src = data.picture.large;
    image.alt = "User";
  
    const userName = data.name;
    const name = document.createElement("p");
    name.textContent = `Name: ${userName.title} ${userName.first} ${userName.last}`;
  
    const country = document.createElement("p");
    country.textContent = `Country: ${data.location.country}`;
  
    const postcode = document.createElement("p");
    postcode.textContent = `Postcode: ${data.location.postcode}`;
  
    const phone = document.createElement("p");
    phone.textContent = `Phone: ${data.phone}`;
  
    const userData = [image, name, country, postcode, phone];
  
    const user = document.createElement("div");
    user.classList.add("user");
  
    for (const element of userData) {
      user.appendChild(element);
    }
  
    users.appendChild(user);
  }
  
  function fetchUser() {
    return fetch("https://randomuser.me/api")
      .then((response) => response.json())
      .then((data) => data.results[0])
      .catch((error) => {
        console.error("Error fetching user:", error);
        throw error;
      });
  }
  
  function fetchAllUsers() {
    const feedback = document.getElementById("feedback");
    const promises = [];
  
    for (let i = 0; i < 5; i++) {
      promises.push(fetchUser());
    }
  
    Promise.all(promises)
      .then((users) => {
        users.forEach((user) => {
          addUserToDom(user);
        });
        feedback.textContent = "Success!";
        feedback.style.color = "#00FF00";
      })
      .catch((error) => {
        feedback.textContent = "Failed!";
        feedback.style.color = "red";
        console.error("Error fetching all users:", error);
      });
  }
  