/* eslint-disable no-async-promise-executor */

import uuid from 'uuid/v4';
import { mountZipFile, readFile, writeFile, ensureDirectory } from '@/fs';
// import initSqlJs from 'sql.js';

// const initSqlJs = require('sql.js');

let sql = null;

export async function getSQL() {
	if (!sql) {
		sql = await window.initSqlJs({
			// Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
			// You can omit locateFile completely when running in node
			locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.1/${file}`,
		});
	}

	return sql;
}

export async function addPeopleMeta(buffer, { chats, people, files }) {
	const SQL = await getSQL();
	const db = new SQL.Database(buffer);

	db.each(
		`SELECT DISTINCT Contact, ContactAlias FROM data`,
		{},
		function (row) {
			let chattedPerson = {
				id: row.Contact,
				name: row.ContactAlias,
			};

			people[chattedPerson.id] = {
				id: row.Contact,
				...(people[chattedPerson.id] || {}),
				name: row.ContactAlias || row.Contact
			};
		}
	);

	return {
		chats,
		people,
		files
	};
}

export async function parseMsgStore(buffer) {
	const SQL = await getSQL();
	const db = new SQL.Database(buffer);

	let people = {};
	let messages = [];
	let chats = {};
	let files = {};
	let filePromises = [];

	db.each(
		`SELECT
			messages.*,
			message_media.file_path
		FROM
			messages
			LEFT JOIN message_media ON messages.media_url = message_media.message_url`,
		{},
		function (row) {
			let chattedPerson = {
				id: row.key_remote_jid,
				name: row.key_remote_jid,
				avatarUrl: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/00/00bb8a893a2e125c3fce471364154f950a8db60d.jpg',
				color: 'green'
			};

			if (!people[chattedPerson.id]) {
				people[chattedPerson.id] = chattedPerson;
			} else {
				chattedPerson = people[chattedPerson.id];
			}

			const message = {
				id: uuid(),
				sender: chattedPerson.id,
				chatId: chattedPerson.id,
				date: new Date(row.timestamp),
				type: 'text',
				isSender: row.key_from_me === 1,
				text: row.data || row.media_caption,
				mediaSrc: row.file_path,
				mimeType: row.media_mime_type
			};

			if (message.mediaSrc) {
				filePromises.push((async () => {
					try {
						const file = await readFile(message.mediaSrc.replace('Media/', '/import/Export/files/media/0/WhatsApp/Media/'), null);
						const blob = new Blob([file.buffer], { type: message.mimeType || 'image/jpeg' });
						files[message.mediaSrc] = URL.createObjectURL(blob);

						// Move to /assets/Media
						const path = message.mediaSrc.replace('Media/', '/assets/Media/');
						console.log(path);
						await ensureDirectory(path);
						await writeFile(path, file, null);
					} catch (e) {
						console.error('could not fetch file', message.mediaSrc, e);
					}
				})());
			}

			if (message.text || message.mediaSrc) {
				messages.push(message);
			}
		}
	);

	for (const message of messages) {
		const id = `chat-${message.chatId}`;
		if (id in chats) {
			chats[id].messages.push(message);
		} else {
			chats[id] = {
				id: id,
				type: 'whatsapp',
				receiver: message.chatId,
				sender: null,
				messages: [ message ]
			};
		}
	}

	await Promise.allSettled(filePromises);

	return {
		chats,
		people,
		files
	};
}

export async function loadVizFile(file) {
	await mountZipFile(file, '/load');
	let vizJson = JSON.parse(await readFile('/load/Viz.json'));

	console.log(vizJson);

	vizJson.files = {};

	for (const chat of Object.values(vizJson.chats)) {
		for (const message of chat.messages) {
			try {
				message.date = new Date(message.date);
				console.info(message.mediaSrc)
				if (message.mediaSrc) {
					const file = await readFile(`/load/${message.mediaSrc}`, null);
					const blob = new Blob([file.buffer], { type: message.mimeType || 'image/jpeg' });
					vizJson.files[message.mediaSrc] = URL.createObjectURL(blob);

					// Move to /assets/Media
					await ensureDirectory(`/assets/${message.mediaSrc}`);
					await writeFile(`/assets/${message.mediaSrc}`, file, null);
				}
			} catch (e) {
				console.error('could not fetch file', message.mediaSrc, e);
			}
		}
	}

	for (const event of Object.values(vizJson.events)) {
		event.start = new Date(event.start);
		event.end = new Date(event.end);
	}

	return vizJson;
}
