async function goalCreateFormHandler(event) {
    event.preventDefault();
    
    const title = document.querySelector('input[name="goal-title"]').value.trim();
    const description = document.querySelector('#goal-description').value.trim();
    const category = Number(document.querySelector('#goal-category').value);
    const subcategory = document.querySelector('#goal-sub-category').value.trim();
    const dueDate = document.querySelector('#goalDueDate').value;
    const status = "initiated";

  // Creating a new form data obj and appending with user datas
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category_id", category);
    formData.append("subcategory", subcategory);
    formData.append("due_date", dueDate);
    
    //formData.append("pr", profile_img.files[0]);
    
    //if (username && email && password) {
      const response = await fetch('/api/goals', {
        method: 'post',
        body: JSON.stringify({
            title,
            description,
            category,
            subcategory,
            dueDate,
            status
          }),
        headers: { 'Content-Type': 'application/json' }
        });
      console.log(title,description,category,subcategory,dueDate,status);
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    
}

document.querySelector('.create-goal-form').addEventListener('submit', goalCreateFormHandler);