boxPast = document.getElementById('boxCard')
let htmlPastEvents = "";
for(let event of data.events){
    let currentDate = new Date(data.currentDate);
    let eventDate = new Date(event.date);
    if (eventDate < currentDate) {
        htmlPastEvents += `<div class="card"style="width:18rem; margin-top:20px">
        <img src="${event.image} "class="card-img-top" style="height:200px"/>
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
    boxPast.innerHTML = htmlPastEvents;
console.log(htmlPastEvents);

