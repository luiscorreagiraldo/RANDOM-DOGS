const URL = "https://api.thedogapi.com/v1/images/search"
const button= document.getElementById("reload-button")



document.addEventListener("DOMContentLoaded",getUrl)

async function getUrl (){
    const resp = await fetch(URL);
    const data= await resp.json();
    const img= document.getElementById("dog-image")
    img.src = data[0].url;
}



button.onclick= getUrl

function me (){
    console.log("gola")
}






























// fetch(URL)
//     .then(res => res.json())
//     .then(data => {
//         const img= document.querySelector("dog-image")
//         img.src= data[0].url
//         data[0].url
//     })

// const button = document.querySelector("reload-button");
// button.addEventListener("click", me)


// function me (){
//     console.log("hola")
// }