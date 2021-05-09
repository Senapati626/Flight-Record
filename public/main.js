const deletebutton = document.querySelector('#delete');
deletebutton.addEventListener('click', _=>{
    fetch('/delete', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            key: deletebutton.value
        })
    })
    .then(res => {
    if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload()
    })
    .catch(err => console.log(err))
    //console.log(deletebutton.value)
})

