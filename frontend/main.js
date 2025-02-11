const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("./public/index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle save dialog
ipcMain.handle("save-dialog", async (event) => {
  const { filePath } = await dialog.showSaveDialog({
    title: "Save Markdown File",
    filters: [{ name: "Markdown Files", extensions: ["md"] }],
  });
  return filePath;
});

// Handle open dialog
ipcMain.handle("open-dialog", async (event) => {
  const { filePaths } = await dialog.showOpenDialog({
    title: "Load Markdown File",
    filters: [{ name: "Markdown Files", extensions: ["md"] }],
    properties: ["openFile"],
  });
  return filePaths;
});