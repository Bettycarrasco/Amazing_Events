let apiUrl = "https://mindhub-xj03.onrender.com/api/amazing"
async function getAmazingData() {
    try {
        const response = await fetch(apiUrl);
        console.log(response)
        const data = await response.json();
        console.log(data);

        const queryString = location.search

        const params = new URLSearchParams(queryString)

        const id = params.get("id")

        const cardnew = data.events.find(card => card._id == id);
        let varaAdicional = "";

        let currentDate = new Date(data.currentDate);
        let eventDate = cardnew.date;
        /*console.log(cardnew);*/
        if (eventDate < currentDate) {
            varaAdicional = `<p class="card-text fs-3"> Assistance :${cardnew.assistance} </p>`
        }
        let container = document.getElementById("detalles");
        let cardEvents = `
<div class="card mb-3">
<img src=${cardnew.image} class="card.img.top datailCard" atl="${cardnew.name}>
<div class="card-body">
<h5 class="card-text"> Category: ${cardnew.category}</h5>
<h5 class="card-title"> Name: ${cardnew.name}</h5>
<p class="card-text"> <b>Description:</b> ${cardnew.description}</p>
<p class="card-text"> <b>Date:</b> ${cardnew.date}</p>
<p class="card-text"> <b>Place:</b> ${cardnew.place}</p>
<p class="card-text"> <b>Capacity:</b> ${cardnew.capacity}</p>
<p class="card-text"> <b>Price:</b> U$s ${cardnew.price}</p>
${varaAdicional}
<a class="btn btn-primary"onclick="history.back()">Go Back!</a>
</div>
</div>`;

        container.innerHTML = cardEvents;
    }
    catch (error) {
        console.log(error)
    }
}
getAmazingData()