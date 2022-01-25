<template>
	<section class="mx-auto mb-10 max-w-4xl text-gray-800">
		<!-- <pre class="text-xs">{{ JSON.stringify(timelineEvents, null, 2) }}</pre> -->

		<h2 class="mb-8 flex items-center justify-between text-2xl font-medium">
			<button class="text-left font-medium" @click="selectNextEvent">
				<span class="block"
					>{{ $t('Events') }} ({{ timelineEvents.length }})</span
				>
				<span class="text-gray-400">{{ $t('Timeline') }}</span>
			</button>

			<button
				class="font-regular block h-full rounded-md bg-blue-100 px-2 py-2 text-base hover:bg-blue-200"
				@click="addEvent"
			>
				{{ $t('Event hinzufügen') }}
			</button>
		</h2>

		<div
			class="rounded bg-white"
			:class="{ 'has-selected': !!selectedEvent }"
		>
			<Timeline
				class="border-gray-400"
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
			<div
				class="mb-8 flex w-full items-center justify-between rounded-b border border-t-0 border-gray-300 bg-white px-4 py-3"
			>
				<h3 class="text-lg font-medium">
					<span class="block leading-tight">{{
						selectedEvent.title
					}}</span>
				</h3>
				<div class="flex items-center gap-2 text-gray-500">
					<button
						class="rounded-md px-2 py-1 hover:bg-blue-200 hover:text-gray-800"
						@click="duplicateEvent"
					>
						{{ $t('Event duplizieren') }}
					</button>
					<button
						class="rounded-md px-2 py-1 hover:bg-red-200 hover:text-gray-800"
						@click="deleteEvent"
					>
						{{ $t('Event löschen') }}
					</button>
				</div>
			</div>
			<MetaEditor v-model="selectedEvent" />

			<h4 class="mb-3 text-lg font-medium">{{ $t('Chats') }}</h4>
			<ChatSelector
				v-model="selectedEvent"
				:chats="chats"
				:filter-start="selectedEvent.start"
				:filter-end="selectedEvent.end"
			/>

			<h4 class="mb-3 text-lg font-medium">
				{{ $t('Orte (Exif & GPS-Daten)') }}
			</h4>
			<LocationSelector :event="selectedEvent" :locations="locations" />
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
				if (!this.selectedEvent) return;

				this.$store.commit('setup/updateEvent', this.selectedEvent);
				this.$refs.timeline.focus(this.selectedEvent.id);
			},
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
				locations: [],
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
			} else {
				this.selectedEvent = null;
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
		},
	},

	computed: {
		events() {
			return this.$store.state.setup.events;
		},

		timelineEvents() {
			return Object.values(this.events).map((event) => ({
				...event,
				content: event.title,
			}));
		},

		chats() {
			return Object.values(this.$store.state.setup.chats) || [];
		},

		locations() {
			return Object.values(this.$store.state.setup.locations) || [];
		},
	},
};
</script>
<style type="text/css">
.vdatetime {
	@apply w-full;
}

.vdatetime-input {
	@apply block w-full rounded-md border-gray-300 py-2 px-4 focus:border-blue-600 focus:ring-blue-600 sm:text-sm;
}

.vis-timeline {
	@apply rounded border-gray-300;
}

.has-selected .vis-timeline {
	@apply rounded-b-none;
}

.vis-item.vis-selected {
	@apply border-blue-600 bg-blue-500 text-blue-100;
}

.vis-time-axis .vis-text {
	@apply text-gray-400;
}
</style>
