async function categoryCreateFormHandler(event) {
    event.preventDefault();
    
    const title = document.querySelector('#cat-title').value.trim();
    const goal_id = window.location.toString().split('/')[window.location.toString().split('/').length -1];
    const description = document.querySelector('#cat-description').value.trim();
    const start_date = document.querySelector('#stepStartDate').value;
    const due_date = document.querySelector('#stepDueDate').value;
    
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
 async function deleteGoal(id){
    //  alert (id);
    const goalId = id;
    const response = await fetch(`/api/goals/${goalId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        // location.reload();
        location.replace("/profile");
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#addCategoryModal').addEventListener('submit', categoryCreateFormHandler);