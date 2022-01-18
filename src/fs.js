/* eslint-disable no-undef */
// import BrowserFS from 'browserfs';
// import fs from 'fs';

import { FileFlag } from 'browserfs/dist/node/core/file_flag';

export let fs = new BrowserFS.FileSystem.MountableFileSystem();

export const Buffer = BrowserFS.BFSRequire('buffer').Buffer;

export async function initFS() {
	// BrowserFS.install(window);
	BrowserFS.initialize(fs);

	console.log(FileFlag);

	// const memory = new BrowserFS.FileSystem.InMemory();

	// fs.mount('/import', memory);

	await writeFile('/test.txt', 'Hello World!');

	window.fs = fs;
	window.BrowserFS = BrowserFS;
}

export async function mountZipFile(zipFile) {
	return new Promise((resolve, reject) => {
		if (fs.existsSync('/import')) {
			fs.umount('/import');
		}

		const reader = new FileReader();
		reader.onload = function (e) {
			const arrayBuffer = e.target.result;

			fs.mount(
				'/import',
				new BrowserFS.FileSystem.ZipFS(Buffer.from(arrayBuffer))
			);

			resolve();
		};
		reader.onerror = reject;
		reader.readAsArrayBuffer(zipFile);
	});
}

export async function readDir(dir) {
	return new Promise((resolve, reject) => {
		fs.readdir(dir, (e) => {
			if (e) {
				reject(e);
			} else {
				resolve();
			}
		});
	});
}

export async function readFile(file, encoding = 'utf8', flag = new FileFlag('r')) {
	return new Promise((resolve, reject) => {
		fs.readFile(file, encoding, flag, (e, contents) => {
			if (e) {
				reject(e);
			} else {
				resolve(contents);
			}
		});
	});
}

export async function writeFile(fname, content) {
	return new Promise((resolve, reject) => {
		fs.writeFile(fname, content, 'utf8', new FileFlag('w+'), 0, (e) => {
			if (e) {
				reject(e);
			} else {
				resolve();
			}
		});
	});
}
