const {app, BrowserWindow} = require('electron');
const path = require('path');
const {format:formatURL} = require('url');


process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

let currentWindow;

function createWindow() {
  const window = new BrowserWindow({
    frame: false,
    width: 800,
    height: 600,
    webPreferences:{
      webSecurity:false
    }
  });
  const url = formatURL({
    protocol: 'file',
    slashes: true,
    pathname: path.join(__dirname, '../../build/index.html'),
  });
  // console.log('loading url', url);
  window.loadURL(url);
  window.on('closed', function () {
    currentWindow = null;
  });
  return window;
}

async function devtools() {
  if (process.env.NODE_ENV !== 'development') return;
  const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
  await installExtension(REACT_DEVELOPER_TOOLS);
  currentWindow.webContents.openDevTools();
}

app.on('ready', async function(){
  currentWindow = createWindow();
  // devtools();
});

app.on('window-all-closed', function(){
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function(){
  if (!currentWindow) {
    currentWindow = createWindow();
  }
});