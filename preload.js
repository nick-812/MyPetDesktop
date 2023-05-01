const axios = require('axios');
const { contextBridge, ipcRenderer, remote } = require('electron');
const dexie = require('dexie');


//database psov
const db = new dexie('localDB');
db.version(1).stores({
	pets: '_id, name, date_of_birth, animal_id, user_id', // Primary key and indexed props
	newPets: 'name, _id, date_of_birth, animal_id, user_id',
});
localStorage.setItem("db", db);



contextBridge.exposeInMainWorld('api', {
	title: "MyPet",
	token: "",

	notificationApi: {
		sendNotification(message) {
		  ipcRenderer.send('notify', message);
		}
	},

	login: {
		async sendLogin(data){

			try {
				const login = await axios.post('http://localhost:8083/login', data);
				
				const token = login.data['token'];
				axios.defaults.headers.common = {'Authorization': `bearer ${token}`};

				return login;
			} catch (error) {
				console.log(error.response); // this is the main part. Use the response property from the error object
				return {status: 400};
			}		
		}
	},

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

	fetch: {
		async getAllDogs(){

			const token = localStorage.getItem("token");
			axios.defaults.headers.common = {'Authorization': `bearer ${token}`};

			//fetchanje novih petov iz strežnika
			const response = await axios.get('http://localhost:3004/api/getAllPets', {
				params: {
					id: token
				}, 
			});
			for (const pet of response.data) {
				await db.pets.put({
					_id: pet._id,
					name: pet.name,
					date_of_birth: pet.date_of_birth,
					animal_id: pet.animal_id,
					user_id: pet.user_id
				});
			}

			const oldPets = await db.pets.toArray();

			console.log(oldPets[0].name);

			localStorage.setItem("oldPets", JSON.stringify(oldPets));

			/*
			db1 = localStorage.getItem("db");
			const oldPets = await db1.pets.toArray();
			console.log(oldPets[0].name);
			*/
	
			console.log("Uploaded and refreshed")
	
		}
	}
})



