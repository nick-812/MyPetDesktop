const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow () {
	const win = new BrowserWindow({

		//velikost okna, naslov...
		width: 1100,
		height: 900,
		minWidth: 1100,
		title: "MyPet",
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
	new Notification({title: 'Notifiation', body: message}).show();
})


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