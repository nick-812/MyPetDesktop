

const notification_btn = document.getElementById('notify');
const refresh_btn = document.getElementById('fetch_dogs');
const add_btn = document.getElementById('add_dog');
const list = document.getElementById('dogs_list');
let dogs = document.querySelectorAll(".dog");

document.addEventListener('DOMContentLoaded', async () => {
	naloziPse();
})

notification_btn.addEventListener('click', async () => {
	api.notificationApi.sendNotification('My custom notification! '+localStorage.getItem("token"));
})

add_btn.addEventListener('click', async () => {
	window.location.href="../dodajPsa/dodajPsa.html";
})

refresh_btn.addEventListener('click', async () => {
	console.log("refresh");

	await api.fetch.getAllDogs();
	
	naloziPse();
})

const naloziPse = () => {

	const oldPets = JSON.parse(localStorage.getItem("oldPets"));

	list.innerHTML = "";

	const dodajPet = (pet) => {
		const newPet = document.createElement("div");
		newPet.className = "dog";

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

		if (list) list.appendChild (newPet);
	}
	for (const pet of oldPets) {
		dodajPet(pet);
	}

	dodajGumbePsom();
}

const dodajGumbePsom = () => {
	dogs = document.querySelectorAll(".dog");

	dogs.forEach(dog => {
		dog.addEventListener('click', async () => {

			const id = dog.getElementsByClassName("dog_ID")[0].innerHTML;
			window.location.href=`../podatkiPsa/podatkiPsa.html?id=${id}`;
			
		});
	});
}