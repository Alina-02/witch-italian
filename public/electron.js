const { app, BrowserWindow } = require("electron");
const { ipcMain } = require("electron");

const url = require("url");
const path = require("path");
const fs = require("fs");

const DATA_FILE = path.join(app.getPath("userData"), "data.json");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Witch Italian",
    icon: "./wicon.png",
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Path to preload script
      contextIsolation: true, // Keeps context isolated for security
      nodeIntegration: false, // Disables Node.js in the renderer (security best practice)
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, "../build/index.html"), //connect to the react app
    protocol: "file:",
    slashes: true,
  });

  mainWindow.loadURL(startUrl); // load app in electron window

  ipcMain.on("close-app", () => {
    app.quit();
  });
}

app.whenReady().then(createMainWindow);

ipcMain.handle("save-data", async (_event, data) => {
  console.log("Guardando datos:", data, "en", DATA_FILE);

  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: err };
  }
});

ipcMain.handle("load-data", () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(raw);
    }
    return null;
  } catch (err) {
    console.error("Error loading data.json:", err);
    return null;
  }
});

/////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// Reopens the window if the app is activated and no windows are open (macOS behavior)
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

// Closes the app completely
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
