

const notification_btn = document.getElementById('notify');
const refresh_btn = document.getElementById('fetch');
const add_btn = document.getElementById('add');
const list = document.getElementById('appointments_list');
let dogs = document.querySelectorAll(".dog");

//ko se stran zažene kličemo funkcijo naloži pse
document.addEventListener('DOMContentLoaded', async () => {
	naloziAppointmente();
})

//notification button ki pošlje notification
notification_btn.addEventListener('click', async () => {
	api.notificationApi.sendNotification('My custom notification! '+localStorage.getItem("token"));
})

//gumb za dodajanje psa, ki nas preusmeri na stran dodajPsa
add_btn.addEventListener('click', async () => {
	window.location.href="../dodajPsa/dodajPsa.html";
})

//gumb za refresh
refresh_btn.addEventListener('click', async () => {

	//kličemo preload.js in posledično server za nove pse
	await api.fetch.getAllAppointments();
	
	naloziAppointmente();
})

//funkcija za nalaganje psov v seznam
const naloziAppointmente = () => {

	//pridobitev seznama psov
	var termini = JSON.parse(localStorage.getItem("appointments"));

	termini.sort(function(a, b) {
		var keyA = new Date(a.date);
		var keyB = new Date(b.date);
		// Compare the 2 dates
		if (keyA < keyB) return 1;
		if (keyA > keyB) return -1;
		return 0;
	});

	//izpraznimo seznam v html
	list.innerHTML = '<p id="appointments_list_label">Termini</p><div id = "prihodnjiTermini"></div><p id="pretekliTerminiLabel">Pretekli Termini</p><div id = "pretekliTermini"></div>';

	const prihodnjiTermini = document.getElementById('prihodnjiTermini');
	const pretekliTermini = document.getElementById('pretekliTermini');

	const dogs = JSON.parse(localStorage.getItem("oldPets"));

	//funkcija za dodajanje posameznega psa
	const dodajAppointment = (appointment) => {

		const newAppointment = document.createElement("div");
		newAppointment.className = "appointment";
		newAppointment.id = appointment.id;

		const index = dogs.findIndex(x => x._id === appointment.dog);
		const name = dogs[index].name;

		//struktura bracketa za psa
		newAppointment.innerHTML = `
			<div class="name_div"><p class="dog_name">${name}</p></div>
			<div class="labels">
				<div class="date_label_div"><p class="date_label">Datum</p></div>
				<div class="vet_label_div"><p class="vet_label">Veterinar</p></div>
			</div>
			<div class="values">
				<div class="date_div"><p class="date">${appointment.date}</p></div>
				<div class="vet_div"><p class="vet">${appointment.vet}</p></div>
			</div>`

		if (new Date(appointment.date) > new Date()){
			//appendamo appointment v prihodnjiTermini
			if (prihodnjiTermini) prihodnjiTermini.appendChild (newAppointment);
		}
		else{
			//appendamo appointment v pretekliTermini
			if (pretekliTermini) pretekliTermini.appendChild (newAppointment);
		}
	}

	//loop da gremo čez vse pse
	for (const appointment of termini) {
		dodajAppointment(appointment);
	}

	//kličemo funkcijo ki bo ustvarila eventListenerje za vsakega psa posebej
	dodajGumbeAppointmentom();
}

//funkcija doda eventListenerje na pse
const dodajGumbeAppointmentom = () => {

	//pridobimo vse elemente s classom dog
	const appointments = document.querySelectorAll(".appointment");

	//za vsak element dodamo listener
	appointments.forEach(appointment => {
		appointment.addEventListener('click', async () => {

			//ob kliku preberemo id in ga posredujemo v url-ju strani s podatki appointmenta
			const id = appointment.id;
			
			window.location.href=`../podatkiTermina/podatkiTermina.html?id=${id}`;
			
		});
	});
}