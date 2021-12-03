const { ipcRenderer, contextBridge } = require("electron");
const { getProjects, createProject } = require("../fileSystem");

window.addEventListener("DOMContentLoaded", () => {
  for (const dependency of ["chrome", "node", "electron"]) {
    console.log(`${dependency}-version`, process.versions[dependency]);
  }
});

contextBridge.exposeInMainWorld("api", {
  getProjects,
  createProject,

  onNewProject: (cb) => {
    ipcRenderer.on("app:new-project", (_, project) => {
      cb(project);
    });
  },

  onRemoveProject: (cb) => {
    ipcRenderer.on("app:remove-project", (_, project) => {
      cb(project);
    });
  },
});
