/**
 * Created by Vi on 04.04.2020.
 */
const electron = require('electron')
const {app, BrowserWindow} = electron
const path = require('path')
const fs = require('fs')

let win = null

app.on('ready', () => {
    win = new BrowserWindow({width:900, height: 600, webPreferences: {
        nodeIntegration: true
    }})
    win.maximize()
win.loadURL('file://' + path.join(__dirname,'index.html'))

win.webContents.openDevTools()

win.on('closed', () => {
    win = null;
})
})