const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const fs = require('fs');
const axios = require('axios')


function createWindow () {
	const win = new BrowserWindow({

		//velikost okna, naslov...
		width: 1100,
		height: 900,
		minWidth: 1100,
		title: "MyPet",
		icon: path.join(__dirname, 'mypet.png'),
		webPreferences: {
            nodeIntegration: true,
			preload: path.join(__dirname, 'preload.js')
		}
	});

	//začetna stran je login
	win.loadFile('src/login/login.html');
}

//funkcija za notification
ipcMain.on('notify', (_, message) => {
	console.log("Notification triggered.")
	new Notification({title: 'Notification', body: message}).show();
})

function isInternetReachable() {	
	return axios.get('https://google.com')
	  .then(() => true)
	  .catch(() => false);
  }
  var isOnline = isInternetReachable();
//dodaj nove atribute
setInterval(async () => {
    var online = await isInternetReachable();
    if (online !== isOnline) {
      isOnline = online;
      if (isOnline) {
		
		new Notification({title: 'Notification', body: 'Device is online'}).show();
        console.log('Device is online');
      } else {
		new Notification({title: 'Notification', body: 'Device is offline'}).show();
        console.log('Device is offline');
	
      }
    }
  }, 500); 


//zagon aplikacije
app.whenReady().then(createWindow);

//ustavitev aplikacije
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
})

//ob aktivaciji ustvarimo window
app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})