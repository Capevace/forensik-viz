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
				
				
			],
		},
		{
			id: uuid(),
			title: 'Tatzeitpunkt',
			start: new Date('2021-10-04 15:45:00'),
			end: new Date('2021-10-05 18:45:00'),
			locations: [
				
			],
			chats: [
				{
					id: uuid(),
					type: 'whatsapp',
					receiver: personB.id,
					sender: personA.id,
					messages: [
						
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
