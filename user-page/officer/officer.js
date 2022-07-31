
// Firebase db decleration
const db=firebase.database()

// getting id from localstorage
let id=localStorage.getItem('officerId')

let templateParent=document.querySelector('[data-template-parent]')
let templateComponent=document.querySelector('[data-template]')
let nameText=document.querySelector('[data-name]')
let mailText=document.querySelector('[data-email]')
let phoneText=document.querySelector('[data-phone]')
let logOutBtn=document.querySelector('[data-logout]')

let officerArea

retrievDataFromDb(id)

function retrievDataFromDb(id){
    db.ref(`users/officer/${id}`).on('value',(snap)=>{
        officerArea=snap.val().area
        nameText.innerText=snap.val().name
        mailText.innerText=snap.val().email
        phoneText.innerText=snap.val().phoneNumber
    })
    db.ref(`users/public`).on('value',(snap)=>{
        let data=Object.values(snap.val())
        if(officerArea){
            data.forEach((cred=>{
                if(cred.area===officerArea){
                    let transferData=Object.values(cred.problem)
                    transferData.forEach((resData)=>{
                         blahblag(resData)
                    })
                }
            }))
        }
        
    })
}

function blahblag(data){
    let template=templateComponent.content.cloneNode(true)
    template.querySelector('[data-problem-text]').innerText=data.problemName
    template.querySelector('[data-problem-def-text]').innerText=data.definition
    template.querySelector('[data-date-text]').innerText=data.date
    let option=template.querySelectorAll(".option")
    let statusText=template.querySelector('[data-status-text]')
    templateParent.appendChild(template)

    option.forEach((element) => {
        element.addEventListener('click',()=>{
            statusText.innerText=element.innerText
        })
    });

    // let dropBtn=template.querySelector('[data-drop-click]')
    // let dropParent=template.querySelector('[data-drop-parent]')

    // dropBtn.addEventListener('click',()=>{
    //     dropParent.classList.toggle('active')
    // })

    
    // window.addEventListener('mouseup',(e)=>{
    //         if(e.target!=dropBtn){
    //             dropParent.classList.remove('active')
    //         }
    // })
}

logOutBtn.addEventListener('click',()=>{
    localStorage.clear()
    window.location.href="../../index.html"
})


