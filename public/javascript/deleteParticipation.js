async function daleteParticipateFormHandler(event){
    event.preventDefault();
    const member_goal_id = event.target.getAttribute('memberGoalsId');
    const response = await fetch(`/api/member_goals/${member_goal_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        location.reload();
    } else {
        alert(response.statusText);
    }

}
document.querySelector('#cancelParticpateBtn').addEventListener('click', daleteParticipateFormHandler);