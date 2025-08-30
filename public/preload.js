const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  loadData: () => ipcRenderer.invoke("load-data"),
  saveData: (data) => ipcRenderer.invoke("save-data", data),
  closeApp: () => ipcRenderer.send("close-app"),
});

console.log("✅ Preload cargado, window.api expuesto");
