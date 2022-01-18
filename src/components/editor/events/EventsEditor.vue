<template>
	<section class="max-w-4xl mx-auto mb-10">
		<pre class="text-xs">{{ JSON.stringify(events, null, 2) }}</pre>

		<h2 class="text-2xl font-medium mb-3 flex justify-between items-center">
			<span>Events ({{ events.length }})</span>

			<button
				class="block bg-blue-100 text-base font-regular rounded-md h-full px-2 py-2"
				@click="addEvent"
			>
				Event hinzufügen
			</button>
		</h2>

		<div class="mb-10">
			<Timeline
				:items="timelineEvents"
				:options="{
					editable: false,
					// height: 95,
					// minHeight: 95,
					width: '100%',
					stack: true,
					align: 'left',
					type: 'range',
				}"
				:events="['select']"
				:selection="selectedEvent ? selectedEvent.id : null"
				@select="selectEvent"
				ref="timeline"
			/>
		</div>

		<article v-if="selectedEvent">
			<h3 class="text-lg font-medium mb-3">
				Event: {{ selectedEvent.title }}
			</h3>
			<MetaEditor v-model="selectedEvent" />

			<h4 class="text-lg font-medium mb-3">Chats</h4>
			<ChatSelector
				v-model="selectedEvent.chats"
				:chats="Object.values(chats)"
				:filter-start="selectedEvent.start"
				:filter-end="selectedEvent.end"
			/>

			<h4 class="text-lg font-medium mb-3">Locations</h4>
			<LocationSelector
				v-model="selectedEvent.locations"
				:locations="Object.values(locations)"
			/>
		</article>
	</section>
</template>
<script type="text/javascript">
import { Timeline } from 'vue-visjs';
import MetaEditor from '@/components/editor/events/MetaEditor';
import ChatSelector from '@/components/editor/events/ChatSelector';
import LocationSelector from '@/components/editor/events/LocationSelector';
import randomId from '@/util/random-id';

export default {
	components: {
		Timeline,
		MetaEditor,
		ChatSelector,
		LocationSelector,
	},
	data() {
		return {
			events: [
				{
					id: randomId(),
					title: 'Frank und Markus klären Arbeitszeiten',
					start: new Date(),
					end: new Date(Date.now() + 1000 * 60 * 60),
					chats: [],
					locations: [],
				},
			],
			selectedEvent: null,
		};
	},
	methods: {
		addEvent() {
			this.selectedEvent =
				this.events[
					this.events.push({
						id: randomId(),
						title: 'Frank und Markus klären Arbeitszeiten',
						start: new Date(),
						end: new Date(Date.now() + 1000 * 60 * 60),
						chats: [],
						locations: []
					}) - 1
				];
		},

		selectEvent({ items }) {
			if (items.length > 0) {
				const index = this.events.findIndex(
					({ id }) => id === items[0]
				);
				this.selectedEvent = this.events[index];
			}
		},
	},

	computed: {
		timelineEvents() {
			return this.events.map(event => ({ ...event, content: event.title }))
		},
		chats() {
			return this.$store.state.setup.chats || {
				'whatsapp-1': {
					id: 'whatsapp-1',
					type: 'whatsapp',
					receiver: '601cff75-9252-4086-998b-8938209ed879',
					sender: '1ed7504b-35bd-41b7-b8d7-38149b8a027c',
					messages: [
						{
							id: randomId(),
							date: new Date(),
							sender: '601cff75-9252-4086-998b-8938209ed879',
							type: 'text',
							text: 'Ey yo kannst du heute noch die Schicht übernehmen?',
						},
						{
							id: randomId(),
							date: new Date(Date.now() + 1000 * 60),
							sender: '1ed7504b-35bd-41b7-b8d7-38149b8a027c',
							type: 'image',
							mediaSrc:
								'https://image.spreadshirtmedia.net/image-server/v1/mp/products/T1459A839PA4459PT28D129372714FS7416/views/1,width=378,height=378,appearanceId=839,backgroundColor=F2F2F2/mittelfinger-fuck-you-sticker.jpg',
						},
					],
				},
			};
		},

		locations() {
			return this.$store.state.setup.locations || {
				a: {
					id: 'a',
					position: { lat: 53.228093, lng: 10.373144 },
					date: new Date('2021-10-01 15:50:00'),
					person: 'aaa',
					description: `Haus`,
				},
				b: {
					id: 'b',
					position: { lat: 53.232634, lng: 10.393671 },
					date: new Date('2021-10-01 16:22:00'),
					description: `Arbeit`,
				},
			};
		}
	}
};
</script>
<style type="text/css">
.vdatetime {
	@apply w-full;
}

.vdatetime-input {
	@apply w-full focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-4 sm:text-sm border-gray-300 rounded-md;
}
</style>
