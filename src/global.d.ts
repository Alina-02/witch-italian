export {};

declare global {
  interface Window {
    electronAPI: {
      closeApp: () => Promise<void>;
      loadData: () => Promise<any>;
      saveData: (data: unknown) => Promise<void>;
    };
  }
}
