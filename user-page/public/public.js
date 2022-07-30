
const db=firebase.database()

document.addEventListener('DOMContentLoaded',()=>{
    let id=localStorage.getItem('id')
    retrievDataFromDb(id)
})

function retrievDataFromDb(id){
    db.ref(`users/public/${id}`).on('value',(snap)=>{
        console.log(snap.val().name)
    })
}