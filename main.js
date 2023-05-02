'use strict'; //

const electron = require('electron'); //calling to our electron 'object'
const app = electron.app;
const BrowserWindow = electron.BrowserWindow; //working with browser window option
const notifier = require('node-notifier');

let mainWindow = null; //creating variable

app.on('window-all-closed', () => { //we grab app object and create a function
    if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => { //another function for when the app is launched
    mainWindow = new BrowserWindow({
  /* We can put the specifics about the window here. for now I'll comment it out.
        width: , 
        height: ,
*/
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.on('closed', () => { mainWindow = null; }); // close the window when closed. lol
});
