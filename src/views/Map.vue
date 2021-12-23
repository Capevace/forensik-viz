<template>
	<div class="map fixed w-full h-screen">
		<Map :locations="currentLocations">
			<template v-slot:control>
				<EventControl
					:events="events"
					:selectedEvent="selectedEvent"
					@select="selectEvent"
					@next="next"
					@previous="previous"
				/>
			</template>
			<template v-slot:chat>
				<ChatWindow
					v-if="currentChats"
					class="shadow-lg"
					:chats="currentChats"
				/>
			</template>
		</Map>
	</div>
</template>
<script>
import Map from '@/components/map/Map';
import EventControl from '@/components/events/EventControl';
import ChatWindow from '@/components/chat/ChatWindow';

export default {
	components: {
		Map,
		EventControl,
		ChatWindow,
	},
	data() {
		return {
			selectedEventId: null,
		};
	},
	mounted() {
		this.selectedEventId = this.$store.state.presentation.events[0].id;
	},
	computed: {
		events() {
			return this.$store.state.presentation.events;
		},
		selectedEvent() {
			if (!this.selectedEventId) return null;

			return this.events.find(
				(event) => event.id === this.selectedEventId
			);
		},
		currentChats() {
			if (!this.selectedEvent) {
				return null;
			}

			return this.selectedEvent.chats;
		},
		currentLocations() {
			if (!this.selectedEvent) {
				return [];
			}

			return this.selectedEvent.locations;
		},
	},
	methods: {
		selectEvent(eventId) {
			this.selectedEventId = eventId;
		},
		next() {
			let index = this.events.findIndex(
				(e) => e.id === this.selectedEventId
			);

			if (index === -1 || ++index >= this.events.length) {
				return;
			}

			this.selectedEventId = this.events[index].id;
		},
		previous() {
			let index = this.events.findIndex(
				(e) => e.id === this.selectedEventId
			);

			if (index === -1 || --index < 0) {
				return;
			}

			this.selectedEventId = this.events[index].id;
		},
	},
};
</script>
