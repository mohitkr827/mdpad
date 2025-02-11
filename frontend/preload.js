const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  saveDialog: () => ipcRenderer.invoke("save-dialog"),
  openDialog: () => ipcRenderer.invoke("open-dialog"),
});
