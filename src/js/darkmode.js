const darkMode = document.querySelector(".btn-dark")
const body = document.querySelector("body")

const changeMode = () => {
    body.classList.toggle("dark")
}

darkMode.addEventListener("click", changeMode)

export {changeMode}