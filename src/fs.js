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

	fs.mount('/assets', new BrowserFS.FileSystem.InMemory());
	await mkdir('/assets/Media');
	await writeFile('/assets/Media/test.txt', 'Hello World!');

	window.fs = fs;
	window.BrowserFS = BrowserFS;
}

export async function mountZipFile(zipFile, basePath = '/import') {
	return new Promise((resolve, reject) => {
		if (fs.existsSync(basePath)) {
			fs.umount(basePath);
		}

		const reader = new FileReader();
		reader.onload = function (e) {
			const arrayBuffer = e.target.result;

			fs.mount(
				basePath,
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

export async function readFile(
	file,
	encoding = 'utf8',
	flag = new FileFlag('r')
) {
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

export async function ensureDirectory(fname) {
	let paths = fname.split('/');
	paths = paths.slice(1, paths.length - 1);

	let dir = '';
	for (const path of paths) {
		dir += '/' + path;

		if (!fs.existsSync(dir)) fs.mkdirSync(dir);
	}
}

export async function mkdir(fname) {
	return new Promise((resolve, reject) => {
		fs.mkdir(fname, 0, (e) => {
			if (e) {
				reject(e);
			} else {
				resolve();
			}
		});
	});
}
