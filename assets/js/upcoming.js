import data from './data.js'

let eventocard = document.getElementById("boxCard");

let arrayevents = data.events;

const fragment = document.createDocumentFragment();

let currentDate = new Date(data.currentDate);
function armarCard(array, container) {
    container.innerHTML = "";
    for (let cardnew of array) {
        let eventDate = new Date(cardnew.date);
        if (eventDate > currentDate) {
            let div = document.createElement("div")
            div.className = "card"
            div.innerHTML += `<div class="card" style="width:18rem; margin-top:20px">
        <img src="${cardnew.image}" class="card-img-top" style="height:200px" />
        <div class="card-body d-flex flex-column justify-content-between">
            <h5>"${cardnew.name}"</h5>
            <p>${cardnew.description}</p>
            <div class="card-footer text-muted">
                <p>U$s ${cardnew.price}</p>
                <a href="/details.html?id=${cardnew._id}" class="btn btn-primary">Details</a>
            </div>
        </div>
    </div>`
            fragment.appendChild(div);
        }
    }
    container.appendChild(fragment);
}

armarCard(arrayevents, eventocard);

const $checkboxes = document.getElementById("checkboxes")

const newCategorias = (array) => {
    let categories = array.map(category => category.category)
    let caterie = [...(new Set(categories))]
    return caterie
}

let categories = newCategorias(arrayevents);

const newCheck = (categories, $checkboxes) => {
    categories.forEach(category => {
        let div = document.createElement('div')
        div.className = 'form-check'
        div.innerHTML = `<input type="checkbox" class="form-check-input" value="${category}" id="${category}" name="categories">
        <label class="form-check-label" for="${category}">${category}</label>`
        $checkboxes.appendChild(div)
    })
}
newCheck(categories, $checkboxes)

const filterCheck = (array) => {
    let checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
    let reChecek = checked.map(e => e.id.toLocaleUpperCase())
    let filterChecks = array.filter(element => reChecek.includes(element.category.toLocaleUpperCase()))
    if (filterChecks.length > 0) {
        return filterChecks
    } else {
        return array
    }
}

const $search = document.getElementById('search')

const filtrarSearch = (array, value) => {
    let arrayFilter = array.filter(e => e.name.toLowerCase().includes(value.toLowerCase()))
    return arrayFilter
}

const filterPrint = (array) => {
    let arrayNew = filterCheck(array)
    arrayNew = filtrarSearch(arrayNew, $search.value)
    return arrayNew
}

$checkboxes.addEventListener('change', () => {
    let dataFilter = filterPrint(arrayevents)
    if (dataFilter.length === 0) {
        console.log("dataFilter vacio")
        eventocard.innerHTML =
            `<h4>Not found</h4>`
    } else {
        console.log(dataFilter)
        eventocard.innerHTML = "";
        armarCard(dataFilter, eventocard);
    }

})

$search.addEventListener('keyup', (e) => {
    let dataFilter = filterPrint(arrayevents)
    if (dataFilter.length === 0) {
        eventocard.innerHTML =
            `<h4>Not found</h4>`
    } else {
        eventocard.innerHTML = "";
        armarCard(dataFilter, eventocard);
    }
})


















/*boxUpcoming = document.getElementById('boxCard')
let htmlUpcomingEvents = "";
for(let event of data.events){
    let currentDate = new Date(data.currentDate);
    let eventDate = new Date(event.date);
    if (eventDate > currentDate) {
        htmlUpcomingEvents += `<div class="card"style="width:18rem; margin-top:20px">
        <img src="${event.image}"class="card-img-top" style="height:200px"/>
        <div class="card-body">
            <h5>"${event.name}"</h5>
            <p>${event.description}</p>
            <div class="card-footer text-muted">
                <p>U$s ${event.price}</p>
                <a href="./details.html" class="btn btn-primary">Details</a>
            </div>
        </div>
    </div>`;
    } 
    }
    boxUpcoming.innerHTML = htmlUpcomingEvents;
console.log(htmlUpcomingEvents);*/
