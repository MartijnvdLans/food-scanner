getAndRenderData()
// postAndRenderData()

function getAndRenderData () {
    const getURL = 'https://tribe.api.fdnd.nl/v1/list'
    fetch(getURL).then(response => response.json())
    // .then(data => {
        
    // })
    // .then(response => {
    //     console.log(response)
    //     response.data.forEach(member => {
    //         document.body.insertAdjacentHTML('beforebegin',`<p>${member.memberName}</p>`)
    //     })
    // }).catch(error => document.body.insertAdjacentHTML('beforebegin', error))
}

// function postAndRenderData () {
//     const postURL = 'https://tribe.api.fdnd.nl/v1/member'
//     const options = {
//         method: 'post',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             squadId:1,
//             type:'docent',
//             nickname:'Faab',
//             name: 'Joost',
//             prefix:'',
//             surname:'Faber',
//             avatar:'',
//             githubHandle:'',
//             bio:'',
//             url:''
//         })
//     }
//     console.log(options)
//     fetch(postURL,options).then(response => response.json())
//     .then(data => {
//         console.log(data)
//     }).catch(err => {
//         console.log(err)
//     })
// }