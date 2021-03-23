async function participateFormHandler(event){
    event.preventDefault();
    const user_id = event.target.getAttribute('userId');
    const goal_id = window.location.toString().split('/')[window.location.toString().split('/').length -1];
    const status = 'Not Started';

    const response = await fetch('/api/member_goals', {
        method: 'post',
        body: JSON.stringify({
            user_id,
            goal_id,
            status
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#particpateBtn').addEventListener('click', participateFormHandler);