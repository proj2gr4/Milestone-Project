async function loginFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        if(response.statusText == "No user with that username address!"){
          $("#Modal-text").text("That Username does not exist!");
          $("#login-Error-Username-Modal").modal();
        }else{
          $("#Modal-text").text("Wrong Password!");
          $("#login-Error-Username-Modal").modal();
        }
      }
    }
  }
  
  async function signupFormHandler(event) {
    event.preventDefault();
    
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const profile_img = document.getElementById("file");

  // Creating a new form data obj and appending with user datas
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profile_img", profile_img.files[0]);
    
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: formData,
    //   headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        document.location.replace('/profile');
      } else if(response.statusText == "User already exsists!"){
          $("#Modal-sub-text").removeAttr('hidden');
          $("#Modal-sub-text").text("**User already exsists!**");
        }else if(response.statusText == "That email already has an account!"){
          $("#Modal-sub-text").removeAttr('hidden');
          $("#Modal-sub-text").text("**That email already has an account!**");
        }else{
          
          
        }
    }
}


  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
  