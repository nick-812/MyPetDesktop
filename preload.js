const axios = require('axios');

const { contextBridge, ipcRenderer, remote } = require('electron');


contextBridge.exposeInMainWorld('api', {
	title: "MyPet",
	token: "",

	notificationApi: {
		sendNotification(message) {
		  ipcRenderer.send('notify', message);
		}
	},

	store: {
		set(message) {
			console.log(message);
			global.token = message;
			console.log(global.token);
		},
		get(){
			const nekaj = remote.getGlobal( "token" );
			console.log(global.token);
			return "global.token";
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
	}
})



