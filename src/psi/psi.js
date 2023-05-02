

const notification_btn = document.getElementById('notify');
const refresh_btn = document.getElementById('fetch_dogs');
const add_btn = document.getElementById('add_dog');
const list = document.getElementById('dogs_list');
let dogs = document.querySelectorAll(".dog");

//ko se stran zažene kličemo funkcijo naloži pse
document.addEventListener('DOMContentLoaded', async () => {
	naloziPse();
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
	await api.fetch.getAllDogs();
	
	naloziPse();
})

//funkcija za nalaganje psov v seznam
const naloziPse = () => {

	//pridobitev seznama psov
	const oldPets = JSON.parse(localStorage.getItem("oldPets"));

	//izpraznimo seznam v html
	list.innerHTML = "";

	//funkcija za dodajanje posameznega psa
	const dodajPet = (pet) => {
		const newPet = document.createElement("div");
		newPet.className = "dog";

		//struktura bracketa za psa
		newPet.innerHTML = `<div class="dog">
			<div class="name_div"><p class="dog_name">${pet.name}</p></div>
			<div class="labels">
				<div class="birthday_label_div"><p class="birthday_label">Rojstni datum</p></div>
				<div class="ID_label_div"><p class="ID_label">ID</p></div>
			</div>
			<div class="values">
				<div class="birthday_div"><p class="dog_birthday">${pet.date_of_birth}</p></div>
				<div class="ID_div"><p class="dog_ID">${pet._id}</p></div>
			</div>
		</div>`

		//appendamo psa v list
		if (list) list.appendChild (newPet);
	}

	//loop da gremo čez vse pse
	for (const pet of oldPets) {
		dodajPet(pet);
	}

	//kličemo funkcijo ki bo ustvarila eventListenerje za vsakega psa posebej
	dodajGumbePsom();
}

//funkcija doda eventListenerje na pse
const dodajGumbePsom = () => {

	//pridobimo vse elemente s classom dog
	dogs = document.querySelectorAll(".dog");

	//za vsak element dodamo listener
	dogs.forEach(dog => {
		dog.addEventListener('click', async () => {

			//ob kliku preberemo id in ga posredujemo v url-ju strani s podatki psa
			const id = dog.getElementsByClassName("dog_ID")[0].innerHTML;
			window.location.href=`../podatkiPsa/podatkiPsa.html?id=${id}`;
			
		});
	});
}