const path = require("path");
const { app, BrowserWindow, shell } = require("electron");
const { watch } = require("../fileSystem");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  win.loadURL("http://localhost:3000");

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  return win;
};

app.whenReady().then(() => {
  const win = createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  watch(win);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
