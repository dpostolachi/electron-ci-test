const electron = require('electron')
const ipc = electron.ipcMain;
const {
    app,
    BrowserWindow
} = require('electron')

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false
    })

    // and load the index.html of the app.
    win.loadFile('index.html')

    win.webContents.on('did-finish-load', function () {
        win.webContents.executeJavaScript(`
    require('electron').ipcRenderer.send('gpu', document.body.innerHTML);
  `);
    });

    ipc.on('gpu', (_, gpu) => {
        console.log(gpu)
        process.exit(0)
    })
}

app.on('ready', createWindow)
