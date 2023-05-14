'use strict'; //

const { app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');

let mainWindow = null; //creating variable

app.on('window-all-closed', () => { //we grab app object and create a function
    if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => { //another function for when the app is launched
    mainWindow = new BrowserWindow({
  
        width: 600, 
        height: 400

    });


    mainWindow.loadURL(`file://${__dirname}/bootstrap/index.html`);
    mainWindow.on('closed', () => { mainWindow = null; });

    const template = [
        {
            label: 'Edit',
            submenu: [
                {role: 'undo'},
                {role: 'redo'},
                {type: 'separator'},
                {role: 'cut'},
                {role: 'copy'},
                {role: 'paste'},
                {role: 'delete'},
                {role: 'selectall'},
            ],
        },
      ];
    
      const menu = Menu.buildFromTemplate(template);
      Menu.setApplicationMenu(menu);
    
      mainWindow.webContents.on('context-menu', (event, params)=>{
        const contextMenuTemplate = [
            {role: 'cut'},
            {role: 'copy'},
            {role: 'paste'},
        ];
    
        const contextMenu = Menu.buildFromTemplate(contextMenuTemplate);
        contextMenu.popup();
       });   

})
