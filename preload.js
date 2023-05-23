const axios = require('axios');
const { contextBridge, ipcRenderer, remote } = require('electron');
const dexie = require('dexie');
const { uuid } = require('uuidv4');
const ObjectId = require('mongo-objectid');



//dodaj nove atribute



//database psov v dexiju
const db = new dexie('localDB');
db.version(4).stores({
	pets: '_id, name, date_of_birth, user_id, weight', // Primary key and indexed props
	newPets: '_id, name, date_of_birth, user_id, weight',
	appointments: 'id, date, dog, vet, data',
	newAppointments: 'id, date, dog, vet, data'
});

window.addEventListener ('online', async ()=>{

	//nastavitev tokena kot default
	const token = localStorage.getItem("token");
	axios.defaults.headers.common = {'Authorization': `bearer ${token}`};

	//////////////////// PUSHANJE NEW PETOV /////////////////////////////

	const newPets = await db.newPets.toArray();

	for(const dog of newPets){

		

		//push dog na server in return id



		// NASTAVI NOV ID !!!!!!!!
		const id = String(Math.floor(Math.random()*100000));

		dog._id = id;
		db.pets.add(dog);

		//pridobimo array psov iz dexija
		const oldPets = await db.pets.toArray();

		//shranimo json seznama psov
		localStorage.setItem("oldPets", JSON.stringify(oldPets));

	}

	//izpraznimo in ponastavimo index newPet
	db.newPets.clear();
	localStorage.setItem("newPetIndex",0);

	//shranimo json seznama novih psov
	localStorage.setItem("newPets", JSON.stringify(db.newPets.toArray()));


	//////////////////// PUSHANJE NEW APPOINTMENTOV /////////////////////////////

	const newAppointments = await db.newAppointments.toArray();

	for(const appointment of newAppointments){



		//push appointment na server in return id





		const id = String(Math.floor(Math.random()*100000));

		appointment.id = id;
		db.appointments.add(appointment);

		//pridobimo array appointmentov iz dexija
		const appointments = await db.appointments.toArray();

		//shranimo json seznama appointmentov
		localStorage.setItem("appointments", JSON.stringify(appointments));

	}

	//izpraznimo in ponastavimo index newPet
	db.newAppointments.clear();
	localStorage.setItem("newAppointmentIndex",0);

	//shranimo json seznama novih appointmentov
	localStorage.setItem("newAppointments", JSON.stringify(db.newAppointments.toArray()));


});

