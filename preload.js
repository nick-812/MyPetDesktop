const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
	title: "MyPet",

	notificationApi: {
		sendNotification(message) {
		  ipcRenderer.send('notify', message);
		}
	},
})



