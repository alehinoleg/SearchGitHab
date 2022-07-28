let input = document.querySelector('.main__input');
let menuOfRepozitories = document.querySelector('.menuOfRepozitories');
let listOfRepositories = document.querySelector('.listOfRepositories');

async function searchUsers (name) {
    await fetch(`https://api.github.com/search/repositories?q=${name}&per_page=4`)
        .then((res)=>{
        res.json().then(res =>{
            res.items.map(element => {
                creat(`${element.name}`,`${element.owner.login}`,`${element.stargazers_count}`)
            });
        })
    })
}

function creat (name, owner, star) {
    let newElement = document.createElement("p")
    newElement.classList.add("main-input__api-names")
    newElement.innerHTML = name.toUpperCase()
    menuOfRepozitories.append(newElement)
    newElement.addEventListener('click',()=> addRepositories(name,owner,star))
}

function addRepositories (addName,addOwner,addStars) {
    let repElement = document.createElement("p")
    repElement.classList.add("main-list__api-names")
    repElement.innerText=`Name: ${addName}\n Owner: ${addOwner}\n Starts: ${addStars} `
    listOfRepositories.append(repElement)
    closeItem(repElement)
    menuOfRepozitories.innerHTML = ''
    input.value = ''
}

function closeItem(removeItem) {
    let closeButton = document.createElement('button')
    closeButton.classList.add('closeButton')
    listOfRepositories.append(closeButton)
    closeButton.addEventListener('click',()=>{
      closeButton.remove()
      removeItem.remove()
    })
}

const debounce = (fn, debounceTime) => {
    let inDebounce;
    return function() {
       clearTimeout(inDebounce)
       inDebounce = setTimeout(() => fn.apply(this, arguments), debounceTime)
    }
};

let timeOut =  debounce(searchUsers,1000)
    let inputSearch = (event) => {
      input.value? timeOut(event.target.value) : ""
      menuOfRepozitories.innerHTML = ""
}
  
input.addEventListener("keyup", inputSearch)

