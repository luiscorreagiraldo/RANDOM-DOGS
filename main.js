const API_URL = "https://api.thedogapi.com/v1/images/search?limit=2&api_key=live_nZ1zksIFTxAlJeMgGB6yMBmWgZfE7Rg6F20BOl8UKYKa5M21Mra8vYYREFuHy82e";
const FAV_API_URL = "https://api.thedogapi.com/v1/favourites?&api_key=live_nZ1zksIFTxAlJeMgGB6yMBmWgZfE7Rg6F20BOl8UKYKa5M21Mra8vYYREFuHy82e"




// -------------------VARIABLES NECESARIAS----------------------
const spanError = document.getElementById("error")
const button = document.getElementById("reload-button")



// ----------------FUNCIÓN PARA CARGAR IMAGENES RANDOM DE PERRITOS--------------



async function loadRandomDogs() {
    const rest = await fetch(API_URL);
    const data = await rest.json();
    console.log(data)

    if (rest.status != 200) {
        spanError.innerHTML = "Hubo un error: " + resp.status + data.message;
    } else {
        const img1 = document.getElementById("img1")
        const img2 = document.getElementById("img2")
        img1.src = data[0].url;
        img2.src = data[1].url;
    }

}
button.onclick = loadRandomDogs
loadRandomDogs()



// ----------- FUNCIÓN PARA CARGAR LOS PERRITOS GUARDADOS -------------



async function loadFavoriteDogs() {
    const rest = await fetch(FAV_API_URL);
    const data = await rest.json();

    console.log("favorites")
    console.log(data)
    if (rest.status != 200) {
        spanError.innerHTML = "Hubo un error: " + rest.status;
    } else {
        data.forEach(dog => {
            const section = document.getElementById("fav-dogs")
            const article = document.createElement("article");
            const img = document.createElement("img");
            const btn = document.createElement("button");
            const btnText = document.createTextNode("Remove from favorites")

            btn.appendChild(btnText);
            img.src = dog.image.url;
            img.width = 300;
            article.appendChild(img);
            article.appendChild(btn)
            section.appendChild(article)

            section.appendChild(article)
        });
    }
}
loadFavoriteDogs()



// ----------FUNCIÓN PARA GUARDAR LOS PERRITOS A FAVORITOS---------------

async function saveFavoriteDogs() {
    const rest = await fetch(FAV_API_URL,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                image_id: "Nk8cSr_aj"
            })
        });
    const data = await rest.json();
    console.log("here")
    console.log(rest)

    if (rest.status != 200) {
        spanError.innerHTML = "Hubo un error: " + rest.status + data;
    }
}