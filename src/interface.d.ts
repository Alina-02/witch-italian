export interface IElectronAPI {
  loadPreferences: () => Promise<void>;
  closeApp: () => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
