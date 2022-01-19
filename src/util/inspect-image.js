export default function inspectImage(viewerApi, state, mediaSrc) {
	const exif = state.exif[mediaSrc] || {};

	const element = document.createElement('div');
	element.className =
		'overflow-hidden fixed top-0 right-0 mr-5 mt-10 text-base bg-gray-200 text-gray-900 rounded-md fixed min-w-5 transition opacity-60 hover:opacity-100';
	element.style = 'z-index: 3000; min-width: 300px;';

	element.innerHTML = `
		<h1 class="w-full text-sm font-semibold px-2 py-1 mr-10 bg-gray-100 flex items-center justify-between">
			<span>EXIF Daten</span>
			<button>Anzeigen</button>
		</h1>

		<div class="overflow-y-scroll px-5 py-5 exif-tags hidden" style="max-height: 500px;">
			${[
				'MD5',
				'GPSLatitude',
				'GPSLongitude',
				'Latitude',
				'Longitude',
				'DateTime',
				'DateTimeOriginal',
				...Object.keys(exif),
			]
				.map((tagName) => {
					const tag = exif[tagName];

					if (!tag) return '';

					let tagText = tag;

					if (typeof tag === 'object' || Array.isArray(tag)) {
						tagText = JSON.stringify(tag, null, 2);
					}

					return `
							<div class="mb-5 font-medium">
								<h2 class="text-xs text-gray-600 mb-1">${tagName}</h2>
								<pre class="text-sm">${tagText}</pre>
							</div>
						`;
				})
				.join('\n')}
		</div>
	`;

	element.querySelector('button').addEventListener('click', (e) => {
		if (e.target.textContent === 'Anzeigen') {
			e.target.textContent = 'Verstecken';

			element.querySelector('.exif-tags').classList.remove('hidden');
		} else {
			e.target.textContent = 'Anzeigen';

			element.querySelector('.exif-tags').classList.add('hidden');
		}
	});

	viewerApi({
		images: [state.files[mediaSrc]],
		options: {
			toolbar: false,
			navbar: false,
			zoomOnWheel: true,
			hide() {
				element.remove();
			},
		},
	});

	// viewer.viewer.removeEventListener('wheel', viewer.wheel);

	setTimeout(() => {
		document.querySelector('.viewer-container').after(element);
	}, 100);
}
