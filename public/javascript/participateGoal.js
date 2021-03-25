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
// Update status:
async function changeStatus(user_id, membergoal_id, goal_id){
    let e = document.getElementById("goal_status");
    let status=e.options[e.selectedIndex].text;

    // const user_id = event.target.getAttribute('userid');
    const response = await fetch(`/api/member_goals/${membergoal_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            "user_id": user_id,
            "goal_id": goal_id,
            "status": status
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        location.reload();
    } else {
        alert(response.statusText);
    }
}

// function setSelectedIndex(s, i){
//     s.options[i-1].selected = true;
//     return;
// }

// setSelectedIndex(document.getElementById("goal_status"),3);

document.querySelector('#particpateBtn').addEventListener('click', participateFormHandler);