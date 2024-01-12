import axios from "axios";

const key = "39891007-90054c7bf84e45a363315c2ae"

const getPhotos = (input, pageNumber) => {
    return axios
    .get(`https://pixabay.com/api/?key=${key}&q=${input}
        &image_type=photo&orientation=horizontal&safesearch=true
        &per_page=40&page=${pageNumber}`)
    .then(respons => {
        return respons.data
    })
}

export {getPhotos}