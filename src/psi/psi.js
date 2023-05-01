

const notification_btn = document.getElementById('notify');
const refresh_btn = document.getElementById('fetch_dogs');
const list = document.getElementById('dogs_list');


notification_btn.addEventListener('click', async () => {
	api.notificationApi.sendNotification('My custom notification! '+localStorage.getItem("token"));
})

refresh_btn.addEventListener('click', async () => {
	console.log("refresh");

	await api.fetch.getAllDogs();
	
	const oldPets = JSON.parse(localStorage.getItem("oldPets"));

	const dodajPet = (pet) => {
		const newPet = document.createElement("div");
		newPet.className = "dog";

		newPet.innerHTML = `<div class="dog">
			<div class="name_div"><p class="dog_name">${pet.name}</p></div>
			<div class="labels">
				<div class="birthday_label_div"><p class="birthday_label">Rojstni datum</p></div>
				<div class="animalID_label_div"><p class="animalID_label">Animal ID</p></div>
			</div>
			<div class="values">
				<div class="birthday_div"><p class="dog_birthday">${pet.date_of_birth}</p></div>
				<div class="animalID_div"><p class="dog_animalID">${pet.animal_id}</p></div>
			</div>
		</div>`

		if (list) list.appendChild (newPet);
	}
	for (const pet of oldPets) {
		dodajPet(pet);
	}
})
