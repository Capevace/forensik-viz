<template>
	<div class="mb-10">
		<div>
			<label for="title" class="block text-sm font-medium text-gray-700">
				{{ $t('Titel') }}
			</label>
			<div class="relative mt-1 mb-3 rounded-md shadow-sm">
				<input
					type="text"
					name="title"
					id="title"
					class="block w-full rounded-md border-gray-300 py-2 px-4 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
					placeholder="Zeuge betritt Geschäft"
					v-model="event.title"
				/>
			</div>

			<div class="flex gap-5">
				<div class="flex-1">
					<label
						for="time-start"
						class="block text-sm font-medium text-gray-700"
					>
						{{ $t('Start-Zeit') }}
					</label>
					<div class="relative mt-1 mb-3 flex rounded-md shadow-sm">
						<Datetime
							v-model="startDate"
							:phrases="{ ok: 'OK', cancel: 'Abbrechen' }"
							:auto="true"
							type="datetime"
						/>
					</div>
				</div>

				<div class="flex-1">
					<label
						for="time-start"
						class="block text-sm font-medium text-gray-700"
					>
						{{ $t('Ende-Zeit') }}
					</label>
					<div class="relative mt-1 mb-3 flex rounded-md shadow-sm">
						<Datetime
							v-model="endDate"
							:min-datetime="startDate"
							:phrases="{ ok: 'OK', cancel: 'Abbrechen' }"
							:auto="true"
							type="datetime"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';

export default {
	props: {
		value: {
			type: Object,
			required: true,
		},
	},
	data(vm) {
		return {
			event: vm.value,
			startDate: vm.value.start.toISOString(),
			endDate: vm.value.end.toISOString(),
		};
	},
	methods: {},
	watch: {
		event() {
			this.$emit('value', this.event);
			this.$emit('change');
		},
		startDate() {
			this.event.start = new Date(this.startDate);

			// When start is after end, set end to start + 1h
			if (this.startDate > this.endDate) {
				this.event.end = new Date(
					this.event.start.getTime() + 1000 * 60 * 60
				).toISOString();
			}
		},
		endDate() {
			this.event.end = new Date(this.endDate);
		},
		value() {
			this.event = this.value;
			this.startDate = this.event.start.toISOString();
			this.endDate = this.event.end.toISOString();
		},
	},
	components: {
		Datetime,
	},
};
</script>
