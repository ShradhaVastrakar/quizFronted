let login = document.getElementById("loginForm")
let register = document.getElementById("RegisterForm")
let url = "http://localhost:7000/api"

let homeLogin = () => {
    register.style.display = "none";
    login.style.display = "block";
}
let homeRegister = () => {
    login.style.display = "none";
    register.style.display = "block";
}


login.addEventListener("submit", (e) => {
    e.preventDefault();

    let email = loginForm.login_email.value;
    const loginData = { email };
    // console.log(loginData)
    loginfunc(loginData);
})

function loginfunc(loginData) {
    fetch(`${url}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                alert(data.error);
            } else {
                localStorage.setItem('token', data.token);
                alert(data.message);
                window.location.href = "Dashboard.html"
                // Redirect to Post Classifieds page or any other page
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to login');
        });
}

register.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = {
        Username:RegisterForm.register_username.value,
        email: RegisterForm.register_email.value,
     
    }
    signupfunc(data);
 
})


function signupfunc(signupData) {
    fetch(`${url}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Failed to signup');
        });
    }