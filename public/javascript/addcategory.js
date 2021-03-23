async function categoryCreateFormHandler(event) {
    event.preventDefault();
    
    const title = document.querySelector('#cat-title').value.trim();
    const goal_id = window.location.toString().split('/')[window.location.toString().split('/').length -1];
    const description = document.querySelector('#cat-description').value.trim();
    const start_date = document.querySelector('#stepStartDate').value;
    const due_date = document.querySelector('#stepDueDate').value;
    
    // console.log(req.params.id);
    // console.log(title, description, start_date, due_date, goal_id);

//   // Creating a new form data obj and appending with user datas
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("category_id", category);
//     formData.append("subcategory", subcategory);
//     formData.append("due_date", dueDate);
    
//     //formData.append("pr", profile_img.files[0]);
    
    if (title && description && start_date && due_date && goal_id) {
        const response = await fetch('/api/steps', {
            method: 'post',
            body: JSON.stringify({
                title,
                goal_id,
                description,
                start_date,
                due_date
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

document.querySelector('#addCategoryModal').addEventListener('submit', categoryCreateFormHandler);