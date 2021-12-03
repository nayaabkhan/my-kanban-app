const fs = require("fs");
const path = require("path");
const os = require("os");
const chokidar = require("chokidar");

const appDir = path.resolve(
  os.homedir(),
  "Library/Mobile Documents/com~apple~CloudDocs",
  "My Kanban App"
);

function resolveToAppDir(subPath) {
  return path.resolve(appDir, subPath);
}

function getProjects() {
  const filesInAppDir = fs.readdirSync(appDir);

  const projects = [];
  filesInAppDir.forEach((fileName) => {
    const fullPath = resolveToAppDir(fileName);
    const stats = fs.statSync(fullPath);

    if (!stats.isDirectory()) {
      return;
    }

    projects.push({
      name: fileName,
      createdAt: stats.ctime,
    });
  });

  return projects;
}

function createProject(name) {
  if (!fs.existsSync(resolveToAppDir(name))) {
    fs.mkdirSync(resolveToAppDir(name));
  }
}

function watch(win) {
  chokidar
    .watch(resolveToAppDir("*"), {
      ignoreInitial: true,
    })
    .on("all", (event, filepath) => {
      // console.log(event, filepath);
      switch (event) {
        case "addDir":
          win.webContents.send("app:new-project", {
            name: path.parse(filepath).base,
          });
          break;

        case "unlinkDir":
          win.webContents.send("app:remove-project", {
            name: path.parse(filepath).base,
          });
          break;
      }
    });
}

module.exports = {
  getProjects,
  createProject,
  watch,
};
