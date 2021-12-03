import { ipcRenderer, contextBridge } from 'electron'
import { getProjects, createProject } from '../fileSystem'

window.addEventListener("DOMContentLoaded") do
	for dependency of ['chrome', 'node', 'electron']
		console.log(`${dependency}-version`, process.versions[dependency]);

contextBridge.exposeInMainWorld("api", {
	getProjects,
	createProject,

	onNewProject: do(cb)
		ipcRenderer.on("app:new-project") do(_, project)
			cb(project)

	onRemoveProject: do(cb)
		ipcRenderer.on("app:remove-project") do(_, project)
			cb(project)
})
