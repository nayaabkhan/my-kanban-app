import './src/tags/project-item'

global css html ff:sans

tag kb-app
	projects = []
	newProjectText = ''

	def findProjectBy name\string
		projects.findIndex do(x) x.name === name

	def insertProject project
		const hit = findProjectBy project.name
		projects.push(project) if (hit <= 0)
		render!

	def removeProject project
		const hit = findProjectBy project.name
		projects.splice(hit, 1)
		render!

	def setup
		projects = window.api.getProjects!
		window.api.onNewProject insertProject
		window.api.onRemoveProject removeProject

	def createProject
		window.api.createProject(newProjectText)
		projects.push({name: newProjectText})
		newProjectText = ''

	css d:flex fld:column g:1rem

	<self>
		for project in projects
			<kb-project-item title=project.name>

		<form @submit.prevent=createProject>
			<input type='text' bind=newProjectText>

imba.mount <kb-app>
