import { v4 as uuid } from 'uuid';

export function getExampleData() {
	const personA = {
		id: '601cff75-9252-4086-998b-8938209ed879',
		name: 'Markus Gasleiter',
		avatarUrl:
			'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/00/000e8e1129ee8406ae7ba4da4a07d1476a9cfbba.jpg',
		color: 'green',
	};
	const personB = {
		id: '1ed7504b-35bd-41b7-b8d7-38149b8a027c',
		name: 'Frank Susmann',
		avatarUrl:
			'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/00/00bb8a893a2e125c3fce471364154f950a8db60d.jpg',
		color: 'purple',
	};
	const people = {
		[personA.id]: personA,
		[personB.id]: personB,
	};

	const events = [
		{
			id: uuid(),
			title: 'Frank und Markus klären Arbeitszeiten',
			start: new Date('2021-10-01 15:45:00'),
			end: new Date('2021-10-01 18:45:00'),
			locations: [
				{
					id: uuid(),
					position: { lat: 53.228093, lng: 10.373144 },
					date: new Date('2021-10-01 15:50:00'),
					person: personA.id,
					description: `Haus von ${personA.name}`,
				},
				{
					id: uuid(),
					position: { lat: 53.232634, lng: 10.393671 },
					date: new Date('2021-10-01 16:22:00'),
					person: personB.id,
					description: `Arbeit von ${personB.name}`,
				},
				{
					id: uuid(),
					position: { lat: 53.228909, lng: 10.401397 },
					date: new Date('2021-10-01 18:30:00'),
					person: personA.id,
					description: `Kiosk von ${personA.name}`,
				},
			],
			chats: [
				{
					id: uuid(),
					type: 'whatsapp',
					receiver: personB.id,
					sender: personA.id,
					messages: [
						{
							id: uuid(),
							date: new Date('2021-10-01 16:10:00'),
							sender: personA.id,
							type: 'text',
							text: 'Ey yo kannst du heute noch die Schicht übernehmen?',
						},
						{
							id: uuid(),
							date: new Date('2021-10-01 16:23:00'),
							sender: personB.id,
							type: 'text',
							text: 'Sorry bin grade auf Arbeit angekommen, wird heute nix 😅',
						},
						{
							id: uuid(),
							date: new Date('2021-10-01 16:40:02'),
							sender: personA.id,
							type: 'image',
							mediaSrc:
								'https://image.spreadshirtmedia.net/image-server/v1/mp/products/T1459A839PA4459PT28D129372714FS7416/views/1,width=378,height=378,appearanceId=839,backgroundColor=F2F2F2/mittelfinger-fuck-you-sticker.jpg',
						},
						{
							id: uuid(),
							date: new Date('2021-10-01 16:40:03'),
							sender: personA.id,
							type: 'text',
							text: 'Ach halt doch die Schnauze',
						},
					],
				},
				{
					id: uuid(),
					type: 'sms',
					receiver: personB.id,
					sender: personA.id,
					messages: [
						{
							id: uuid(),
							date: new Date('2021-10-05 10:12:00'),
							sender: personA.id,
							type: 'image',
							mediaSrc:
								'https://c0.thejournal.ie/media/2013/11/products-390x285.jpg',
						},
						{
							id: uuid(),
							date: new Date('2021-10-05 10:12:30'),
							sender: personA.id,
							type: 'text',
							text: 'DU WICHSER ICH SCHIEB DIR DIE BULLEN AN DEN HALS',
						},
						{
							id: uuid(),
							date: new Date('2021-10-05 10:31:30'),
							sender: personB.id,
							type: 'text',
							text: 'Was laberst du?? Ich war das nich',
						},
						{
							id: uuid(),
							date: new Date('2021-10-05 10:45:30'),
							sender: personA.id,
							type: 'text',
							text: 'Erzähl das doch den Bullen hahaha du bist so gefickt',
						},
					],
				},
			],
		},
		{
			id: uuid(),
			title: 'Tatzeitpunkt',
			start: new Date('2021-10-04 15:45:00'),
			end: new Date('2021-10-05 18:45:00'),
			locations: [
				{
					id: uuid(),
					position: { lat: 53.249013, lng: 10.361813 },
					date: new Date('2021-10-04 15:45:00'),
					person: personB.id,
					description: `${personB.name} bei Großmutter`,
				},
				{
					id: uuid(),
					position: { lat: 53.228093, lng: 10.373144 },
					description: `Haus von ${personA.name}`,
				},
				{
					id: uuid(),
					position: { lat: 53.228909, lng: 10.401397 },
					date: new Date('2021-10-05 01:30:00'),
					person: personA.id,
					description: `${personA.name} im Kiosk`,
				},
			],
			chats: [
				{
					id: uuid(),
					type: 'whatsapp',
					receiver: personB.id,
					sender: personA.id,
					messages: [
						{
							id: uuid(),
							date: new Date('2021-10-05 10:12:00'),
							sender: personA.id,
							type: 'image',
							mediaSrc:
								'https://c0.thejournal.ie/media/2013/11/products-390x285.jpg',
						},
						{
							id: uuid(),
							date: new Date('2021-10-05 10:12:30'),
							sender: personA.id,
							type: 'text',
							text: 'DU WICHSER ICH SCHIEB DIR DIE BULLEN AN DEN HALS',
						},
						{
							id: uuid(),
							date: new Date('2021-10-05 10:31:30'),
							sender: personB.id,
							type: 'text',
							text: 'Was laberst du?? Ich war das nich',
						},
						{
							id: uuid(),
							date: new Date('2021-10-05 10:45:30'),
							sender: personA.id,
							type: 'text',
							text: 'Erzähl das doch den Bullen hahaha du bist so gefickt',
						},
					],
				},
			],
		},
	];

	return { people, events };
}

// const Person = {
// 	id: '',
// 	name: '',
// 	avatarUrl: '',
// 	color: ''
// };

// const Chat = {
// 	id: '',
// 	type: 'whatsapp' || 'sms' || 'phonelog',
// 	receiver: '', // person.id
// 	sender: '', // person.id
// 	messages: [],
// };

// const Message = {
// 	id: '',
// 	date: new Date(),
// 	sender: '', // person.id
// 	type: 'text' || 'image' || 'video',
// 	text: '' || undefined,
// 	mediaSrc: '' || undefined,
// };

// const Location = {
// 	id: '',
// 	date: new Date() || undefined,
// 	position: { lat: 0, lng: 0 },
// 	person: '', // person.id
// 	description: '' || undefined,
// };

// const Event = {
// 	id: '',
// 	title: '',
// 	start: new Date(),
// 	end: new Date(),
// 	centerLocation: { lat: 0, lng: 0 } || undefined, // only set if locations.length === 0
// 	locations: [],
// 	chats: [],
// };
