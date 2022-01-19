// import { v4 as uuid } from 'uuid';
import Vue from 'vue';

import { loadVizFile } from '@/data-import';
import { exportAsZip } from '@/data-export';

/**
 * @typedef {Person}
 */

// const personA = {
// 	id: '601cff75-9252-4086-998b-8938209ed879',
// 	name: 'Markus Gasleiter',
// 	avatarUrl: null,
// 	color: 'green',
// };
// const personB = {
// 	id: '1ed7504b-35bd-41b7-b8d7-38149b8a027c',
// 	name: 'Frank Susmann',
// 	avatarUrl:
// 		null,
// 	color: 'purple',
// };
// const people = {
// 	[personA.id]: personA,
// 	[personB.id]: personB,
// };

// const locations = {
// 	'l-1': {
// 		id: 'l-1',
// 		position: { lat: 53.228093, lng: 10.373144 },
// 		date: new Date('2021-10-01 15:50:00'),
// 		person: personA.id,
// 		description: `Haus von ${personA.name}`,
// 	},
// 	'l-2': {
// 		id: 'l-2',
// 		position: { lat: 53.232634, lng: 10.393671 },
// 		date: new Date('2021-10-01 16:22:00'),
// 		person: personB.id,
// 		description: `Arbeit von ${personB.name}`,
// 	},
// 	'l-3': {
// 		id: 'l-3',
// 		position: { lat: 53.228909, lng: 10.401397 },
// 		date: new Date('2021-10-01 18:30:00'),
// 		person: personA.id,
// 		description: `Kiosk von ${personA.name}`,
// 	},

// 	'l-4': {
// 		id: 'l-4',
// 		position: { lat: 53.249013, lng: 10.361813 },
// 		date: new Date('2021-10-04 15:45:00'),
// 		person: personB.id,
// 		description: `${personB.name} bei Großmutter`,
// 	},
// 	'l-5': {
// 		id: 'l-5',
// 		position: { lat: 53.228093, lng: 10.373144 },
// 		description: `Haus von ${personA.name}`,
// 	},
// 	'l-6': {
// 		id: 'l-6',
// 		position: { lat: 53.228909, lng: 10.401397 },
// 		date: new Date('2021-10-05 01:30:00'),
// 		person: personA.id,
// 		description: `${personA.name} im Kiosk`,
// 	},
// };

// // const chats = {
// // 	'whatsapp-a': {
// // 		id: 'whatsapp-a',
// // 		type: 'whatsapp',
// // 		receiver: personB.id,
// // 		sender: personA.id,
// // 		messages: [
// // 			{
// // 				id: uuid(),
// // 				date: new Date('2021-10-01 16:10:00'),
// // 				sender: personA.id,
// // 				type: 'text',
// // 				text: 'Ey yo kannst du heute noch die Schicht übernehmen?',
// // 			},
// // 			{
// // 				id: uuid(),
// // 				date: new Date('2021-10-01 16:23:00'),
// // 				sender: personB.id,
// // 				type: 'text',
// // 				text: 'Sorry bin grade auf Arbeit angekommen, wird heute nix 😅',
// // 			},
// // 			{
// // 				id: uuid(),
// // 				date: new Date('2021-10-01 16:40:02'),
// // 				sender: personA.id,
// // 				type: 'image',
// // 				mediaSrc:
// // 					'https://image.spreadshirtmedia.net/image-server/v1/mp/products/T1459A839PA4459PT28D129372714FS7416/views/1,width=378,height=378,appearanceId=839,backgroundColor=F2F2F2/mittelfinger-fuck-you-sticker.jpg',
// // 			},
// // 			{
// // 				id: uuid(),
// // 				date: new Date('2021-10-01 16:40:03'),
// // 				sender: personA.id,
// // 				type: 'text',
// // 				text: 'Ach halt doch die Schnauze',
// // 			},

