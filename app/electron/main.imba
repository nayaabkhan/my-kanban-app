import path from 'path'
import { app, BrowserWindow, shell } from 'electron'
import { watch } from '../fileSystem'

const preload = import.preload('./preload.imba')

def createWindow
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: preload.absPath,
			nodeIntegration: true,
		},
	})

	win.loadURL('http://localhost:3000')

	win.webContents.setWindowOpenHandler do({ url })
		shell.openExternal url
		return { action: 'deny' }

	return win


app.whenReady!.then do
	const win = createWindow!

	app.on('activate') do
		createWindow! if (BrowserWindow.getAllWindows().length === 0)

	watch(win)


app.on('window-all-closed') do
	app.quit! if (process.platform !== 'darwin')
