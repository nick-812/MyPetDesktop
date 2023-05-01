const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const fs = require('fs');

global.token = "jjjlk";

function createWindow () {
	const win = new BrowserWindow({
		width: 1100,
		height: 900,
		minWidth: 1100,
		title: "MyPet",
		webPreferences: {
            nodeIntegration: true,
			preload: path.join(__dirname, 'preload.js')
		}
	});


	ipcMain.handle('create-file', (req, data) => {
		if (!data || !data.title || !data.content) return false;

		const filePath = path.join(__dirname, 'notes', `${data.title}.txt`);
		fs.writeFileSync(filePath, data.content);

		return { success: true, filePath };
	})

	win.loadFile('src/login/login.html');
}

ipcMain.on('notify', (_, message) => {
	new Notification({title: 'Notifiation', body: message}).show();
})

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})