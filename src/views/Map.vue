<template>
	<div class="map fixed w-full h-screen">
		<Map>
			<template v-slot:control>
				<EventControl
					:events="events"
					:selection="selectedEventId"
					@select="selectEvent"
					@next="next"
				/>
			</template>
			<template v-slot:chat>
				<Chat />
			</template>
		</Map>
	</div>
</template>
<script>
import Map from '@/components/map/Map';
import EventControl from '@/components/map/EventControl';
import Chat from '@/components/chat/Chat';

export default {
	components: {
		Map,
		EventControl,
		Chat,
	},
	data() {
		return {
			selectedEventId: '1',
		};
	},
	computed: {
		events() {
			return [
				{
					id: '1',
					group: 0,
					content: 'event 1',
					start: new Date(2020, 1, 1),
					end: new Date(2020, 1, 4),
				},
				{
					id: '2',
					group: 0,
					content: 'event 2',
					start: new Date(2020, 1, 4),
					end: new Date(2020, 1, 5),
				},
				{
					id: '3',
					group: 0,
					content: 'event 3',
					start: new Date(2020, 1, 5),
					end: new Date(2020, 1, 10),
				},
			].map((event) => ({
				...event,
				active: event.id === this.selectedEventId,
			}));
		},
	},
	methods: {
		selectEvent(eventId) {
			this.selectedEventId = eventId;
		},
		next() {
			this.selectedEventId = '2';
		},
	},
};
</script>
