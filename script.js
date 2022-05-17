// Unsplash API
const apiKey = 'bIiIkSMlQCIDkRPeBNVcSvUTgz6hhPi6XNImSRw9gIc';
let count = 5;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let imagesLoaded = 0;
let ready = false;

// cretae elements for links and photos and add to DOM
function displayPhotos(){
    photosArray.forEach((photo)=>{
        const anchor_element = document.createElement("a");
        anchor_element.setAttribute("href",photo.urls.regular);
        anchor_element.setAttribute("target","_blank");
        const image_element = document.createElement("img");
        image_element.setAttribute("src",photo.urls.regular);
        image_element.setAttribute("description",photo.description);
        image_element.setAttribute("title",photo.description);
        image_element.addEventListener("load",()=>{
            imagesLoaded++;
            if(imagesLoaded == count)
            {
                loader.hidden = true; 
                ready = true;
                count = 30;
                apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
            }    
        });
        anchor_element.appendChild(image_element);  
        imageContainer.appendChild(anchor_element);
    });
}

async function getPhotosFromApi(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        console.log('error');
    }
}

window.addEventListener("scroll",()=>{
    if(window.innerHeight+window.scrollY >= document.body.offsetHeight-1000 && ready)
    {
        ready = false;
        imagesLoaded = 0;
        getPhotosFromApi();
    }
});

//on laod
getPhotosFromApi();