const URL = "https://api.thedogapi.com/v1/images/search?limit=3&api_key=live_nZ1zksIFTxAlJeMgGB6yMBmWgZfE7Rg6F20BOl8UKYKa5M21Mra8vYYREFuHy82e";

const button = document.getElementById("reload-button")



document.addEventListener("DOMContentLoaded", loadRandomDogs)

async function loadRandomDogs() {
    const resp = await fetch(URL);
    const data = await resp.json();
    console.log(data)
    const img1 = document.getElementById("img1")
    const img2 = document.getElementById("img2")
    const img3 = document.getElementById("img3")
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url
}



button.onclick = loadRandomDogs































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