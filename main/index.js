const {app, BrowserWindow} = require('electron');

let window;

function createWindow() {
  window = new BrowserWindow({ frame:false, width: 800, height: 600 });
  // window.setMenu(null);
  window.loadURL('http://localhost:8080/index.html');
  window.webContents.openDevTools();
  window.on('closed', function () {
    window = null;
  });
}

app.on('ready', function(){
  createWindow();
});

app.on('window-all-closed', function(){
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function(){
  if (!window) {
    createWindow();
  }
});