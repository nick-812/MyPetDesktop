const axios = require('axios');
const { contextBridge, ipcRenderer, remote } = require('electron');
const dexie = require('dexie');


//database psov v dexiju
const db = new dexie('localDB');
db.version(2.1).stores({
	pets: '_id, name, date_of_birth, animal_id, user_id', // Primary key and indexed props
	newPets: 'name, _id, date_of_birth, animal_id, user_id',
	appointments: 'id, date, dog, vet, data'
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
				const login = await axios.post('http://localhost:8083/login', data);
				
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
				const register = await axios.post('http://localhost:8083/register', data);
				return register;
			} catch (error) {
				console.log(error.response); // this is the main part. Use the response property from the error object
				return {status: 400};
			}		
		}
	},

	//funkcija za komunikacijo z glavnim streažnikom MyPet
	fetch: {
		async getAllDogs(){

			//nastavitev tokena kot default
			const token = localStorage.getItem("token");
			axios.defaults.headers.common = {'Authorization': `bearer ${token}`};

			//fetchanje novih petov iz strežnika
			const response = await axios.get('http://localhost:3004/api/getAllPets', {
				params: {
					id: token
				}, 
			});

			//za vsak pridobljen pet ustvarimo objekt in ga shranimo v dexi
			for (const pet of response.data) {
				await db.pets.put({
					_id: pet._id,
					name: pet.name,
					date_of_birth: pet.date_of_birth,
					animal_id: pet.animal_id,
					user_id: pet.user_id
				});
			}

			//pridobimo array psov iz dexija
			const oldPets = await db.pets.toArray();

			//shranimo json seznama psov
			localStorage.setItem("oldPets", JSON.stringify(oldPets));

	
		},

		async getAllAppointments(){




			//klic na server za appointmente



			
			//template appointment
			const appointment = {
				id: '4321',
				date: "2023-09-02",
				dog: "640895ba9f2c83d7353a6edd",
				vet: "dr. Kovač",
				data: "Pregled in rentgen"
			}

			//6x appointment
			for(let i = 0; i < 6; i++){
				appointment.id = i.toString();
				await db.appointments.put(appointment);
			}

			const appointment2 = {
				id: '1234',
				date: "2020-09-02",
				dog: "6401a9bea8c01bbb1e85a4d3",
				vet: "dr. Polančič",
				data: "Pregled in rentgen"
			}

			//6x appointment
			for(let i = 0; i < 6; i++){
				appointment2.id = (i+6).toString();
				await db.appointments.put(appointment2);
			}

			//pridobimo array appointmentov iz dexija
			const appointments = await db.appointments.toArray();

			//shranimo json seznama appointmentov
			localStorage.setItem("appointments", JSON.stringify(appointments));
			
		}
	}
})



