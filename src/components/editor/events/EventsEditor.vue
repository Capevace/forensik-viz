<template>
	<section class="max-w-4xl mx-auto mb-10 text-gray-800">
		<!-- <pre class="text-xs">{{ JSON.stringify(timelineEvents, null, 2) }}</pre> -->

		<h2 class="text-2xl font-medium mb-3 flex justify-between items-center">
			<button class="font-medium" @click="selectNextEvent">
				Events ({{ timelineEvents.length }})
			</button>

			<button
				class="block bg-blue-100 hover:bg-blue-200 text-base font-regular rounded-md h-full px-2 py-2"
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
			{{ selectedEvent }}
			<div class="flex w-full justify-between items-center">
				<h3 class="text-lg font-medium mb-3">
					Event: {{ selectedEvent.title }}
				</h3>
				<div class="flex items-center gap-2">
					<button class="hover:bg-blue-200 px-2 py-1 rounded-md" @click="duplicateEvent">Event duplizieren</button>
					<button class="hover:bg-red-200 px-2 py-1 rounded-md" @click="deleteEvent">Event löschen</button>
				</div>
			</div>
			<MetaEditor v-model="selectedEvent"  />

			<h4 class="text-lg font-medium mb-3">Chats</h4>
			<ChatSelector
				v-model="selectedEvent"
				:chats="chats"
				:filter-start="selectedEvent.start"
				:filter-end="selectedEvent.end"
			/>

			<h4 class="text-lg font-medium mb-3">Locations</h4>
			<LocationSelector
				:event="selectedEvent"
				:locations="locations"
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
			selectedEvent: null,
		};
	},
	watch: {
		selectedEvent: {
			deep: true,
		    handler() {
		    	if (!this.selectedEvent)
		    		return;

				this.$store.commit('setup/updateEvent', this.selectedEvent);
				this.$refs.timeline.focus(this.selectedEvent.id);
			}
		},
	},
	methods: {
		addEvent() {
			const event = {
				id: randomId(),
				title: 'Unbenanntes Event',
				start: new Date(),
				end: new Date(Date.now() + 1000 * 60 * 60),
				chats: [],
				locations: []
			};

			this.$store.commit('setup/updateEvent', event);
			this.selectedEvent = event;
		},

		deleteEvent() {
			this.$store.commit('setup/deleteEvent', this.selectedEvent.id);
			this.selectedEvent = null;
		},

		duplicateEvent() {
			this.$store.commit('setup/duplicateEvent', this.selectedEvent.id);
		},


		selectEvent({ items }) {
			if (items.length > 0) {
				this.selectedEvent = this.events[items[0]];
			}
		},


		selectNextEvent() {
			if (!this.selectedEvent) {
				return this.selectEvent({ items: [this.timelineEvents[0].id] });
			}

			let index = this.timelineEvents.findIndex(
				(e) => e.id === this.selectedEvent.id
			);

			if (index === -1 || ++index >= this.timelineEvents.length) {
				this.selectEvent({ items: [this.timelineEvents[0].id] });
			} else {
				this.selectEvent({ items: [this.timelineEvents[index].id] });
			}
		}
	},

	computed: {
		events() {
			return this.$store.state.setup.events;
		},

		timelineEvents() {
			return Object.values(this.events).map(event => ({ ...event, content: event.title }))
		},

		chats() {
			return Object.values(this.$store.state.setup.chats) || [];
		},

		locations() {
			return Object.values(this.$store.state.setup.locations) || [];
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
