const deletebuttons = document.querySelectorAll('#delete');

for(let i=0; i<deletebuttons.length; i++){
    deletebuttons[i].addEventListener('click', _=>{
        fetch('/delete', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                key: deletebuttons[i].value
            })
        })
        .then(res => {
        if (res.ok) return res.json()
        })
        .then(response => {
            window.location.reload()
        })
        .catch(err => console.log(err))
        console.log(deletebuttons[i].value)
    })        
}

