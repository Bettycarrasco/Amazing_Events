let apiUrl = "https://mindhub-xj03.onrender.com/api/amazing"
async function getAmazingData() {
    try {
        const response = await fetch(apiUrl);
        console.log(response)
        const data = await response.json();
        console.log(data);


        let eventos = data.events;



        // Calcula el porcentaje de asistencia para cada evento
        let porcentajes = eventos.map((evento) => evento.assistance / evento.capacity * 100).filter(porcentaje => !Number.isNaN(porcentaje));


        // Encuentra el mayor porcentaje de asistencia
        const maxPorcentaje = Math.max(...porcentajes);


        // Encuentra el evento con el mayor porcentaje de asistencia
        const eventoMaxAsistencia = eventos.find((evento) => evento.assistance / evento.capacity * 100 === maxPorcentaje);

        // Imprime el nombre del evento con el mayor porcentaje de asistencia
        console.log(`El evento con el mayor porcentaje de asistencia es ${eventoMaxAsistencia.name} con ${maxPorcentaje}% de asistencia.`);

        // Calcula el porcentaje de asistencia para cada evento
        let porcentaje = eventos.map((evento) => evento.assistance / evento.capacity * 100).filter(porcentaje => !Number.isNaN(porcentaje));


        // Encuentra el mayor porcentaje de asistencia
        const minPorcentaje = Math.min(...porcentaje);


        // Encuentra el evento con el mener porcentaje de asistencia
        const eventoMinAsistencia = eventos.find((evento) => evento.assistance / evento.capacity * 100 === minPorcentaje);
        //console.log(eventoMaxAsistenci);
        // Imprime el nombre del evento con el menor porcentaje de asistencia
        console.log(`El evento con el menor porcentaje de asistencia es ${eventoMinAsistencia.name} con ${minPorcentaje}% de asistencia.`);

        // Definir variables para almacenar el evento con mayor capacidad y su capacidad correspondiente
        let eventoMayorCapacidad = [];
        let capacidadMayor = 0;

        // Recorrer la lista de eventos y encontrar los eventos con la mayor capacidad
        for (let i = 0; i < eventos.length; i++) {
            if (eventos[i].capacity > capacidadMayor) {
                capacidadMayor = eventos[i].capacity;
                eventoMayorCapacidad = [eventos[i].name];
            } else if (eventos[i].capacity === capacidadMayor) {
                eventoMayorCapacidad.push(eventos[i].name);
            }
        }

        // Mostrar los eventos con la mayor capacidad en la consola
        console.log(`Los eventos con mayor capacidad son ${eventoMayorCapacidad.join(', ')}, con una capacidad de ${capacidadMayor} personas.`);

        let container = document.getElementById("eventStats");
        let stast = ` <tr>
        <td> <b>${eventoMaxAsistencia.name}:</b>  ${maxPorcentaje}%  </td>
        <td> <b>${eventoMinAsistencia.name}:</b>  ${minPorcentaje}% </td>
        <td> <b>${eventoMayorCapacidad.join(' - ')}:</b> con una capacidad de ${capacidadMayor}</td>
    </tr> `;

        container.innerHTML = stast;



        //FUTURO
        // Crear un objeto para almacenar las categorías
        const categorias = {};

        // Recorrer la lista de eventos
        for (let i = 0; i < eventos.length; i++) {
            const evento = eventos[i];

            // Verificar si el evento es futuro
            const fechaEvento = new Date(evento.date);
            const fechaActual = new Date();
            if (fechaEvento >= fechaActual) {

                // Verificar si la categoría no ha sido incluida
                if (!categorias[evento.category]) {
                    categorias[evento.category] = [];
                }

                // Agregar el evento a la categoría correspondiente
                categorias[evento.category].push(evento);

            }
        }

        console.log(categorias);


        // Crear un objeto para almacenar los ingresos por asistencia de cada categoría
        const ingresosPorAsistencia = {};

        // Recorrer la lista de eventos
        for (let i = 0; i < eventos.length; i++) {
            const evento = eventos[i];
            // console.log(evento);

            // Verificar si el evento es futuro
            const fechaEvento = new Date(evento.date);
            const fechaActual = new Date();
            if (fechaEvento >= fechaActual) {

                // Verificar si la categoría no ha sido incluida
                if (!ingresosPorAsistencia[evento.category]) {
                    ingresosPorAsistencia[evento.category] = { ingresos: 0 };
                }

                // Agregar la asistencia a la categoría correspondiente
                ingresosPorAsistencia[evento.category].ingresos += evento.price * evento.estimate;
            }
        }
        console.log(ingresosPorAsistencia);

        // Filtrar los eventos futuros
        const eventosFuturos = eventos.filter(evento => new Date(evento.date) > new Date());

        // Calcular el porcentaje de asistencia por categoría en los eventos futuros
        let asistentesPorCategoriaFuturos = {};
        for (let i = 0; i < eventosFuturos.length; i++) {
            const evento = eventosFuturos[i];
            if (!asistentesPorCategoriaFuturos[evento.category]) {
                asistentesPorCategoriaFuturos[evento.category] = {
                    capacidadTotal: 0,
                    asistentesTotal: 0
                };
            }
            asistentesPorCategoriaFuturos[evento.category].capacidadTotal += evento.capacity;
            asistentesPorCategoriaFuturos[evento.category].asistentesTotal += evento.estimate;
        }
        for (let categoria in asistentesPorCategoriaFuturos) {
            const capacidadTotal = asistentesPorCategoriaFuturos[categoria].capacidadTotal;
            const asistentesTotal = asistentesPorCategoriaFuturos[categoria].asistentesTotal;
            const porcentajeAsistencia = (asistentesTotal / capacidadTotal) * 100;
            console.log(`El porcentaje de asistencia para la categoría "${categoria}" es ${porcentajeAsistencia.toFixed(2)}%`);
        }

        // INYECTAR FUTURO
        const tbody = document.querySelector('#upcomByCatgory');

        // INYECTAR LAS CATEGORÍAS:
        for (let categoria in categorias) {
            const row = document.createElement('tr');
            const categoryCell = document.createElement('td');
            const revenueCell = document.createElement('td');
            const attendanceCell = document.createElement('td');

            categoryCell.innerText = categoria;
            revenueCell.innerText = 'U$s ' + ingresosPorAsistencia[categoria].ingresos;
            attendanceCell.innerText = (asistentesPorCategoriaFuturos[categoria].asistentesTotal / asistentesPorCategoriaFuturos[categoria].capacidadTotal * 100).toFixed(2) + '%';

            row.appendChild(categoryCell);
            row.appendChild(revenueCell);
            row.appendChild(attendanceCell);

            tbody.appendChild(row);
        }


        //evetos PASADO
        // Crear un objeto para almacenar las categorías
        const categories = {};

        // Recorrer la lista de eventos
        for (let i = 0; i < eventos.length; i++) {
            const evento = eventos[i];

            // Verificar si el evento es futuro
            const fechaEvento = new Date(evento.date);
            const fechaActual = new Date();
            if (fechaEvento < fechaActual) {

                // Verificar si la categoría no ha sido incluida
                if (!categories[evento.category]) {
                    categories[evento.category] = [];
                }

                // Agregar el evento a la categoría correspondiente
                categories[evento.category].push(evento);

            }
        }

        console.log(categories);





        // Crear un objeto para almacenar los ingresos por asistencia de cada categoría
        const ingresosPorAsistencias = {};

        // Recorrer la lista de eventos
        for (let i = 0; i < eventos.length; i++) {
            const evento = eventos[i];
            // console.log(evento);

            // Verificar si el evento es futuro
            const fechaEvento = new Date(evento.date);
            const fechaActual = new Date();
            if (fechaEvento < fechaActual) {

                // Verificar si la categoría no ha sido incluida
                if (!ingresosPorAsistencias[evento.category]) {
                    ingresosPorAsistencias[evento.category] = { ingresos: 0 };
                }

                // Agregar la asistencia a la categoría correspondiente
                ingresosPorAsistencias[evento.category].ingresos += evento.price * evento.assistance;
            }
        }
        console.log(ingresosPorAsistencias);



        // Filtrar los eventos pasado
        const eventosPasados = eventos.filter(evento => new Date(evento.date) < new Date());

        // Calcular el porcentaje de asistencia por categoría en los eventos futuros
        let asistentesPorCategoriaPasados = {};
        for (let i = 0; i < eventosPasados.length; i++) {
            const evento = eventosPasados[i];
            if (!asistentesPorCategoriaPasados[evento.category]) {
                asistentesPorCategoriaPasados[evento.category] = {
                    capacidadTotal: 0,
                    asistentesTotal: 0
                };
            }
            asistentesPorCategoriaPasados[evento.category].capacidadTotal += evento.capacity;
            asistentesPorCategoriaPasados[evento.category].asistentesTotal += evento.assistance;
        }
        for (let categoria in asistentesPorCategoriaPasados) {
            const capacidadTotal = asistentesPorCategoriaPasados[categoria].capacidadTotal;
            const asistentesTotal = asistentesPorCategoriaPasados[categoria].asistentesTotal;
            const porcentajeAsistencia = (asistentesTotal / capacidadTotal) * 100;
            console.log(`El porcentaje de asistencia para la categoría "${categoria}" es ${porcentajeAsistencia.toFixed(2)}%`);
        }
        // INYECTAR EVENTOS PASADOS
        const tbody2 = document.querySelector('#pastByCategory');

        // Inyectar las categorías
        for (let categorie in categories) {
            const row = document.createElement('tr');
            const categoryCell1 = document.createElement('td');
            const revenueCell1 = document.createElement('td');
            const attendanceCell1 = document.createElement('td');

            categoryCell1.innerText = categorie;
            revenueCell1.innerText = 'U$s ' + ingresosPorAsistencias[categorie].ingresos;
            attendanceCell1.innerText = (asistentesPorCategoriaPasados[categorie].asistentesTotal / asistentesPorCategoriaPasados[categorie].capacidadTotal * 100).toFixed(2) + '%';

            row.appendChild(categoryCell1);
            row.appendChild(revenueCell1);
            row.appendChild(attendanceCell1);

            tbody2.appendChild(row);
        }
    }
    catch (error) {
        console.log(error)
    }
}
getAmazingData()