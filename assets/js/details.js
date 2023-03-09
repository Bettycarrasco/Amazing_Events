import data from './data.js'

const queryString = location.search

const params = new URLSearchParams(queryString)

const id = params.get("id")

const cardnew = data.events.find(cardnew => cardnew._id == id);
let varaAdicional = "";

let currentDate = new Date(data.currentDate);
let eventDate = new Date(cardnew.date);
if (eventDate < currentDate) {
    varaAdicional = `<p class="card-text fs-3"> Assistance :${cardnew.assistance} </p>`
}


let container = document.getElementById("detalles");
let cardEvents = `
<div class="card mb-3">
<img src=${cardnew.image} class="card.img.top datailCard" atl="${cardnew.name}>
<div class="card-body">
<p class="card-text">${cardnew.category}</p>
<h5 class="card-title">${cardnew.name}</h5>
<p class="card-text">${cardnew.description}</p>
<p class="card-text">${cardnew.date}</p>
${varaAdicional}
<a class="btn btn-primary"onclick="history.back()">Go Back!</a>
</div>
</div>`;

container.innerHTML += cardEvents;