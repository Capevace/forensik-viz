<div align="center">
	<a href="https://mateffy.me/mission-control-project">
		<img src="resources/FileIcon.png">
	</a>
	<h1>Forensik Viz</h1>
	<p>
		Visualisierung für Forensik-Projekt an der <a href="https://leuphana.de">Leuphana Universität Lüneburg</a>
	</p>
	<p>
		<a href="https://forensik.mateffy.me" target="_blank">Demo</a>
	</p>
</div>

<br>

## Download

Eine Zip-Datei mit den Dateien zum selber hosten ist [hier](https://github.com/Capevace/forensik-viz/releases/latest) verfügbar.


## Das Projekt lokal installieren und builden
Repo clonen und JavaScript dependencies mit NPM installieren.

```
git clone https://github.com/capevace/forensik-viz

cd forensik-viz

npm install
```

### Debug build und HTTP Server
```
npm run serve
```

Die Seite ist dann unter [https://localhost:8080](https://localhost:8080) verfügbar.

### Deploy build
```
npm run build
```

Das JavaScript wird nun gebundelt und ist dann im Ordner `docs/` zum hochladen verfügbar (inkl. `index.html` und CSS).
Im `docs/` Ordner, damit es dann mit GitHub Pages als "Dokumentation" gehostet werden kann.