//contextbridge z imenom api
contextBridge.exposeInMainWorld('api', {
	title: "MyPet",

	//pošiljanje notificationa main.js
	notificationApi: {
		sendNotification(message) {
		  ipcRenderer.send('notify', message);
		}
	},

	//pošiljanje login data na strežnik
	login: {

		async sendLogin(data){

			try {





				const login = await axios.post('http://localhost:3004/user/login', data);




				
				//dekodiramo token in ga nastavimo kot default za axios
				const token = login.data['token'];
				axios.defaults.headers.common = {'Authorization': `bearer ${token}`};

				return login;
			} catch (error) {
				console.log(error.response); // this is the main part. Use the response property from the error object
				return {status: 400};
			}		
		}
	},

	//funkcija za pošiljanje registracje
	register: {
		async sendRegister(data){

			try {




				const register = await axios.post('http://localhost:3004/user/register', data);





				return register;
			} catch (error) {
				console.log(error.response); // this is the main part. Use the response property from the error object
				return {status: 400};
			}		
		}
	},

	dogs: {
		async generateUUID() {
			
			return new ObjectId().hex;
		},

		async getAllDogs(){

			if(navigator.onLine){
				console.log("Je online, pridobivam pse.")
				//tukaj db oldpets ne more biti, ker ni v db
				//db.oldPets.clear();

				db.pets.clear();

				//nastavitev tokena kot default
				const token = localStorage.getItem("token");
				axios.defaults.headers.common = {'Authorization': `bearer ${token}`};


				//Dodaj id uporabnika za getanje samo njegovih petov
				const userId = localStorage.getItem("user_id");
				console.log("Pridobivanje psov za uporabnika: " + userId)
				//fetchanje novih petov iz strežnika
				const response = await axios.get(`http://localhost:3004/user/getPets?user_id=${userId}`, {
					params: {
						user_id: userId
					}, 
				});
				console.log("Response psov:" + response.data)
				



				//za vsak pridobljen pet ustvarimo objekt in ga shranimo v dexi
				for (const pet of response.data) {
					await db.pets.put({
						_id: pet._id,
						name: pet.name,
						date_of_birth: pet.date_of_birth,
						weight: pet.weight,
						user_id: pet.user_id
					});
				}


				

				//pridobimo array psov iz dexija
				const oldPets = await db.pets.toArray();

				//shranimo json seznama psov
				localStorage.setItem("oldPets", JSON.stringify(oldPets));

			}
			
		},

		async pushDog(dog){

			//preverimo ali imamo povezavo
			if(navigator.onLine){

				//nastavitev tokena kot default
				const token = localStorage.getItem("token");
				axios.defaults.headers.common = {'Authorization': `bearer ${token}`};



				axios.post()
				const data = {
					"id" : dog._id,
					"name": dog.name,
					"date": dog.date_of_birth,
					"user_id": dog.user_id,
					"weight": dog.weight
				}
				//#push dog na server in return id (ni treba več, je ze nastavljen)

				await axios.post('http://localhost:3004/user/createPet', data);

				//# NASTAVI NOV ID !!!!!!!! (ni treba več, je ze nastavljen)
				//const id = String(Math.floor(Math.random()*100000));

				//dog._id = id;
				db.pets.add(dog);
				console.log("Dodali psa v local db: " + JSON.stringify(dog))

				//pridobimo array psov iz dexija
				const oldPets = await db.pets.toArray();

				//shranimo json seznama psov
				localStorage.setItem("oldPets", JSON.stringify(oldPets));
			}
			else{
				//# Tu se pogleda ce je treba zacasen id, glede na to da se tu ze generira ID
				//nastavimo začasen id 
				let id = localStorage.getItem('newPetIndex');
				dog._id = id;

				const newPetIndex = parseInt(id)+1;

				localStorage.setItem('newPetIndex', newPetIndex);

				db.newPets.add(dog);

				//pridobimo array novih psov iz dexija
				const newPets = await db.newPets.toArray();

				//shranimo json seznama novih psov
				localStorage.setItem("newPets", JSON.stringify(newPets));
			}
		},

		async updateDog(dog){

			//preverimo ali imamo povezavo
			if(navigator.onLine){

				//nastavitev tokena kot default
				const token = localStorage.getItem("token");
	
				axios.defaults.headers.common = {'Authorization': `bearer ${token}`};

				data = {
					"name" : dog.name,
					"date": dog.date_of_birth,
					"weight": dog.weight
				}

				axios.put(`http://localhost:3004/user/updateAnimalAll?id=${dog._id}`, data)

				// server update dog





			}
		},

		async deleteDog(id){

			//preverimo ali imamo povezavo
			if(navigator.onLine){

				//nastavitev tokena kot default
				const token = localStorage.getItem("token");
				axios.defaults.headers.common = {'Authorization': `bearer ${token}`};


			   

				// server delete dog po id-ju

				const response = await axios.delete(`http://localhost:3004/user/deletePet?id=${id}`, {

				});





			}
		}
	},


	appointments: {

		async getAllAppointments(){

			if(navigator.onLine){

				db.appointments.clear();




				//klic na server za appointmente



				/*
				//template appointment
				const appointment = {
					id: '4321',
					date: "2023-09-02",
					dog: "640895ba9f2c83d7353a6edd",
					vet: "dr. Kovač",
					data: "Pregled in rentgen"
				}
				*/
					
				const response = await axios.get(`http://localhost:3004/user/getAppointment?user_id=${localStorage.getItem("user_id")}`);

				//# tu dodal da da v dexi bazo
					//za vsak pridobljen pet ustvarimo objekt in ga shranimo v dexi
					for (const appointment of response.data) {
						await db.appointments.put({
							id: appointment._id,
							date: appointment.date,
							dog: appointment.dog,
							vet: appointment.vet, 
							data: appointment.data
						});
					}

				//pridobimo array appointmentov iz dexija
				const appointments = await db.appointments.toArray();

				//shranimo json seznama appointmentov
				localStorage.setItem("appointments", JSON.stringify(appointments));
			
			}
		},

		async pushAppointment(appointment){

			//preverimo ali imamo povezavo
			if(navigator.onLine){

				//nastavitev tokena kot default
				const token = localStorage.getItem("token");
				axios.defaults.headers.common = {'Authorization': `bearer ${token}`};

				const data = {
					"date": appointment.date,
					"dog": appointment.dog,
					"vet": appointment.vet,
					"data": appointment.data
				}

                axios.post("http://localhost:3004/user/createAppointment", data)


				//push appointment na server in return id
				//#ni treba idja





				//const id = String(Math.floor(Math.random()*100000));

				//appointment.id = id;
				db.appointments.add(appointment);

				//pridobimo array appointmentov iz dexija
				const appointments = await db.appointments.toArray();

				//shranimo json seznama appointmentov
				localStorage.setItem("appointments", JSON.stringify(appointments));
			}
			else{

				//nastavimo začasen id 
				let id = localStorage.getItem ("newAppointmentIndex");
				appointment.id = id;

				const newAppointmentIndex=parseInt(id)+1;
				localStorage.setItem("newAppointmentIndex",newAppointmentIndex);

				//shranimo v bazo
				db.newAppointments.add(appointment);

				//pridobimo array novih appointmentov iz dexija
				const newAppointments = await db.newAppointments.toArray();

				//shranimo json seznama novih appointmentov
				localStorage.setItem("newAppointments", JSON.stringify(newAppointments));
			}
		},

		async updateAppointment(appointment){

			//preverimo ali imamo povezavo
			if(navigator.onLine){

				//nastavitev tokena kot default
				const token = localStorage.getItem("token");
				axios.defaults.headers.common = {'Authorization': `bearer ${token}`};





				// server update appointment





			}
		},

		async deleteAppointment(id){

			//preverimo ali imamo povezavo
			if(navigator.onLine){

				//nastavitev tokena kot default
				const token = localStorage.getItem("token");
				axios.defaults.headers.common = {'Authorization': `bearer ${token}`};





				// server delete appointment po id-ju





			}
		}
	},

	diagnose: {

		async getDiagnose(request){
			
			//nastavitev tokena kot default
			const token = localStorage.getItem("token");
			axios.defaults.headers.common = {'Authorization': `bearer ${token}`};






			// request na server za diagnozo
			/* Primer:
			const zahteva = {
				starost: 12,
				teza: 34,
				bolecineTaca: true,
				otezenaHoja: false
				...
			}
			*/




			// primer responsa - prepiši
			const response = {
				opcija1: "Steklina",
				verjetnost1: 97.4,
				opcija2: "Odrgnina",
				verjetnost2: 26.8,
				opcija3: "Rak",
				verjetnost3: 2.9
			};





			return response;
		}

	},

	train: {

		async getTraining(request){

			//nastavitev tokena kot default
			const token = localStorage.getItem("token");
			axios.defaults.headers.common = {'Authorization': `bearer ${token}`};






			// request na server za trening
			/* Primer:
			const zahteva = {
				starost: 12,
				teza: 34,
				tip: "agility"
			};
			*/





			// primer responsa - prepiši
			const response = {
				training: `Week 1:
		
				Day 1: Start with some warm-up exercises, such as a 5-10 minute walk or jog, then do some basic obedience training such as sit, stay, come and down. After that, set up some cones and start working on weave poles. Teach your dog to weave in and out of the cones. Start with 3 cones placed in a line with a 2 feet distance between them. Show your dog a treat and guide him through the cones with the treat. Then, repeat this process a few times.
				
				Day 2: Start with some warm-up exercises, such as a 5-10 minute walk or jog, then work on jump training. Start with a low hurdle of about 8 inches high and train your dog to jump over it. Place the hurdle on the ground and guide your dog through the hurdle using a treat. After your dog jumps the hurdle successfully, give him lots of praise and a treat. Repeat this process a few times.
				
				Day 3: Rest day. Take your dog for a long walk or light play session.
				
				Day 4: Start with some warm-up exercises, such as a 5-10 minute walk or jog, then work on tunnel training. Start with a short tunnel, about 3 feet long, and guide your dog through the tunnel using a treat. Gradually increase the length of the tunnel as your dog becomes more comfortable with it.
				
				Day 5: Start with some warm-up exercises, such as a 5-10 minute walk or jog, then work on weave poles again. This time, increase the distance between the cones to 3 feet. Guide your dog through the cones using a treat.
				
				Day 6: Rest day. Take your dog for a long walk or light play session.
				
				Day 7: Start with some warm-up exercises, such as a 5-10 minute walk or jog, then work on jump training again. Increase the height of the hurdle to 12 inches and repeat the process from Day 2.
				
				Week 2:
				
				Day 1: Start with some warm-up exercises, such as a 5-10 minute walk or jog, then work on weave poles again. Increase the distance between the cones to 4 feet. Guide your dog through the cones using a treat.
				
				Day 2: Start with some warm-up exercises, such as a 5-10 minute walk or jog, then work on tunnel training again. Increase the length of the tunnel to 6 feet and guide your dog through the tunnel using a treat.
				
				Day 3: Rest day. Take your dog for a long walk or light play session.
				
				Day 4: Start with some warm-up exercises, such as a 5-10 minute walk or jog, then work on jump training again. Increase the height of the hurdle to 16 inches and repeat the process from Day 2.
				
				Day 5: Start with some warm-up exercises, such as a 5-10 minute walk or jog, then work on weave poles again. Increase the distance between the cones to 5 feet. Guide your dog through the cones using a treat.
				
				Day 6: Rest day. Take your dog for a long walk or light play session.
				
				Day 7: Start with some warm-up exercises, such as a 5-10 minute walk or jog, then work on tunnel training again. Increase the length of the tunnel to 9 feet and guide your dog through the tunnel using a treat.`
			};








			return response;

		}
	}
})



