<template>
	<div class="map fixed flex h-screen w-full flex-col">
		<Header small locked>
			<template v-slot:actions>
				<form
					class="flex items-center gap-2 px-2"
					@submit.prevent="loadFile"
				>
					<input
						type="file"
						ref="vizFile"
						@change="onVizFileChanged"
					/>

					<button
						class="rounded-md bg-gray-200 py-1 px-4 text-gray-700 hover:text-blue-900 disabled:cursor-default disabled:opacity-50"
						:class="{ 'hover:bg-blue-200': visFileSelected }"
						type="submit"
						:disabled="!visFileSelected"
					>
						{{ $t('Laden') }}
					</button>

					<a
						href="#"
						class="block rounded-md bg-gray-200 py-1 px-4 text-gray-700 hover:bg-blue-200 hover:text-blue-900"
						@click.prevent="edit"
					>
						{{ $t('Bearbeiten ➝') }}
					</a>
				</form>
			</template>
		</Header>

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

			<template v-slot:load> </template>
		</Map>
	</div>
</template>
<script>
import Header from '@/components/layout/Header';
import Map from '@/components/map/Map';
import EventControl from '@/components/events/EventControl';
import ChatWindow from '@/components/chat/ChatWindow';

export default {
	components: {
		Header,
		Map,
		EventControl,
		ChatWindow,
	},
	data() {
		return {
			visFileSelected: false,
		};
	},
	mounted() {
		this.selectEvent(this.events.length > 0 ? this.events[0].id : null);
	},
	computed: {
		selectedEventId() {
			return this.$store.state.map.selectedEventId;
		},
		eventsObj() {
			return this.$store.state.setup.events;
		},
		events() {
			return this.$store.getters['setup/eventList'];
		},
		selectedEvent() {
			if (!this.selectedEventId) return null;

			return this.eventsObj[this.selectedEventId];
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
		onVizFileChanged() {
			this.visFileSelected = this.$refs.vizFile.files.length > 0;
		},
		loadFile() {
			this.$store.dispatch('setup/loadFile', this.$refs.vizFile.files[0]);
		},
		edit() {
			this.$router.push('/editor');
		},
		selectEvent(eventId) {
			this.$store.commit('map/selectEvent', eventId);
		},
		next() {
			if (!this.selectedEventId && this.events.length > 0) {
				this.selectEvent(this.events[0].id);
			}

			let index = this.events.findIndex(
				(e) => e.id === this.selectedEventId
			);

			if (index === -1 || ++index >= this.events.length) {
				return;
			}

			this.selectEvent(this.events[index].id);
		},
		previous() {
			if (!this.selectedEventId && this.events.length > 0) {
				this.selectEvent(this.events[0].id);
			}

			let index = this.events.findIndex(
				(e) => e.id === this.selectedEventId
			);

			if (index === -1 || --index < 0) {
				return;
			}

			this.selectEvent(this.events[index].id);
		},
	},
	watch: {
		eventsObj() {
			this.selectEvent(this.events.length > 0 ? this.events[0].id : null);
		},
	},
};
</script>
