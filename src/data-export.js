// eslint-disable-file no-undef
// import zip from '@zip.js/zip.js';
import { readFile } from '@/fs';

let zip = window.zip;
console.log(zip);

// zip.configure({
// 	// useWebWorkers: false,
// });
// 

// async function addFileRecursive(zipWriter, file, blob) {

// }

export async function exportAsZip(projectName, people, chats, locations, events, files) {
	console.log(people, chats, locations, events, files);

	const inputBlob = new Blob(
		[JSON.stringify({ projectName, people, chats, locations, events }, null, 2)],
		{ type: 'application/json' }
	);
	const blobWriter = new zip.BlobWriter('application/zip');
	const zipWriter = new zip.ZipWriter(blobWriter);
	await zipWriter.add('Viz.json', new zip.BlobReader(inputBlob));

	for (const chat of Object.values(chats)) {
		console.log(chat);

		for (const message of chat.messages) {
			console.log(message);
			
			if (message.mediaSrc) {
				try {
					const file = await readFile(message.mediaSrc.replace('Media/', '/assets/Media/'), null);
					const blob = new Blob([file.buffer], { type: 'image/jpeg' });
					await zipWriter.add(message.mediaSrc, new zip.BlobReader(blob));
				} catch (e) {
					console.error('could not add file', e);
				}
			}
		}
	}

	await zipWriter.close();

	return blobWriter.getData();
}
