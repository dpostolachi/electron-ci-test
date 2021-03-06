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
    win.loadURL('https://inside.auto1-group.com/')

    win.webContents.on('did-finish-load', function () {
        win.webContents.executeJavaScript(`
    require('electron').ipcRenderer.send('gpu', document.body.innerHTML);
  `);
    });

    win.webContents.on('will-navigate', function (event, newUrl) {
      console.log('navigate to:', newUrl);
    });


    ipc.on('gpu', (_, gpu) => {
        console.log(gpu)
    })
}

setTimeout( () => {
  process.exit( 0 )
}, 10000 )

app.on('ready', createWindow)
