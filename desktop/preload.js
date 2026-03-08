const { contextBridge, ipcRenderer } = require("electron");

// 暴露给渲染进程的安全 API
contextBridge.exposeInMainWorld("electronAPI", {
  // ── Web App (Next.js) 调用 ─────────────────────────────────────────────
  loadPet: (glbUrl) => ipcRenderer.invoke("load-pet", glbUrl),
  loadPetWithAnimations: (data) => ipcRenderer.invoke("load-pet-with-animations", data),
  deleteCharacterData: (data) => ipcRenderer.invoke("delete-character-data", data),

  isElectron: true,

  // ── 宠物窗口调用 ────────────────────────────────────────────────────────
  setIgnoreMouse: (ignore) => ipcRenderer.send("set-ignore-mouse", ignore),
  movePetWindow: (dx, dy) => ipcRenderer.send("move-pet-window", { dx, dy }),
  showPetMenu: () => ipcRenderer.send("show-pet-menu"),
  showPet: () => ipcRenderer.send("show-pet"),
  hidePet: () => ipcRenderer.send("hide-pet"),

  onLoadGlb: (callback) =>
    ipcRenderer.on("load-glb", (_, url) => callback(url)),
  onPlayAnimation: (callback) =>
    ipcRenderer.on("play-animation", (_, preset) => callback(preset)),
});
