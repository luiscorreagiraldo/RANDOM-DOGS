const API_URL = "https://api.thedogapi.com/v1/images/search?limit=2&api_key=live_nZ1zksIFTxAlJeMgGB6yMBmWgZfE7Rg6F20BOl8UKYKa5M21Mra8vYYREFuHy82e";
const FAV_API_URL = "https://api.thedogapi.com/v1/favourites?&api_key=live_nZ1zksIFTxAlJeMgGB6yMBmWgZfE7Rg6F20BOl8UKYKa5M21Mra8vYYREFuHy82e"
const DELETE_FAV_API_URL = (id) => `https://api.thedogapi.com/v1/favourites/${id} ?&api_key=live_nZ1zksIFTxAlJeMgGB6yMBmWgZfE7Rg6F20BOl8UKYKa5M21Mra8vYYREFuHy82e`
const UPLOAD_YOUR_DOG_API = "https://api.thedogapi.com/v1/images/upload/"




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
        const btn1 = document.getElementById("btn1")
        const btn2 = document.getElementById("btn2")

        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick = () => saveFavoriteDog(data[0].id)
        btn2.onclick = () => saveFavoriteDog(data[1].id)

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
        const section = document.getElementById("fav-dogs")
        section.innerHTML = ""


        data.forEach(dog => {
        
            const div = document.createElement("div");
            const img = document.createElement("img");
            const btn = document.createElement("button");
            const btnText = document.createTextNode("Remove from favorites")
            


            btn.appendChild(btnText);
            img.src = dog.image.url;
            btn.onclick = () => deleteFavoriteDog(dog.id)
            div.appendChild(img);
            div.appendChild(btn)
            section.appendChild(div)
            div.classList.add("fav-dog-card")
            img.classList.add("fav-dog-img")
            btn.classList.add("rm-btn")
            
        });
    }
}
loadFavoriteDogs()



// ----------FUNCIÓN PARA GUARDAR LOS PERRITOS A FAVORITOS---------------

async function saveFavoriteDog(id) {
    const rest = await fetch(FAV_API_URL,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                image_id: id
            })
        });
    const data = await rest.json();

    console.log("here")
    console.log(rest)

    if (rest.status != 200) {
        spanError.innerHTML = "Hubo un error: " + rest.status + data;
    }
    else {
        console.log("Perrito guardado en favoritos")
        loadFavoriteDogs()
    }
}




//------------------FUNCIÓN PARA ELIMINAR PERRITOS DE FAVORITOS----------

async function deleteFavoriteDog(id) {
    const rest = await fetch(DELETE_FAV_API_URL(id),
        {
            method: "DELETE",

        });
    const data = await rest.json();


    if (rest.status != 200) {
        spanError.innerHTML = "Hubo un error: " + rest.status + data;
    }
    else {
        console.log("Perrito eliminado de favoritos")
        loadFavoriteDogs()

    }
}



// -------------FUNCIÓN PARA SUBIR IMAGEN DE PERRITO----------

async function uploadDogPhoto() {
    const form = document.getElementById("uploadingForm")
    const formData = new FormData(form);
    console.log(formData.get("file"))

    const rest = await fetch(UPLOAD_YOUR_DOG_API, {
        method: "POST",
        headers: {
            "X-API-KEY": "live_nZ1zksIFTxAlJeMgGB6yMBmWgZfE7Rg6F20BOl8UKYKa5M21Mra8vYYREFuHy82e"
        },
        body: formData,
    })

    const data = await rest.json();

    if (rest.status !== 201) {
        console.log("hubo un error")
    }
    else {
        console.log("Foto de perrito cargada :)");
        console.log({ data });
        console.log(data.url);
        saveFavoriteDog(data.id)
    }
loadFavoriteDogs()
loadRandomDogs()
}