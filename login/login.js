let email=document.querySelector('[data-email]')
let password=document.querySelector('[data-password]')
let logInBtn=document.querySelector('[data-login-btn]')
let userId

const auth = firebase.auth()

const db = firebase.database()

function loginWithEmailAndPass(){

    const emailValue=email.value
    const passwordValue=password.value

    auth.signInWithEmailAndPassword(emailValue, passwordValue).then(response=>{
        userId = response.user.uid
        if(userId){
            alert("login successfully")
            retrievDataFromDb(userId)
        }
    })
}

logInBtn.addEventListener('click',loginWithEmailAndPass)

function retrievDataFromDb(id){
    db.ref(`users/public/${id}`).on('value',(snap)=>{
        console.log(snap.val().name)
    })
}