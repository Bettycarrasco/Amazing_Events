boxUpcoming = document.getElementById('boxCard')
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
console.log(htmlUpcomingEvents);