// // 			{
// // 				id: uuid(),
// // 				date: new Date('2021-10-05 10:12:00'),
// // 				sender: personA.id,
// // 				type: 'image',
// // 				mediaSrc:
// // 					'https://c0.thejournal.ie/media/2013/11/products-390x285.jpg',
// // 			},
// // 			{
// // 				id: uuid(),
// // 				date: new Date('2021-10-05 10:12:30'),
// // 				sender: personA.id,
// // 				type: 'text',
// // 				text: 'DU WICHSER ICH SCHIEB DIR DIE BULLEN AN DEN HALS',
// // 			},
// // 			{
// // 				id: uuid(),
// // 				date: new Date('2021-10-05 10:31:30'),
// // 				sender: personB.id,
// // 				type: 'text',
// // 				text: 'Was laberst du?? Ich war das nich',
// // 			},
// // 			{
// // 				id: uuid(),
// // 				date: new Date('2021-10-05 10:45:30'),
// // 				sender: personA.id,
// // 				type: 'text',
// // 				text: 'Erzähl das doch den Bullen hahaha du bist so gefickt',
// // 			},
// // 		],
// // 	},
// // 	'sms-a': {
// // 		id: 'sms-a',
// // 		type: 'sms',
// // 		receiver: personB.id,
// // 		sender: personA.id,
// // 		messages: [
// // 			{
// // 				id: uuid(),
// // 				date: new Date('2021-10-05 10:12:00'),
// // 				sender: personA.id,
// // 				type: 'image',
// // 				mediaSrc:
// // 					'https://c0.thejournal.ie/media/2013/11/products-390x285.jpg',
// // 			},
// // 			{
// // 				id: uuid(),
// // 				date: new Date('2021-10-05 10:12:30'),
// // 				sender: personA.id,
// // 				type: 'text',
// // 				text: 'DU WICHSER ICH SCHIEB DIR DIE BULLEN AN DEN HALS',
// // 			},
// // 			{
// // 				id: uuid(),
// // 				date: new Date('2021-10-05 10:31:30'),
// // 				sender: personB.id,
// // 				type: 'text',
// // 				text: 'Was laberst du?? Ich war das nich',
// // 			},
// // 			{
// // 				id: uuid(),
// // 				date: new Date('2021-10-05 10:45:30'),
// // 				sender: personA.id,
// // 				type: 'text',
// // 				text: 'Erzähl das doch den Bullen hahaha du bist so gefickt',
// // 			},
// // 		],
// // 	},
// // };

// // const { people, events } = getExampleData();

// const event = {
// 	id: uuid(),
// 	title: 'Frank und Markus klären Arbeitszeiten',
// 	start: new Date(),
// 	end: new Date(Date.now() + 1000 * 60 * 60),
// 	chats: [],
// 	locations: [],
// };

export default {
	namespaced: true,
	state: () => ({
		projectName: 'Forensik Viz',
		people: {},
		chats: {},
		locations: {},
		events: {
			// [event.id]: event
		},
		files: {},
		exif: {}
	}),
	getters: {
		eventList(state) {
			return Object.values(state.events).sort((a, b) => {
				const aStart = a.start;
				const bStart = b.start;

				if (aStart < bStart) {
					return -1;
				} else if (aStart > bStart) {
					return 1;
				} else {
					return 0;
				}
			}).map((event) => ({
				...event,
				content: event.title,
			}));
		}
	},
	mutations: {
		setViz(state, viz) {
			state.projectName = viz.projectName || 'Forensik Viz';
			state.people = viz.people || {};
			state.chats = viz.chats || {};
			state.locations = viz.locations || {};
			state.events = viz.events || {};
			state.files = viz.files || {};
			state.exif = viz.exif || {};
		},

		setProjectName(state, name) {
			state.projectName = name;
		},

		/*
		 * Events
		 */
		updateEvent(state, event) {
			Vue.set(state.events, event.id, event);
		},

		deleteEvent(state, eventId) {
			Vue.delete(state.events, eventId);
		},

		/*
		 * Chats
		 */
		addChats(state, chats) {
			state.chats = {
				...state.chats,
				...chats
			};
		},

		/*
		 * Files
		 */
		addFiles(state, files = {}) {
			state.files = {
				...state.files,
				...files
			};
		},

		/*
		 * Locations
		 */
		addLocations(state, locations) {
			state.locations = {
				...state.locations,
				...locations
			};
		},

		updateLocation(state, location) {
			Vue.set(state.locations, location.id, location);
		},

		deleteLocation(state, location) {
			Vue.delete(state.locations, location.id);
		},

		setLocationPerson(state, { location, person }) {
			Vue.set(state.locations, location.id, {
				...state.locations[location.id],
				person
			});
		},

		/*
		 * People
		 */
		updatePerson(state, person) {
			Vue.set(
				state.people, 
				person.id, 
				(person.id in state.people)
					? { ...state.people[person.id], ...person }
					: person
			);
		},

		deletePerson(state, id) {
			Vue.delete(state.people, id);
		},

		/*
		 * EXIF
		 */
		addExif(state, exif) {
			state.exif = {
				...state.exif,
				...exif
			};
		},
	},
	actions: {
		async exportAsFile(context) {
			const blob = await exportAsZip(context.state);
			const data = window.URL.createObjectURL(blob);


			const link = document.createElement('a');
			link.href = data;
			link.download = `${new Date().toISOString().split('.')[0]}.viz`;

			// this is necessary as link.click() does not work on the latest firefox
			link.dispatchEvent(
				new MouseEvent('click', {
					bubbles: true,
					cancelable: true,
					view: window,
				})
			);

			setTimeout(() => {
				// For Firefox it is necessary to delay revoking the ObjectURL
				window.URL.revokeObjectURL(data);
				link.remove();
			}, 100);
		},

		async loadFile(context, file) {
			context.commit('setViz', await loadVizFile(file));
		},

		async parseExif(context, file) {
			context.commit('setViz', await loadVizFile(file));
		}
	},
};
