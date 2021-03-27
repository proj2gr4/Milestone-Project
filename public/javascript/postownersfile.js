async function editProfileFormHandler(event){
    event.preventDefault();
    // const user_id = event.target.getAttribute('userId');
    var user_id = document.getElementById("editprofile-btn").getAttribute("userid");
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    // alert(user_id);

    // const formData = new FormData();
    // formData.append("username", username);
    // formData.append("email", email);

    if (username && email) {
        const response = await fetch(`/api/users/edit/${user_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                "username": username,
                "email": email
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            location.reload();
        } else {
          alert(response.statusText);
        }
      }
}

document.querySelector('#editProfileModal').addEventListener('submit', editProfileFormHandler);