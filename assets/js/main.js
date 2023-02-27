let boxIndex = document.getElementById('boxCard')
let htmlEvents = "";
for (let event of data.events) {
    htmlEvents += `<div class="card"style="width:18rem; margin-top:20px" >
        <img src="${event.image}" class="card-img-top" style="height:200px" />
        <div class="card-body d-flex flex-column  justify-content-between">
            <h5>"${event.name}"</h5>
            <p>${event.description}</p>
            <div class="card-footer text-muted d-flex justify-content-between">
                <p>U$s ${event.price}</p>
                <a href="./details.html" class="btn btn-primary">Details</a>
            </div>
        </div>
    </div>`;
}
boxIndex.innerHTML = htmlEvents;
console.log(htmlEvents);


