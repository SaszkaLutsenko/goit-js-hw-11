import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix'
import {getPhotos} from "./api.js"
import { changeMode } from "./darkmode.js";

const searchBtn = document.querySelector(".btn-search");
const moreBtn = document.querySelector(".btn-more")
const photoBox = document.querySelector(".gallery");
let input = document.querySelector("input");
const limit = document.querySelector(".limit")
let pageNumber = 0
let photoArray = []
let checkInput;

const inputOn = () => {
    if (input.value !== "" & input.value !== checkInput) {
        searchBtn.removeAttribute("disabled", "")
    }
    else {
        searchBtn.setAttribute("disabled", "")
    }
}

const createGallery = (event) => {
    event.preventDefault()
    searchBtn.setAttribute("disabled", "")
    input = document.querySelector("input");
    limit.style.display = "none"
    
    if (checkInput !== input.value) {
        photoArray = []
        pageNumber = 0
    }
    pageNumber++

    getPhotos(input.value, pageNumber)
    .then (data => {
        data.hits.map(element => { 
            let newPhoto = `
            <div class="photo-card">
                <a href="${element.largeImageURL}">
                    <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy"/>
                </a>
                <div class="info">
                    <p class="info-item">
                    <b>Likes </b>${element.likes}
                    </p>
                    <p class="info-item">
                    <b>Views </b>${element.views}
                    </p>
                    <p class="info-item">
                    <b>Comments </b>${element.comments}
                    </p>
                    <p class="info-item">
                    <b>Downloads </b>${element.downloads}
                    </p>
                </div>
            </div>`
            photoArray.push(newPhoto)
        })

        if (photoArray.length === 0) {
            photoBox.style.display = "block"
            photoBox.innerHTML = '<p style="text-align:center;">Sorry, there are no images matching your search query. Please try again.</p>'
            moreBtn.style.display = "none"
            Notiflix.Notify.failure(`Sorry, We found ${data.totalHits} images.. Please try again.`);
        }
        else {
            photoBox.style.display = "flex"
            photoBox.innerHTML = photoArray.join("")
            checkInput = input.value
            moreBtn.style.display = "block"
            const showPhoto = new SimpleLightbox("a")

            if (pageNumber === 1) {
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
            }

            if (photoArray.length === data.totalHits) {
                limit.style.display = "block"
                moreBtn.style.display = "none"
            }
        }})
        .catch (error => {
            console.log(error)
        })
        
}

input.addEventListener("input", inputOn)
searchBtn.addEventListener("click", createGallery)
moreBtn.addEventListener("click", createGallery)