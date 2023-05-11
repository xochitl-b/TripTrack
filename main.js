'use strict'; //

const electron = require('electron'); //calling to our electron 'object'
const app = electron.app;
const BrowserWindow = electron.BrowserWindow; //working with browser window option

let mainWindow = null; //creating variable

app.on('window-all-closed', () => { //we grab app object and create a function
    if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => { //another function for when the app is launched
    mainWindow = new BrowserWindow({
  
        width: 600, 
        height: 400

    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('closed', () => { mainWindow = null; });
});
