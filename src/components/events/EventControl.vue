<template>
	<div
		class="flex w-full max-w-md flex-col gap-3 rounded-lg bg-gray-200 px-3 py-3 shadow-md"
		style="min-width: 500px"
	>
		<div class="flex flex-col" v-if="selectedEvent">
			<h1 class="text-lg font-semibold text-gray-800">
				{{ selectedEvent.title }}
			</h1>
			<h2 class="text-base font-medium text-gray-500">
				{{ new Date(selectedEvent.start).toLocaleString() }}
				<span class="text-gray-400">–</span>
				{{
					isSameDay(selectedEvent.start, selectedEvent.end)
						? new Date(selectedEvent.end).toLocaleTimeString()
						: new Date(selectedEvent.end).toLocaleString()
				}}
			</h2>
		</div>
		<Timeline
			:items="timelineEvents"
			:options="options"
			:events="['select']"
			:selection="selectedEventId"
			ref="timeline"
			@select="onEventSelect"
		/>
		<div class="flex w-full">
			<button
				class="flex-1 rounded-l bg-gray-500 px-2 py-2 text-gray-100 hover:bg-gray-600 active:bg-gray-700"
				@click="$emit('previous')"
			>
				<i class="el-icon-arrow-left el-icon-left" />
				{{ $t('Vorheriges Event') }}
			</button>
			<button
				class="flex-1 rounded-r bg-gray-500 px-2 py-2 text-gray-100 hover:bg-gray-600 active:bg-gray-700"
				@click="$emit('next')"
			>
				{{ $t('Nächstes Event') }}
				<i class="el-icon-arrow-right" />
			</button>
		</div>
	</div>
</template>
<script>
import { Timeline } from 'vue-visjs';

export default {
	props: {
		events: {
			type: Array,
			required: true,
		},
		selectedEvent: {
			type: Object,
		},
	},
	mounted() {
		// Selection in Timeline component doesn't get set on initial render.
		// We do it manually here
		if (this.selectedEvent)
			this.$refs.timeline.setSelection(this.selectedEvent.id);
	},
	components: {
		Timeline,
	},
	computed: {
		selectedEventId() {
			return this.selectedEvent ? this.selectedEvent.id : null;
		},
		timelineEvents() {
			return this.$store.getters['setup/eventList'];
		},
		options: () => ({
			editable: false,
			// height: 95,
			// minHeight: 95,
			width: '100%',
			stack: false,
			align: 'left',
			type: 'range',
		}),
	},
	methods: {
		onEventSelect({ items }) {
			this.$emit('select', items[0]);
			this.$refs.timeline.focus(items[0]);
		},

		isSameDay(date1, date2) {
			return (
				new Date(date1).toISOString().slice(0, 10) ===
				new Date(date2).toISOString().slice(0, 10)
			);
		},
	},
	watch: {
		selectedEvent() {
			if (this.selectedEvent) {
				requestAnimationFrame(() => {
					this.$refs.timeline.setSelection(this.selectedEvent.id);
					this.$refs.timeline.focus(this.selectedEvent.id);
				});
			}
		},
	},
};
</script>
<style type="text/css">
.vis-content {
	/*min-height: 95px;*/
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
