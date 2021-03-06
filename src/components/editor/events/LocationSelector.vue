<template>
	<div class="flex gap-10">
		<div class="flex w-1/2 flex-col gap-2">
			<form
				class="mb-5 flex w-full flex-col gap-2 rounded-md bg-purple-200 px-3 py-2 text-left text-sm font-medium text-purple-900 transition hover:shadow"
				@submit.prevent="addLocation"
			>
				<h4>{{ $t('Eigenen Ort hinzufügen') }}</h4>
				<input
					type="text"
					name="description"
					id="description"
					class="block flex-1 rounded-md border-gray-300 py-2 px-4 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
					:placeholder="$t('Beschreibung')"
					v-model="newLocation.description"
					required
				/>

				<input
					type="text"
					name="lat"
					id="lat"
					class="block flex-1 rounded-md border-gray-300 py-2 px-4 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
					placeholder="Latitude (53.228093)"
					v-model="newLocation.position.lat"
					required
				/>

				<input
					type="text"
					name="long"
					id="long"
					class="block flex-1 rounded-md border-gray-300 py-2 px-4 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
					placeholder="Longitude (11.238493)"
					v-model="newLocation.position.lng"
					required
				/>

				<div class="flex flex-1 justify-end">
					<button
						class="rounded-md px-2 py-1 hover:bg-purple-300"
						type="submit"
					>
						{{ $t('Hinzufügen') }}
					</button>
				</div>
			</form>

			<button
				v-for="location in locations"
				:key="location.id"
				class="flex w-full gap-2 rounded-md border-2 border-transparent bg-purple-200 px-3 py-2 text-left text-sm font-medium shadow transition hover:bg-purple-300 hover:shadow-md"
				:class="{
					'border-purple-500 bg-purple-300 text-purple-900':
						viewedLocation && viewedLocation.id === location.id,
					'text-purple-900':
						!viewedLocation || viewedLocation.id !== location.id,
					'opacity-60': !event.locations.includes(location.id),
				}"
				@click="viewLocation(location)"
			>
				<input
					type="checkbox"
					name=""
					@change="selectLocation($event, location)"
					:checked="event.locations.includes(location.id)"
				/>

				<div class="flex-1">
					<div
						class="mb-1 flex flex-1 items-center justify-between text-left"
					>
						<span>{{ location.description }}</span>
						<span v-if="location.mediaSrc">🌅</span>
					</div>

					<select
						@change="changePerson($event, location)"
						class="w-full"
					>
						<option value="" :selected="location.person === null">
							–
						</option>
						<option
							v-for="person in allPeople"
							:key="person.id"
							:value="person.id"
							:selected="location.person === person.id"
						>
							{{ person.name }}
						</option>
					</select>
				</div>

				<button
					v-if="!location.mediaSrc"
					@click="removeLocation(location)"
					class="font-mono disabled:opacity-20"
					:disabled="event.locations.includes(location.id)"
				>
					X
				</button>
			</button>
		</div>
		<div class="w-1/2">
			<LMap
				v-if="viewedLocation"
				style="height: 300px"
				:zoom="15"
				:center="viewedLocation.position"
				class="mb-10 rounded-md shadow-md"
			>
				<LTileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					:attribution="null"
				/>
				<LMarker
					:lat-lng="viewedLocation.position"
					:icon="icon(viewedLocation)"
				/>
			</LMap>
			<img
				v-if="viewedLocation && viewedLocation.mediaSrc"
				class="cursor-pointer rounded"
				:src="$store.state.setup.files[viewedLocation.mediaSrc]"
				@click="previewImage(viewedLocation.mediaSrc)"
			/>
		</div>
	</div>
</template>
<script type="text/javascript">
import uuid from 'uuid/v4';
import 'leaflet/dist/leaflet.css';
import {
	LMap,
	LTileLayer,
	// LControl,
	LMarker,
	// LTooltip,
	// LIcon,
} from 'vue2-leaflet';
import createIcon from '@/util/create-icon';
import inspectImage from '@/util/inspect-image';

export default {
	props: {
		event: {
			type: Object,
			required: true,
		},
		locations: {
			type: Array,
			default: () => [
				{
					id: uuid(),
					position: { lat: '', lng: '' },
					date: new Date(),
					description: ``,
				},
			],
		},
	},
	data(vm) {
		return {
			newLocation: {
				id: uuid(),
				position: { lat: '', lng: '' },
				// date: new Date('2021-10-01 15:50:00'),
				// person: personA.id,
				description: ``,
			},
			viewedLocation:
				vm.locations && vm.locations.length > 0
					? vm.locations[0]
					: null,
		};
	},
	computed: {
		selectedLocations() {
			return this.event.locations;
		},
		allPeople() {
			return Object.values(this.$store.state.setup.people);
		},
	},
	methods: {
		icon(location) {
			return createIcon(location, this.$store.state.setup);
		},

		selectLocation($event, location) {
			this.$store.commit('setup/toggleEventLocation', {
				event: this.event,
				location,
			});
		},

		addLocation() {
			this.$store.commit('setup/updateLocation', this.newLocation);
			this.selectLocation({}, this.newLocation);
			this.newLocation = {
				id: uuid(),
				position: { lat: '', lng: '' },
				// date: new Date('2021-10-01 15:50:00'),
				// person: personA.id,
				description: ``,
			};

			setTimeout(() => {
				this.$forceUpdate();
			}, 1000);
		},

		viewLocation(location) {
			this.viewedLocation = location;
		},

		removeLocation(location) {
			this.$store.commit('setup/deleteLocation', location);

			this.$forceUpdate();
		},

		changePerson($event, location) {
			this.$store.commit('setup/setLocationPerson', {
				location,
				person: $event.target.value,
			});
		},

		previewImage(mediaSrc) {
			inspectImage(this.$viewerApi, this.$store.state.setup, mediaSrc);
		},
	},
	components: {
		LMap,
		LTileLayer,
		LMarker,
	},
};
</script>
