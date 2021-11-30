global css
	html ff:sans
	body d:grid place-content:center

tag app
	css d:flex fld:column ai:center

	<self>
		<p> "Edit {<code> "app/client.imba"} and save to reload"
		<a href="https://imba.io" target="_blank"> "Learn Imba"

imba.mount <app>
